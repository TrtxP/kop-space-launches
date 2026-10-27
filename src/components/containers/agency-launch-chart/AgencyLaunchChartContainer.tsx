import type { AgencyPlannerRow, LoadStatus } from "../../../data/types";
import EmptyMessage from "../../ui/EmptyMessage";
import ErrorMesage from "../../ui/ErrorMessage";
import LoadingMessage from "../../ui/LoadingMessage";
import AgencyBarRow from "../../widgets/agency-launch-chart/AgencyBarRow";

interface AgencyLaunchChartContainerProps {
    rows: AgencyPlannerRow[]
    status: LoadStatus
    onIncrement: (agencyId: string) => void
    onDecrement: (agencyId: string) => void
    onReset: (agencyId: string) => void
}

function AgencyLaunchChartContainer({ rows, status, onIncrement, onDecrement, onReset }: AgencyLaunchChartContainerProps) {
  // Шкала рахується від поточних видимих кількостей
  const maxCount = Math.max(0, ...rows.map(row => row.count))
  const allHidden = rows.length > 0 && maxCount === 0

  return (
    <>
      {status === 'loading' && (
        <LoadingMessage message="Завантаження даних..." />
      )}
      {status === 'error' && (
        <ErrorMesage message="Дані недоступні." />
      )}
      {status === 'ready' && rows.length === 0 && (
        <EmptyMessage message="За вибраними фільтрами запусків не знайдено." />
      )}
      {status === 'ready' && allHidden && (
        <EmptyMessage message="Усі місії приховано. Відновіть їх кнопками планувальника." />
      )}
      {status === 'ready' && rows.length > 0 && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {rows.map(row => (
            <AgencyBarRow
              key={row.agencyId}
              agency={row.agency}
              count={row.count}
              total={row.total}
              maxCount={maxCount}
              isModified={row.isModified}
              onIncrement={() => onIncrement(row.agencyId)}
              onDecrement={() => onDecrement(row.agencyId)}
              onReset={() => onReset(row.agencyId)}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default AgencyLaunchChartContainer
