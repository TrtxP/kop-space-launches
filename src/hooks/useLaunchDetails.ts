import { useCallback } from "react";
import { fetchLaunchById } from "../api/launches";
import { useFetch } from "./useFetch";
import type { LaunchMission } from "../data/types";

export function useLaunchDetails(id: string) {
    const loader = useCallback(
        (signal: AbortSignal) => fetchLaunchById(id, signal),
        [id]
    )

    return useFetch<LaunchMission | null>({
        loader,
        rateLimitRetry: 'manual',
    })
}