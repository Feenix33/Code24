// Color Generator
// Test use of third party color generator
// https://github.com/alexandru-postolache/p5.colorGenerator
//
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function keyPressed() { if (key == "g") { ; } }

function mousePressed() {
}

var colorGen;
var shades, complementary, tetradic, tints;

function setup() {
  createCanvas(800, 500);
  //colorGen = new ColorGenerator('#ff5733');
  colorGen = new ColorGenerator();
  shades = colorGen.getShades(5);
  //complementary = colorGen.getComplementary();
  complementary = colorGen.getSplitComplementary();
  tetradic = colorGen.getTetradic();
  tints = colorGen.getTints(5);
}

function draw() {
  let y = 0;
  background(100);
  shades.forEach((color, index) => {
    fill(color);
    rect(index*100, y, 100, 100);
  });
  y += 100;
  complementary.forEach((color, index) => {
    fill(color);
    rect(index*100, y, 100, 100);
  });
  y += 100;
  tetradic.forEach((color, index) => {
    fill(color);
    rect(index*100, y, 100, 100);
  });
  y += 100;
  tints.forEach((color, index) => {
    fill(color);
    rect(index*100, y, 100, 100);
  });
}

