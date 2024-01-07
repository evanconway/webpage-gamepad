import { useEffect, useRef, useState } from "react";
import { GAMEPAD_INPUTS, gamepadIsSupported, getApplicationGamepadInput, ArcadeStickInputMapping } from "./models/controls";

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

	const [arcadeStickInputMapping, setArcadeStickInputMapping] = useState<ArcadeStickInputMapping>({
		directionLeft: { gamepadIndex: 0, input: 'pad-left' },
		directionRight: { gamepadIndex: 0, input: 'pad-right' },
		directionUp: { gamepadIndex: 0, input: 'pad-up' },
		directionDown: { gamepadIndex: 0, input: 'pad-down' },
		punch1: { gamepadIndex: 0, input: 'face-2' },
		punch2: { gamepadIndex: 0, input: 'face-3' },
		punch3: { gamepadIndex: 0, input: 'bumper-right' },
		kick1: { gamepadIndex: 0, input: 'face-0' },
		kick2: { gamepadIndex: 0, input: 'face-1' },
		kick3: { gamepadIndex: 0, input: 'trigger-right' },
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
			<div>Raw Input</div>
			<ul>
				{lastUpdatedGamepadRawState.axis.map((value, i) => <li key={i}>{`axis: ${i}: ${value}`}</li>)}
				{lastUpdatedGamepadRawState.buttons.map((value, i) => <li key={i}>{`button ${i}: ${value}`}</li>)}
			</ul>
			<div>Arcade Stick</div>
			<ul>
				<li key='up'>up: {getApplicationGamepadInput(navigator.getGamepads()[arcadeStickInputMapping.directionUp.gamepadIndex], arcadeStickInputMapping.directionUp.input) ? '+' : ''}</li>
				<li key='down'>down: {getApplicationGamepadInput(navigator.getGamepads()[arcadeStickInputMapping.directionDown.gamepadIndex], arcadeStickInputMapping.directionDown.input) ? '+' : ''}</li>
				<li key='left'>left: {getApplicationGamepadInput(navigator.getGamepads()[arcadeStickInputMapping.directionLeft.gamepadIndex], arcadeStickInputMapping.directionLeft.input) ? '+' : ''}</li>
				<li key='right'>right: {getApplicationGamepadInput(navigator.getGamepads()[arcadeStickInputMapping.directionRight.gamepadIndex], arcadeStickInputMapping.directionRight.input) ? '+' : ''}</li>
				<li key='p1'>punch 1: {getApplicationGamepadInput(navigator.getGamepads()[arcadeStickInputMapping.punch1.gamepadIndex], arcadeStickInputMapping.punch1.input) ? '+' : ''}</li>
				<li key='p2'>punch 2: {getApplicationGamepadInput(navigator.getGamepads()[arcadeStickInputMapping.punch2.gamepadIndex], arcadeStickInputMapping.punch2.input) ? '+' : ''}</li>
				<li key='p3'>punch 3: {getApplicationGamepadInput(navigator.getGamepads()[arcadeStickInputMapping.punch3.gamepadIndex], arcadeStickInputMapping.punch3.input) ? '+' : ''}</li>
				<li key='k1'>kick 1: {getApplicationGamepadInput(navigator.getGamepads()[arcadeStickInputMapping.kick1.gamepadIndex], arcadeStickInputMapping.kick1.input) ? '+' : ''}</li>
				<li key='k2'>kick 2: {getApplicationGamepadInput(navigator.getGamepads()[arcadeStickInputMapping.kick2.gamepadIndex], arcadeStickInputMapping.kick2.input) ? '+' : ''}</li>
				<li key='k3'>kick 3: {getApplicationGamepadInput(navigator.getGamepads()[arcadeStickInputMapping.kick3.gamepadIndex], arcadeStickInputMapping.kick3.input) ? '+' : ''}</li>
			</ul>
		</div>
	);
}

export default App;
