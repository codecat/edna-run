import Entity from './Entity.js';
import Sprite from './Sprite.js';
import FloatingText from './FloatingText.js';

export default class GiftCard extends Entity
{
	constructor(game)
	{
		super(game);

		this.rect.width = 55 / 2;
		this.rect.height = 31 / 2;
		this.rect.x = this.game.width;
		this.rect.y = this.game.floorHeight - 100;

		this.value = Math.random() < 0.3 ? 1000 : 500;

		this.sprite = new Sprite(this.game.spritesheet);
		if (this.value == 500) {
			this.sprite.addFrame(186, 0, 55, 31); // Google Play card
		} else if (this.value == 1000) {
			this.sprite.addFrame(241, 0, 55, 31); // Target card
		}
	}

	touchPlayer()
	{
		this.game.giftcard += this.value;
		this.remove = true;

		this.game.entities.push(new FloatingText(this.game, '+ $' + this.value.toLocaleString()));
	}

	update(dt)
	{
		this.rect.x -= dt * this.game.speed.value;

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
