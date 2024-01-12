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

// moves

export const shoryukenLight: ArcadeStickState[][] = [
    [step(6), step(2), step(3, 'punch1')],
    [step(6), step(2), step(3), step(3, 'punch1')],
    [step(6), step(5), step(2), step(3, 'punch1')],
    [step(6), step(5), step(2), step(3), step(3, 'punch1')],
];

export const hadoukenLight: ArcadeStickState[][] =[
    [step(2), step(3), step(6, 'punch1')],
    [step(2), step(3), step(6), step(6, 'punch1')],
];
