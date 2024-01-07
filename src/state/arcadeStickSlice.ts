import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ArcadeStickState {
    direction: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
    punch1: boolean,
    punch2: boolean,
    punch3: boolean,
    kick1: boolean,
    kick2: boolean,
    kick3: boolean,
}

const initialState: ArcadeStickState = {
    direction: 5,
    punch1: false,
    punch2: false,
    punch3: false,
    kick1: false,
    kick2: false,
    kick3: false,
};

export const arcadeStickSlice = createSlice({
    name: 'arcadeStick',
    initialState,
    reducers: {
        setArcadeStick: (state, action: PayloadAction<ArcadeStickState>) => {
            state.direction = action.payload.direction;
            state.punch1 = action.payload.punch1;
            state.punch2 = action.payload.punch2;
            state.punch3 = action.payload.punch3;
            state.kick1 = action.payload.kick1;
            state.kick2 = action.payload.kick2;
            state.kick3 = action.payload.kick3;
        },
    },
});

export default arcadeStickSlice.reducer;
