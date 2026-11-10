import type { AgencyPlannerRow, LaunchMission } from '../data/types'
import { countLaunchesByAgency } from '../data/stats'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { changeAgencyLimit, resetAgencyLimit, resetAllLimits } from '../store/slices/plannerSlice'
import { selectScopeLimits } from '../store/selectors'

// Однозначний ключ набору застосованих параметрів (після debounce) 
export function getLimitsScopeKey(year: number, search: string, agencyId: string, ordering: string): string {
  return JSON.stringify([year, search.trim(), agencyId, ordering])
}

function visibleCount(total: number, savedLimit: number | undefined): number {
  return savedLimit === undefined ? total : Math.min(total, Math.max(0, savedLimit))
}

export function useAgencyMissionLimits(missions: LaunchMission[], scopeKey: string | null) {
  const dispatch = useAppDispatch()
  const limits = useAppSelector(state => selectScopeLimits(state, scopeKey))

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

  const changeLimit = (agencyId: string, delta: -1 | 1) => {
    if (scopeKey === null) return
    const total = totalByAgency.get(agencyId)
    if (total === undefined) return
    dispatch(changeAgencyLimit({ scopeKey, agencyId, total, delta }))
  }

  const increment = (agencyId: string) => changeLimit(agencyId, 1)
  const decrement = (agencyId: string) => changeLimit(agencyId, -1)

  // Прибирає лише ліміт цієї агенції в поточному наборі фільтрів
  const resetAgency = (agencyId: string) => {
    if (scopeKey !== null) dispatch(resetAgencyLimit({ scopeKey, agencyId }))
  }

  const resetAll = () => dispatch(resetAllLimits())

  return { rows, visibleMissions, increment, decrement, resetAgency, resetAll }
}
