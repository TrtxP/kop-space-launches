import { SUCCESS_STATUS_ID } from './constants';
import type { AgencyLaunchCount, LaunchMission } from './types'

export function countSuccessfulLaunches(missions: LaunchMission[]): number {
  return missions.filter(mission => mission.statusId === SUCCESS_STATUS_ID).length
}

export function countLaunchesByAgency(missions: LaunchMission[]): AgencyLaunchCount[] {
  const counts = new Map<string, number>()
  for (const mission of missions) {
    counts.set(mission.agency, (counts.get(mission.agency) ?? 0) + 1)
  }

  return [...counts.entries()]
    .map(([agency, count]) => ({ agency, count }))
    .sort((a, b) => b.count - a.count || a.agency.localeCompare(b.agency, 'uk'))
}

