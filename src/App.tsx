import { useEffect, useRef, useState } from "react";

interface GamepadState {
	id: string,
	index: number,
	buttons: number[],
}

const gamepadStateEqual = (a: GamepadState, b: GamepadState) => {
	if (a.buttons.length !== b.buttons.length) return false;
	for (let i = 0; i < a.buttons.length; i++) {
		if (a.buttons[i] !== b.buttons[i]) return false;
	}
	return true;
};

const App = () => {
	const gamepadStates = useRef<Record<string, GamepadState>>({});

	const [lastUpdatedGamepad, setLastUpdatedGamepad] = useState<GamepadState | null>(null);

	useEffect(() => {
		const step = () => {
			let indexToSetAsUpdatedGamepad: number | null = null;
			navigator.getGamepads().map((gp, i) => {
				if (gp === null) return null;
				const result: GamepadState = {
					id: gp.id,
					index: i,
					buttons: [...gp.axes, ...gp.buttons.map(button => button.value)],
				};
				return result;
			}).forEach(gp => {
				if (gp === null) return;
				// known anti-pattern, review later
				if (gamepadStates.current[gp.index] === undefined || !gamepadStateEqual(gamepadStates.current[gp.index], gp)) {
					gamepadStates.current[gp.index] = gp;
					indexToSetAsUpdatedGamepad = gp.index;
					return;
				}
			});

			if (indexToSetAsUpdatedGamepad !== null) setLastUpdatedGamepad(gamepadStates.current[indexToSetAsUpdatedGamepad]);

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

	if (lastUpdatedGamepad === null) return <div>no gamepad detected</div>;

	return (
		<div>
			<div>{navigator.getGamepads()[lastUpdatedGamepad.index]?.id}</div>
			<ul>
				{lastUpdatedGamepad.buttons.map((value, i) => <li key={`${i}`}>{`button ${i}: ${value}`}</li>)}
			</ul>;
		</div>
	);
}

export default App;
