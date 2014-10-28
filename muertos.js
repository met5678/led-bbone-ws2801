var SPI = require('spi');
var spi = new SPI.Spi('/dev/spidev1.0');
var Color = require('color');

spi.maxSpeed(1000000);
spi.open();

var numLEDs = 80;
var numFrames = 840;

var frames = [];

for(var frame=0; frame<numFrames; frame++) {
	frames[frame] = [];
	for(var led=0; led<numLEDs; led++) {
		frames[frame][led] = {h:0,s:0,v:0};
	}
}

var initFrames = function(numLEDs) {
	var colors = [
		Color().hsv(0,0,100),
		Color().hsv(0,100,100),
		Color().hsv(35,100,100),
		Color().hsv(60,100,100),
		Color().hsv(0,60,100),
		Color().hsv(300,100,100)
	];

	for(var frame=0; frame<numFrames; frame++) {
		frames[frame] = [];
		for(var led=0; led<numLEDs; led++) {
			frames[frame][led] = colors[a%colors.length].rgbArray();
		}
	}

	console.log(frames[0]);
};

initFrames(numLEDs);

var convertToBuffers = function() {
	for(var frame=0; frame<numFrames; frame++) {
		var buf = new Buffer(numLEDs*3);
		for(var led=0; led<numLEDs; led++) {
			var byteIndex = led*3;
			buf[byteIndex] = frames[frame][led][0];
			buf[byteIndex+1] = frames[frame][led][1];
			buf[byteIndex+2] = frames[frame][led][2];
		}

		frames[frame] = buf;
	}
};

convertToBuffers();

var curFrame = 0;

var doFrame = function() {
	var buf = frames[curFrame];
	spi.write(buf);

	curFrame = curFrame >= numFrames-1 ? 0 : curFrame+1;
}

myInterval = setInterval(doFrame,10);