// 
// 
//
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function keyPressed() { } //if (key == "g") { loop(); } 
function mousePressed() { loop(); }


function preload() {}
function init_simulation() { }


function setup() {
  createCanvas(800, 500);
  init_simulation();

  let g = new Graph();
  g.addNode("A");
}

function draw() {
  background(200);
}
