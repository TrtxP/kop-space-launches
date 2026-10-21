import { useState } from "react";
import type { AgencyLaunchCount, LoadStatus } from "../../../data/types";
import EmptyMessage from "../../ui/EmptyMessage";
import ErrorMesage from "../../ui/ErrorMessage";
import LoadingMessage from "../../ui/LoadingMessage";
import AgencyBarRow from "../../widgets/agency-launch-chart/AgencyBarRow";

interface AgencyLaunchChartContainerProps {
    data: AgencyLaunchCount[]
    status: LoadStatus
}

function AgencyLaunchChartContainer({ data, status }: AgencyLaunchChartContainerProps) {
  const [overrides, setOverrides] = useState<Record<string, number>>({})

  const handleIncrement = (agency: string, defaultCount: number) => {
    setOverrides(prev => {
      const nextCount = (prev[agency] ?? defaultCount) + 1
      if (nextCount === defaultCount) {
        const next = { ...prev }
        delete next[agency]
        return next
      }
      return { ...prev, [agency]: nextCount }
    })
  }

  const handleDecrement = (agency: string, defaultCount: number) => {
    setOverrides(prev => {
      const current = prev[agency] ?? defaultCount
      if (current <= 0) return prev
      const nextCount = current - 1
      if (nextCount === defaultCount) {
        const next = { ...prev }
        delete next[agency]
        return next
      }
      return { ...prev, [agency]: nextCount }
    })
  }

  const handleReset = (agency: string) => {
    setOverrides(prev => {
      if (!(agency in prev)) return prev
      const next = { ...prev }
      delete next[agency]
      return next
    })
  }

  const rows = data.map(item => {
    const defaultCount = item.count
    const currentCount = overrides[item.agency] ?? defaultCount
    const isModified = currentCount !== defaultCount
    return {
      agency: item.agency,
      count: currentCount,
      defaultCount,
      isModified,
    }
  })

  const maxCount = Math.max(...rows.map(row => row.count), 0)

  return (
    <>
      {status === 'loading' && (
        <LoadingMessage message="Завантаження даних..." />
      )}
      {status === 'error' && (
        <ErrorMesage message="Дані недоступні." />
      )}
      {status === 'ready' && data.length === 0 && (
        <EmptyMessage message="Запусків від початку року ще не було." />
      )}
      {status === 'ready' && data.length > 0 && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {rows.map(row => (
            <AgencyBarRow
              key={row.agency}
              agency={row.agency}
              count={row.count}
              maxCount={maxCount}
              isModified={row.isModified}
              onIncrement={() => handleIncrement(row.agency, row.defaultCount)}
              onDecrement={() => handleDecrement(row.agency, row.defaultCount)}
              onReset={() => handleReset(row.agency)}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default AgencyLaunchChartContainer