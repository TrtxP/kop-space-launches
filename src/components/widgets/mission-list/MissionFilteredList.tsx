import type { LaunchMission } from "../../../data/types"
import { formatDateTime } from "../../../data/format"
import { NO_DATA } from "../../../data/constants"
import { Link } from "react-router"
import FavoriteButton from "../../ui/FavoriteButton"

interface MissionFilteredListProps {
  missions: LaunchMission[]
}

function MissionFilteredList({ missions }: MissionFilteredListProps) {
  return (
    <ul className="space-y-3 max-h-96 overflow-y-auto">
      {missions.map((mission) => (
        <li
          key={mission.id}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-start rounded-lg border
            border-slate-200 bg-white transition-colors hover:border-blue-500
            focus-within:border-blue-500 dark:border-slate-800 dark:bg-slate-900
            dark:hover:border-blue-500 dark:focus-within:border-blue-500"
        >
          <Link
            to={`/launch/${encodeURIComponent(mission.id)}`}
            className="block min-w-0 rounded-lg p-2.5 text-left wrap-break-word
              focus-visible:outline-2 focus-visible:outline-blue-500"
          >
            <span className="block font-medium text-slate-900 dark:text-slate-100">
              {mission.name}
            </span>
            <span className="block text-sm text-slate-500 dark:text-slate-400">
              {formatDateTime(mission.net)}
              {mission.isDateTentative && " (дата орієнтовна)"}
            </span>
            <span className="block text-sm text-slate-500 dark:text-slate-400">
              {mission.agency}
            </span>
            <span className="block text-sm text-slate-500 dark:text-slate-400">
              Ракета: {mission.rocket ?? NO_DATA}
            </span>
            <span className="block text-sm text-slate-500 dark:text-slate-400">
              Статус: {mission.status ?? NO_DATA}
            </span>
          </Link>

          <div className="mt-2.5 mr-2.5">
            <FavoriteButton id={mission.id} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default MissionFilteredList
