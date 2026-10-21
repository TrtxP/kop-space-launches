import type { DashboardData } from "../data/types";
import { fetchLaunchesThisYear, fetchNextLaunch } from "./launches";

interface DashboardCache {
    data: DashboardData
    savedAt: number
    year: number
}

const CACHE_DURATION = 1000 * 60 * 10
let cache: DashboardCache | null = null

export async function loadDashboardData(signal: AbortSignal, now: Date,): Promise<DashboardData> {
    signal.throwIfAborted()

    const nextDate = cache?.data.nextLaunch?.net
    const nextLaunchStillUpcoming = !nextDate || Date.parse(nextDate) > now.getTime()

    if (cache !== null && cache.year === now.getUTCFullYear() && Date.now() - cache.savedAt < CACHE_DURATION && nextLaunchStillUpcoming) {
        return cache.data
    }

    const [launches, nextLaunch] = await Promise.all([
        fetchLaunchesThisYear(signal, now),
        fetchNextLaunch(signal, now),
    ])

    signal.throwIfAborted()

    const data = { launches, nextLaunch }

    cache = {
        data,
        savedAt: Date.now(),
        year: now.getUTCFullYear(),
    }

    return data
}