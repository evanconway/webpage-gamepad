import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ApplicationGamepad {
    buttons: readonly number[],
    axes: readonly number[],
    id: string,
    index: number,
}

const initialState: (ApplicationGamepad | null)[] = [];

export const gamepadSlice = createSlice({
    name: 'arcadeStick',
    initialState,
    reducers: {
        setGamepadArray: (state, action: PayloadAction<(Gamepad | null)[]>) => {
            state = action.payload.map(gp => {
                if (gp === null) return null;
                return {
                    axes: [...gp.axes],
                    buttons: gp.buttons.map(button => button.value),
                    id: gp.id,
                    index: gp.index,
                };
            });
        },
    },
});

export const { setGamepadArray } = gamepadSlice.actions;
export const selectGamepadByIndex = (state: RootState, index: number) => state.gamepads[index];

export default gamepadSlice.reducer;
