import { ApplicationGamepad, ApplicationGamepads } from "../state/gamepadSlice";

const gamepadsToApplicationGamepads = (gamepads: (Gamepad | null)[]): ApplicationGamepads => gamepads.map(gp => {
    if (gp === null) return null;
    const result: ApplicationGamepad = {
        buttons: gp.buttons.map(b => b.value),
        axes: [...gp.axes],
        id: gp.id,
        index: gp.index,
    };
    return result;
});

export const getApplicationGamepads = () => {
    return gamepadsToApplicationGamepads(navigator.getGamepads());
};

export const applicationGamepadsEqual = (a: ApplicationGamepads, b: ApplicationGamepads) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        const gpA = a[i];
        const gpB = b[i];
        if (gpA === null && gpB !== null) return false;
        if (gpA !== null && gpB === null) return false;
        if (gpA !== null && gpB !== null) {
            if (gpA.id !== gpB.id) return false;
            if (gpA.index !== gpB.index) return false;
            if (gpA.buttons.length !== gpB.buttons.length) return false;
            if (gpA.axes.length !== gpB.axes.length) return false;
            for (let b = 0; b < gpA.buttons.length; b++) {
                if (gpA.buttons[b] !== gpB.buttons[b]) return false;
            }
            for (let a = 0; a < gpA.axes.length; a++) {
                if (gpA.axes[a] !== gpB.axes[a]) return false;
            }
        }
    }
    return true;
};
