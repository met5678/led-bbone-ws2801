var fs = require('fs');

var numLEDs = !!process.argv[3] ? Number(process.argv[3]) : 20;
var effect = !!process.argv[2] ? process.argv[2] : 'none';

var numFrames = 840;

var frameGenerator = require('./'+effect);

console.log("Generating \""+effect+"\" effect...");
frames = frameGenerator.generateFrames(numLEDs,numFrames);
console.log("Writing to generated/"+effect+".json...");
fs.writeFileSync("./generated/"+effect+".json",JSON.stringify(frames));
console.log("Done!")
