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

export class HttpError extends Error {
    readonly status: number

    constructor(status: number) {
        super(`Launch Library 2 повернув помилку HTTP ${status}.`)
        this.name = 'HttpError'
        this.status = status
    }
}

export class JsonError extends Error {
    readonly cause: unknown

    constructor(cause: unknown) {
        super('Launch Library 2 повернув некоректний JSON.')
        this.name = 'JsonError'
        this.cause = cause
    }
}

export class ConnectionError extends Error {
    readonly cause: unknown

    constructor(cause: unknown) {
        super('Не вдалося з’єднатися з Launch Library 2. Перевірте підключення до мережі.')
        this.name = 'ConnectionError'
        this.cause = cause
    }
}

export async function fetchJson(url: string, signal: AbortSignal): Promise<unknown> {
    let response: Response
    try {
        response = await fetch(url, { signal })
    } catch (error) {
        if (signal.aborted) throw error
        throw new ConnectionError(error)
    }

    if (!response.ok) {
        if (response.status === 429) throw new RateLimitError(response)
        throw new HttpError(response.status)
    }

    let json: unknown
    try {
        json = await response.json()
    } catch (error) {
        if (signal.aborted) throw error
        throw new JsonError(error)
    }

    return json
}