import type { AgencyOption } from "../data/types";
import { fetchJson } from "./http";
import { API_BASE } from "./launches";
import { INVALID_RESPONSE_MESSAGE, parseAgencyPage } from "./parsers";

let cachedAgencyOptions: AgencyOption[] | null = null

export function getCachedAgencyOptions(): AgencyOption[] | null {
    return cachedAgencyOptions
}

export async function loadAgencyOptions(signal: AbortSignal): Promise<AgencyOption[]> {
    signal.throwIfAborted()
    if (cachedAgencyOptions !== null) return cachedAgencyOptions

    const params = new URLSearchParams({
        mode: 'list',
        limit: '100',
        ordering: 'name',
    })

    const agenciesById = new Map<string, AgencyOption>()
    const visitedUrls = new Set<string>()
    let url: string | null = `${API_BASE}/agencies/?${params}`

    while (url !== null) {
        if (visitedUrls.has(url)) throw new Error(INVALID_RESPONSE_MESSAGE)
        visitedUrls.add(url)

        const page = parseAgencyPage(await fetchJson(url, signal), API_BASE)
        for (const agency of page.results) {
            if (!agenciesById.has(agency.id)) agenciesById.set(agency.id, agency)
        }
        url = page.next
    }

    signal.throwIfAborted()

    const options = [...agenciesById.values()].sort(
        (a, b) => a.name.localeCompare(b.name, 'uk') || Number(a.id) - Number(b.id)
    )
    cachedAgencyOptions = options
    return options
}

