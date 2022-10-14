import Vec from './Vec.js';

export default class Rect
{
	constructor(x = 0, y = 0, width = 0, height = 0)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	get top() { return this.y; }
	set top(v) { this.y = v;}

	get bottom() { return this.y + this.height; }
	set bottom(v) { this.y = v - this.height; }

	get left() { return this.x; }
	set left(v) { this.x = v; }

	get right() { return this.x + this.width; }
	set right(v) { this.x = v - this.width; }

	get center()
	{
		return new Vec(
			this.x + this.width / 2,
			this.y + this.height / 2
		);
	}

	reduced(x, y)
	{
		return new Rect(
			this.x + x,
			this.y + y,
			this.width - x * 2,
			this.height - y * 2
		);
	}

	intersects(rect)
	{
		return (
			rect.left <= this.right &&
			this.left <= rect.right &&
			rect.top <= this.bottom &&
			this.top <= rect.bottom
		);
	}

	contains(v)
	{
		return (
			v.x >= this.left &&
			v.x <= this.right &&
			v.y >= this.top &&
			v.y <= this.bottom
		);
	}

	translate(v)
	{
		this.x += v.x;
		this.y += v.y;
	}
}
