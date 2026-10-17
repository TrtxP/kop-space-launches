export interface LaunchMission {
  id: string
  name: string
  agency: string
  rocket: string
  pad: string
  status: string
  net: string
  orbitAltitudeKm: number
}

export interface AgencyLaunchCount {
  agency: string
  count: number
}

export interface KpiData {
  title: string
  value: string
  change: string
  isPositive: boolean
}
