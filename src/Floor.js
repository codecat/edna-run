import Sprite from './Sprite.js';

export default class Floor
{
	constructor(game)
	{
		this.game = game;

		this.sprite = new Sprite(this.game.spritesheet);
		this.sprite.addFrame(17, 305, 682, 24);
	}

	render(ctx)
	{
		let floorX = -(this.game.distance % this.sprite.width);
		let floorRight = floorX + this.sprite.width;
		this.sprite.render(ctx, floorX, this.game.floorHeight);
		if (floorRight < this.game.width) {
			this.sprite.render(ctx, floorRight, this.game.floorHeight);
		}
	}
}
