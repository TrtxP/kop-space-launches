import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface FavoritesState {
    ids: string[]
}

const initialState: FavoritesState = {
    ids: [],
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<string>) {
            const id = action.payload

            if (state.ids.includes(id)) {
                state.ids = state.ids.filter(savedId => savedId !== id)
            } else {
                state.ids = [...state.ids, id]
            }
        }
    }
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer