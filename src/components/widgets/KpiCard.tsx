interface KpiCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
}

function KpiCard({ title, value, change, isPositive }: KpiCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-semibold text-slate-800">{value}</p>
      <p className={isPositive ? 'text-sm text-green-600' : 'text-sm text-red-600'}>
        {change}
      </p>
    </div>
  )
}

export default KpiCard
