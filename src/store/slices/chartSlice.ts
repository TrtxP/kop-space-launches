import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

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
export default chartSlice.reducer