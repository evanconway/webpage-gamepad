import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ApplicationGamepad {
    id: string,
    stickLeftLeft: boolean,
    stickLeftRight: boolean,
    stickLeftUp: boolean,
    stickLeftDown: boolean,
    stickRightLeft: boolean,
    stickRightRight: boolean,
    stickRightUp: boolean,
    stickRightDown: boolean,
    face0: boolean,
    face1: boolean,
    face2: boolean,
    face3: boolean,
    bumperLeft: boolean,
    bumperRight: boolean,
    triggerLeft: boolean,
    triggerRight: boolean,
    select: boolean,
    start: boolean,
    stickLeftButton: boolean,
    stickRightButton: boolean,
    padUp: boolean,
    padDown: boolean,
    padLeft: boolean,
    padRight: boolean,
}

export type ApplicationGamepads = (ApplicationGamepad | null)[];

const gamepadArray: ApplicationGamepads = [];

const initialState = { gamepadArray };

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
export const selectGamepads = (state: RootState) => state.gamepads.gamepadArray;
export const selectGamepadByPort = (state: RootState, port: 0 | 1 | 2 | 3) => {
    const gp = state.gamepads.gamepadArray[port];
    return gp === undefined ? null : gp;
};

export default gamepadSlice.reducer;
