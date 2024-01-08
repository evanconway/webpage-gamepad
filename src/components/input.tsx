import { useEffect, useRef } from "react";
import { ApplicationGamepads, setGamepadArray } from "../state/gamepadSlice";
import { setKeyboardKey } from "../state/keyboardSlice";
import { useDispatch } from "react-redux";
import { applicationGamepadsEqual, getApplicationGamepads } from "../util/util";

const Input = () => {
    const dispatch = useDispatch();
    const rawApplicationGamepadStates = useRef<ApplicationGamepads>(getApplicationGamepads());

    useEffect(() => {
        // setup input loop
        let requestAnimationFrameID = 0;
        const step = () => {
            const newApplicationGamepadStates = getApplicationGamepads();
            if (!applicationGamepadsEqual(rawApplicationGamepadStates.current, newApplicationGamepadStates)) {
                rawApplicationGamepadStates.current = newApplicationGamepadStates;
                dispatch(setGamepadArray(newApplicationGamepadStates));
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
        };
        const keyUp = (e: KeyboardEvent) => {
            dispatch(setKeyboardKey({ key: e.key, down: false }));
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
