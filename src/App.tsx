import DashboardLayout from './components/layout/DashboardLayout'
import AgencyLaunchChart from './components/widgets/AgencyLaunchChart'
import KpiCard from './components/widgets/KpiCard'
import MissionFilteredList from './components/widgets/MissionFilteredList'
import TelemetryToggle from './components/widgets/TelemetryToggle'
import { kpiData, launchesByAgency, mockLaunches } from './data/mocks'

function App() {
  const kpiCards = kpiData.map(kpi => (
    <KpiCard
      key={kpi.title}
      title={kpi.title}
      value={kpi.value}
      change={kpi.change}
      isPositive={kpi.isPositive}
    />
  ))

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpiCards}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AgencyLaunchChart data={launchesByAgency} />
        <TelemetryToggle
          missionName={mockLaunches[0].name}
          orbitAltitudeKm={mockLaunches[0].orbitAltitudeKm}
        />
        <MissionFilteredList missions={mockLaunches} />
      </div>
    </DashboardLayout>
  )
}

export default App
