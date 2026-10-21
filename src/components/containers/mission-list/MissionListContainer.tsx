import { useState, type ChangeEvent } from 'react'
import type { LaunchMission, LoadStatus } from '../../../data/types'
import MissionFilteredList from '../../widgets/mission-list/MissionFilteredList'
import EmptyMessage from "../../ui/EmptyMessage"
import LoadingMessage from "../../ui/LoadingMessage"
import { compareMissions, type SortDirection, type SortField } from "./compareMissions"
import { NO_DATA } from '../../../data/constants'
import ErrorMesage from '../../ui/ErrorMessage'

const ALL_AGENCIES = 'Усі'

interface MissionListContainerProps {
  missions: LaunchMission[]
  status: LoadStatus
}

function MissionListContainer({ missions, status }: MissionListContainerProps) {
  const [selectedAgency, setSelectedAgency] = useState<string>(ALL_AGENCIES)
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null)
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const handleAgencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAgency(e.target.value)
    setSelectedMissionId(null)
  }

  const handleSortFieldChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value === 'name' ? 'name' : 'date')
  }

  const handleDirectionToggle = () => {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
  }

  const handleMissionClick = (id: string) => {
    setSelectedMissionId(id)
  }

  const agencies = [
    ALL_AGENCIES,
    ...[...new Set(missions.map(m => m.agency))].sort((a, b) => a.localeCompare(b, 'uk')),
  ]

  const filteredMissions =
    selectedAgency === ALL_AGENCIES ? missions : missions.filter(m => m.agency === selectedAgency)

  const sortedMissions = [...filteredMissions].sort((a, b) =>
    compareMissions(a, b, sortField, sortDirection),
  )

  const selectedMission = missions.find(m => m.id === selectedMissionId)

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-sm transition-colors">
      <h2 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Місії</h2>
      {status === 'loading' && (
        <LoadingMessage message="Завантаження даних..." />
      )}
      {status === 'error' && (
        <ErrorMesage message="Дані недоступні." />
      )}
      {status === 'ready' && missions.length === 0 && (
        <EmptyMessage message="Запусків від початку року ще не було." />
      )}
      {status === 'ready' && missions.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2 mb-3">
            <select
              aria-label="Фільтр за агенцією"
              className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium max-w-full focus:outline-none focus:ring-1 focus:ring-slate-500"
              value={selectedAgency}
              onChange={handleAgencyChange}
            >
              {agencies.map(agency => (
                <option key={agency} value={agency}>
                  {agency}
                </option>
              ))}
            </select>
            <select
              aria-label="Поле сортування"
              className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-slate-500"
              value={sortField}
              onChange={handleSortFieldChange}
            >
              <option value="date">За датою</option>
              <option value="name">За назвою</option>
            </select>
            <button
              type="button"
              className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono font-medium transition-colors"
              onClick={handleDirectionToggle}
            >
              {sortDirection === 'asc' ? 'За зростанням ↑' : 'За спаданням ↓'}
            </button>
          </div>
          {sortedMissions.length === 0 ? (
            <EmptyMessage message="За цим фільтром місій немає." />
          ) : (
            <MissionFilteredList
              missions={sortedMissions}
              selectedMissionId={selectedMissionId}
              onMissionSelect={handleMissionClick}
            />
          )}
        </>
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
