// Implement a bubble sort
//
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let Values;
let Walues;
const kValues = 100;

function aBubbleSwap() {
  // perform one swap
  for (var j=0; j < Values.length-2; j++) {
    for (var n=j+1; n < Values.length-1; n++) {
      if (Values[n]<Values[j]) {
        var t = Values[n];
        Values[n] = Values[j];
        Values[j] = t;
        return false;
      }
    }
  }
  return true;
}

function aSelection() {arr) {
}

function init() {
  Values = [];
  Walues = [];
  for (var j=0; j < kValues; j++) {
    Values.push(random(200));
  }
  Walues = [...Values];
}


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function keyPressed() { if (key == "g") { ; } }
function mousePressed() {
  init();
}

//function preload() {}

function setup() {
  createCanvas(800, 500);
  init();
}

function draw() {
  background(200);
  noStroke();
  
  var w = (width * 8)/10/kValues;
  var x = width/10;
  var y = height-25;
  var y2= height/2;

  var isDone = aBubbleSwap();

  for (var j=0; j < Values.length-1; j++) {
    fill('red');
    rect(x,y,w,-Values[j]);
    fill('blue');
    rect(x,y2,w,-Walues[j]);
    x+=w;
  }
}
