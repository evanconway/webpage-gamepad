import { configureStore } from '@reduxjs/toolkit';
import arcadeStick from './arcadeStickSlice';
import gamepads from './gamepadSlice';
import keyboard from './keyboardSlice';
import user from './userSlice';

export const store = configureStore({
    reducer: {
        arcadeStick,
        gamepads,
        keyboard,
        user,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
