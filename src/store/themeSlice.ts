import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "./store"

type Theme = 'light' | 'dark'

interface ThemeState {
    value: Theme
}

function readInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'light'

    try {
        const saved = window.localStorage.getItem('theme')
        if (saved === 'light' || saved === 'dark') return saved
    } catch(e) {
        console.error(`Помилка застосування теми: ${e}`)
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const initialState: ThemeState = { value: readInitialTheme() }

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.value = state.value === 'dark' ? 'light' : 'dark'
        },
    },
})

export const { toggleTheme } = themeSlice.actions
export const selectTheme = (state: RootState) => state.theme.value
export default themeSlice.reducer