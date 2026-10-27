import { useState } from 'react'
import type { AgencyPlannerRow, LaunchMission } from '../data/types'
import { countLaunchesByAgency } from '../data/stats'

type AgencyLimits = Readonly<Record<string, number>>
type LimitsStore = Readonly<Record<string, AgencyLimits>>

interface AgencyMissionLimitsResult {
  rows: AgencyPlannerRow[]
  visibleMissions: LaunchMission[]
  increment: (agencyId: string) => void
  decrement: (agencyId: string) => void
  resetAgency: (agencyId: string) => void
  resetAll: () => void
}

const NO_LIMITS: AgencyLimits = {}

// Однозначний ключ набору застосованих параметрів (після debounce) 
export function getLimitsScopeKey(year: number, search: string, agencyId: string, ordering: string): string {
  return JSON.stringify([year, search.trim(), agencyId, ordering])
}

function visibleCount(total: number, savedLimit: number | undefined): number {
  return savedLimit === undefined ? total : Math.min(total, Math.max(0, savedLimit))
}

function withoutKey<T>(record: Readonly<Record<string, T>>, key: string): Record<string, T> {
  const next = { ...record }
  delete next[key]
  return next
}

export function useAgencyMissionLimits(missions: LaunchMission[], scopeKey: string | null): AgencyMissionLimitsResult {
  const [store, setStore] = useState<LimitsStore>({})

  const limits = scopeKey !== null ? store[scopeKey] ?? NO_LIMITS : NO_LIMITS

  const totals = countLaunchesByAgency(missions)
  const totalByAgency = new Map(totals.map(item => [item.agencyId, item.count]))

  const rows: AgencyPlannerRow[] = totals.map(({ agencyId, agency, count: total }) => ({
    agencyId,
    agency,
    count: visibleCount(total, limits[agencyId]),
    total,
    isModified: limits[agencyId] !== undefined,
  }))

  const shownByAgency = new Map<string, number>()
  const visibleMissions = missions.filter(mission => {
    const limit = visibleCount(totalByAgency.get(mission.agencyId) ?? 0, limits[mission.agencyId])
    const shown = shownByAgency.get(mission.agencyId) ?? 0
    if (shown >= limit) return false
    shownByAgency.set(mission.agencyId, shown + 1)
    return true
  })

  const setLimit = (agencyId: string, getNext: (current: number) => number) => {
    if (scopeKey === null) return
    const total = totalByAgency.get(agencyId)
    if (total === undefined) return

    setStore(prev => {
      const scopeLimits = prev[scopeKey] ?? NO_LIMITS
      const current = visibleCount(total, scopeLimits[agencyId])
      const next = Math.min(total, Math.max(0, getNext(current)))
      if (next === current && (next < total || scopeLimits[agencyId] === undefined)) return prev

      const nextScopeLimits = next >= total
        ? withoutKey(scopeLimits, agencyId)
        : { ...scopeLimits, [agencyId]: next }

      return Object.keys(nextScopeLimits).length > 0
        ? { ...prev, [scopeKey]: nextScopeLimits }
        : withoutKey(prev, scopeKey)
    })
  }

  const increment = (agencyId: string) => setLimit(agencyId, current => current + 1)
  const decrement = (agencyId: string) => setLimit(agencyId, current => current - 1)

  // Прибирає лише ліміт цієї агенції в поточному наборі фільтрів
  const resetAgency = (agencyId: string) => {
    if (scopeKey === null) return
    setStore(prev => {
      const scopeLimits = prev[scopeKey]
      if (scopeLimits?.[agencyId] === undefined) return prev
      const nextScopeLimits = withoutKey(scopeLimits, agencyId)
      return Object.keys(nextScopeLimits).length > 0
        ? { ...prev, [scopeKey]: nextScopeLimits }
        : withoutKey(prev, scopeKey)
    })
  }

  const resetAll = () => setStore({})

  return { rows, visibleMissions, increment, decrement, resetAgency, resetAll }
}
