import { ArcadeStickHistoryState } from "../state/arcadeStickHistorySlice";
import { ArcadeStickState, Direction } from "../state/arcadeStickSlice";

const MAX_TIME_BETWEEN_INPUTS_MS = 200;

// Most moves can simply check against a variety of input histories. We define those here.

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

const arcadeStickHistoryMatch = (history: ArcadeStickHistoryState[], move: ArcadeStickState[]) => {
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

interface MoveButton {
    down: boolean,
    pressed: boolean,
}

interface MoveStep {
    dir?: Direction,
    punch1?: MoveButton,
    punch2?: MoveButton,
    punch3?: MoveButton,
    kick1?: MoveButton,
    kick2?: MoveButton,
    kick3?: MoveButton,
}

export interface Move {
    steps: MoveStep[];
    name: string,
}

const moveStepMatchesHistoryState = (moveStep: MoveStep, historyStep: ArcadeStickHistoryState) => {
    if (moveStep.dir !== undefined && moveStep.dir !== historyStep.direction.direction) return false;
    return true;
};

export const arcadeStickHistoryMatchMove = (history: ArcadeStickHistoryState[], move: Move) => {
    const historyReversed = [...history].reverse();
    let indexHistory = 0;
    let indexMove = 0;

    let checking = true;
    while (checking) {

    }

    /*
        Iterate over both steps in history and the move. We only advance the history to check once
        it does not match for a step in a move. The same step in history could be valid for multiple
        steps in a move.
    */

    
    

    for (let i = 0; i < move.steps.length)
    for (let moveVersion = 0; moveVersion < move.steps.length; moveVersion++) {
        if (arcadeStickHistoryMatch(history, move.steps[moveVersion])) return true;
    }
    return false;
};

const createMove = (name: string, ...steps: MoveStep[]): Move => ({ name, steps });

// moves
export const move623PL = createMove('623PL', { dir: 6 }, { dir: 2 }, { dir: 3 }, { punch1: { down: true, pressed: true }});
export const move623PM = createMove('623PM', { dir: 6 }, { dir: 2 }, { dir: 3 }, { punch2: { down: true, pressed: true }});
export const move623PH = createMove('623PH', { dir: 6 }, { dir: 2 }, { dir: 3 }, { punch3: { down: true, pressed: true }});
export const move421PL = createMove('421PL', { dir: 4 }, { dir: 2 }, { dir: 1 }, { punch1: { down: true, pressed: true }});
export const move421PM = createMove('421PM', { dir: 4 }, { dir: 2 }, { dir: 1 }, { punch2: { down: true, pressed: true }});
export const move421PH = createMove('421PH', { dir: 4 }, { dir: 2 }, { dir: 1 }, { punch3: { down: true, pressed: true }});

export const move236PL = createMove('236PL', { dir: 2 }, { dir: 3 }, { dir: 6 }, { punch1: { down: true, pressed: true }});
export const move236PM = createMove('236PM', { dir: 2 }, { dir: 3 }, { dir: 6 }, { punch2: { down: true, pressed: true }});
export const move236PH = createMove('236PH', { dir: 2 }, { dir: 3 }, { dir: 6 }, { punch3: { down: true, pressed: true }});
export const move214PL = createMove('214PL', { dir: 2 }, { dir: 1 }, { dir: 4 }, { punch1: { down: true, pressed: true }});
export const move214PM = createMove('214PM', { dir: 2 }, { dir: 1 }, { dir: 4 }, { punch2: { down: true, pressed: true }});
export const move214PH = createMove('214PH', { dir: 2 }, { dir: 1 }, { dir: 4 }, { punch3: { down: true, pressed: true }});

export const move41236PL = createMove('41236PL', { dir: 4 }, { dir: 1 }, { dir: 2 }, { dir: 3 }, { dir: 6 }, { punch1: { down: true, pressed: true} });
export const move63214PL = createMove('63214PL', { dir: 6 }, { dir: 3 }, { dir: 2 }, { dir: 1 }, { dir: 4 }, { punch1: { down: true, pressed: true} });

export const move66 = createMove('66', { dir: 6 }, { dir: 5 }, { dir: 6 });
export const move44 = createMove('44', { dir: 4 }, { dir: 5 }, { dir: 4 });
export const move22 = createMove('22', { dir: 2 }, { dir: 5 }, { dir: 2 });
export const move88 = createMove('88', { dir: 8 }, { dir: 5 }, { dir: 8 });

/*
    The typical 360 move is not determined with strict inputs. In most games, as long
    as the user hits all cardinal directions in a clockwise or counter-clockwise order,
    the game gives them the move.
*/
