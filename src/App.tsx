import { useEffect } from "react";

const App = () => {
	useEffect(() => {
		const step = () => {
			navigator.getGamepads().forEach(gamepad => {
				gamepad?.buttons.forEach((button, i) => {
					if (button.value > 0) console.log(`gamepad ${gamepad.id} button ${i} pressed`);
				});
			});

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
