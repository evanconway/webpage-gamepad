import { configureStore } from '@reduxjs/toolkit';
import gamepads from './gamepadSlice';
import keyboard from './keyboardSlice';
import user from './userSlice';
import inputMapping from './inputMappingSlice';

export const store = configureStore({
    reducer: {
        gamepads,
        keyboard,
        user,
        inputMapping,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
