import { useState } from 'react'
import type { AgencyLaunchCount } from '../../data/api'
import AgencyBarRow from './AgencyBarRow'

interface AgencyLaunchChartProps {
  data: AgencyLaunchCount[]
}

function AgencyLaunchChart({ data }: AgencyLaunchChartProps) {
  const [counts, setCounts] = useState<AgencyLaunchCount[]>(data)

  const handleIncrement = (agency: string) => {
    setCounts(prev =>
      prev.map(row =>
        row.agency === agency ? { ...row, count: row.count + 1 } : row
      )
    )
  }

  const handleDecrement = (agency: string) => {
    setCounts(prev =>
      prev.map(row =>
        row.agency === agency ? { ...row, count: row.count > 0 ? row.count - 1 : 0 } : row
      )
    )
  }

  const handleReset = (agency: string) => {
    const initial = data.find(row => row.agency === agency)
    if (!initial) return

    setCounts(prev =>
      prev.map(row =>
        row.agency === agency ? { ...row, count: initial.count } : row
      )
    )
  }

  const maxCount = Math.max(...counts.map(row => row.count), 0)

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
      <h2 className="font-semibold mb-3">Планувальник запусків за агенціями</h2>
      <div className="space-y-3">
        {counts.map(row => (
          <AgencyBarRow
            key={row.agency}
            agency={row.agency}
            count={row.count}
            maxCount={maxCount}
            onIncrement={() => handleIncrement(row.agency)}
            onDecrement={() => handleDecrement(row.agency)}
            onReset={() => handleReset(row.agency)}
          />
        ))}
      </div>
    </div>
  )
}

export default AgencyLaunchChart
