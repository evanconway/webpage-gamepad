import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ArcadeStickState } from "./arcadeStickSlice";

const MaxTrackedStates = 25;

export interface ArcadeStickStateTimed extends ArcadeStickState {
    timeMs: number,
}

const initialState: ArcadeStickStateTimed[] = [];

export const arcadeStickHistorySlice = createSlice({
    name: 'arcade-stick-history',
    initialState,
    reducers: {
        addArcadeStickState: (state, action: PayloadAction<ArcadeStickState>) => {
            state.unshift({...action.payload, timeMs: Date.now() });
            if (state.length > MaxTrackedStates) state.pop();
        },
    },
});

export const { addArcadeStickState } = arcadeStickHistorySlice.actions;

export const selectArcadeStickHistory = (state: RootState) => state.arcadeStickHistory;

export default arcadeStickHistorySlice.reducer;
