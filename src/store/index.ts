import { configureStore } from "@reduxjs/toolkit"
import favoritesReducer from "./slices/favoritesSlice"
import filtersReducer from "./slices/filtersSlice"
import themeReducer from "./slices/themeSlice"
import plannerReducer from "./slices/plannerSlice"
import chartReducer from "./slices/chartSlice"

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        filters: filtersReducer,
        theme: themeReducer,
        planner: plannerReducer,
        chart: chartReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch