import { configureStore } from "@reduxjs/toolkit";
import arcadeStickReducer from "./arcadeStickSlice";

export const store = configureStore({
    reducer: {
        arcadeStickReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
