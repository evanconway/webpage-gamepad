import { useEffect, useRef } from "react";
import { ApplicationGamepads, setGamepadArray } from "../state/gamepadSlice";
import { setKeyboardKey } from "../state/keyboardSlice";
import { useAppDispatch } from "../state/hooks";
import { setUseKeyboard } from "../state/userSlice";
import { applicationGamepadArraysEqual, getApplicationGamepadsFromNavigatorGamepads } from "../models/controls";

const Input = () => {
    const dispatch = useAppDispatch();
    const rawApplicationGamepadStates = useRef<ApplicationGamepads>(getApplicationGamepadsFromNavigatorGamepads());

    useEffect(() => {
        // setup input loop
        let requestAnimationFrameID = 0;
        const step = () => {
            const newApplicationGamepadStates = getApplicationGamepadsFromNavigatorGamepads();
            if (!applicationGamepadArraysEqual(rawApplicationGamepadStates.current, newApplicationGamepadStates)) {
                rawApplicationGamepadStates.current = newApplicationGamepadStates;
                dispatch(setGamepadArray(newApplicationGamepadStates));
                dispatch(setUseKeyboard(false));
            }
            requestAnimationFrameID = requestAnimationFrame(step);
        };
        requestAnimationFrameID = requestAnimationFrame(step);

        // gamepad connections
        const onConnect = () => {
            dispatch(setGamepadArray(getApplicationGamepadsFromNavigatorGamepads()));
        };

        window.addEventListener('gamepadconnected', onConnect);
        window.addEventListener('gamepaddisconnected', onConnect);

        // keyboard
        const keyDown = (e: KeyboardEvent) => {
            dispatch(setKeyboardKey({ key: e.key, down: true }));
            dispatch(setUseKeyboard(true));
        };
        const keyUp = (e: KeyboardEvent) => {
            dispatch(setKeyboardKey({ key: e.key, down: false }));
            dispatch(setUseKeyboard(true));
        };
        window.addEventListener('keydown', keyDown);
        window.addEventListener('keyup', keyUp);

        return () => {
            window.removeEventListener('gamepadconnected', onConnect);
            window.removeEventListener('gamepaddisconnected', onConnect);
            window.removeEventListener('keydown', keyDown);
            window.removeEventListener('keyup', keyUp);
            cancelAnimationFrame(requestAnimationFrameID);
        };
    }, [dispatch]);

    return null;
};

export default Input;
