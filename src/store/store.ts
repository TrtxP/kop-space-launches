import { configureStore } from "@reduxjs/toolkit"
import favoritesReducer from "./favoritesSlice"
import filtersReducer from "./filtersSlice"
import themeReducer from "./themeSlice"
import plannerReducer from "./plannerSlice"
import chartReducer from "./chartSlice"

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