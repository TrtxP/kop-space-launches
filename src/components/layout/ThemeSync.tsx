import { useLayoutEffect } from "react"
import { useAppSelector } from "../../store/hooks"
import { selectTheme } from "../../store/themeSlice"

function ThemeSync() {
    const theme = useAppSelector(selectTheme)

    useLayoutEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        try {
            window.localStorage.setItem('theme', theme)
        } catch(e) {
            console.error(`Помилка застосування сихронізації теми: ${e}`)
        }
    }, [theme])

    return null
}

export default ThemeSync