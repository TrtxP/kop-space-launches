export type LoadStatus = 'loading' | 'error' | 'ready'

export interface LaunchMission {
  id: string
  name: string
  agency: string
  rocket: string | null
  agencyId: string
  pad: string | null
  status: string | null
  statusId: number | null
  net: string | null
  isDateTentative: boolean
  orbitName: string | null
  orbitAbbrev: string | null
  celestialBody: string | null
}

export interface AgencyPlannerRow {
  agencyId: string
  agency: string
  count: number
  total: number
  isModified: boolean
}

export interface AgencyLaunchCount {
  agencyId: string
  agency: string
  count: number
}

export interface KpiData {
  title: string
  value: string
  caption: string
  isPositive: boolean
}

export interface DashboardData {
    launches: LaunchMission[]
    nextLaunch: LaunchMission | null
    year: number
}

export interface AgencyOption {
  id: string
  name: string
}

export interface LaunchQuery {
  search: string
  agencyId: string
  ordering: '-net' | 'net'
}