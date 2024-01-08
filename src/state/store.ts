import { configureStore } from '@reduxjs/toolkit';
import arcadeStick from './arcadeStickSlice';
import gamepads from './gamepadSlice';
import keyboard from './keyboardSlice';

export const store = configureStore({
    reducer: {
        arcadeStick,
        gamepads,
        keyboard,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
