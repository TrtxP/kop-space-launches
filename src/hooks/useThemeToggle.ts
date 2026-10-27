import { useEffect, useLayoutEffect, useState } from "react"

type Theme = 'light' | 'dark'

export function useThemeToggle() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme')
            if (savedTheme === 'dark' || savedTheme === 'light') {
                return savedTheme
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }
        return 'light'
    })

    useLayoutEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
    }, [theme])

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
    }

    const isDark = theme === 'dark'

    return { toggleTheme, isDark }
}