import Entity from './Entity.js';
import Sprite from './Sprite.js';

export default class Obstacle extends Entity
{
	constructor(game)
	{
		super(game);

		this.rect.x = this.game.width;

		if (Math.random() < 0.7) {
			this.rect.width = 32;
			this.rect.height = 32;
			this.rect.y = this.game.floorHeight - this.rect.height;

			this.sprite = new Sprite(this.game.spritesheet);
			this.sprite.addFrame(7, 166, 89, 82);

		} else {
			this.rect.width = 42;
			this.rect.height = 24;

			if (Math.random() < 0.4) {
				this.rect.y = this.game.floorHeight - 30;
			} else {
				this.rect.y = this.game.floorHeight - 100;
			}

			this.sprite = new Sprite(this.game.spritesheet);
			this.sprite.addFrame(187, 407, 69, 36);
			this.sprite.addFrame(277, 407, 69, 36);
		}
	}

	touchPlayer()
	{
		this.game.gameOver();
	}

	update(dt)
	{
		this.sprite.update(dt);

		this.rect.x -= (dt * this.game.speed.value);

		if (this.rect.right < 0) {
			this.remove = true;
		}

		super.update(dt);
	}

	render(ctx)
	{
		this.sprite.render(ctx, this.rect.x, this.rect.y, this.rect.width, this.rect.height);

		super.render(ctx);
	}
}
