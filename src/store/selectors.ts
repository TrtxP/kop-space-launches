import type { RootState } from "."

const NO_LIMITS: Readonly<Record<string, number>> = {}

export const selectChartType = (state: RootState) => state.chart.type

export const selectTheme = (state: RootState) => state.theme.value

export const selectFilters = (state: RootState) => state.filters 

export const selectIsFavorite = (state: RootState, id: string) => state.favorites.ids.includes(id)

export const selectScopeLimits = (state: RootState, scopeKey: string | null) => scopeKey === null ? NO_LIMITS : state.planner.limitsByScope[scopeKey] ?? NO_LIMITS