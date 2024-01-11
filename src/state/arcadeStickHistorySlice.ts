import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ArcadeStickState } from "./arcadeStickSlice";

const MaxTrackedStates = 10;

const initialState: ArcadeStickState[] = [];

export const arcadeStickHistorySlice = createSlice({
    name: 'arcade-stick-history',
    initialState,
    reducers: {
        addArcadeStickState: (state, action: PayloadAction<ArcadeStickState>) => {
            state.unshift(action.payload);
            if (state.length > MaxTrackedStates) state.pop();
        },
    },
});

export const { addArcadeStickState } = arcadeStickHistorySlice.actions;

export const selectArcadeStickHistory = (state: RootState) => state.arcadeStickHistory;

export default arcadeStickHistorySlice.reducer;
