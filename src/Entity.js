import Rect from './Rect.js';

export default class Entity
{
	constructor(game)
	{
		this.game = game;
		this.remove = false;

		this.rect = new Rect();
	}

	touchPlayer()
	{
	}

	update(dt)
	{
	}

	render(ctx)
	{
	}
}
