import { ArcadeStickStateTimed } from "../state/arcadeStickHistorySlice";
import { ArcadeStickState, Direction } from "../state/arcadeStickSlice";

const MAX_TIME_BETWEEN_INPUTS_MS = 200;

type Inversion = 'vertical' | 'horizontal';
type AlternateMatchHistoryFunction = (history: ArcadeStickStateTimed[]) => boolean;
type AlternateMatchHistoryFunctionName = 'circlePunch1';

const alternateMatchHistoryFunctions: Record<AlternateMatchHistoryFunctionName, AlternateMatchHistoryFunction> = {
    circlePunch1: (history) => {
        if (history.length < 4) return false;
        if (history[0].direction === 5) return false;
        const cardinalsHit = new Set<2 | 4 | 6 | 8>();
        let rotation: 'clockwise' | 'counter' | null = null;
        let lastCardinal: 2 | 4 | 6 | 8 | null = null;
        for (let i = 0; i < history.length; i++) {
            const step = history[i];
    
            // ensure move is executed quickly enough
            if (i > 0 && step.timeMs - history[i - 1].timeMs > 300) return false;

            // inputs that are never allowed
            if (step.kick1 || step.kick2 || step.kick3 || step.punch2 || step.punch3) return false;
    
            // input allowed on final state only
            if (i === 0 && !step.punch1) return false;
            else if (i!== 0 && step.punch1) return false;
            debugger;
            // cardinals
            if (directionIsCardinal(step.direction)) {
                const cardinal = step.direction as (2 | 4 | 6 | 8);
                cardinalsHit.add(cardinal as (2 | 4 | 6 | 8));
    
                // if first cardinal encountered, mark as last Cardinal
                // otherwise handle checking correct rotation
                if (lastCardinal === null) lastCardinal = cardinal;
                else if (cardinal !== lastCardinal) {
                    // determine rotation if not yet determined, return false if cardinal doesn't make sense for circle motion
                    if (rotation === null) {
                        const newRotation = getRotationBetweenCardinals(lastCardinal, cardinal);
                        if (newRotation === false) return false;
                        rotation = newRotation;
                    }
                    // if rotation does not match determined rotation, return false
                    if (rotation !== getRotationBetweenCardinals(lastCardinal, cardinal)) return false;
                    lastCardinal = cardinal;
                }
            }
            // here, no state has triggered failure
            // if all cardinals have been hit, input history is a valid 360
            if (cardinalsHit.has(2) && cardinalsHit.has(4) && cardinalsHit.has(6) && cardinalsHit.has(8)) return true;
        }
        return true;
    },
};

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
    alternateMatchHistoryFunction?: AlternateMatchHistoryFunctionName,
}

export const arcadeStickHistoryMatchMove = (history: ArcadeStickStateTimed[], move: Move) => {
    if (move.alternateMatchHistoryFunction !== undefined) {
        return alternateMatchHistoryFunctions[move.alternateMatchHistoryFunction](history);
    }
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
/*
The shortest execution path should be first. This prevents overlaps in
move detection.
*/

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

export const move41236PL = createMove(
    '41236PL',
    [step(4), step(1), step(2), step(3), step(6, 'punch1')],
    [step(4), step(1), step(2), step(3), step(6), step(6, 'punch1')],
);
export const move63214PL = copyMoveDirectionChange(move41236PL, '63214PL', 'horizontal');

export const move66 = createMove('66', [step(6), step(5), step(6)]);
export const move44 = copyMoveDirectionChange(move66, '44', 'horizontal');
export const move22 = createMove('22', [step(2), step(5), step(2)]);
export const move88 = copyMoveDirectionChange(move22, '88', 'vertical');

const directionIsCardinal = (direction: Direction) => {
    if (direction === 2) return true;
    if (direction === 4) return true;
    if (direction === 6) return true;
    if (direction === 8) return true;
    return false;
};

/**
 * Given 2 cardinal directions, determine rotation between them.
 * Returns false if directions do not form a rotation.
 * 
 * @param from 
 * @param to 
 * @returns 
 */
const getRotationBetweenCardinals = (from: (2 | 4 | 6 | 8), to: (2 | 4 | 6 | 8)) => {
    if (from === 2 && to === 8) return false;
    else if (from === 2 && to === 4) return 'clockwise';
    else if (from === 2 && to === 6) return 'counter';
    else if (from === 4 && to === 6) return false;
    else if (from === 4 && to === 8) return 'clockwise';
    else if (from === 4 && to === 2) return 'counter';
    else if (from === 8 && to === 2) return false;
    else if (from === 8 && to === 6) return 'clockwise';
    else if (from === 8 && to === 4) return 'counter';
    else if (from === 6 && to === 4) return false;
    else if (from === 6 && to === 2) return 'clockwise';
    else if (from === 6 && to === 8) return 'counter';
    return false;
};

/*
    The typical 360 move is not determined with strict inputs. In most games, as long
    as the user hits all cardinal directions in a clockwise or counter-clockwise order,
    the game gives them the move. This logic here recreates that.
*/
export const move360PL: Move = {
    ...createMove('360PL', []),
    alternateMatchHistoryFunction: 'circlePunch1',
};
