var Color = require('color');

var generateFrames = function(numLEDs,numFrames) {
	var frames = [];

	var colors = [
		Color().hsv(0,0,100),
		Color().hsv(0,0,100),
		Color().hsv(0,0,100),
		Color().hsv(0,0,100),
		Color().hsv(0,0,100),
		Color().hsv(0,100,100),
		Color().hsv(25,100,100),
		Color().hsv(50,100,100),
		Color().hsv(340,80,100),
		Color().hsv(260,100,100)
	];

	for(var frame=0; frame<numFrames; frame++) {
		frames[frame] = [];
		for(var led=0; led<numLEDs; led++) {
			frames[frame][led] = colors[led%colors.length].rgbArray();
		}
	}

	return frames;
};

module.exports = {
	"generateFrames":generateFrames
};