import { useEffect, useRef } from "react";
import { ApplicationGamepads, setGamepadArray } from "../state/gamepadSlice";
import { setKeyboardKey } from "../state/keyboardSlice";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { applicationGamepadArraysEqual, getApplicationGamepadsFromNavigatorGamepads } from "../util/controls";
import { selectArcadeStickState } from "../state/arcadeStickSlice";
import { addArcadeStickState } from "../state/arcadeStickHistorySlice";

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

    
    const stickState = useAppSelector(selectArcadeStickState);

    useEffect(() => {
        console.log('adding new stick state to history')
        dispatch(addArcadeStickState(stickState));
    }, [dispatch, stickState]);

    return null;
};

export default Input;
