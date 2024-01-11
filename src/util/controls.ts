import { ActionMapping, ActionMappingPort } from "../state/actionInputMappingSlice";
import { ApplicationGamepad, ApplicationGamepads } from "../state/gamepadSlice";

const AXIS_DEADZONE = 0.4;

const isXboxGamepad = (gp: Gamepad) => gp.id.toLowerCase().startsWith('xbox');

export const gamepadIsSupported = (gp: Gamepad) => {
    let result = false;
    if (isXboxGamepad(gp)) result = true;
    return result;
};

const applicationGamepadsEqual = (a: ApplicationGamepad | null, b: ApplicationGamepad | null) => {
    if (a === null && b === null) return true;
    if (a === null && b !== null) return false;
    if (a !== null && b === null) return false;
    const aButtonValues = a === null ? [] : Object.entries(a);
    const bButtonValues = b === null ? [] : Object.entries(b);
    for (let i = 0; i < aButtonValues.length; i++) {
        if (aButtonValues[i][0] !== bButtonValues[i][0]) return false;
        if (aButtonValues[i][1] !== bButtonValues[i][1]) return false;
    }
    return true;
};

export const applicationGamepadArraysEqual = (a: (ApplicationGamepad | null)[], b: (ApplicationGamepad | null)[]) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (!applicationGamepadsEqual(a[i], b[i])) return false;
    }
    return true;
};

export const getApplicationGamepadsFromNavigatorGamepads = () => {
    return navigator.getGamepads().map(gp => {
        if (gp === null) return null;
        const result: ApplicationGamepad = {
            id: gp.id,
            stickLeftLeft: gp.axes.length > 0 && gp.axes[0] < AXIS_DEADZONE * -1,
            stickLeftRight: gp.axes.length > 0 && gp.axes[0] > AXIS_DEADZONE,
            stickLeftUp: gp.axes.length > 1 && gp.axes[1] < AXIS_DEADZONE * -1,
            stickLeftDown: gp.axes.length > 1 && gp.axes[1] > AXIS_DEADZONE,
            stickRightLeft: gp.axes.length > 2 && gp.axes[2] < AXIS_DEADZONE * -1,
            stickRightRight: gp.axes.length > 2 && gp.axes[2] > AXIS_DEADZONE,
            stickRightUp: gp.axes.length > 3 && gp.axes[3] < AXIS_DEADZONE * -1,
            stickRightDown: gp.axes.length > 3 && gp.axes[3] > AXIS_DEADZONE,
            face0: gp.buttons.length > 0 && gp.buttons[0].value > 0,
            face1: gp.buttons.length > 1 && gp.buttons[1].value > 0,
            face2: gp.buttons.length > 2 && gp.buttons[2].value > 0,
            face3: gp.buttons.length > 3 && gp.buttons[3].value > 0,
            bumperLeft: gp.buttons.length > 4 && gp.buttons[4].value > 0,
            bumperRight: gp.buttons.length > 5 && gp.buttons[5].value > 0,
            triggerLeft: gp.buttons.length > 6 && gp.buttons[6].value > 0,
            triggerRight: gp.buttons.length > 7 && gp.buttons[7].value > 0,
            select: gp.buttons.length > 8 && gp.buttons[8].value > 0,
            start: gp.buttons.length > 9 && gp.buttons[9].value > 0,
            stickLeftButton: gp.buttons.length > 10 && gp.buttons[10].value > 0,
            stickRightButton: gp.buttons.length > 11 && gp.buttons[11].value > 0,
            padUp: gp.buttons.length > 12 && gp.buttons[12].value > 0,
            padDown: gp.buttons.length > 13 && gp.buttons[13].value > 0,
            padLeft: gp.buttons.length > 14 && gp.buttons[14].value > 0,
            padRight: gp.buttons.length > 15 && gp.buttons[15].value > 0,
        };

        if (isXboxGamepad(gp)) {
            result.stickLeftLeft = gp.axes[0] < AXIS_DEADZONE * -1;
            result.stickLeftRight = gp.axes[0] > AXIS_DEADZONE;
            result.stickLeftUp = gp.axes[1] < AXIS_DEADZONE * -1;
            result.stickLeftDown = gp.axes[1] > AXIS_DEADZONE;
            result.stickRightLeft = gp.axes[2] < AXIS_DEADZONE * -1;
            result.stickRightRight = gp.axes[2] > AXIS_DEADZONE;
            result.stickRightUp = gp.axes[3] < AXIS_DEADZONE * -1;
            result.stickRightDown = gp.axes[3] > AXIS_DEADZONE;
            result.face0 = gp.buttons[0].value > 0;
            result.face1 = gp.buttons[1].value > 0;
            result.face2 = gp.buttons[2].value > 0;
            result.face3 = gp.buttons[3].value > 0;
            result.bumperLeft = gp.buttons[4].value > 0;
            result.bumperRight = gp.buttons[5].value > 0;
            result.triggerLeft = gp.buttons[6].value > 0;
            result.triggerRight = gp.buttons[7].value > 0;
            result.select = gp.buttons[8].value > 0;
            result.start = gp.buttons[9].value > 0;
            result.stickLeftButton = gp.buttons[10].value > 0;
            result.stickRightButton = gp.buttons[11].value > 0;
            result.padUp = gp.buttons[12].value > 0;
            result.padDown = gp.buttons[13].value > 0;
            result.padLeft = gp.buttons[14].value > 0;
            result.padRight = gp.buttons[15].value > 0;
        }

        return result;
    });
};

export const getNewKeyboardOn = (keyboardOld: Record<string, boolean>, keyboardNew: Record<string, boolean>) => {
    const keys = Object.keys(keyboardNew);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = keyboardNew[key];
        if (value === true && keyboardOld[key] !== true) return key;
    }
    return null;
};

export const getNewGamepadOn = (gamepadsOld: ApplicationGamepads, gamepadsNew: ApplicationGamepads): ActionMapping | null => {
    for (let g = 0; g < gamepadsNew.length; g++) {
        const gpOld = gamepadsOld[g];
        const gpNew = gamepadsNew[g];
        if (gpNew?.stickLeftLeft && ! gpOld?.stickLeftLeft) return { input: 'stick-left-left', port: g as ActionMappingPort };
        if (gpNew?.stickLeftRight && ! gpOld?.stickLeftRight) return { input: 'stick-left-right', port: g as ActionMappingPort };
        if (gpNew?.stickLeftUp && ! gpOld?.stickLeftUp) return { input: 'stick-left-up', port: g as ActionMappingPort };
        if (gpNew?.stickLeftDown && ! gpOld?.stickLeftDown) return { input: 'stick-left-down', port: g as ActionMappingPort };
        if (gpNew?.stickRightLeft && ! gpOld?.stickRightLeft) return { input: 'stick-right-left', port: g as ActionMappingPort };
        if (gpNew?.stickRightRight && ! gpOld?.stickRightRight) return { input: 'stick-right-right', port: g as ActionMappingPort };
        if (gpNew?.stickRightUp && ! gpOld?.stickRightUp) return { input: 'stick-right-up', port: g as ActionMappingPort };
        if (gpNew?.stickRightDown && ! gpOld?.stickRightDown) return { input: 'stick-right-down', port: g as ActionMappingPort };
        if (gpNew?.face0 && ! gpOld?.face0) return { input: 'face-0', port: g as ActionMappingPort };
        if (gpNew?.face1 && ! gpOld?.face1) return { input: 'face-1', port: g as ActionMappingPort };
        if (gpNew?.face2 && ! gpOld?.face2) return { input: 'face-2', port: g as ActionMappingPort };
        if (gpNew?.face3 && ! gpOld?.face3) return { input: 'face-3', port: g as ActionMappingPort };
        if (gpNew?.bumperLeft && ! gpOld?.bumperLeft) return { input: 'bumper-left', port: g as ActionMappingPort };
        if (gpNew?.bumperRight && ! gpOld?.bumperRight) return { input: 'bumper-right', port: g as ActionMappingPort };
        if (gpNew?.triggerLeft && ! gpOld?.triggerLeft) return { input: 'trigger-left', port: g as ActionMappingPort };
        if (gpNew?.triggerRight && ! gpOld?.triggerRight) return { input: 'trigger-right', port: g as ActionMappingPort };
        if (gpNew?.select && ! gpOld?.select) return { input: 'select', port: g as ActionMappingPort };
        if (gpNew?.start && ! gpOld?.start) return { input: 'start', port: g as ActionMappingPort };
        if (gpNew?.stickLeftButton && ! gpOld?.stickLeftButton) return { input: 'stick-left-button', port: g as ActionMappingPort };
        if (gpNew?.stickRightButton && ! gpOld?.stickRightButton) return { input: 'stick-right-button', port: g as ActionMappingPort };
        if (gpNew?.padUp && !gpOld?.padUp) return { input: 'pad-up', port: g as ActionMappingPort };
        if (gpNew?.padDown && !gpOld?.padDown) return { input: 'pad-down', port: g as ActionMappingPort };
        if (gpNew?.padLeft && !gpOld?.padLeft) return { input: 'pad-left', port: g as ActionMappingPort };
        if (gpNew?.padRight && !gpOld?.padRight) return { input: 'pad-right', port: g as ActionMappingPort };
    }
    return null;
};
