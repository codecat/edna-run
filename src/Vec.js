export default class Vec
{
	constructor(x = 0, y = 0)
	{
		this.x = x;
		this.y = y;
	}

	mul(f)
	{
		return new Vec(
			this.x * f,
			this.y * f
		);
	}
}
