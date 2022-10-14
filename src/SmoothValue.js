export default class SmoothValue
{
	constructor(s = 10)
	{
		this.speed = s;

		this._value = 0;
		this._target = 0;
	}

	get value() { return this._value; }
	set value(v) { this._target = v; }

	update(dt)
	{
		this._value = this._value + (this._target - this._value) * ((dt / 1000) * this.speed);
	}

	reset()
	{
		this._value = 0;
		this._target = 0;
	}
}
