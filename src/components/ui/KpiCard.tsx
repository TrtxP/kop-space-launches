interface KpiCardProps {
  title: string
  value: string
  caption: string
  isPositive: boolean
}

function KpiCard({ title, value, caption, isPositive }: KpiCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-sm transition-colors">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight my-1">{value}</p>
      <p className={isPositive ? 'text-sm font-medium text-emerald-600 dark:text-emerald-400' : 'text-sm font-medium text-rose-600 dark:text-rose-400'}>
        {caption}
      </p>
    </div>
  )
}

export default KpiCard
