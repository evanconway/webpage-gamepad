import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ApplicationGamepad {
    buttons: number[],
    axes: number[],
    id: string,
    index: number,
}

export type ApplicationGamepads = (ApplicationGamepad | null)[];

export const userSlice = createSlice({
    name: 'gamepads',
    initialState: {
        useKeyboard: true,
    },
    reducers: {
        setUseKeyboard: (state, action: PayloadAction<boolean>) => {
            state.useKeyboard = action.payload;
        },
    },
});

export const { setUseKeyboard } = userSlice.actions;
export const selectUseKeyboard = (state: RootState) => state.user.useKeyboard;

export default userSlice.reducer;
