import {
  Bar,
  BarChart,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { AgencyLaunchCount } from "../../../data/types"
import type { ChartType } from "../../../store/slices/chartSlice"

interface LaunchAnalyticsChartProps {
  data: AgencyLaunchCount[]
  type: ChartType
  dark: boolean
}

const COLORS = [
  "#3b82f6",
  "#14b8a6",
  "#f59e0b",
  "#a855f7",
  "#f43f5e",
  "#0ea5e9",
]

function LaunchAnalyticsChart({ data, type, dark }: LaunchAnalyticsChartProps) {
  const textColor = dark ? "#cbd5e1" : "#475569"
  const tooltipStyle = {
    backgroundColor: dark ? "#0f172a" : "#ffffff",
    borderColor: dark ? "#334155" : "#cbd5e1",
    color: textColor,
  }
  const chartData = data.map((row, index) => ({
    ...row,
    fill: COLORS[index % COLORS.length],
  }))

  return (
    <div className="h-80 min-w-0">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        {type === "bar" ? (
          <BarChart
            data={chartData}
            margin={{ top: 12, right: 16, bottom: 8, left: 0 }}
          >
            <XAxis dataKey="agency" hide />
            <YAxis allowDecimals={false} tick={{ fill: textColor }} />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: textColor }}
            />
            <Bar dataKey="count" name="Місії" fill="#3b82f6" />
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="agency"
              outerRadius="65"
              label
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend
              height={64}
              wrapperStyle={{ overflow: "auto" }}
              formatter={(value) => (
                <span style={{ color: textColor }}>{value}</span>
              )}
            />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

export default LaunchAnalyticsChart
