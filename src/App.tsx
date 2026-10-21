import DashboardLayout from './components/layout/DashboardLayout'
import AgencyLaunchChart from './components/widgets/agency-launch-chart/AgencyLaunchChart'
import ErrorNotice from './components/ui/ErrorNotice'
import KpiCard from './components/ui/KpiCard'
import MissionListContainer from './components/containers/mission-list/MissionListContainer'
import OrbitDetailsContainer from './components/containers/OrbitDetailsContainer'
import type { LoadStatus } from './data/types'
import { countLaunchesByAgency } from './data/stats'
import { useLaunchData } from './hooks/useLaunchData'
import { getKpiCards } from './data/getKpiCards'

function App() {
  const { launches, nextLaunch, isLoading, error, retry, canRetry } = useLaunchData()

  const status: LoadStatus = isLoading ? 'loading' : error !== null ? 'error' : 'ready'
  const launchesByAgency = countLaunchesByAgency(launches)
  const kpiCards = getKpiCards(status, launches, nextLaunch)

  return (
    <DashboardLayout>
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
        <AgencyLaunchChart data={launchesByAgency} status={status} />
        <OrbitDetailsContainer mission={nextLaunch} status={status} />
        <MissionListContainer missions={launches} status={status} />
      </div>
    </DashboardLayout>
  )
}

export default App
