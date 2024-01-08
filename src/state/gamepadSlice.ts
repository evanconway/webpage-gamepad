import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ApplicationGamepadInput, ApplicationGamepad, getApplicationGamepadInput } from "../models/controls";

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
export const selectGamepadInput = (state: RootState, port: 0 | 1 | 2 | 3, input: ApplicationGamepadInput) => {
    const gp = state.gamepads.gamepadArray[port];
    if (gp === undefined) return false;
    return getApplicationGamepadInput(gp, input);
};

export default gamepadSlice.reducer;
