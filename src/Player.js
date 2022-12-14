import Entity from './Entity.js';
import Sprite from './Sprite.js';
import Vec from './Vec.js';

export default class Player extends Entity
{
	constructor(game)
	{
		super(game);

		this.rect.width = 32;
		this.rect.height = 64;
		this.rect.x = 10;
		this.rect.y = game.floorHeight - this.rect.height;

		this.velocity = new Vec();
		this.onFloor = false;

		this.spriteJump = new Sprite(this.game.spritesheet);
		this.spriteJump.addFrame(0, 0, 62, 139);

		this.spriteWalk = new Sprite(this.game.spritesheet);
		this.spriteWalk.addFrame(62, 0, 62, 139, 100); // right leg 50%
		this.spriteWalk.addFrame(124, 0, 62, 139, 100); // left leg 50%
	}

	get sprite()
	{
		if (this.onFloor && this.game.speed.value > 0) {
			return this.spriteWalk;
		} else {
			return this.spriteJump;
		}
	}

	update(dt)
	{
		this.sprite.update(dt * (this.game.speed.value * 2));

		if (this.game.isKeyDown('ArrowUp') // If the jump button is pressed
			&& this.onFloor // We must be on the floor
			&& !this.game.introRunning // The intro must not be running
			&& (this.game.intro || this.game.time > 250) // We must be in the intro OR we must be 250 milliseconds into the game
			) {
			this.velocity.y = -400;
		}

		this.velocity.y += dt * 1.5;

		let collider = this.rect.reduced(7, 5);

		for (let entity of this.game.entities) {
			if (entity === this) {
				continue;
			}

			if (entity.rect.intersects(collider)) {
				entity.touchPlayer();
			}
		}

		this.rect.translate(this.velocity.mul(dt / 1000));

		this.onFloor = this.rect.bottom > this.game.floorHeight;
		if (this.onFloor) {
			this.velocity.y = 0;
			this.rect.bottom = this.game.floorHeight;
		}

		super.update(dt);
	}

	render(ctx)
	{
		this.sprite.render(ctx, this.rect.x, this.rect.y, this.rect.width, this.rect.height);

		super.render(ctx);
	}
}
