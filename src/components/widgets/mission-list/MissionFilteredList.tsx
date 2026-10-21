import type { LaunchMission } from '../../../data/types'
import { formatDateTime } from '../../../data/format'
import { NO_DATA } from '../../../data/constants'

interface MissionFilteredListProps {
  missions: LaunchMission[]
  selectedMissionId: string | null
  onMissionSelect: (id: string) => void
}

function MissionFilteredList({
  missions,
  selectedMissionId,
  onMissionSelect,
}: MissionFilteredListProps) {
  return (
    <ul className="space-y-1 max-h-96 overflow-y-auto">
      {missions.map(mission => (
        <li key={mission.id}>
          <button
            type="button"
            className={
              mission.id === selectedMissionId
                ? 'w-full text-left border-2 border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-950/40 rounded-lg p-2.5 transition-colors'
                : 'w-full text-left border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 rounded-lg p-2.5 transition-colors'
            }
            onClick={() => onMissionSelect(mission.id)}
          >
            <span className="block font-medium text-slate-900 dark:text-slate-100">{mission.name}</span>
            <span className="block text-sm text-slate-500 dark:text-slate-400">
              {formatDateTime(mission.net)}
              {mission.isDateTentative && ' (дата орієнтовна)'}
            </span>
            <span className="block text-sm text-slate-500 dark:text-slate-400">{mission.agency}</span>
            <span className="block text-sm text-slate-500 dark:text-slate-400">
              Ракета: {mission.rocket ?? NO_DATA}
            </span>
            <span className="block text-sm text-slate-500 dark:text-slate-400">
              Статус: {mission.status ?? NO_DATA}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default MissionFilteredList
