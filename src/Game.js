import Player from './Player.js';
import Obstacle from './Obstacle.js';
import GiftCard from './GiftCard.js';

import Clouds from './Clouds.js';
import Floor from './Floor.js';
import SmoothValue from './SmoothValue.js';

import SpritesheetURL from '../spritesheet.png';

export default class Game
{
	constructor(canvas)
	{
		this.canvas = canvas;
		this.width = canvas.width;
		this.height = canvas.height;

		this.spritesheet = new Image();
		this.spritesheet.src = SpritesheetURL;

		this.keys = {};

		this.clouds = new Clouds(this);
		this.floor = new Floor(this);
		this.floorHeight = this.canvas.height - 30;

		this.reset();

		this.running = false;

		this.intro = true;
		this.introRunning = false;
		this.introTime = 0;
	}

	reset()
	{
		this.running = true;
		this.endscreen = false;

		this.time = 0;
		this.distance = 0;
		this.giftcard = 0;
		this.speed = new SmoothValue(1.5);
		this.speed.value = 0.4;

		this.obstacleTimer = 4000;
		this.giftcardTimer = 5000 + Math.random() * 4000;

		this.entities = [
			new Player(this),
		];
	}

	gameOver()
	{
		this.running = false;
		this.endscreen = true;
	}

	isKeyDown(key)
	{
		return this.keys[key] !== undefined;
	}

	isKeyPressed(key)
	{
		let k = this.keys[key];
		return k !== undefined && k.down;
	}

	isKeyReleased(key)
	{
		let k = this.keys[key];
		return k !== undefined && k.up;
	}

	onKeyDown(e)
	{
		let k = this.keys[e.key];
		if (k === undefined) {
			this.keys[e.key] = {
				down: true,
				up: false,
			};
		}
	}

	onKeyUp(e)
	{
		let k = this.keys[e.key];
		if (k !== undefined) {
			k.up = true;
		}
	}

	update(dt)
	{
		if (this.intro && this.introRunning) {
			this.introTime += dt;
			if (this.introTime > 1000) {
				this.intro = false;
				this.introRunning = false;
				this.reset();
			}
		}

		if (this.running) {
			this.time += dt;
			this.distance += dt * this.speed.value;

			this.speed.update(dt);
			if (this.time >= 240 * 1000) {
				this.speed.value = 1.2;
			} else if (this.time >= 120 * 1000) {
				this.speed.value = 1.0;
			} else if (this.time >= 60 * 1000) {
				this.speed.value = 0.8;
			} else if (this.time >= 20 * 1000) {
				this.speed.value = 0.6;
			}

			this.clouds.update(dt);

			this.obstacleTimer -= dt;
			if (this.obstacleTimer < 0) {
				let maxTime = 1500;
				if (this.time >= 240 * 1000) {
					maxTime = 700;
				} else if (this.time >= 120 * 1000) {
					maxTime = 900;
				} else if (this.time >= 60 * 1000) {
					maxTime = 1250;
				}
				this.obstacleTimer += 500 + Math.random() * maxTime;
				this.entities.push(new Obstacle(this));
			}

			this.giftcardTimer -= dt;
			if (this.giftcardTimer < 0) {
				this.giftcardTimer += 2000 + Math.random() * 5000;
				this.entities.push(new GiftCard(this));
			}

			for (let i = 0; i < this.entities.length; i++) {
				let entity = this.entities[i];

				entity.update(dt);

				if (entity.remove) {
					this.entities.splice(i, 1);
					i--;
				}
			}
		} else if (this.intro) {
			this.entities[0].update(dt); // Player
			if (this.isKeyPressed('ArrowUp')) {
				this.introRunning = true;
			}
		} else {
			if (this.isKeyPressed('ArrowUp')) {
				this.reset();
			}
		}

		for (let key in this.keys) {
			let k = this.keys[key];
			k.down = false;
			if (k.up) {
				delete this.keys[key];
			}
		}
	}

	render(ctx)
	{
		ctx.clearRect(0, 0, this.width, this.height);

		ctx.save();

		if (this.intro) {
			ctx.beginPath();
			let clipWidth = 70;
			if (this.introTime > 500) {
				clipWidth += (this.introTime - 500) * 2;
			}
			ctx.rect(0, 0, clipWidth, this.height);
			ctx.clip();
		}

		ctx.font = '18px consolas';
		ctx.fillStyle = '#535353';

		this.clouds.render(ctx);
		this.floor.render(ctx);

		for (let entity of this.entities) {
			entity.render(ctx);
		}

		if (!this.intro) {
			ctx.textAlign = 'right';
			ctx.textBaseline = 'top';
			ctx.fillText(Math.round(this.distance / 100) + ' m', this.width - 5, 5);
			ctx.fillText('$' + this.giftcard.toLocaleString(), this.width - 5, 25);

			if (this.endscreen) {
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText('game over', this.width / 2, this.height / 4);
				ctx.fillText('press [up] to restart', this.width / 2, this.height / 4 + 30);
			}
		}

		ctx.restore();
	}
}
