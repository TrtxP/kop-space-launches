const NO_DATA = 'Немає даних'

function toDate(iso: string | null): Date | null {
  if (iso === null) return null
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? null : date
}

const dateFormat = new Intl.DateTimeFormat('uk-UA', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

const timeFormat = new Intl.DateTimeFormat('uk-UA', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'UTC',
  timeZoneName: 'short',
})

const dateTimeFormat = new Intl.DateTimeFormat('uk-UA', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'UTC',
})

export function toTimestamp(iso: string | null): number | null {
  return toDate(iso)?.getTime() ?? null
}

export function formatDate(iso: string | null): string {
  const date = toDate(iso)
  return date ? dateFormat.format(date) : NO_DATA
}

export function formatTime(iso: string | null): string {
  const date = toDate(iso)
  return date ? timeFormat.format(date) : NO_DATA
}

export function formatDateTime(iso: string | null): string {
  const date = toDate(iso)
  return date ? `${dateTimeFormat.format(date)} UTC` : NO_DATA
}

