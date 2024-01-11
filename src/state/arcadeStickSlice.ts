import { selectGamepadByPort } from "./gamepadSlice";
import { ActionMapping } from "./actionInputMappingSlice";
import { selectKeyboardKey } from "./keyboardSlice";
import { RootState } from "./store";

/*
The arcade stick state is not stored as actual state. Instead it is a concept whose state is inferred
by the current gamepads/keyboard states and input to action mappings. We cannot "set" the state of the
arcade stick. Only select it. We're putting these selectors in a file called a slice just for the sake
of consistency.
*/

const getMappedInput = (state: RootState, mapping: ActionMapping | null) => {
    if (mapping === null) return false;
    if (mapping.port === 'keyboard') return selectKeyboardKey(state, mapping.input);
    const gamepad = selectGamepadByPort(state, mapping.port);
    if (gamepad === null) return false;
    if (mapping.input === 'stick-left-left') return gamepad.stickLeftLeft;
    if (mapping.input === 'stick-left-right') return gamepad.stickLeftRight;
    if (mapping.input === 'stick-left-up') return gamepad.stickLeftUp;
    if (mapping.input === 'stick-left-down') return gamepad.stickLeftDown;
    if (mapping.input === 'stick-right-left') return gamepad.stickRightLeft;
    if (mapping.input === 'stick-right-right') return gamepad.stickRightRight;
    if (mapping.input === 'stick-right-up') return gamepad.stickRightUp;
    if (mapping.input === 'stick-right-down') return gamepad.stickRightDown;
    if (mapping.input === 'face-0') return gamepad.face0;
    if (mapping.input === 'face-1') return gamepad.face1;
    if (mapping.input === 'face-2') return gamepad.face2;
    if (mapping.input === 'face-3') return gamepad.face3;
    if (mapping.input === 'bumper-left') return gamepad.bumperLeft;
    if (mapping.input === 'bumper-right') return gamepad.bumperRight;
    if (mapping.input === 'trigger-left') return gamepad.triggerLeft;
    if (mapping.input === 'trigger-right') return gamepad.triggerRight;
    if (mapping.input === 'select') return gamepad.select;
    if (mapping.input === 'start') return gamepad.start;
    if (mapping.input === 'stick-left-button') return gamepad.stickLeftButton;
    if (mapping.input === 'stick-right-button') return gamepad.stickRightButton;
    if (mapping.input === 'pad-up') return gamepad.padUp;
    if (mapping.input === 'pad-down') return gamepad.padDown;
    if (mapping.input === 'pad-left') return gamepad.padLeft;
    if (mapping.input === 'pad-right') return gamepad.padRight;
    return false;
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

export interface ArcadeStickState {
    direction: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
    punch1: boolean,
    punch2: boolean,
    punch3: boolean,
    kick1: boolean,
    kick2: boolean,
    kick3: boolean,
}

export const selectArcadeStickState = (state: RootState): ArcadeStickState => ({
    direction: selectArcadeStickDirection(state),
    punch1: selectArcadeStickPunch1(state),
    punch2: selectArcadeStickPunch2(state),
    punch3: selectArcadeStickPunch3(state),
    kick1: selectArcadeStickKick1(state),
    kick2: selectArcadeStickKick2(state),
    kick3: selectArcadeStickKick3(state),
});
