import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { DEFAULT_LAUNCH_QUERY } from "../api/launchFilters"
import type { LaunchQuery } from "../data/types"
import type { RootState } from "./store"

const initialState: LaunchQuery = { ...DEFAULT_LAUNCH_QUERY }

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload
        },
        setAgencyId(state, action: PayloadAction<string>) {
            state.agencyId = action.payload
        },
        setOrdering(state, action: PayloadAction<LaunchQuery['ordering']>) {
            state.ordering = action.payload
        },
        resetFilters() {
            return { ...DEFAULT_LAUNCH_QUERY }
        },
    },
})

export const { setSearch, setAgencyId, setOrdering, resetFilters } = filtersSlice.actions
export const selectFilters = (state: RootState) => state.filters 
export default filtersSlice.reducer