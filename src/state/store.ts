import { configureStore } from '@reduxjs/toolkit';
import gamepads from './gamepadSlice';
import keyboard from './keyboardSlice';
import inputMapping from './actionInputMappingSlice';

export const store = configureStore({
    reducer: {
        gamepads,
        keyboard,
        inputMapping,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
