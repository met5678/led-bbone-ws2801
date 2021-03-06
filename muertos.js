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
		Color().hsv(0,0,60),
		Color().hsv(0,0,60),
		Color().hsv(0,0,60),
		Color().hsv(0,0,60),
		Color().hsv(0,100,100),
		Color().hsv(25,100,100),
		Color().hsv(50,100,100),
		Color().hsv(340,80,100),
	];


	var numWaves = 100;
	var waveFrames = 200;
	var waveLength = 10;
	var waveWidth = 5;

	var easings = Easing(waveFrames,'sinusoidal',{endToEnd:true});

	var drawPoint = function(frame,loc,width,color,value) {
		var startLED = Math.floor(loc-(width/2));
		var endLED = Math.ceil(loc+(width/2));

		for(var curLED=startLED; curLED <= endLED; curLED++) {
			var calcColor = color.clone().value(Math.floor(value*100));
			var normLED = curLED < 0 ? numLEDs+curLED : curLED%numLEDs;
			var ledColor = Color().rgb(frame[normLED]);

			var dist = Math.abs(loc-curLED) / (width/2);
			if(dist > 1) dist=1;

			var darkenAmount = Math.pow(dist,.75);
			calcColor.darken(darkenAmount);

			ledColor.mix(calcColor, value * (1-darkenAmount));

			/*if(ledColor.rgbArray[0] != 0)
				console.log(ledColor.rgbArray(),calcColor.rgbArray(),value);
*/
			frame[normLED] = ledColor.rgbArray();
		}
	};

	for(var wave=0; wave<numWaves; wave++) {
		var direction = Math.round(Math.random());
		var startLED = Math.floor(Math.random()*numLEDs);
		var startFrameIndex = Math.floor(Math.random()*numFrames);

		var moveAmount = waveLength/waveFrames;

		var waveColor = colors[Math.floor(Math.random()*colors.length)].clone();

		for(var waveFrameIndex=0; waveFrameIndex<waveFrames; waveFrameIndex++) {
			var realFrameIndex = (waveFrameIndex+startFrameIndex)%numFrames;

			if(direction)
				var curCenter = startLED + waveFrameIndex*moveAmount;
			else
				var curCenter = startLED - waveFrameIndex*moveAmount;

			var value = easings[waveFrameIndex];

			drawPoint(frames[realFrameIndex],curCenter,waveWidth,waveColor,value);
		}

		console.log("Finished wave " + wave);
	}

	return frames;
};

module.exports = {
	"generateFrames":generateFrames
};
