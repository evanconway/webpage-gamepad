import { useEffect, useState } from "react";

interface GamepadState {
	id: string,
	buttons: boolean[],
}

const gamepadStateEqual = (a: GamepadState, b: GamepadState) => {
	if (a.buttons.length !== b.buttons.length) return false;
	for (let i = 0; i < a.buttons.length; i++) {
		if (a.buttons[i] !== b.buttons[i]) return false;
	}
	return true;
};

const App = () => {
	const gamepadStates = useState<Record<string, GamepadState>>({});

	useEffect(() => {
		const step = () => {
			const idsWithDifferentStates: string[] = [];
			navigator.getGamepads().map(gp => {
				if (gp === null) return null;
				const result: GamepadState = {
					id: gp.id,
					buttons: gp.buttons.map(button => button.value > 0),
				};
				return result;
			}); // loop over and check if states have changed

			requestAnimationFrame(step);
		};

		requestAnimationFrame(step);

		// setup gamepads
		const onConnect = (e: GamepadEvent) => {
			console.log(
				'Gamepad connected at index %d: %s. %d buttons, %d axes.',
				e.gamepad.index,
				e.gamepad.id,
				e.gamepad.buttons.length,
				e.gamepad.axes.length,
			);
		};

		window.addEventListener('gamepadconnected', onConnect);

		return () => {
			window.removeEventListener('gamepadconnected', onConnect);
		};
	}, []);

	return <div>Hello World</div>;
}

export default App;
