import { createContext, useContext } from "react"


interface ThemeContextValue {
    theme: 'light' | 'dark'
    isDark: boolean
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
    const context = useContext(ThemeContext)

    if (context === null) {
        throw new Error('useTheme потрібно використовувати всередині ThemeProvider')
    }

    return context
}