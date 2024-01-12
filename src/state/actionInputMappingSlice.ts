import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
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

export type ActionMappingPort = 0 | 1 | 2 | 3 | 'keyboard';

export interface ActionMapping {
    port: ActionMappingPort,
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

export const actionInputMappingSlice = createSlice({
    name: 'action-input-mappings',
    initialState,
    reducers: {
        unbindActionInput: (state, action: PayloadAction<ActionMapping>) => {
            const { input, port } = action.payload;
            if (state.directionUp?.port === port && state.directionUp?.input === input) state.directionUp = null;
            if (state.directionDown?.port === port && state.directionDown?.input === input) state.directionDown = null;
            if (state.directionLeft?.port === port && state.directionLeft?.input === input) state.directionLeft = null;
            if (state.directionRight?.port === port && state.directionRight?.input === input) state.directionRight = null;
            if (state.punch1?.port === port && state.punch1?.input === input) state.punch1 = null;
            if (state.punch2?.port === port && state.punch2?.input === input) state.punch2 = null;
            if (state.punch3?.port === port && state.punch3?.input === input) state.punch3 = null;
            if (state.kick1?.port === port && state.kick1?.input === input) state.kick1 = null;
            if (state.kick2?.port === port && state.kick2?.input === input) state.kick2 = null;
            if (state.kick3?.port === port && state.kick3?.input === input) state.kick3 = null;
        },
        _setActionDirectionUp: (state, action: PayloadAction<ActionMapping>) => {
            state.directionUp = action.payload;
        },
        _setActionDirectionDown: (state, action: PayloadAction<ActionMapping>) => {
            state.directionDown = action.payload;
        },
        _setActionDirectionLeft: (state, action: PayloadAction<ActionMapping>) => {
            state.directionLeft = action.payload;
        },
        _setActionDirectionRight: (state, action: PayloadAction<ActionMapping>) => {
            state.directionRight = action.payload;
        },
        _setActionPunch1: (state, action: PayloadAction<ActionMapping>) => {
            state.punch1 = action.payload;
        },
        _setActionPunch2: (state, action: PayloadAction<ActionMapping>) => {
            state.punch2 = action.payload;
        },
        _setActionPunch3: (state, action: PayloadAction<ActionMapping>) => {
            state.punch3 = action.payload;
        },
        _setActionKick1: (state, action: PayloadAction<ActionMapping>) => {
            state.kick1 = action.payload;
        },
        _setActionKick2: (state, action: PayloadAction<ActionMapping>) => {
            state.kick2 = action.payload;
        },
        _setActionKick3: (state, action: PayloadAction<ActionMapping>) => {
            state.kick3 = action.payload;
        },
    },
});

export const {
    unbindActionInput,
} = actionInputMappingSlice.actions;

const {
    _setActionDirectionUp,
    _setActionDirectionDown,
    _setActionDirectionLeft,
    _setActionDirectionRight,
    _setActionPunch1,
    _setActionPunch2,
    _setActionPunch3,
    _setActionKick1,
    _setActionKick2,
    _setActionKick3,
} = actionInputMappingSlice.actions;

// multi actions
export const setActionDirectionUp = (mapping: ActionMapping) => {
    return (dispatch: Dispatch) => {
        dispatch(unbindActionInput(mapping));
        dispatch(_setActionDirectionUp(mapping));
    };
};

export const setActionDirectionDown = (mapping: ActionMapping) => {
    return (dispatch: Dispatch) => {
        dispatch(unbindActionInput(mapping));
        dispatch(_setActionDirectionDown(mapping));
    };
};

export const setActionDirectionLeft = (mapping: ActionMapping) => {
    return (dispatch: Dispatch) => {
        dispatch(unbindActionInput(mapping));
        dispatch(_setActionDirectionLeft(mapping));
    };
};

export const setActionDirectionRight = (mapping: ActionMapping) => {
    return (dispatch: Dispatch) => {
        dispatch(unbindActionInput(mapping));
        dispatch(_setActionDirectionRight(mapping));
    };
};

export const setActionPunch1 = (mapping: ActionMapping) => {
    return (dispatch: Dispatch) => {
        dispatch(unbindActionInput(mapping));
        dispatch(_setActionPunch1(mapping));
    };
};
export const setActionPunch2 = (mapping: ActionMapping) => {
    return (dispatch: Dispatch) => {
        dispatch(unbindActionInput(mapping));
        dispatch(_setActionPunch2(mapping));
    };
};
export const setActionPunch3 = (mapping: ActionMapping) => {
    return (dispatch: Dispatch) => {
        dispatch(unbindActionInput(mapping));
        dispatch(_setActionPunch3(mapping));
    };
};

export const setActionKick1 = (mapping: ActionMapping) => {
    return (dispatch: Dispatch) => {
        dispatch(unbindActionInput(mapping));
        dispatch(_setActionKick1(mapping));
    };
};
export const setActionKick2 = (mapping: ActionMapping) => {
    return (dispatch: Dispatch) => {
        dispatch(unbindActionInput(mapping));
        dispatch(_setActionKick2(mapping));
    };
};
export const setActionKick3 = (mapping: ActionMapping) => {
    return (dispatch: Dispatch) => {
        dispatch(unbindActionInput(mapping));
        dispatch(_setActionKick3(mapping));
    };
};

export const selectActionInputMappings = (state: RootState) => state.inputMapping;

export default actionInputMappingSlice.reducer;
