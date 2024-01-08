import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ApplicationGamepadInput } from "../models/controls";

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
        port: 'keyboard',
        input: 'w',
    },
    directionDown: {
        port: 'keyboard',
        input: 's',
    },
    directionLeft: {
        port: 'keyboard',
        input: 'a',
    },
    directionRight: {
        port: 'keyboard',
        input: 'd',
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

export const selectInputMappingDirectionUp = (state: RootState) => state.inputMapping.directionUp;
export const selectInputMappingDirectionDown = (state: RootState) => state.inputMapping.directionDown;
export const selectInputMappingDirectionLeft = (state: RootState) => state.inputMapping.directionLeft;
export const selectInputMappingDirectionRight = (state: RootState) => state.inputMapping.directionRight;
export const selectInputMappingPunch1 = (state: RootState) => state.inputMapping.punch1;
export const selectInputMappingPunch2 = (state: RootState) => state.inputMapping.punch2;
export const selectInputMappingPunch3 = (state: RootState) => state.inputMapping.punch3;
export const selectInputMappingKick1 = (state: RootState) => state.inputMapping.kick1;
export const selectInputMappingKick2 = (state: RootState) => state.inputMapping.kick2;
export const selectInputMappingKick3 = (state: RootState) => state.inputMapping.kick3;

export default inputMappingSlice.reducer;
