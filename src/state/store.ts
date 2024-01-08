import { configureStore } from '@reduxjs/toolkit';
import arcadeStick from './arcadeStickSlice';
import gamepads from './gamepadSlice';

export const store = configureStore({
    reducer: {
        arcadeStick,
        gamepads,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
