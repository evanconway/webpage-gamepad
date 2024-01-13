import { ArcadeStickStateTimed } from "../state/arcadeStickHistorySlice";
import { ArcadeStickState, Direction } from "../state/arcadeStickSlice";

const MAX_TIME_BETWEEN_INPUTS_MS = 100;

type Inversion = 'vertical' | 'horizontal' | 'vertical&horizontal';

const arcadeStickStatesEqual = (a: ArcadeStickState, b: ArcadeStickState, inversion?: Inversion) => {
    if (a.direction === 5 && b.direction !== 5) return false;
    else if (inversion === 'horizontal') {
        if (a.direction === 1 && b.direction !== 3) return false;
        if (a.direction === 3 && b.direction !== 1) return false;
        if (a.direction === 4 && b.direction !== 6) return false;
        if (a.direction === 6 && b.direction !== 4) return false;
        if (a.direction === 7 && b.direction !== 9) return false;
        if (a.direction === 9 && b.direction !== 7) return false;
    } else if (inversion === 'vertical') {
        if (a.direction === 1 && b.direction !== 7) return false;
        if (a.direction === 7 && b.direction !== 1) return false;
        if (a.direction === 2 && b.direction !== 8) return false;
        if (a.direction === 8 && b.direction !== 2) return false;
        if (a.direction === 3 && b.direction !== 9) return false;
        if (a.direction === 9 && b.direction !== 3) return false;
    } else if (inversion === 'vertical&horizontal') {
        if (a.direction === 1 && b.direction !== 9) return false;
        if (a.direction === 9 && b.direction !== 1) return false;
        if (a.direction === 2 && b.direction !== 8) return false;
        if (a.direction === 8 && b.direction !== 2) return false;
        if (a.direction === 3 && b.direction !== 7) return false;
        if (a.direction === 7 && b.direction !== 3) return false;
    } else if (a.direction !== b.direction) return false;
    if (a.punch1 !== b.punch1) return false;
    if (a.punch2 !== b.punch2) return false;
    if (a.punch3 !== b.punch3) return false;
    if (a.kick1 !== b.kick1) return false;
    if (a.kick2 !== b.kick2) return false;
    if (a.kick3 !== b.kick3) return false;
    return true;
};

const arcadeStickHistoryMatch = (history: ArcadeStickStateTimed[], move: ArcadeStickState[], inversion?: Inversion) => {
    if (history.length < move.length) return false;
    const moveReversed = [...move].reverse();
    debugger;
    for (let i = 0; i < move.length; i++) {
        // check if time since last is close enough
        if (i > 0) {
            const timeDiff = history[i - 1].timeMs - history[i].timeMs;
            if (timeDiff > MAX_TIME_BETWEEN_INPUTS_MS) return false;
        }
        if (!arcadeStickStatesEqual(moveReversed[i], history[i], inversion)) return false;
    }
    return true;
};

export const arcadeStickHistoryMatchMove = (history: ArcadeStickStateTimed[], move: ArcadeStickState[][], inversion?: Inversion) => {
    for (let moveVersion = 0; moveVersion < move.length; moveVersion++) {
        if (arcadeStickHistoryMatch(history, move[moveVersion], inversion)) return true;
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

export const shoryukenLight = createMove(
    [step(6), step(2), step(3, 'punch1')],
    [step(6), step(2), step(3), step(3, 'punch1')],
    [step(6), step(5), step(2), step(3, 'punch1')],
    [step(6), step(5), step(2), step(3), step(3, 'punch1')],
);
export const shoryukenMedium = copyMoveButtonToButton(shoryukenLight, 'punch1', 'punch2');
export const shoryukenHeavy = copyMoveButtonToButton(shoryukenLight, 'punch1', 'punch3');

export const hadoukenLight = createMove(
    [step(2), step(3), step(6, 'punch1')],
    [step(2), step(3), step(6), step(6, 'punch1')],
);
export const hadoukenMedium = copyMoveButtonToButton(hadoukenLight, 'punch1', 'punch2');
export const hadoukenHeavy = copyMoveButtonToButton(hadoukenLight, 'punch1', 'punch3');
