import { createContext, useContext } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { LaunchQuery } from "../data/types";

export const LaunchFiltersContext = createContext<UseFormReturn<LaunchQuery> | null>(null)

export function useLaunchFilters() {
    const context = useContext(LaunchFiltersContext)

    if (context === null) {
        throw new Error('useLaunchFilters потрібно використовувати всередині LaunchFiltersProvider')
    }

    return context
}