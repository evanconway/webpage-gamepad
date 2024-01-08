import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ApplicationGamepad {
    buttons: number[],
    axes: number[],
    id: string,
    index: number,
}

export type ApplicationGamepads = (ApplicationGamepad | null)[];

const gamepadArray: ApplicationGamepads = [];

const initialState = {
    gamepadArray,
};

export const gamepadSlice = createSlice({
    name: 'gamepads',
    initialState,
    reducers: {
        setGamepadArray: (state, action: PayloadAction<ApplicationGamepads>) => {
            state.gamepadArray = action.payload;
        },
    },
});

export const { setGamepadArray } = gamepadSlice.actions;
export const selectGamepadByIndex = (state: RootState, index: number) => state.gamepads.gamepadArray[index];

export default gamepadSlice.reducer;
