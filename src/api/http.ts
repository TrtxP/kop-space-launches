import { ConnectionError, HttpError, JsonError, RateLimitError } from "./exceptionHandlers"

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

    try {
        return await response.json()
    } catch (error) {
        if (signal.aborted) throw error
        throw new JsonError(error)
    }
}