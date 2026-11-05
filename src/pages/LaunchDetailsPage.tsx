import { Link, useParams } from "react-router"
import EmptyMessage from "../components/ui/EmptyMessage"
import ErrorNotice from "../components/ui/ErrorNotice"
import LoadingMessage from "../components/ui/LoadingMessage"
import { NO_DATA } from "../data/constants"
import { formatDateTime } from "../data/format"
import { useLaunchDetails } from "../hooks/useLaunchDetails"
import FavoriteButton from "../components/ui/FavoriteButton"

const UUID_PATTRN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function LaunchDetails({ id }: { id: string }) {
  const {
    data: launch,
    loading,
    error,
    retry,
    canRetry,
  } = useLaunchDetails(id)

  if (loading) {
    return <LoadingMessage message="Завантаження деталей запуску..." />
  }

  if (error !== null) {
    return (
      <ErrorNotice message={error} onRetry={retry} retryDisabled={!canRetry} />
    )
  }

  if (launch === null) {
    return <EmptyMessage message="Запуск не знайдено." />
  }

  const fields: Array<[string, string | null]> = [
    [
      "Дата й час",
      `${formatDateTime(launch.net)}${launch.isDateTentative ? " (дата орієнтована)" : ""}`,
    ],
    ["Агенція", launch.agency],
    ["Ракета", launch.rocket],
    ["Статус", launch.status],
    ["Майданчик", launch.pad],
    ["Орбіта", launch.orbitName],
    ["Позначення орбіти", launch.orbitAbbrev],
    ["Небесне тіло", launch.celestialBody],
  ]

  return (
    <article
      className="rounded-lg border p-4
      border-slate-200 dark:border-slate-800
      bg-white dark:bg-slate-900"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="min-w-0 text-xl font-semibold wrap-break-word">{launch.name}</h3>
        <FavoriteButton id={launch.id} />
      </div>

      <dl className="grid gap-4 sm:grid-cols-2">
        {fields.map(([label, value]) => (
          <div key={label}>
            <dt className="text-sm text-slate-500 dark:text-slate-400">
              {label}
            </dt>
            <dd className="wrap-break-word font-medium">{value ?? NO_DATA}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

function LaunchDetailsPage() {
  const { id } = useParams<"id">()

  return (
    <section className="space-y-4">
      <Link
        to="/"
        className="inline-block underline
          focus-visible:outline-2 focus-visible:outline-blue-500"
      >
        ← Назад до головної
      </Link>

      <h2 className="text-2xl font-bold">Деталі запуску</h2>

      {id && UUID_PATTRN.test(id) ? (
        <LaunchDetails key={id} id={id} />
      ) : (
        <EmptyMessage message="Запуск не знайдено." />
      )}
    </section>
  )
}

export default LaunchDetailsPage
