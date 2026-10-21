export async function fetchJson(url: string, signal: AbortSignal): Promise<unknown> {
    let response: Response
    try {
        response = await fetch(url, { signal })
    } catch (error) {
        if (signal.aborted) throw error
        throw new Error('Не вдалося з’єднатися з Launch Library 2. Перевірте підключення до мережі.', {
            cause: error,
        })
    }

    if (!response.ok) {
        if (response.status === 429) throw new RateLimitError(response)
        throw new Error(`Launch Library 2 повернув помилку HTTP ${response.status}.`)
    }

    let json: unknown
    try {
        json = await response.json()
    } catch (error) {
        if (signal.aborted) throw error
        throw new Error('Launch Library 2 повернув некоректний JSON.', { cause: error })
    }

    return json
}

export class RateLimitError extends Error {
    retryAt: number

    constructor(response: Response) {
        super('Перевищено ліміт запитів до Launch Library 2.')
        this.name = 'RateLimitError'

        const header = response.headers.get('Retry-After')?.trim()

        let retryAt = NaN
        const regex: RegExp = /^\d+$/

        if (header) {
            retryAt = regex.test(header) ? Date.now() + Number(header) * 1000 : Date.parse(header)
        }

        this.retryAt = Number.isFinite(retryAt) ? Math.max(Date.now(), retryAt) : Date.now() + 60_000
    }
}