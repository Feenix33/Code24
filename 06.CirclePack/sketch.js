// 
//
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let spots;
const kGrow = .5;
const kAttempts = 15;
const kiRadius = 20;
const kStop = 1000;

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class Spot {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.r = kiRadius;
    this.alive = true;
    this.c = getRandomColor();
  }
  isKeepGrowing() {
    // check if on edge
    if (this.x-this.r <= 0 || this.x+this.r >= width ||
      this.y-this.r <= 0 || this.y+this.r >= height) {
      return false;
    }
    // check is bumping another spot
    for (spot of spots) {
      if (spot != this) {
        if ((dist(this.x, this.y, spot.x, spot.y) - 2*kGrow) <= (this.r + spot.r)) {
          return false;
        }
      }
    }
    return true;
  }
  grow(delr) {
    let dr = delr || kGrow;
    this.alive = this.isKeepGrowing();
    if (this.alive) {
      this.r += dr;
    }
  }
  show() {
    //noFill();
    fill(this.c);
    stroke(0);
    strokeWeight(2);
    circle (this.x, this.y, this.r);
  }
}

function isGoodSpot(x, y) {
  for (spot of spots) {
    if (dist(x, y, spot.x, spot.y) <= (spot.r+kiRadius+2)) {
      return false;
    }
  }
  return true;
}

function restart() {
  spots = [];
  loop();
}

function getRandomColor () {
  return '#' + (((1<<24)*Math.random()) | 0).toString(16).padStart(6, 0);
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function keyPressed() { if (key == "n") { restart(); } }
function mousePressed() { loop(); }
//function preload() {}

function setup() {
  createCanvas(800, 500);
  ellipseMode(RADIUS);
  
  spots = [];
  /**
  for (var j=0; j < 10; j++) {
    spots.push(new Spot(random(width), random(height)));
  }
  **/
}

function draw() {
  background(200);

  var cntNew = 0; // number of new spots
  var cntTry = 0; // number of tries
  while (cntNew < kAttempts) {
    let x = random(width);
    let y = random(height);
    if (isGoodSpot(x, y)) {
      spots.push(new Spot(x, y));
      cntNew++;
    }
    cntTry++;
    if (cntTry >= kStop) {
      noLoop();
      break;
    }
  }

  /*** first attempt 
  for (var j=0; j < kAttempts; j++) {
    let x = random(width);
    let y = random(height);
    if (isGoodSpot(x, y)) {
      spots.push(new Spot(x, y));
      cntNew++;
    }
  }
  if (cntNew == 0) noLoop();
  ****/

  //for (var j=0; j < spots.length; j++) {
  for (spot of spots) { spot.show(); }
  for (spot of spots) { spot.grow(); }
    //spots[j].grow();
    //spots[j].show();
}
