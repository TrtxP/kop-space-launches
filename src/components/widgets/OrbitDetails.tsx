import { NO_DATA } from '../../data/constants'
import type { LaunchMission } from '../../data/types'

interface OrbitDetailsProps {
  mission: LaunchMission
}

function OrbitDetails({ mission }: OrbitDetailsProps) {
  return (
    <>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 break-words">{mission.name}</p>
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-slate-500 dark:text-slate-400">Назва орбіти</dt>
          <dd className="font-medium text-slate-800 dark:text-slate-200 break-words">{mission.orbitName ?? NO_DATA}</dd>
        </div>
        <div>
          <dt className="text-slate-500 dark:text-slate-400">Позначення</dt>
          <dd className="font-medium text-slate-800 dark:text-slate-200">{mission.orbitAbbrev ?? NO_DATA }</dd>
        </div>
        <div>
          <dt className="text-slate-500 dark:text-slate-400">Небесне тіло</dt>
          <dd className="font-medium text-slate-800 dark:text-slate-200">{mission.celestialBody ?? NO_DATA }</dd>
        </div>
      </dl>
    </>
  )
}

export default OrbitDetails
