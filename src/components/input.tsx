import { useEffect, useRef } from "react";
import { ApplicationGamepads, setGamepadArray } from "../state/gamepadSlice";
import { setKeyboardKey } from "../state/keyboardSlice";
import { useAppDispatch } from "../state/hooks";
import { applicationGamepadsEqual, getApplicationGamepads } from "../util/util";
import { setUseKeyboard } from "../state/userSlice";

const Input = () => {
    const dispatch = useAppDispatch();
    const rawApplicationGamepadStates = useRef<ApplicationGamepads>(getApplicationGamepads());

    useEffect(() => {
        // setup input loop
        let requestAnimationFrameID = 0;
        const step = () => {
            const newApplicationGamepadStates = getApplicationGamepads();
            if (!applicationGamepadsEqual(rawApplicationGamepadStates.current, newApplicationGamepadStates)) {
                rawApplicationGamepadStates.current = newApplicationGamepadStates;
                dispatch(setGamepadArray(newApplicationGamepadStates));
                dispatch(setUseKeyboard(false));
            }
            requestAnimationFrameID = requestAnimationFrame(step);
        };
        requestAnimationFrameID = requestAnimationFrame(step);

        // gamepad connections
        const onConnect = () => {
            dispatch(setGamepadArray(getApplicationGamepads()));
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
