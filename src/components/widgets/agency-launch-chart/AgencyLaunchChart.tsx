import type { AgencyLaunchCount, LoadStatus } from '../../../data/types'
import AgencyLaunchChartContainer from '../../containers/agency-launch-chart/AgencyLaunchChartContainer';

interface AgencyLaunchChartProps {
  data: AgencyLaunchCount[]
  status: LoadStatus
}

function AgencyLaunchChart({ data, status }: AgencyLaunchChartProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-sm transition-colors">
      <h2 className="font-semibold mb-1 text-slate-900 dark:text-slate-100">
        Планувальник запусків за агенціями
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
        Оператори запусків від початку року (UTC).
      </p>
      <AgencyLaunchChartContainer data={data} status={status} />
    </div>
  )
}

export default AgencyLaunchChart
