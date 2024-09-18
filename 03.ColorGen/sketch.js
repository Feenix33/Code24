// Color Generator
// Test use of third party color generator
// https://github.com/alexandru-postolache/p5.colorGenerator
//
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function keyPressed() { if (key == "g") { ; } }

function mousePressed() {
  index = floor(random(data.palettes.length));
}

let data;
let index;
function preload() {
  data = loadJSON("palettes.json");
}

function setup() {
  createCanvas(800, 500);
  index = floor(random(data.palettes.length));
  print (data.palettes.length);
}

function draw() {
  let y = 0;
  background(100);
  noStroke();

  let palette = data.palettes[index];
  for (let i=0; i < palette.length; i++) { 
    fill(palette[i]);
    rect(i * (width/palette.length),
      0,
      (width/palette.length),
      height)
  }
}


