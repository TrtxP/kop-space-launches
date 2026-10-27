import { formatDate, formatTime } from "./format"
import { countSuccessfulLaunches } from "./stats"
import type { DashboardData, KpiData, LoadStatus } from "./types"

export function getKpiCards(
  status: LoadStatus,
  data: DashboardData | null,
  hasActiveFilters: boolean
): KpiData[] {

  const yearAction = hasActiveFilters ? 'Запуски за вибраними фільтрами від початку року (UTC)' : 'Від початку року (UTC)'

  if (status !== 'ready') {
    const placeholder = status === 'loading' ? '…' : '—'
    const caption = status === 'loading' ? 'Завантаження…' : 'Дані недоступні'
    const isPositive = status === 'loading'
    return [
      { title: 'Найближчий запуск', value: placeholder, caption, isPositive },
      { title: 'Запуски цьогоріч', value: placeholder, caption, isPositive },
      { title: 'Успішні старти', value: placeholder, caption, isPositive },
    ]
  }

  const launches = data?.launches ?? []
  const nextLaunch = data?.nextLaunch ?? null

  return [
    nextLaunch
      ? {
        title: 'Найближчий запуск',
        value: formatDate(nextLaunch.net),
        caption: `${formatTime(nextLaunch.net)} · ${nextLaunch.name}${nextLaunch.isDateTentative ? ' (дата орієнтовна)' : ''}`,
        isPositive: true,
      }
      : {
        title: 'Найближчий запуск',
        value: 'Немає даних',
        caption: hasActiveFilters ? 'Запланованих запусків за вибраними фільтрами не знайдено' : 'Запланованих запусків не знайдено',
        isPositive: true,
      },
    {
      title: 'Запуски цьогоріч',
      value: String(launches.length),
      caption: yearAction,
      isPositive: true,
    },
    {
      title: 'Успішні старти',
      value: String(countSuccessfulLaunches(launches)),
      caption: yearAction,
      isPositive: true,
    },
  ]
}