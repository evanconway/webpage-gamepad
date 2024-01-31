import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ArcadeStickState, Direction } from "./arcadeStickSlice";

const MaxTrackedStates = 25;

interface ArcadeButton {
    down: boolean,
    pressed: boolean,
}

export interface ArcadeStickHistoryState {
    timeMs: number,
    direction: {
        direction: Direction,
        pressed: boolean,
    },
    punch1: ArcadeButton,
    punch2: ArcadeButton,
    punch3: ArcadeButton,
    kick1: ArcadeButton,
    kick2: ArcadeButton,
    kick3: ArcadeButton,
}

const initialState: ArcadeStickHistoryState[] = [];

export const arcadeStickHistorySlice = createSlice({
    name: 'arcade-stick-history',
    initialState,
    reducers: {
        addArcadeStickState: (state, action: PayloadAction<ArcadeStickState>) => {
            const newHistoryState: ArcadeStickHistoryState = {
                timeMs: Date.now(),
                direction: {
                    direction: action.payload.direction,
                    pressed: false,
                },
                punch1: { down: action.payload.punch1, pressed: false },
                punch2: { down: action.payload.punch2, pressed: false },
                punch3: { down: action.payload.punch3, pressed: false },
                kick1: { down: action.payload.kick1, pressed: false },
                kick2: { down: action.payload.kick2, pressed: false },
                kick3: { down: action.payload.kick3, pressed: false },
            };

            if (state.length > 0) {
                const prev = state[0];
                if (newHistoryState.direction.direction !== prev.direction.direction) newHistoryState.direction.pressed = true;
                if (newHistoryState.punch1.down && !prev.punch1.down) newHistoryState.punch1.pressed = true;
                if (newHistoryState.punch2.down && !prev.punch2.down) newHistoryState.punch2.pressed = true;
                if (newHistoryState.punch3.down && !prev.punch3.down) newHistoryState.punch3.pressed = true;
                if (newHistoryState.kick1.down && !prev.kick1.down) newHistoryState.kick1.pressed = true;
                if (newHistoryState.kick2.down && !prev.kick2.down) newHistoryState.kick2.pressed = true;
                if (newHistoryState.kick3.down && !prev.kick3.down) newHistoryState.kick3.pressed = true;
            }

            state.unshift(newHistoryState);
            if (state.length > MaxTrackedStates) state.pop();
        },
    },
});

export const { addArcadeStickState } = arcadeStickHistorySlice.actions;

export const selectArcadeStickHistory = (state: RootState) => state.arcadeStickHistory;

export default arcadeStickHistorySlice.reducer;
