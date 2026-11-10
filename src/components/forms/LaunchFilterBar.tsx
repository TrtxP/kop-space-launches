import type { AgencyOption } from "../../data/types"
import { ALL_AGENCIES_OPTION } from "../../api/launchFilters"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import {
  setAgencyId,
  setOrdering,
  setSearch,
} from "../../store/slices/filtersSlice"
import { selectFilters } from "../../store/selectors";

interface LaunchFilterBarProps {
  onReset: () => void
  // Довідник агенцій з API (без пункту «Усі»)
  agencies: AgencyOption[]
  agenciesLoading: boolean
  agenciesError: string | null
  canRetryAgencies: boolean
  onRetryAgencies: () => void
}

const fieldClass =
  "border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-500 w-full max-w-full"
const labelClass =
  "flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400 min-w-0 max-w-full"
const formClass =
  "flex flex-wrap items-end gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-sm"
const buttonClass =
  "border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
const fieldStatusClass =
  "text-xs font-normal text-slate-500 dark:text-slate-400"

function LaunchFilterBar({
  onReset,
  agencies,
  agenciesLoading,
  agenciesError,
  canRetryAgencies,
  onRetryAgencies,
}: LaunchFilterBarProps) {
  const dispatch = useAppDispatch()
  const { search, agencyId, ordering } = useAppSelector(selectFilters)
  const agencyOptions = [ALL_AGENCIES_OPTION, ...agencies]

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className={formClass}
    >
      <label className={`${labelClass} grow`}>
        Пошук за назвою
        <input
          name="search"
          type="search"
          placeholder="Напр., Starlink"
          className={fieldClass}
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </label>

      <label className={`${labelClass} w-full sm:w-auto sm:max-w-xs`}>
        Агенція
        <select
          name="agencyId"
          className={fieldClass}
          value={agencyId}
          onChange={(e) => dispatch(setAgencyId(e.target.value))}
        >
          {agencyOptions.map((a) => (
            <option key={a.id || "all"} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        {agenciesLoading && (
          <span className={fieldStatusClass} role="status">
            Завантаження агенцій…
          </span>
        )}
        {agenciesError !== null && (
          <span
            className="text-xs font-normal text-rose-600 dark:text-rose-400"
            role="alert"
          >
            {agenciesError}{" "}
            <button
              type="button"
              className="underline disabled:opacity-40"
              onClick={onRetryAgencies}
              disabled={!canRetryAgencies}
            >
              Повторити
            </button>
          </span>
        )}
      </label>

      <label className={labelClass}>
        Сортування
        <select
          name="ordering"
          className={fieldClass}
          value={ordering}
          onChange={(e) => dispatch(setOrdering(e.target.value === "net" ? "net" : "-net"))}
        >
          <option value="-net">Спочатку нові</option>
          <option value="net">Спочатку старі</option>
        </select>
      </label>

      <button type="button" onClick={onReset} className={buttonClass}>
        Скинути фільтри
      </button>
    </form>
  )
}

export default LaunchFilterBar
