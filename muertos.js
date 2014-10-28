var Color = require('color');
var Easing = require('easing');

var generateFrames = function(numLEDs,numFrames) {
	var frames = [];
	for(var frame=0; frame<numFrames; frame++) {
		frames[frame] = [];
		for(var led=0; led<numLEDs; led++) {
			frames[frame][led] = [0,0,0];
		}
	}

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


	var numWaves = 10;
	var waveFrames = 100;
	var waveLength = 10;
	var waveWidth = 4;

	var drawPoint = function(frame,loc,color,width) {
		var startLED = Math.floor(loc-width/2);
		var endLED = Math.ceil(loc+width/2);

		for(var curLED=startLED; curLED <= endLED; curLED++) {
			var normLED = curLED < 0 ? numLEDs+curLED : curLED%numLEDs;
			var ledColor = Color().rgb(frame[normLED]);
			var dist = Math.abs(loc-curLED)*2/width;
			var val = Math.floor(Math.pow(1-dist,2)*100);
			waveColor.value(val*val);
			console.log(curLED,normLED,val,dist);
			ledColor.mix(waveColor);
			frame[normLED] = ledColor.rgbArray();
		}
	};

	for(var wave=0; wave<numWaves; wave++) {
		var direction = Math.round(Math.random());
		var startLED = Math.floor(Math.random()*numLEDs);
		var startFrameIndex = Math.floor(Math.random()*numFrames);

		var easings = Easing(100,'circular',{endToEnd:true});

		var moveAmount = waveLength/waveFrames;

		var waveColor = colors[Math.floor(Math.random()*colors.length)].clone();

		console.log(startLED,startFrameIndex,moveAmount,waveColor);


		for(var waveFrameIndex=0; waveFrameIndex<waveFrames; waveFrameIndex++) {
			var realFrameIndex = (waveFrameIndex+startFrameIndex)%numFrames;

			var curCenter = startLED + waveFrameIndex*moveAmount;
			waveColor.value(easings[waveFrameIndex]*100);

			drawPoint(frames[realFrameIndex],curCenter,waveColor,waveWidth);
		}
	}

	console.log(frames[100]);

	return frames;
};

module.exports = {
	"generateFrames":generateFrames
};