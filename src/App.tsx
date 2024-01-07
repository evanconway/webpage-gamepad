import { useEffect, useRef, useState } from "react";
import { ArcadeStick } from "./models/controls";
import { GAMEPAD_INPUTS, gamepadIsSupported, getApplicationGamepadInput } from "./models/gamepad";

interface RawGamepadState {
	id: string,
	index: number,
	axis: readonly number[],
	buttons: number[],
}

const rawGamepadStatesEqual = (a: RawGamepadState, b: RawGamepadState) => {
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
	// stored states of each gamepad, updated each step
	const rawGamepadStates = useRef<Record<string, RawGamepadState>>({});

	const [lastUpdatedGamepadRawState, setLastUpdatedGamepadRawState] = useState<RawGamepadState | null>(null);

	const [arcadeStick, setArcadeStick] = useState<ArcadeStick>({
		direction: 0,
		punch1: false,
		punch2: false,
		punch3: false,
		kick1: false,
		kick2: false,
		kick3: false,
	});

	useEffect(() => {
		const step = () => {
			let indexToSetAsUpdatedGamepad: number | null = null;
			navigator.getGamepads().map((gp, i) => {
				if (gp === null) return null;
				const result: RawGamepadState = {
					id: gp.id,
					index: i,
					axis: gp.axes,
					buttons: gp.buttons.map(button => button.value),
				};
				return result;
			}).forEach(gp => {
				if (gp === null) return;
				if (rawGamepadStates.current[gp.index] === undefined || !rawGamepadStatesEqual(rawGamepadStates.current[gp.index], gp)) {
					rawGamepadStates.current[gp.index] = gp;
					indexToSetAsUpdatedGamepad = gp.index;
					return;
				}
			});

			if (indexToSetAsUpdatedGamepad !== null) setLastUpdatedGamepadRawState(rawGamepadStates.current[indexToSetAsUpdatedGamepad]);



			requestAnimationFrame(step);
		};

		requestAnimationFrame(step);

		// setup gamepads
		const onConnect = () => {
			console.log('gamepads connection updated');
			navigator.getGamepads().forEach(gp => {
				if (gp !== null) console.log(gp.id);
			});
		};

		window.addEventListener('gamepadconnected', onConnect);
		window.addEventListener('gamepaddisconnected', onConnect);

		return () => {
			window.removeEventListener('gamepadconnected', onConnect);
			window.removeEventListener('gamepaddisconnected', onConnect);
		};
	}, []);

	if (lastUpdatedGamepadRawState === null) return <div>no gamepad detected</div>;
	const gp = navigator.getGamepads()[lastUpdatedGamepadRawState.index];
	if (gp === null) return <div>navigator gamepad error</div>;

	return (
		<div>
			<div>{navigator.getGamepads()[lastUpdatedGamepadRawState.index]?.id}</div>
			{gamepadIsSupported(gp) ? null : <div>GAMEPAD NOT SUPPORTED</div>}
			<ul>
				{GAMEPAD_INPUTS.map(input => <li key={input}>{input}: {getApplicationGamepadInput(gp, input) ? 'on' : 'off'}</li>)}
			</ul>
			<ul>
				{lastUpdatedGamepadRawState.axis.map((value, i) => <li key={i}>{`axis: ${i}: ${value}`}</li>)}
				{lastUpdatedGamepadRawState.buttons.map((value, i) => <li key={i}>{`button ${i}: ${value}`}</li>)}
			</ul>
		</div>
	);
}

export default App;
