import { ArcadeStickStateTimed } from "../state/arcadeStickHistorySlice";
import { ArcadeStickState, Direction } from "../state/arcadeStickSlice";

const MAX_TIME_BETWEEN_INPUTS_MS = 200;

type Inversion = 'vertical' | 'horizontal';

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

const arcadeStickHistoryMatch = (history: ArcadeStickStateTimed[], move: ArcadeStickState[]) => {
    if (history.length < move.length) return false;
    const moveReversed = [...move].reverse();
    debugger;
    for (let i = 0; i < move.length; i++) {
        // check if time since last is close enough
        if (i > 0) {
            const timeDiff = history[i - 1].timeMs - history[i].timeMs;
            if (timeDiff > MAX_TIME_BETWEEN_INPUTS_MS) return false;
        }
        if (!arcadeStickStatesEqual(moveReversed[i], history[i])) return false;
    }
    return true;
};

export interface Move {
    inputHistories: ArcadeStickState[][];
    name: string,
}

export const arcadeStickHistoryMatchMove = (history: ArcadeStickStateTimed[], move: Move) => {
    for (let moveVersion = 0; moveVersion < move.inputHistories.length; moveVersion++) {
        if (arcadeStickHistoryMatch(history, move.inputHistories[moveVersion])) return true;
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

const createMove = (name: string, ...moves: ArcadeStickState[][]): Move => {
    return {
        name,
        inputHistories: moves,
    };
}

const copyInputHistories = (move: ArcadeStickState[][]) => move.map(steps => steps.map(step => ({...step})));

const copyMoveDirectionChange = (move: Move, newName: string, inversion: Inversion): Move => {
    const inputHistories = copyInputHistories(move.inputHistories);
    for (let i = 0; i < inputHistories.length; i++) {
        const steps = inputHistories[i];
        for (let k = 0; k < steps.length; k++) {
            const step = steps[k];
            if (inversion === 'horizontal') {
                if (step.direction === 1) step.direction = 3;
                else if (step.direction === 4) step.direction = 6;
                else if (step.direction === 7) step.direction = 9;
                else if (step.direction === 3) step.direction = 1;
                else if (step.direction === 6) step.direction = 4;
                else if (step.direction === 9) step.direction = 7;
            } else if (inversion === 'vertical') {
                if (step.direction === 1) step.direction = 7;
                else if (step.direction === 2) step.direction = 8;
                else if (step.direction === 3) step.direction = 9;
                else if (step.direction === 7) step.direction = 1;
                else if (step.direction === 8) step.direction = 2;
                else if (step.direction === 9) step.direction = 3;
            }
        }
    }
    return { name: newName, inputHistories };
};

const copyMoveButtonToButton = (move: Move, newName: string, button: Button, changeTo: Button): Move => {
    const inputHistories = copyInputHistories(move.inputHistories);
    for (let i = 0; i < inputHistories.length; i++) {
        const steps = inputHistories[i];
        for (let k = 0; k < steps.length; k++) {
            if (steps[k][button] === true) {
                steps[k][button] = false;
                steps[k][changeTo] = true;
            }
        }
    }
    return { name: newName, inputHistories };
};

// moves

export const move623PL = createMove(
    '623PL',
    [step(6), step(2), step(3, 'punch1')],
    [step(6), step(2), step(3), step(3, 'punch1')],
    [step(6), step(5), step(2), step(3, 'punch1')],
    [step(6), step(5), step(2), step(3), step(3, 'punch1')],
);
export const move623PM = copyMoveButtonToButton(move623PL, '623PM', 'punch1', 'punch2');
export const move623PH = copyMoveButtonToButton(move623PL, '623PH', 'punch1', 'punch3');
export const move421PL = copyMoveDirectionChange(move623PL, '421PL', 'horizontal');
export const move421PM = copyMoveDirectionChange(move623PM, '421PM', 'horizontal');
export const move421PH = copyMoveDirectionChange(move623PH, '421PH', 'horizontal');

export const move236PL = createMove(
    '236PL',
    [step(2), step(3), step(6, 'punch1')],
    [step(2), step(3), step(6), step(6, 'punch1')],
);
export const move236PM = copyMoveButtonToButton(move236PL, '236PM', 'punch1', 'punch2');
export const move236PH = copyMoveButtonToButton(move236PL, '236PH', 'punch1', 'punch3');
export const move214PL = copyMoveDirectionChange(move236PL, '214PL', 'horizontal');
export const move214PM = copyMoveDirectionChange(move236PM, '214PM', 'horizontal');
export const move214PH = copyMoveDirectionChange(move236PH, '214PH', 'horizontal');
