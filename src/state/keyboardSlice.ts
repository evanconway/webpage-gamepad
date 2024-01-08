import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: Record<string, boolean> = {};

export const keyboardSlice = createSlice({
    name: 'keyboard',
    initialState,
    reducers: {
        setKeyboardKey: (state, action: PayloadAction<{ key: string, down: boolean }>) => {
            state[action.payload.key] = action.payload.down;
        },
    },
});

export const { setKeyboardKey } = keyboardSlice.actions;
export const selectKeyboardKey = (state: RootState, key: string) => state.keyboard[key];
export const selectKeyboardAll = (state: RootState) => state.keyboard;

export default keyboardSlice.reducer;
