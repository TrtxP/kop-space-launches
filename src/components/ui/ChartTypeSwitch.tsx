import type { ChartType } from "../../store/chartSlice"
import barIncon from "../../../assets/mdi-chart-bar.svg"
import pieIcon from "../../../assets/game-icons-pie-chart.svg"

interface ChartTypeSwitchProps {
  value: ChartType
  onChange: (type: ChartType) => void
}

function ChartTypeSwitch({ value, onChange }: ChartTypeSwitchProps) {
  return (
    <label className="flex items-center gap-2 text-sm">
      Тип графіка
      <img
        src={value === "bar" ? barIncon : pieIcon}
        alt=""
        aria-hidden="true"
        className="h-5 w-5 dark:invert"
      />
      <select
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
        value={value}
        onChange={(e) => onChange(e.target.value === "pie" ? "pie" : "bar")}
      >
        <option value="bar">
          <span className="font-sans">Стовпчиковий</span>
        </option>
        <option value="pie">
          <span className="font-sans">Круговий</span>
        </option>
      </select>
    </label>
  )
}

export default ChartTypeSwitch
