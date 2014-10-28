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

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

var frameGenerator = require('./muertos');

frames = frameGenerator.generateFrames(numLEDs,numFrames);

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