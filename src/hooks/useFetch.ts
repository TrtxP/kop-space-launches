import { useEffect, useState } from "react"
import { RateLimitError } from "../api/http"

interface UseFetchOptions<T> {
    loader: (signal: AbortSignal) => Promise<T>
    initialData?: T | null
    enabled?: boolean
    rateLimitRetry?: 'auto' | 'manual'
}

interface UseFetchResult<T> {
    data: T | null
    loading: boolean
    error: string | null
    retry: () => void
    canRetry: boolean
}

export function useFetch<T>({ loader, initialData = null, enabled = true, rateLimitRetry = 'manual' }: UseFetchOptions<T>): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(initialData)
    const [loading, setLoading] = useState(enabled && initialData === null)
    const [error, setError] = useState<string | null>(null)
    const [reloadKey, setReloadKey] = useState(0)
    const [retryAt, setRetryAt] = useState<number | null>(null)
    const [manualRetryRequired, setManualRetryRequired] = useState(false)

    const waitingForManualRetry = rateLimitRetry === 'manual' && manualRetryRequired

    useEffect(() => {
        if (!enabled || retryAt !== null || waitingForManualRetry) return

        const controller = new AbortController()

        Promise.resolve()
            .then(() => {
                controller.signal.throwIfAborted()

                setLoading(true)
                setError(null)

                return loader(controller.signal)
            })
            .then(result => {
                if (controller.signal.aborted) return

                setData(result)
                setError(null)
                setLoading(false)
                setManualRetryRequired(false)
            })
            .catch((reason: unknown) => {
                if (controller.signal.aborted) return

                controller.abort()
                setLoading(false)

                if (reason instanceof RateLimitError) {
                    const retryTime = new Date(reason.retryAt).toLocaleTimeString('uk-UA')

                    const message = rateLimitRetry === 'auto' ? reason.message + ' Автоматична повторна спроба після ' + retryTime + '.' : reason.message + ' Повторіть після ' + retryTime + '.'

                    setError(message)
                    setManualRetryRequired(rateLimitRetry === 'manual')
                    setRetryAt(reason.retryAt)

                    return
                }
                setError(reason instanceof Error ? reason.message : 'Невідома помилка завантаження.')
            })
        return () => controller.abort()
    }, [loader, enabled, reloadKey, rateLimitRetry, retryAt, waitingForManualRetry])

    useEffect(() => {
        if (retryAt === null) return

        const timeoutId = window.setTimeout(() => {
            setRetryAt(null)
        }, Math.max(0, retryAt - Date.now()))

        return () => window.clearTimeout(timeoutId)
    }, [retryAt, rateLimitRetry])

    const canRetry = enabled && !loading && retryAt === null && error !== null

    const retry = () => {
        if (!canRetry) return

        setLoading(true)
        setError(null)
        setManualRetryRequired(false)
        setReloadKey(key => key + 1)
    }

    return { data, loading: enabled && loading, error, retry, canRetry }
}
