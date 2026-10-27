import DashboardLayout from './components/layout/DashboardLayout'
import AgencyLaunchChart from './components/widgets/agency-launch-chart/AgencyLaunchChart'
import ErrorNotice from './components/ui/ErrorNotice'
import KpiCard from './components/ui/KpiCard'
import MissionListContainer from './components/containers/mission-list/MissionListContainer'
import OrbitDetailsContainer from './components/containers/OrbitDetailsContainer'
import type { LaunchMission, LaunchQuery, LoadStatus } from './data/types'
import { getLimitsScopeKey, useAgencyMissionLimits } from './hooks/useAgencyMissionLimits'
import { useAgencyOptions } from './hooks/useAgencyOptions'
import { useLaunchData } from './hooks/useLaunchData'
import { getKpiCards } from './data/getKpiCards'
import { useForm, useWatch } from 'react-hook-form';
import { DEFAULT_LAUNCH_QUERY } from './api/launchFilters';
import { useMemo } from 'react';
import { useDebounce } from './hooks/useDebounce';
import LaunchFilterBar from './components/forms/LaunchFilterBar';

// Стабільний порожній масив для рендерів без даних
const EMPTY_LAUNCHES: LaunchMission[] = []

function App() {
  const { control, reset } = useForm<LaunchQuery>({
    defaultValues: DEFAULT_LAUNCH_QUERY
  })

  const [search, agencyId, ordering] = useWatch({
    control,
    name: ['search', 'agencyId', 'ordering']
  })

  const query = useMemo<LaunchQuery>(() => ({ search: search.trim(), agencyId, ordering }), [search, agencyId, ordering])

  const debouncedQuery = useDebounce(query, 400)
  const { data, loading, error, retry, canRetry } = useLaunchData(debouncedQuery)
  const agencyDirectory = useAgencyOptions()

  const launches = data?.launches ?? EMPTY_LAUNCHES
  const nextLaunch = data?.nextLaunch ?? null

  const selectionKey = `${debouncedQuery.search}|${debouncedQuery.agencyId}|${debouncedQuery.ordering}`

  // Ключ набору застосованих параметрів, включно з роком історичної вибірки (UTC)
  const limitsScopeKey = data !== null
    ? getLimitsScopeKey(data.year, debouncedQuery.search, debouncedQuery.agencyId, debouncedQuery.ordering)
    : null

  // Спільний стан ручних лімітів для планувальника і списку «Місії»
  const { rows: agencyRows, visibleMissions, increment, decrement, resetAgency, resetAll } =
    useAgencyMissionLimits(launches, limitsScopeKey)

  const handleReset = () => {
    reset(DEFAULT_LAUNCH_QUERY)
    resetAll()
  }

  const status: LoadStatus = loading ? 'loading' : error !== null ? 'error' : 'ready'
  const hasActiveFilters = debouncedQuery.search !== '' || debouncedQuery.agencyId !== ''
  const kpiCards = getKpiCards(status, data, hasActiveFilters)

  return (
    <DashboardLayout>
      <LaunchFilterBar
        control={control}
        onReset={handleReset}
        agencies={agencyDirectory.agencies}
        agenciesLoading={agencyDirectory.loading}
        agenciesError={agencyDirectory.error}
        canRetryAgencies={agencyDirectory.canRetry}
        onRetryAgencies={agencyDirectory.retry}
      />
      {error !== null && <ErrorNotice message={error} onRetry={retry} retryDisabled={!canRetry} />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpiCards.map(kpi => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            caption={kpi.caption}
            isPositive={kpi.isPositive}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AgencyLaunchChart
          rows={agencyRows}
          status={status}
          onIncrement={increment}
          onDecrement={decrement}
          onReset={resetAgency}
        />
        <OrbitDetailsContainer mission={nextLaunch} status={status} />
        <MissionListContainer
          key={selectionKey}
          missions={visibleMissions}
          loadedCount={launches.length}
          status={status}
        />
      </div>
    </DashboardLayout>
  )
}

export default App
