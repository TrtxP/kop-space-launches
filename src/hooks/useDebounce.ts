import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 400) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        
        return () => clearTimeout(timeoutId)
    }, [value, delay])

    return debouncedValue
}