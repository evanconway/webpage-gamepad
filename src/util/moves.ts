import { ArcadeStickState, Direction } from "../state/arcadeStickSlice";

const arcadeStickStatesEqual = (a: ArcadeStickState, b: ArcadeStickState) => {
    if (a.direction !== b.direction) return false;
    if (a.punch1 !== b.punch1) return false;
    if (a.punch2 !== b.punch2) return false;
    if (a.punch3 !== b.punch3) return false;
    if (a.kick1 !== b.kick1) return false;
    if (a.kick2 !== b.kick2) return false;
    if (a.kick3 !== b.kick3) return false;
    return true;
};

const arcadeStickHistoryMatch = (a: ArcadeStickState[], b: ArcadeStickState[]) => {
    const compare = a.length > b.length ? [...b].reverse() : [...a].reverse();
    const against = a.length > b.length ? a : b;
    for (let i = 0; i < compare.length; i++) {
        if (!arcadeStickStatesEqual(compare[i], against[i])) return false;
    }
    return true;
};

export const arcadeStickHistoryMultiMatch = (a: ArcadeStickState[], b: ArcadeStickState[][]) => {
    for (let i = 0; i < b.length; i++) {
        if (arcadeStickHistoryMatch(a, b[i])) return true;
    }
    return false;
};

type Button = 'punch1' | 'punch2' | 'punch3' | 'kick1' | 'kick2' | 'kick3';

const getButtons = (buttons?: Button | Button[]) => {
    const result = { punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false };
    if (buttons === undefined) return result;
    if (Array.isArray(buttons)) buttons.forEach(button => result[button] = true);
    else result[buttons] = true;
    return result;
};

const step = (direction: Direction, buttons?: Button | Button[]) => {
    return { direction, ...getButtons(buttons) };
};

/*
An array of steps define a valid input sequence for a move. A complete move
definition is an array of these step arrays, each a slightly different but
legal way of inputting the move.
*/

const createMove = (...moves: ArcadeStickState[][]) => {
    return moves;
}

const copyMove = (move: ArcadeStickState[][]) => move.map(steps => steps.map(step => ({...step})));

const reverseMove = (move: ArcadeStickState[][]) => {
    const copy = copyMove(move);
    for (let i = 0; i < copy.length; i++) {
        const steps = copy[i];
        for (let k = 0; k < steps.length; k++) {
            if (steps[k].direction === 1) steps[k].direction = 3;
            else if (steps[k].direction === 3) steps[k].direction = 1;
            else if (steps[k].direction === 4) steps[k].direction = 6;
            else if (steps[k].direction === 6) steps[k].direction = 4;
            else if (steps[k].direction === 7) steps[k].direction = 9;
            else if (steps[k].direction === 9) steps[k].direction = 7;
        }
    }
    return copy;
};

const copyMoveButtonToButton = (move: ArcadeStickState[][], button: Button, changeTo: Button) => {
    const copy = copyMove(move);
    for (let i = 0; i < copy.length; i++) {
        const steps = copy[i];
        for (let k = 0; k < steps.length; k++) {
            if (steps[k][button] === true) {
                steps[k][button] = false;
                steps[k][changeTo] = true;
            }
        }
    }
    return copy;
};

// moves

export const shoryukenRightLight = createMove(
    [step(6), step(2), step(3, 'punch1')],
    [step(6), step(2), step(3), step(3, 'punch1')],
    [step(6), step(5), step(2), step(3, 'punch1')],
    [step(6), step(5), step(2), step(3), step(3, 'punch1')],
);
export const shoryukenRightMedium = copyMoveButtonToButton(shoryukenRightLight, 'punch1', 'punch2');
export const shoryukenRightHeavy = copyMoveButtonToButton(shoryukenRightLight, 'punch1', 'punch3');
export const shoryukenLeftLight = reverseMove(shoryukenRightLight);
export const shoryukenLeftMedium = reverseMove(shoryukenRightMedium);
export const shoryukenLeftHeavy = reverseMove(shoryukenRightHeavy);

export const hadoukenRightLight = createMove(
    [step(2), step(3), step(6, 'punch1')],
    [step(2), step(3), step(6), step(6, 'punch1')],
);
export const hadoukenRightMedium = copyMoveButtonToButton(hadoukenRightLight, 'punch1', 'punch2');
export const hadoukenRightHeavy = copyMoveButtonToButton(hadoukenRightLight, 'punch1', 'punch3');
export const hadoukenLeftLight = reverseMove(hadoukenRightLight);
export const hadoukenLeftMedium = reverseMove(hadoukenRightMedium);
export const hadoukenLeftHeavy = reverseMove(hadoukenRightHeavy);
