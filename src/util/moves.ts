import { createMove } from "./moveFunctions";

// moves

// 623
export const move623PL = createMove(
    '623PL',
    { dir: { direction: 6, pressed: true } },
    { dir: { direction: 2, pressed: true } }, 
    { dir: { direction: 3, pressed: true } },
    { punch1: { down: true, pressed: true } },
);
export const move623PM = createMove(
    '623PM',
    { dir: { direction: 6, pressed: true } },
    { dir: { direction: 2, pressed: true } }, 
    { dir: { direction: 3, pressed: true } },
    { punch2: { down: true, pressed: true } },
);
export const move623PH = createMove(
    '623PH',
    { dir: { direction: 6, pressed: true } },
    { dir: { direction: 2, pressed: true } }, 
    { dir: { direction: 3, pressed: true } },
    { punch3: { down: true, pressed: true } },
);

// 421
export const move421PL = createMove(
    '421PL',
    { dir: { direction: 4, pressed: true } },
    { dir: { direction: 2, pressed: true } }, 
    { dir: { direction: 1, pressed: true } },
    { punch1: { down: true, pressed: true } },
);
export const move421PM = createMove(
    '421PM',
    { dir: { direction: 4, pressed: true } },
    { dir: { direction: 2, pressed: true } }, 
    { dir: { direction: 1, pressed: true } },
    { punch2: { down: true, pressed: true } },
);
export const move421PH = createMove(
    '421PH',
    { dir: { direction: 4, pressed: true } },
    { dir: { direction: 2, pressed: true } }, 
    { dir: { direction: 1, pressed: true } },
    { punch3: { down: true, pressed: true } },
);

// 236
export const move236PL = createMove(
    '236PL',
    { dir: { direction: 2, pressed: true } },
    { dir: { direction: 3, pressed: true } }, 
    { dir: { direction: 6, pressed: true } },
    { punch1: { down: true, pressed: true } },
);
export const move236PM = createMove(
    '236PM',
    { dir: { direction: 2, pressed: true } },
    { dir: { direction: 3, pressed: true } }, 
    { dir: { direction: 6, pressed: true } },
    { punch2: { down: true, pressed: true } },
);
export const move236PH = createMove(
    '236PH',
    { dir: { direction: 2, pressed: true } },
    { dir: { direction: 3, pressed: true } }, 
    { dir: { direction: 6, pressed: true } },
    { punch3: { down: true, pressed: true } },
);

// 214
export const move214PL = createMove(
    '214PL',
    { dir: { direction: 2, pressed: true } },
    { dir: { direction: 1, pressed: true } }, 
    { dir: { direction: 4, pressed: true } },
    { punch1: { down: true, pressed: true } },
);
export const move214PM = createMove(
    '214PM',
    { dir: { direction: 2, pressed: true } },
    { dir: { direction: 1, pressed: true } }, 
    { dir: { direction: 4, pressed: true } },
    { punch2: { down: true, pressed: true } },
);
export const move214PH = createMove(
    '214PH',
    { dir: { direction: 2, pressed: true } },
    { dir: { direction: 1, pressed: true } }, 
    { dir: { direction: 4, pressed: true } },
    { punch3: { down: true, pressed: true } },
);

// other motions
export const move41236PL = createMove(
    '41236PL',
    { dir: { direction: 4, pressed: true } },
    { dir: { direction: 1, pressed: true } },
    { dir: { direction: 2, pressed: true } },
    { dir: { direction: 3, pressed: true } },
    { dir: { direction: 6, pressed: true } },
    { punch1: { down: true, pressed: true }},
);
export const move63214PL = createMove(
    '63214PL',
    { dir: { direction: 6, pressed: true } },
    { dir: { direction: 3, pressed: true } },
    { dir: { direction: 2, pressed: true } },
    { dir: { direction: 1, pressed: true } },
    { dir: { direction: 4, pressed: true } },
    { punch1: { down: true, pressed: true }},
);
export const move66 = createMove(
    '66',
    { dir: { direction: 6, pressed: true } },
    { dir: { direction: 5, pressed: true } },
    { dir: { direction: 6, pressed: true } },
);
export const move44 = createMove(
    '44',
    { dir: { direction: 4, pressed: true } },
    { dir: { direction: 5, pressed: true } },
    { dir: { direction: 4, pressed: true } },
);
export const move22 = createMove(
    '22',
    { dir: { direction: 2, pressed: true } },
    { dir: { direction: 5, pressed: true } },
    { dir: { direction: 2, pressed: true } },
);
export const move88 = createMove(
    '88',
    { dir: { direction: 8, pressed: true } },
    { dir: { direction: 5, pressed: true } },
    { dir: { direction: 8, pressed: true } },
);

/*
    The typical 360 move is not determined with strict inputs. In most games, as long
    as the user hits all cardinal directions in a clockwise or counter-clockwise order,
    the game gives them the move.
*/
