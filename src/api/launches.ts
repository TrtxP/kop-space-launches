import type { LaunchMission, LaunchQuery } from "../data/types";
import { fetchJson } from "./http";
import { STARTED_STATUS_IDS } from "./launchStatuses";
import { INVALID_RESPONSE_MESSAGE, parsePage, type ApiPage } from "./parsers";

export const API_BASE = 'https://ll.thespacedevs.com/2.3.0'

async function fetchPage(url: string, signal: AbortSignal): Promise<ApiPage> {
  const json = await fetchJson(url, signal)
  return parsePage(json, API_BASE)
}

export async function fetchLaunchesThisYear(
  signal: AbortSignal,
  now: Date,
  query: LaunchQuery
): Promise<LaunchMission[]> {
  const yearStart = new Date(Date.UTC(now.getUTCFullYear(), 0, 1))
  const params = new URLSearchParams({
    mode: 'normal',
    net__gte: yearStart.toISOString(),
    net__lt: now.toISOString(),
    status__ids: STARTED_STATUS_IDS.join(','),
    limit: '100',
    ordering: query.ordering,
  })

  if (query.search.trim()) {
    params.set('search', query.search.trim())
  }

  if (query.agencyId) {
    params.set('lsp__id', query.agencyId)
  }

  const launchesById = new Map<string, LaunchMission>()
  const visitedUrls = new Set<string>()
  let url: string | null = `${API_BASE}/launches/?${params}`

  while (url !== null) {
    if (visitedUrls.has(url)) throw new Error(INVALID_RESPONSE_MESSAGE)
    visitedUrls.add(url)

    const page = await fetchPage(url, signal)
    for (const launch of page.results) {
      launchesById.set(launch.id, launch)
    }
    url = page.next
  }

  return [...launchesById.values()]
}

export async function fetchNextLaunch(
  signal: AbortSignal,
  now: Date,
  query: LaunchQuery
): Promise<LaunchMission | null> {
  const params = new URLSearchParams({
    mode: 'normal',
    net__gte: now.toISOString(),
    ordering: 'net',
    limit: '1',
  })

  if (query.search.trim()) {
    params.set('search', query.search.trim())
  }

  if (query.agencyId) {
    params.set('lsp__id', query.agencyId)
  }

  const page = await fetchPage(`${API_BASE}/launches/upcoming/?${params}`, signal)
  return page.results.length > 0 ? page.results[0] : null
}
