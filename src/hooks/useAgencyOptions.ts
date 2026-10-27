import type { AgencyOption } from '../data/types'
import { getCachedAgencyOptions, loadAgencyOptions } from '../api/agencies'
import { useFetch } from './useFetch';

const NO_AGENCIES: AgencyOption[] = []


export function useAgencyOptions() {
  const cached = getCachedAgencyOptions()

  const { data, loading, error, retry, canRetry } = useFetch<AgencyOption[]>({
    loader: loadAgencyOptions,
    initialData: cached,
    enabled: cached === null,
    rateLimitRetry: 'manual',
  })

  return { agencies: data ?? NO_AGENCIES, loading, error, retry, canRetry }
}
