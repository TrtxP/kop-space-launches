import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"

export type ChartType = 'bar' | 'pie'
interface ChartState { type: ChartType }
const initialState: ChartState = { type: 'bar' }

const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        setChartType(state, action: PayloadAction<ChartType>) {
            state.type = action.payload
        },
    },
})

export const { setChartType } = chartSlice.actions
export const selectChartType = (state: RootState) => state.chart.type
export default chartSlice.reducer