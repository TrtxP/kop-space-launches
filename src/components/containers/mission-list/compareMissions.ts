import { toTimestamp } from "../../../data/format";
import type { LaunchMission } from "../../../data/types";

export type SortField = 'name' | 'date'
export type SortDirection = 'asc' | 'desc'

export function compareMissions(
  a: LaunchMission,
  b: LaunchMission,
  field: SortField,
  direction: SortDirection,
): number {
  const sign = direction === 'asc' ? 1 : -1

  if (field === 'name') {
    return sign * a.name.localeCompare(b.name, 'uk')
  }

  const timeA = toTimestamp(a.net)
  const timeB = toTimestamp(b.net)
  if (timeA === null && timeB === null) return 0
  if (timeA === null) return 1
  if (timeB === null) return -1
  return sign * (timeA - timeB)
}