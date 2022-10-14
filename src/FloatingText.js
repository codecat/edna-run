import Entity from './Entity.js';

export default class FloatingText extends Entity
{
	constructor(game, text)
	{
		super(game);

		this.text = text;

		this.rect.x = 100;
		this.rect.y = this.game.height / 3;
		this.time = 750;
	}

	update(dt)
	{
		this.rect.y -= dt / 70;

		this.time -= dt;
		if (this.time < 0) {
			this.remove = true;
		}

		super.update(dt);
	}

	render(ctx)
	{
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(this.text, this.rect.x, this.rect.y);

		super.render(ctx);
	}
}
