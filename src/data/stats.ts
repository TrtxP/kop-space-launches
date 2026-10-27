import { SUCCESS_STATUS_ID } from './constants';
import type { AgencyLaunchCount, LaunchMission } from './types'

export function countSuccessfulLaunches(missions: LaunchMission[]): number {
  return missions.filter(mission => mission.statusId === SUCCESS_STATUS_ID).length
}

export function countLaunchesByAgency(missions: LaunchMission[]): AgencyLaunchCount[] {
  // Групування за стабільним ID агенції; назва береться з першої місії групи
  const counts = new Map<string, AgencyLaunchCount>()
  for (const mission of missions) {
    const entry = counts.get(mission.agencyId)
    if (entry) entry.count += 1
    else counts.set(mission.agencyId, { agencyId: mission.agencyId, agency: mission.agency, count: 1 })
  }

  return [...counts.values()]
    .sort((a, b) => b.count - a.count || a.agency.localeCompare(b.agency, 'uk') || a.agencyId.localeCompare(b.agencyId))
}

