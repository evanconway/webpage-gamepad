const AXIS_DEADZONE = 0.4;

export interface ApplicationGamepad {
    buttons: number[],
    axes: number[],
    id: string,
    index: number,
}

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

export const GAMEPAD_INPUTS: ApplicationGamepadInput[] = [
    'stick-left-left',
    'stick-left-right',
    'stick-left-up',
    'stick-left-down',
    'stick-right-left',
    'stick-right-right',
    'stick-right-up',
    'stick-right-down',
    'face-0',
    'face-1',
    'face-2',
    'face-3',
    'bumper-left',
    'bumper-right',
    'trigger-left',
    'trigger-right',
    'select',
    'start',
    'stick-left-button',
    'stick-right-button',
    'pad-up',
    'pad-down',
    'pad-left',
    'pad-right',
];

const isXboxGamepad = (gp: ApplicationGamepad) => gp.id.toLowerCase().startsWith('xbox');

export const gamepadIsSupported = (gp: ApplicationGamepad) => {
    let result = false;
    if (isXboxGamepad(gp)) result = true;
    return result;
};

export const getApplicationGamepadInput = (gp: ApplicationGamepad | null, input: ApplicationGamepadInput) => {
    if (gp === null) return false;
    // xbox
    if (isXboxGamepad(gp)) {
        if (input === 'stick-left-left') return gp.axes[0] < AXIS_DEADZONE * -1;
        if (input === 'stick-left-right') return gp.axes[0] > AXIS_DEADZONE;
        if (input === 'stick-left-up') return gp.axes[1] < AXIS_DEADZONE * -1;
        if (input === 'stick-left-down') return gp.axes[1] > AXIS_DEADZONE;
        if (input === 'stick-right-left') return gp.axes[2] < AXIS_DEADZONE * -1;
        if (input === 'stick-right-right') return gp.axes[2] > AXIS_DEADZONE;
        if (input === 'stick-right-up') return gp.axes[3] < AXIS_DEADZONE * -1;
        if (input === 'stick-right-down') return gp.axes[3] > AXIS_DEADZONE;
        if (input === 'face-0') return gp.buttons[0] > 0;
        if (input === 'face-1') return gp.buttons[1] > 0;
        if (input === 'face-2') return gp.buttons[2] > 0;
        if (input === 'face-3') return gp.buttons[3] > 0;
        if (input === 'bumper-left') return gp.buttons[4] > 0;
        if (input === 'bumper-right') return gp.buttons[5] > 0;
        if (input === 'trigger-left') return gp.buttons[6] > 0;
        if (input === 'trigger-right') return gp.buttons[7] > 0;
        if (input === 'select') return gp.buttons[8] > 0;
        if (input === 'start') return gp.buttons[9] > 0;
        if (input === 'stick-left-button') return gp.buttons[10] > 0;
        if (input === 'stick-right-button') return gp.buttons[11] > 0;
        if (input === 'pad-up') return gp.buttons[12] > 0;
        if (input === 'pad-down') return gp.buttons[13] > 0;
        if (input === 'pad-left') return gp.buttons[14] > 0;
        if (input === 'pad-right') return gp.buttons[15] > 0;
        return false;
    }

    // unknown
    if (input === 'stick-left-left') return gp.axes.length > 0 && gp.axes[0] < AXIS_DEADZONE * -1;
    if (input === 'stick-left-right') return gp.axes.length > 0 && gp.axes[0] > AXIS_DEADZONE;
    if (input === 'stick-left-up') return gp.axes.length > 1 && gp.axes[1] < AXIS_DEADZONE * -1;
    if (input === 'stick-left-down') return gp.axes.length > 1 && gp.axes[1] > AXIS_DEADZONE;
    if (input === 'stick-right-left') return gp.axes.length > 2 && gp.axes[2] < AXIS_DEADZONE * -1;
    if (input === 'stick-right-right') return gp.axes.length > 2 && gp.axes[2] > AXIS_DEADZONE;
    if (input === 'stick-right-up') return gp.axes.length > 3 && gp.axes[3] < AXIS_DEADZONE * -1;
    if (input === 'stick-right-down') return gp.axes.length > 3 && gp.axes[3] > AXIS_DEADZONE;
    if (input === 'face-0') return gp.buttons.length > 0 && gp.buttons[0] > 0;
    if (input === 'face-1') return gp.buttons.length > 1 && gp.buttons[1] > 0;
    if (input === 'face-2') return gp.buttons.length > 2 && gp.buttons[2] > 0;
    if (input === 'face-3') return gp.buttons.length > 3 && gp.buttons[3] > 0;
    if (input === 'bumper-left') return gp.buttons.length > 4 && gp.buttons[4] > 0;
    if (input === 'bumper-right') return gp.buttons.length > 5 && gp.buttons[5] > 0;
    if (input === 'trigger-left') return gp.buttons.length > 6 && gp.buttons[6] > 0;
    if (input === 'trigger-right') return gp.buttons.length > 7 && gp.buttons[7] > 0;
    if (input === 'select') return gp.buttons.length > 8 && gp.buttons[8] > 0;
    if (input === 'start') return gp.buttons.length > 9 && gp.buttons[9] > 0;
    if (input === 'stick-left-button') return gp.buttons.length > 10 && gp.buttons[10] > 0;
    if (input === 'stick-right-button') return gp.buttons.length > 11 && gp.buttons[11] > 0;
    if (input === 'pad-up') return gp.buttons.length > 12 && gp.buttons[12] > 0;
    if (input === 'pad-down') return gp.buttons.length > 13 && gp.buttons[13] > 0;
    if (input === 'pad-left') return gp.buttons.length > 14 && gp.buttons[14] > 0;
    if (input === 'pad-right') return gp.buttons.length > 15 && gp.buttons[15] > 0;
    return false;
};
