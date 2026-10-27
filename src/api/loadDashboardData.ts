import type { DashboardData, LaunchQuery } from "../data/types";
import { fetchLaunchesThisYear, fetchNextLaunch } from "./launches";

interface DashboardCache {
    data: DashboardData
    savedAt: number
}

const CACHE_DURATION = 1000 * 60 * 10

const cache = new Map<string, DashboardCache>()

export async function loadDashboardData(signal: AbortSignal, now: Date, query: LaunchQuery): Promise<DashboardData> {
    signal.throwIfAborted()

    const normalizedQuery: LaunchQuery = {
        search: query.search.trim(),
        agencyId: query.agencyId,
        ordering: query.ordering
    }

    const cacheKey = JSON.stringify([
        now.getUTCFullYear(),
        normalizedQuery.search,
        normalizedQuery.agencyId,
        normalizedQuery.ordering
    ])

    const currentTime = Date.now()

    for (const [key, entry] of cache) {
        if (currentTime - entry.savedAt >= CACHE_DURATION) {
            cache.delete(key)
        }
    }

    const cached = cache.get(cacheKey)

    if (cached !== undefined) {
        const nextDate = cached.data.nextLaunch?.net
        const nextLaunchStillUpcoming = !nextDate || Date.parse(nextDate) > now.getTime()

        if (nextLaunchStillUpcoming) {
            return cached.data
        }

        cache.delete(cacheKey)
    }

    const [launches, nextLaunch] = await Promise.all([
        fetchLaunchesThisYear(signal, now, query),
        fetchNextLaunch(signal, now, query),
    ])

    signal.throwIfAborted()

    const data: DashboardData = { launches, nextLaunch, year: now.getUTCFullYear() }

    cache.set(cacheKey, {
        data,
        savedAt: Date.now(),
    })

    return data
}