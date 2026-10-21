import { useEffect, useState } from 'react'
import type { LaunchMission } from '../data/types'
import { RateLimitError } from '../api/http';
import { loadDashboardData } from '../api/launchDashboardData';

export function useLaunchData() {
  const [launches, setLaunches] = useState<LaunchMission[]>([])
  const [nextLaunch, setNextLaunch] = useState<LaunchMission | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [retryAt, setRetryAt] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const now = new Date()

    loadDashboardData(controller.signal, now)
      .then(({ launches, nextLaunch }) => {
        if (controller.signal.aborted) return
        setLaunches(launches)
        setNextLaunch(nextLaunch)
        setIsLoading(false)
      })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return
        setError(reason instanceof Error ? reason.message : 'Невідома помилка завантаження.')
        setIsLoading(false)
        // зупиняє другий запит, щоб він не витрачав ліміт API після помилки
        controller.abort()
        if (reason instanceof RateLimitError) {
          setRetryAt(reason.retryAt)
        }
      })

    return () => controller.abort()
  }, [reloadKey])

  /* Якщо встановлено час повторної спроби, 
     створюємо таймер для скидання стану retryAt 
     після закінчення часу */
  useEffect(() => {
    if (retryAt === null) return

    const timeoutId = window.setTimeout(() => {
      setRetryAt(null)
    }, Math.max(0, retryAt - Date.now()))

    return () => window.clearTimeout(timeoutId)
  }, [retryAt])

  const retry = () => {
    if (isLoading || retryAt !== null) return

    setIsLoading(true)
    setError(null)
    setReloadKey(key => key + 1)
  }

  const canRetry = !isLoading && retryAt === null

  return { launches, nextLaunch, isLoading, error, retry, canRetry }
}

