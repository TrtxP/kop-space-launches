import type { LaunchMission } from "../../../data/types";
import { formatDateTime } from "../../../data/format";
import { NO_DATA } from "../../../data/constants";
import { Link } from "react-router";

interface MissionFilteredListProps {
  missions: LaunchMission[];
}

function MissionFilteredList({ missions }: MissionFilteredListProps) {
  return (
    <ul className="space-y-1 max-h-96 overflow-y-auto">
      {missions.map((mission) => (
        <li key={mission.id}>
          <Link
            to={`/launch/${encodeURIComponent(mission.id)}`}
            className="block w-full rounded-lg border p-2.5 text-left
              border-slate-200 dark:border-slate-800
              bg-white dark:bg-slate-900
              hover:border-blue-500
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
        </li>
      ))}
    </ul>
  );
}

export default MissionFilteredList;
