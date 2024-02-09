import { ArcadeButton, ArcadeDirection, ArcadeStickHistoryState } from "../state/arcadeStickHistorySlice";

// Most moves can simply check against a variety of input histories. We define those here.

interface MoveStep {
    dir?: ArcadeDirection,
    punch1?: ArcadeButton,
    punch2?: ArcadeButton,
    punch3?: ArcadeButton,
    kick1?: ArcadeButton,
    kick2?: ArcadeButton,
    kick3?: ArcadeButton,
}

export interface Move {
    steps: MoveStep[];
    name: string,
}

const directionIsEqual = (a: ArcadeDirection | undefined, b: ArcadeDirection | undefined) => {
    if (a === undefined || b === undefined) return false;
    return a.direction === b.direction && a.pressed === b.pressed;
};

/**
 * Returns true if both given buttons are defined and have equal values.
 * 
 * @param a 
 * @param b 
 * @returns
 */
const buttonIsEqual = (a: ArcadeButton | undefined, b: ArcadeButton | undefined) => {
    if (a === undefined || b === undefined) return false;
    return a.down === b.down && a.pressed === b.pressed;
};

/**
 * 
 * @param moveStep 
 * @param historyStep 
 * @returns 
 */
const moveStepMatchesHistoryState = (moveStep: MoveStep, historyStep: ArcadeStickHistoryState) => {
    if (moveStep.dir !== undefined && !directionIsEqual(moveStep.dir, historyStep.direction)) return false;
    if (moveStep.punch1 !== undefined && !buttonIsEqual(moveStep.punch1, historyStep.punch1)) return false;
    if (moveStep.punch2 !== undefined && !buttonIsEqual(moveStep.punch2, historyStep.punch1)) return false;
    if (moveStep.punch3 !== undefined && !buttonIsEqual(moveStep.punch3, historyStep.punch1)) return false;
    if (moveStep.kick1 !== undefined && !buttonIsEqual(moveStep.kick1, historyStep.punch1)) return false;
    if (moveStep.kick2 !== undefined && !buttonIsEqual(moveStep.kick2, historyStep.punch1)) return false;
    if (moveStep.kick3 !== undefined && !buttonIsEqual(moveStep.kick3, historyStep.punch1)) return false;
    return true;
};

const isNeutralInput = (historyStep: ArcadeStickHistoryState) => {
    if (historyStep.direction.direction !== 5) return false;
    if (historyStep.punch1.down) return false;
    if (historyStep.punch2.down) return false;
    if (historyStep.punch3.down) return false;
    if (historyStep.kick1.down) return false;
    if (historyStep.kick2.down) return false;
    if (historyStep.kick3.down) return false;
    return true;
};

export const arcadeStickHistoryMatchMove = (history: ArcadeStickHistoryState[], move: Move, reverse?: boolean) => {
    const stepsHistory = reverse ? [...history].reverse() : history;
    const stepsMove = reverse ? [...move.steps].reverse() : move.steps;
    // recall that now both history and move.steps are in the same order
    // iterate over history, checking each state to see if it matches a move step
    // when a state matches a step we don't advance to the next history state, instead we advance the move step being checked
    let indexHistory = 0;
    let indexMove = 0;
    while (indexHistory < stepsHistory.length && indexMove < move.steps.length) {
        const stepMove = stepsMove[indexMove];
        const stepHistory = stepsHistory[indexHistory];

        const match = moveStepMatchesHistoryState(stepMove, stepHistory);

        // first steps must always match
        if (!match && indexHistory === 0 && indexMove === 0) return false;

        if (match) indexMove++;
        else indexHistory++;
    }
    // move is a match for history if all steps were matched 
    if (indexMove >= stepsMove.length) return true;
    return false;
};

export const createMove = (name: string, ...steps: MoveStep[]): Move => ({ name, steps });
