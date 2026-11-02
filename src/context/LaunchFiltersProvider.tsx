import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import type { LaunchQuery } from "../data/types";
import { DEFAULT_LAUNCH_QUERY } from "../api/launchFilters";
import { LaunchFiltersContext } from "./LaunchFiltersContext";

function LaunchFiltersProvider({ children }:{children: ReactNode}) {
    const form = useForm<LaunchQuery>({
        defaultValues: DEFAULT_LAUNCH_QUERY
    })
    
    return (
        <LaunchFiltersContext.Provider value={form}>
            {children}
        </LaunchFiltersContext.Provider>
    )
}

export default LaunchFiltersProvider