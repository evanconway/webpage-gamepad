import { useEffect } from "react";
import { setGamepadArray } from "../state/gamepadSlice";
import { setKeyboardKey } from "../state/keyboardSlice";
import { useDispatch } from "react-redux";

const Input = () => {
    console.log('rendering Input component');
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('starting request animation frame loop');
        // need to figure out how to correctly use dispatch inside this hook, and cancel the old requestion animation loop.

        // setup input loop
        const step = () => {
            dispatch(setGamepadArray(navigator.getGamepads())); // this may trigger too many rerenders, mess with later
            requestAnimationFrame(step);
        };
        requestAnimationFrame(step);

        // gamepad connections
        const onConnect = () => {
            dispatch(setGamepadArray(navigator.getGamepads()));
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
        };
    }, [dispatch]);

    return null;
};

export default Input;
