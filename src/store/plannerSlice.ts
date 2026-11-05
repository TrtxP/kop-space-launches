import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"

interface PlannerState {
    limitsByScope: Record<string, Record<string, number>>
}

interface ChangeLimitPayload {
    scopeKey: string
    agencyId: string
    total: number
    delta: -1 | 1
}

const initialState: PlannerState = { limitsByScope: {} }

const plannerSlice = createSlice({
    name: 'planner',
    initialState,
    reducers: {
        changeAgencyLimit(state, action: PayloadAction<ChangeLimitPayload>) {
            const { scopeKey, agencyId, total, delta } = action.payload
            const scope = state.limitsByScope[scopeKey]
            const current = Math.min(total, Math.max(0, scope?.[agencyId] ?? total))
            const next = Math.min(total, Math.max(0, current + delta))

            if (next === total) {
                if (!scope) return
                delete scope[agencyId]
                if (Object.keys(scope).length === 0) delete state.limitsByScope[scopeKey]
            } else {
                state.limitsByScope[scopeKey] ??= {}
                state.limitsByScope[scopeKey][agencyId] = next
            }
        },
        resetAgencyLimit(state, action: PayloadAction<{ scopeKey: string; agencyId: string }>) {
            const { scopeKey, agencyId } = action.payload
            const scope = state.limitsByScope[scopeKey]
            if (!scope) return
            delete scope[agencyId]
            if (Object.keys(scope).length === 0) delete state.limitsByScope[scopeKey]
        },
        resetAllLimits(state) {
            state.limitsByScope = {}
        },
    },
})

const NO_LIMITS: Readonly<Record<string, number>> = {}

export const selectScopeLimits = (state: RootState, scopeKey: string | null) => scopeKey === null ? NO_LIMITS : state.planner.limitsByScope[scopeKey] ?? NO_LIMITS

export const { changeAgencyLimit, resetAgencyLimit, resetAllLimits } = plannerSlice.actions
export default plannerSlice.reducer