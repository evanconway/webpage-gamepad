import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Move, arcadeStickHistoryMatchMove, move236PL, move236PM, move236PH, move214PL, move214PM, move214PH, move623PL, move623PM, move623PH, move421PH, move421PL, move421PM, move41236PL, move63214PL } from "../util/moves";
import { selectArcadeStickHistory } from "./arcadeStickHistorySlice";

interface InitialState {
    moves: Move[]
    targetMove: Move,
}

const initialState: InitialState = {
    moves: [
        move236PL,
        move236PM,
        move236PH,
        move214PL,
        move214PM,
        move214PH,
        move623PL,
        move623PM,
        move623PH,
        move421PL,
        move421PM,
        move421PH,
        move41236PL,
        move63214PL,
    ],
    targetMove: move236PL,
};

initialState.moves.sort((a, b) => b.inputHistories[0].length - a.inputHistories[0].length);

export const movesCheckSlice = createSlice({
    name: 'moves-check',
    initialState,
    reducers: {
        addMove: (state, action: PayloadAction<Move>) => {
            const existingMoveindex = state.moves.findIndex(m => m.name === action.payload.name);
            if (existingMoveindex >= 0) return;
            state.moves.push(action.payload);
            state.moves.sort((a, b) => b.inputHistories[0].length - a.inputHistories[0].length);
        },
        removeMove: (state, action: PayloadAction<Move>) => {
            state.moves = state.moves.filter(m => m.name !== action.payload.name);
        },
        setTargetMoveToRandom: (state) => {
            state.targetMove = state.moves[Math.floor(Math.random() * state.moves.length)];
        },
    },
});

export const {
    addMove,
    removeMove,
    setTargetMoveToRandom,
} = movesCheckSlice.actions;

/**
 * If the users current arcade stick state matches a move, returns that move. Otherwise
 * returns null.
 * 
 * @param state 
 */
export const selectMatchedMove = (state: RootState) => {
    const arcadeStickHistory = selectArcadeStickHistory(state);
    for (let i = 0; i < state.movesCheck.moves.length; i++) {
        const move = state.movesCheck.moves[i];
        if (arcadeStickHistoryMatchMove(arcadeStickHistory, move)) return move;
    }
    return null;
};
export const selectTargetMove = (state: RootState) => state.movesCheck.targetMove;

export default movesCheckSlice.reducer;
