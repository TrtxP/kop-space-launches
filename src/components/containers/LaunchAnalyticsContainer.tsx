import { countLaunchesByAgency } from "../../data/stats"
import type { LaunchMission, LoadStatus } from "../../data/types"
import { setChartType } from "../../store/slices/chartSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { selectTheme, selectChartType } from "../../store/selectors"
import ChartTypeSwitch from "../ui/ChartTypeSwitch"
import EmptyMessage from "../ui/EmptyMessage"
import ErrorMesage from "../ui/ErrorMessage"
import LoadingMessage from "../ui/LoadingMessage"
import LaunchAnalyticsChart from "../widgets/launch-analytics/LaunchAnalyticsChart"

interface LaunchAnalyticsContainerProps {
    missions: LaunchMission[]
    loadedCount: number
    status: LoadStatus
}

function LaunchAnalyticsContainer({ missions, loadedCount, status }: LaunchAnalyticsContainerProps) {
    const dispatch = useAppDispatch()
    const type = useAppSelector(selectChartType)
    const dark = useAppSelector(selectTheme) === 'dark'
    const chartData = countLaunchesByAgency(missions)

    return (
        <section className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-sans">Видимі запуски за агенціями</h2>
                <ChartTypeSwitch value={type} onChange={value => dispatch(setChartType(value))} />
            </div>
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">Від початку року UTC, з урахуванням фільтрів і лімітів планувальника. КРІ вище враховують вибірку до ручних лімітів.</p>

            {status === 'loading' && <LoadingMessage message="Завантажння статистики..." />}
            {status === 'error' && <ErrorMesage message="статистики недоступна." />}
            {status === 'ready' && chartData.length === 0 && (
                <EmptyMessage message={loadedCount === 0 ? 'За вибраними фільтрами запусків не знайдено.' : 'Усі місії приховано. Відновість ліміти планувальника.'} />
            )}
            {status === 'ready' && chartData.length > 0 && (
                <>
                    <LaunchAnalyticsChart data={chartData} type={type} dark={dark} />
                    <div className="mt-4 max-h-48 overflow-y-auto">
                        <table className="w-full text-left text-sm">
                            <caption className="sr-only">Кількість видимих місій за агенціями</caption>
                            <thead>
                                <tr><th scope="col">Агенція</th><th scope="col" className="text-right">Місії</th></tr>
                            </thead>
                            <tbody>
                                {chartData.map(row => (
                                    <tr key={row.agencyId}>
                                        <th scope="row" className="py-1 pr-3 font-normal wrap-anywhere">{row.agency}</th>
                                        <td className="text-right tabular-nums">{row.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-2 text-sm">Усього видимих місій: {missions.length}</p>
                </>
            )}
        </section>
    )
}

export default LaunchAnalyticsContainer