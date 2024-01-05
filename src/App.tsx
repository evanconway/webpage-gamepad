import { useEffect, useRef, useState } from "react";

interface GamepadState {
	id: string,
	index: number,
	axis: readonly number[],
	buttons: number[],
}

const gamepadStateEqual = (a: GamepadState, b: GamepadState) => {
	if (a.axis.length !== b.axis.length) return false;
	for (let i = 0; i < a.axis.length; i++) {
		if (a.axis[i] !== b.axis[i]) return false;
	}
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
					axis: gp.axes,
					buttons: gp.buttons.map(button => button.value),
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
			//const gp = e.gamepad;
			//console.log('Gamepad connected at index %d: %s. %d buttons, %d axes.', gp.index, gp.id, gp.buttons.length, gp.axes.length);
			console.log('gamepads connection updated');
			navigator.getGamepads().forEach(gp => {
				if (gp !== undefined) console.log(gp?.id);
			});
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
				{lastUpdatedGamepad.axis.map((value, i) => <li key={i}>{`axis: ${i}: ${value}`}</li>)}
				{lastUpdatedGamepad.buttons.map((value, i) => <li key={i}>{`button ${i}: ${value}`}</li>)}
			</ul>;
		</div>
	);
}

export default App;
