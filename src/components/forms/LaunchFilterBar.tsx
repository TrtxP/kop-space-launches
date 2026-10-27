import { Controller, type Control } from "react-hook-form"
import type { AgencyOption, LaunchQuery } from "../../data/types"
import { ALL_AGENCIES_OPTION } from "../../api/launchFilters";

interface LaunchFilterBarProps {
  control: Control<LaunchQuery>
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
const formClass = "flex flex-wrap items-end gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-sm"
const buttonClass = "border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
const fieldStatusClass = "text-xs font-normal text-slate-500 dark:text-slate-400"

function LaunchFilterBar({
    control,
    onReset,
    agencies,
    agenciesLoading,
    agenciesError,
    canRetryAgencies,
    onRetryAgencies,
}: LaunchFilterBarProps) {
    const agencyOptions = [ALL_AGENCIES_OPTION, ...agencies]

    return (
        <form role="search" onSubmit={e => e.preventDefault()} className={formClass}>
            <Controller
                name="search"
                control={control}
                render={({ field: { value, onChange, onBlur, name, ref } }) => (
                    <label className={`${labelClass} grow`}>
                        Пошук за назвою
                        <input
                            ref={ref}
                            name={name}
                            type="search"
                            placeholder="Напр., Starlink"
                            className={fieldClass}
                            value={value}
                            onChange={e => onChange(e.target.value)}
                            onBlur={onBlur}
                        />
                    </label>
                )}
            />

            <Controller
                name="agencyId"
                control={control}
                render={({ field: { value, onChange, onBlur, name, ref } }) => (
                    <label className={`${labelClass} w-full sm:w-auto sm:max-w-xs`}>
                        Агенція
                        <select
                            ref={ref}
                            name={name}
                            className={fieldClass}
                            value={value ?? ""}
                            onChange={e => onChange(e.target.value)}
                            onBlur={onBlur}
                        >
                            {agencyOptions.map(a => (
                                <option key={a.id || 'all'} value={a.id}>{a.name}</option>
                            ))}
                        </select>
                        {agenciesLoading && (
                            <span className={fieldStatusClass} role="status">Завантаження агенцій…</span>
                        )}
                        {agenciesError !== null && (
                            <span className="text-xs font-normal text-rose-600 dark:text-rose-400" role="alert">
                                {agenciesError}{' '}
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
                )}
            />

            <Controller
                name="ordering"
                control={control}
                render={({ field: { value, onChange, onBlur, name, ref } }) => (
                    <label className={labelClass}>
                        Сортування
                        <select
                            ref={ref}
                            name={name}
                            className={fieldClass}
                            value={value ?? "-net"}
                            onChange={e => onChange(e.target.value === 'net' ? 'net' : '-net')}
                            onBlur={onBlur}
                        >
                            <option value="-net">Спочатку нові</option>
                            <option value="net">Спочатку старі</option>
                        </select>
                    </label>
                )}
            />

            <button type="button" onClick={onReset} className={buttonClass}>Скинути фільтри</button>
        </form>
    )
}

export default LaunchFilterBar