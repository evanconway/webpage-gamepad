import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type ApplicationGamepadInput = 
    'stick-left-left' |
    'stick-left-right' |
    'stick-left-up' |
    'stick-left-down' |
    'stick-right-left' |
    'stick-right-right' |
    'stick-right-up' |
    'stick-right-down' |
    'face-0' |
    'face-1' |
    'face-2' |
    'face-3' |
    'bumper-left' |
    'bumper-right' |
    'trigger-left' |
    'trigger-right' |
    'select' |
    'start' |
    'stick-left-button' |
    'stick-right-button' |
    'pad-up' |
    'pad-down' |
    'pad-left' |
    'pad-right';

export interface ActionMapping {
    port: 0 | 1 | 2 | 3 | 'keyboard',
    input: ApplicationGamepadInput | string,
}

interface InitialState {
    directionUp: ActionMapping | null,
    directionDown: ActionMapping | null,
    directionLeft: ActionMapping | null,
    directionRight: ActionMapping | null,
    punch1: ActionMapping | null,
    punch2: ActionMapping | null,
    punch3: ActionMapping | null,
    kick1: ActionMapping | null,
    kick2: ActionMapping | null,
    kick3: ActionMapping | null,
}

const initialState: InitialState = {
    directionUp: {
        port: 0,
        input: 'stick-left-up',
    },
    directionDown: {
        port: 0,
        input: 'stick-left-down',
    },
    directionLeft: {
        port: 0,
        input: 'stick-left-left',
    },
    directionRight: {
        port: 0,
        input: 'stick-left-right',
    },
    punch1: {
        port: 'keyboard',
        input: 'u',
    },
    punch2: {
        port: 'keyboard',
        input: 'i',
    },
    punch3: {
        port: 'keyboard',
        input: 'o',
    },
    kick1: {
        port: 'keyboard',
        input: 'j',
    },
    kick2: {
        port: 'keyboard',
        input: 'k',
    },
    kick3: {
        port: 'keyboard',
        input: 'l',
    },
}

export const inputMappingSlice = createSlice({
    name: 'input-mappings',
    initialState,
    reducers: {
        setActionDirectionUp: (state, action: PayloadAction<ActionMapping>) => {
            state.directionUp = action.payload;
        },
        setActionDirectionDown: (state, action: PayloadAction<ActionMapping>) => {
            state.directionDown = action.payload;
        },
        setActionDirectionLeft: (state, action: PayloadAction<ActionMapping>) => {
            state.directionLeft = action.payload;
        },
        setActionDirectionRight: (state, action: PayloadAction<ActionMapping>) => {
            state.directionRight = action.payload;
        },
        setActionPunch1: (state, action: PayloadAction<ActionMapping>) => {
            state.punch1 = action.payload;
        },
        setActionPunch2: (state, action: PayloadAction<ActionMapping>) => {
            state.punch2 = action.payload;
        },
        setActionPunch3: (state, action: PayloadAction<ActionMapping>) => {
            state.punch3 = action.payload;
        },
        setActionKick1: (state, action: PayloadAction<ActionMapping>) => {
            state.kick1 = action.payload;
        },
        setActionKick2: (state, action: PayloadAction<ActionMapping>) => {
            state.kick2 = action.payload;
        },
        setActionKick3: (state, action: PayloadAction<ActionMapping>) => {
            state.kick3 = action.payload;
        },
    },
});

export const {
    setActionDirectionUp,
    setActionDirectionDown,
    setActionDirectionLeft,
    setActionDirectionRight,
    setActionPunch1,
    setActionPunch2,
    setActionPunch3,
    setActionKick1,
    setActionKick2,
    setActionKick3,
} = inputMappingSlice.actions;

export const selectInputMappings = (state: RootState) => state.inputMapping;

export default inputMappingSlice.reducer;
