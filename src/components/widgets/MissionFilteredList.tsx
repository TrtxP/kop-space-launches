import { useState } from 'react'
import type { LaunchMission } from '../../data/api'

interface MissionFilteredListProps {
  missions: LaunchMission[]
}

function MissionFilteredList({ missions }: MissionFilteredListProps) {
  const [selectedAgency, setSelectedAgency] = useState<string>('Усі')
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null)

  const handleAgencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAgency(e.target.value)
    setSelectedMissionId(null)
  }

  const handleMissionClick = (id: string) => {
    setSelectedMissionId(id)
  }

  const agencies: Set<string> = new Set(['Усі'].concat(missions.map(m => m.agency)))

  const filteredMissions =
    selectedAgency === 'Усі' ? missions : missions.filter(m => m.agency === selectedAgency)

  const selectedMission = missions.find(m => m.id === selectedMissionId)

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
      <h2 className="font-semibold mb-2">Місії</h2>
      <select
        className="border border-slate-300 rounded-lg px-2 py-1 mb-3"
        value={selectedAgency}
        onChange={handleAgencyChange}
      >
        {[...agencies].map(agency => (
          <option key={agency} value={agency}>{agency}</option>
        ))}
      </select>
      <ul className="space-y-1">
        {filteredMissions.map(mission => (
          <li key={mission.id}>
            <button
              className="w-full text-left border border-slate-200 rounded-lg p-2"
              onClick={() => handleMissionClick(mission.id)}
            >
              {mission.name}
            </button>
          </li>
        ))}
      </ul>
      {selectedMission && (
        <div className="mt-3 border-t border-slate-200 pt-3 text-sm">
          <p>Ракета: {selectedMission.rocket}</p>
          <p>Майданчик: {selectedMission.pad}</p>
          <p>Статус: {selectedMission.status}</p>
        </div>
      )}
    </div>
  )
}

export default MissionFilteredList
