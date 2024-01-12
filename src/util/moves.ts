import { ArcadeStickState } from "../state/arcadeStickSlice";

export const arcadeStickHistoryMatch = (a: ArcadeStickState[], b: ArcadeStickState[]) => {
    const compare = a.length > b.length ? b : a;
    const against = b.length <= a.length ? a : b;
    for (let i = 0; i < compare.length; i++) {
        if (compare[i] !== against[i]) return false;
    }
    return true;
};
