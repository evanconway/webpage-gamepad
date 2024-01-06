import { useEffect, useRef, useState } from "react";
import { GamepadChecker, gamepadCheckerUnknown, gamepadCheckerXbox } from "./gamepad";

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
	// mapping of gamepad indexes to gamepad checkers
	const gamepadIndexCheckersMap = useRef<Record<number, GamepadChecker>>({});

	// stored states of each gamepad, updated each step
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
		const onConnect = () => {
			console.log('gamepads connection updated');
			gamepadIndexCheckersMap.current = {};
			navigator.getGamepads().forEach(gp => {
				if (gp === null) return;
				console.log(gp.id);
				if (gp.id.toLowerCase().startsWith('xbox')) gamepadIndexCheckersMap.current[gp.index] = gamepadCheckerXbox;
				else gamepadIndexCheckersMap.current[gp.index] = gamepadCheckerUnknown;
			});
		};

		window.addEventListener('gamepadconnected', onConnect);
		window.addEventListener('gamepaddisconnected', onConnect);

		return () => {
			window.removeEventListener('gamepadconnected', onConnect);
			window.removeEventListener('gamepaddisconnected', onConnect);
		};
	}, []);

	if (lastUpdatedGamepad === null) return <div>no gamepad detected</div>;
	const gp = navigator.getGamepads()[lastUpdatedGamepad.index];
	if (gp === null) return <div>navigator gamepad error</div>;

	return (
		<div>
			<div>{navigator.getGamepads()[lastUpdatedGamepad.index]?.id}</div>
			{gamepadIndexCheckersMap.current[gp.index] === gamepadCheckerUnknown ? <div>GAMEPAD NOT SUPPORTED</div> : null}
			<ul>
				{Object.entries(gamepadIndexCheckersMap.current[lastUpdatedGamepad.index]).map(v => <li key={v[0]}>{v[0] + ':' + String(v[1](gp))}</li>)}
			</ul>
			<ul>
				{lastUpdatedGamepad.axis.map((value, i) => <li key={i}>{`axis: ${i}: ${value}`}</li>)}
				{lastUpdatedGamepad.buttons.map((value, i) => <li key={i}>{`button ${i}: ${value}`}</li>)}
			</ul>;
		</div>
	);
}

export default App;
