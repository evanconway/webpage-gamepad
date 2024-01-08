import { useEffect } from "react";
import { setGamepadArray } from "../state/gamepadSlice";

const Input = () => {
    useEffect(() => {
        // setup input loop
        const step = () => {
            setGamepadArray(navigator.getGamepads()); // this may trigger too many rerenders, mess with later
            requestAnimationFrame(step);
        };
        requestAnimationFrame(step);

        // gamepad connections
        const onConnect = () => {
            setGamepadArray(navigator.getGamepads());
        };

        window.addEventListener('gamepadconnected', onConnect);
        window.addEventListener('gamepaddisconnected', onConnect);

        return () => {
            window.removeEventListener('gamepadconnected', onConnect);
            window.removeEventListener('gamepaddisconnected', onConnect);
        };
    }, []);

    return null;
};

export default Input;