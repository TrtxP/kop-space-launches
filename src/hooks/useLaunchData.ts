import type { DashboardData, LaunchQuery } from '../data/types'
import { loadDashboardData } from '../api/loadDashboardData'
import { useCallback } from 'react'
import { useFetch } from './useFetch'

export function useLaunchData(query: LaunchQuery) {
  const { search, agencyId, ordering } = query

  const loader = useCallback(
    (signal: AbortSignal) => {
      const now = new Date()

      return loadDashboardData(signal, now, {
        search,
        agencyId,
        ordering
      })
    }, [search, agencyId, ordering])

  return useFetch<DashboardData>({
    loader,
    rateLimitRetry: 'auto'
  })
}

