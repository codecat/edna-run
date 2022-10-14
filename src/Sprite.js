export default class Sprite
{
	constructor(img)
	{
		this.img = img;

		this.frames = [];
		this.frameIndex = 0;

		this.time = 0;
	}

	addFrame(x, y, width, height, time = 200)
	{
		this.frames.push({ x, y, width, height, time });
	}

	get width() { return this.frames[this.frameIndex].width; }
	get height() { return this.frames[this.frameIndex].height; }

	update(dt)
	{
		this.time += dt;

		while (true) {
			let frame = this.frames[this.frameIndex];
			if (this.time >= frame.time) {
				this.frameIndex = (this.frameIndex + 1) % this.frames.length;
				this.time -= frame.time;
				continue;
			}
			break;
		}
	}

	render(ctx, x, y, width = -1, height = -1)
	{
		let frame = this.frames[this.frameIndex];
		if (width == -1) {
			width = frame.width;
		}
		if (height == -1) {
			height = frame.height;
		}
		ctx.drawImage(this.img, frame.x, frame.y, frame.width, frame.height, x, y, width, height);
	}
}
