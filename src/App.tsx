import { useEffect, useRef, useState } from "react";
import { GAMEPAD_INPUTS, gamepadIsSupported, getApplicationGamepadInput, ArcadeStickGamepadInputMapping, ArcadeStickKeyboardInputMapping } from "./models/controls";

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
	const rawKeyboardState = useRef<Record<string, boolean>>({});

	const [lastUpdatedGamepadRawState, setLastUpdatedGamepadRawState] = useState<RawGamepadState | null>(null);


	const [arcadeStickGamepadInputMapping, setArcadeStickGamepadInputMapping] = useState<ArcadeStickGamepadInputMapping>({
		gamepadIndex: 0,
		directionLeft: 'pad-left' ,
		directionRight: 'pad-right',
		directionUp: 'pad-up',
		directionDown: 'pad-down',
		punch1: 'face-2',
		punch2: 'face-3' ,
		punch3: 'bumper-right',
		kick1: 'face-0',
		kick2: 'face-1',
		kick3: 'trigger-right',
	});

	const [arcadeStickKeyboardInputMapping, setArcadeStickKeyboardInputMapping] = useState<ArcadeStickKeyboardInputMapping>({
		directionLeft: 'a' ,
		directionRight: 'd',
		directionUp: 'w',
		directionDown: 'space',
		punch1: 'u',
		punch2: 'i' ,
		punch3: 'o',
		kick1: 'j',
		kick2: 'k',
		kick3: 'l',
	});

	const [useKeyboard, setUseKeyboard] = useState(true);

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

			if (indexToSetAsUpdatedGamepad !== null) {
				setLastUpdatedGamepadRawState(rawGamepadStates.current[indexToSetAsUpdatedGamepad]);
				setUseKeyboard(false);
			}



			requestAnimationFrame(step);
		};

		requestAnimationFrame(step);

		// setup keyboard listener
		const onKeyDown = (e: KeyboardEvent) => {
			setUseKeyboard(true);
			rawKeyboardState.current[e.key] = true;
		};
		const onKeyUp = (e: KeyboardEvent) => {
			setUseKeyboard(true);
			rawKeyboardState.current[e.key] = false;
		};
		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);

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
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('keyup', onKeyUp);
			window.removeEventListener('gamepadconnected', onConnect);
			window.removeEventListener('gamepaddisconnected', onConnect);
		};
	}, []);

	if (lastUpdatedGamepadRawState === null) return <div>no gamepad detected</div>;
	const gp = navigator.getGamepads()[lastUpdatedGamepadRawState.index];
	if (gp === null) return <div>navigator gamepad error</div>;

	const arcadeStickMappedGamepad = navigator.getGamepads()[arcadeStickGamepadInputMapping.gamepadIndex];

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
			{ useKeyboard ? <ul>
				
			</ul> : <ul>
				<li key='up'>up: {getApplicationGamepadInput(arcadeStickMappedGamepad, arcadeStickGamepadInputMapping.directionUp) ? '+' : ''}</li>
				<li key='down'>down: {getApplicationGamepadInput(arcadeStickMappedGamepad, arcadeStickGamepadInputMapping.directionDown) ? '+' : ''}</li>
				<li key='left'>left: {getApplicationGamepadInput(arcadeStickMappedGamepad, arcadeStickGamepadInputMapping.directionLeft) ? '+' : ''}</li>
				<li key='right'>right: {getApplicationGamepadInput(arcadeStickMappedGamepad, arcadeStickGamepadInputMapping.directionRight) ? '+' : ''}</li>
				<li key='p1'>punch 1: {getApplicationGamepadInput(arcadeStickMappedGamepad, arcadeStickGamepadInputMapping.punch1) ? '+' : ''}</li>
				<li key='p2'>punch 2: {getApplicationGamepadInput(arcadeStickMappedGamepad, arcadeStickGamepadInputMapping.punch2) ? '+' : ''}</li>
				<li key='p3'>punch 3: {getApplicationGamepadInput(arcadeStickMappedGamepad, arcadeStickGamepadInputMapping.punch3) ? '+' : ''}</li>
				<li key='k1'>kick 1: {getApplicationGamepadInput(arcadeStickMappedGamepad, arcadeStickGamepadInputMapping.kick1) ? '+' : ''}</li>
				<li key='k2'>kick 2: {getApplicationGamepadInput(arcadeStickMappedGamepad, arcadeStickGamepadInputMapping.kick2) ? '+' : ''}</li>
				<li key='k3'>kick 3: {getApplicationGamepadInput(arcadeStickMappedGamepad, arcadeStickGamepadInputMapping.kick3) ? '+' : ''}</li>
			</ul> }
		</div>
	);
}

export default App;
