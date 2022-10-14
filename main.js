import Game from './src/Game.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let game = new Game(canvas);

document.onkeydown = (e) => game.onKeyDown(e);
document.onkeyup = (e) => game.onKeyUp(e);

let lastTimestamp = 0;
let step = (timestamp) => {
	let delta = timestamp - lastTimestamp;
	lastTimestamp = timestamp;
	game.update(delta);
	game.render(ctx);
	window.requestAnimationFrame(step);
};
window.requestAnimationFrame(step);
