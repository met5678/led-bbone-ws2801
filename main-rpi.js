try {
	var SPI = require("pi-spi");
	var spi = SPI.initialize("/dev/spidev0.0");
	spi.clockSpeed(1e6);
} catch(e) {
	var spi = {
		write:function(){}
	};
}

var numLEDs = !!process.argv[3] ? Number(process.argv[3]) : 20;
var effect = !!process.argv[2] ? process.argv[2] : 'none';
var msPerFrame = !!process.argv[5] ? Number(process.argv[4]) : 16;

var numFrames = 840;

if(~effect.indexOf('.json')) {
	var frames = require('./generated/'+effect);
	numLEDs = frames[0].length;
}
else {
	var frameGenerator = require('./'+effect);
	frames = frameGenerator.generateFrames(numLEDs,numFrames);
}

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

function noop() {};

var doFrame = function() {
	var buf = frames[curFrame];
	spi.write(buf,noop);

	curFrame = curFrame >= numFrames-1 ? 0 : curFrame+1;
}

myInterval = setInterval(doFrame,msPerFrame);