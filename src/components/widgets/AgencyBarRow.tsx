interface AgencyBarRowProps {
  agency: string
  count: number
  maxCount: number
  onIncrement: () => void
  onDecrement: () => void
  onReset: () => void
}

function AgencyBarRow({
  agency,
  count,
  maxCount,
  onIncrement,
  onDecrement,
  onReset,
}: AgencyBarRowProps) {
  const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0

  return (
    <div className="border-b border-slate-100 pb-2 last:border-b-0 last:pb-0">
      <div className="flex justify-between items-center text-sm mb-1">
        <span className="font-medium text-slate-700">{agency}</span>
        <span className="font-semibold text-slate-800">{count}</span>
      </div>
      <div className="w-full bg-slate-100 rounded h-2 mb-2">
        <div
          className="bg-blue-500 h-2 rounded"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex gap-2">
        <button
          className="border border-slate-300 rounded px-2 py-0.5 text-xs hover:bg-slate-50"
          onClick={onIncrement}
        >
          +
        </button>
        <button
          className="border border-slate-300 rounded px-2 py-0.5 text-xs hover:bg-slate-50"
          onClick={onDecrement}
        >
          −
        </button>
        <button
          className="border border-slate-300 rounded px-2 py-0.5 text-xs hover:bg-slate-50"
          onClick={onReset}
        >
          Скинути
        </button>
      </div>
    </div>
  )
}

export default AgencyBarRow
