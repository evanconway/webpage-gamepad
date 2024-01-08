import { ApplicationGamepadInput } from "../models/controls";
import { selectGamepadInput } from "./gamepadSlice";
import { ActionMapping } from "./inputMappingSlice";
import { selectKeyboardKey } from "./keyboardSlice";
import { RootState } from "./store";

/*
The arcade stick state is not stored as actual state. Instead it is a concept whose state is inferred
by the current gamepads/keyboard states and input to action mappings. We cannot "set" the state of the
arcade stick. Only select it. We're putting these selectors in a file called a slice just for the sake
of consistency.
*/

const getMappedInput = (state: RootState, mapping: ActionMapping | null) => {
    return mapping === null ? false :
        mapping.port === 'keyboard' ?
            selectKeyboardKey(state, mapping.input)
            :
            selectGamepadInput(state, mapping.port, mapping.input as ApplicationGamepadInput);
};

export const selectArcadeStickDirection = (state: RootState) => {
    const up = getMappedInput(state, state.inputMapping.directionUp);
    const down = getMappedInput(state, state.inputMapping.directionDown);
    const left = getMappedInput(state, state.inputMapping.directionLeft);
    const right = getMappedInput(state, state.inputMapping.directionRight);

    const vertical = (up ? -1 : 0) + (down ? 1 : 0);
    const horizontal = (left ? -1 : 0) + (right ? 1 : 0);

    // return numpad notation
    if (vertical === 1 && horizontal === -1) return 1;
    if (vertical === 1 && horizontal === 0) return 2;
    if (vertical === 1 && horizontal === 1) return 3;
    if (vertical === 0 && horizontal === -1) return 4;
    if (vertical === 0 && horizontal === 0) return 5;
    if (vertical === 0 && horizontal === 1) return 6;
    if (vertical === -1 && horizontal === -1) return 7;
    if (vertical === -1 && horizontal === 0) return 8;
    if (vertical === -1 && horizontal === 1) return 9;
    return 5;
};

export const selectArcadeStickPunch1 = (state: RootState) => getMappedInput(state, state.inputMapping.punch1);
export const selectArcadeStickPunch2 = (state: RootState) => getMappedInput(state, state.inputMapping.punch2);
export const selectArcadeStickPunch3 = (state: RootState) => getMappedInput(state, state.inputMapping.punch3);
export const selectArcadeStickKick1 = (state: RootState) => getMappedInput(state, state.inputMapping.kick1);
export const selectArcadeStickKick2 = (state: RootState) => getMappedInput(state, state.inputMapping.kick2);
export const selectArcadeStickKick3 = (state: RootState) => getMappedInput(state, state.inputMapping.kick3);
