import { useState } from 'react'

interface TelemetryToggleProps {
  missionName: string
  orbitAltitudeKm: number
}

function TelemetryToggle({ missionName, orbitAltitudeKm }: TelemetryToggleProps) {
  const [isMiles, setIsMiles] = useState<boolean>(false)

  const handleToggle = () => {
    setIsMiles(prev => !prev)
  }

  const altitude = isMiles ? Math.round(orbitAltitudeKm * 0.621371) : orbitAltitudeKm

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
      <h2 className="font-semibold mb-2">Телеметрія орбіти</h2>
      <p className="text-sm text-slate-500">{missionName}</p>
      <p className="text-3xl my-3">
        {altitude} {isMiles ? 'миль' : 'км'}
      </p>
      <button className="border border-slate-300 rounded-lg px-3 py-1" onClick={handleToggle}>
        {isMiles ? 'Показати в км' : 'Показати в милях'}
      </button>
      {isMiles && <p className="text-sm text-slate-500 mt-2">Значення перераховано з кілометрів</p>}
    </div>
  )
}

export default TelemetryToggle
