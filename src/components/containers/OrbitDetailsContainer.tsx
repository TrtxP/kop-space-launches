import type { LaunchMission, LoadStatus } from '../../data/types'
import LoadingMessage from '../ui/LoadingMessage'
import EmptyNotice from '../ui/EmptyMessage'
import OrbitDetails from '../widgets/OrbitDetails'
import ErrorMesage from '../ui/ErrorMessage';

interface OrbitDetailsContainerProps {
  mission: LaunchMission | null
  status: LoadStatus
}

function OrbitDetailsContainer({ mission, status }: OrbitDetailsContainerProps) {

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-sm self-start min-w-0 transition-colors">
      {status === 'loading' && <LoadingMessage message="Завантаження даних орбіти…" />}
      {status === 'error' && (
        <ErrorMesage message="Дані орбіти недоступні." />
      )}
      {status === 'ready' && mission === null && (
        <EmptyNotice message="Запланованих запусків не знайдено." />
      )}
      {status === 'ready' && mission !== null && (
        <OrbitDetails mission={mission} />
      )}
    </div>
  )
}

export default OrbitDetailsContainer
