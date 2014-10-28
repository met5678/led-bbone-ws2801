var SPI = require('spi');

var spi = new SPI.Spi('/dev/spidev1.0');

spi.maxSpeed(1000000);

spi.open();

var numLEDs = 80;

var buf = new Buffer(numLEDs*3);
buf.fill(0x00);
var curLED = 0;
var curColor = 0;

var done = false;

var myInterval = null;

var doFrame = function() {
	buf[curLED*3+curColor] = 0x11;
	if(curColor < 2)
		curColor++;
	else {
		curColor=0;
		if(curLED < numLEDs-1) {
			curLED++;
		}
		else {
			buf.fill(0x00);
			curLED = 0;
		}
	}
	spi.write(buf);
	//setImmediate(doFrame);
}

myInterval = setInterval(doFrame,10);

//doFrame();
