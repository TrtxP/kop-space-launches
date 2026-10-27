import { useState } from 'react'
import type { LaunchMission, LoadStatus } from '../../../data/types'
import MissionFilteredList from '../../widgets/mission-list/MissionFilteredList'
import EmptyMessage from "../../ui/EmptyMessage"
import LoadingMessage from "../../ui/LoadingMessage"
import { NO_DATA } from '../../../data/constants'
import ErrorMesage from '../../ui/ErrorMessage'

interface MissionListContainerProps {
  // Видимі місії з урахуванням ручних лімітів планувальника 
  missions: LaunchMission[]
  // Кількість місій у завантаженій API-вибірці
  loadedCount: number
  status: LoadStatus
}

function MissionListContainer({ missions, loadedCount, status }: MissionListContainerProps) {
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null)

  // Прихована місія не знаходиться серед видимих, тому її деталі й виділення не показуються
  const selectedMission = missions.find(m => m.id === selectedMissionId) ?? null
  const activeMissionId = selectedMission?.id ?? null

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
              selectedMissionId={activeMissionId}
              onMissionSelect={setSelectedMissionId}
            />
      )}
      {status === 'ready' && selectedMission && (
        <div className="mt-3 border-t border-slate-200 dark:border-slate-800 pt-3 text-sm space-y-1 text-slate-700 dark:text-slate-300">
          <p>Ракета: {selectedMission.rocket ?? NO_DATA}</p>
          <p>Майданчик: {selectedMission.pad ?? NO_DATA}</p>
          <p>Статус: {selectedMission.status ?? NO_DATA}</p>
        </div>
      )}
    </div>
  )
}

export default MissionListContainer
