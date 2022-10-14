import Sprite from './Sprite.js';
import Vec from './Vec.js';

export default class Clouds
{
	constructor(game)
	{
		this.game = game;

		this.sprite = new Sprite(this.game.spritesheet);
		this.sprite.addFrame(130, 186, 163, 42);

		this.clouds = [];
		for (let i = 0; i < 3; i++) {
			this.clouds.push(new Vec(
				this.game.width / 3 * (i + 1),
				Math.random() * (this.game.height / 2)
			));
		}
	}

	update(dt)
	{
		for (let cloud of this.clouds) {
			cloud.x -= dt * this.game.speed.value / 6;
			if (cloud.x < -80) {
				cloud.x = this.game.width;
				cloud.y = Math.random() * (this.game.height / 2);
			}
		}
	}

	render(ctx)
	{
		for (let cloud of this.clouds) {
			this.sprite.render(ctx, cloud.x, cloud.y, 80, 20);
		}
	}
}
