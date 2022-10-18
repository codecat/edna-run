import Game from './src/Game.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let game = new Game(canvas);

document.onkeydown = (e) => game.onKeyDown(e);
document.onkeyup = (e) => game.onKeyUp(e);

let lastTimestamp = 0;
let lastHidden = false;

let step = (timestamp) => {
	if (!document.hidden) {
		let delta = timestamp - lastTimestamp;
		if (lastHidden) {
			delta = 0;
		}
		lastTimestamp = timestamp;
		lastHidden = false;
		game.update(delta);
		game.render(ctx);
	} else {
		lastHidden = true;
	}
	window.requestAnimationFrame(step);
};
window.requestAnimationFrame(step);
