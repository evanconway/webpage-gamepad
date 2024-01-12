import { ArcadeStickState } from "../state/arcadeStickSlice";

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

export const shoryukenLight: ArcadeStickState[][] = [
    [
        { direction: 6, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 2, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 3, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 3, punch1: true, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
    ],
    [
        { direction: 6, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 5, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 2, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 3, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 3, punch1: true, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
    ],
];

export const hadoukenLight: ArcadeStickState[][] =[
    [
        { direction: 2, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 3, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 6, punch1: true, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
    ],
    [
        { direction: 2, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 3, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 6, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 6, punch1: true, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
    ],
    [
        { direction: 2, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 3, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 6, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 5, punch1: true, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
    ],
    [
        { direction: 2, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 3, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 6, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 5, punch1: false, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
        { direction: 5, punch1: true, punch2: false, punch3: false, kick1: false, kick2: false, kick3: false },
    ],
];
