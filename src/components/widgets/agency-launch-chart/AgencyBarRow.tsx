interface AgencyBarRowProps {
  agency: string
  count: number
  maxCount: number
  onIncrement: () => void
  onDecrement: () => void
  onReset: () => void
  isModified?: boolean
}

function AgencyBarRow({
  agency,
  count,
  maxCount,
  onIncrement,
  onDecrement,
  onReset,
  isModified = false,
}: AgencyBarRowProps) {
  const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0
  const buttonClass =
    'border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded px-2.5 py-0.5 text-xs font-mono font-medium hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent transition-colors'

  return (
    <div className="border-b border-slate-100 dark:border-slate-800 pb-2 last:border-b-0 last:pb-0">
      <div className="flex justify-between items-center text-sm mb-1">
        <span className="font-medium text-slate-700 dark:text-slate-300">{agency}</span>
        <span className="font-semibold text-slate-800 dark:text-slate-100 font-mono">{count}</span>
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded h-2 mb-2 overflow-hidden">
        <div
          className="bg-blue-600 dark:bg-blue-500 h-2 rounded transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className={buttonClass}
          onClick={onIncrement}
          aria-label={`Збільшити кількість запусків для ${agency}`}
        >
          +
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={onDecrement}
          disabled={count <= 0}
          aria-label={`Зменшити кількість запусків для ${agency}`}
        >
          −
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={onReset}
          disabled={!isModified}
          aria-label={`Скинути кількість запусків для ${agency}`}
        >
          Скинути
        </button>
      </div>
    </div>
  )
}

export default AgencyBarRow
