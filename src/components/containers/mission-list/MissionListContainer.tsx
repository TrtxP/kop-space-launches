import type { LaunchMission, LoadStatus } from '../../../data/types'
import MissionFilteredList from '../../widgets/mission-list/MissionFilteredList'
import EmptyMessage from "../../ui/EmptyMessage"
import LoadingMessage from "../../ui/LoadingMessage"
import ErrorMesage from '../../ui/ErrorMessage'

interface MissionListContainerProps {
  missions: LaunchMission[]
  loadedCount: number
  status: LoadStatus
}

function MissionListContainer({ missions, loadedCount, status }: MissionListContainerProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-sm transition-colors">
      <h2 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Місії</h2>
      {status === 'loading' && (
        <LoadingMessage message="Завантаження даних..." />
      )}
      {status === 'error' && (
        <ErrorMesage message="Дані недоступні." />
      )}
      {status === 'ready' && loadedCount === 0 && (
        <EmptyMessage message="За вибраними фільтрами запусків не знайдено." />
      )}
      {status === 'ready' && loadedCount > 0 && missions.length === 0 && (
        <EmptyMessage message="Усі місії приховано. Відновіть їх кнопками планувальника." />
      )}
      {status === 'ready' && missions.length > 0 && (
            <MissionFilteredList
              missions={missions}
            />
      )}
    </div>
  )
}

export default MissionListContainer
