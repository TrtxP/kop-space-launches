import { formatDate, formatTime } from "./format";
import { countSuccessfulLaunches } from "./stats";
import type { KpiData, LaunchMission, LoadStatus } from "./types";

const YEAR_CAPTION = 'Від початку року (UTC)'

export function getKpiCards(
  status: LoadStatus,
  launches: LaunchMission[],
  nextLaunch: LaunchMission | null,
): KpiData[] {
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
        caption: 'Запланованих запусків не знайдено',
        isPositive: true,
      },
    {
      title: 'Запуски цьогоріч',
      value: String(launches.length),
      caption: YEAR_CAPTION,
      isPositive: true,
    },
    {
      title: 'Успішні старти',
      value: String(countSuccessfulLaunches(launches)),
      caption: YEAR_CAPTION,
      isPositive: true,
    },
  ]
}