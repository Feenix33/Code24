// 07.FlowerPack 
//
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let spots;
const kGrow = .5;
const kAttempts = 15;
const kiRadius = 50;
const kStop = 1000;
let drawSpots = true;

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function drawPansy(xi, yi, ri, dfill, dout) {
  let x = xi || random(width);
  let y = yi || random(height);
  let nPetals = 3 + floor(random(4)); // can use anything
  let rMax = 40;
  let rMin = 10;
  let r = ri || (rMin + random(rMax));
  let fclr = getRandomColor();
  let ctrclr = getRandomColor();
  let drawFill = dfill || (random() < 0.75);
  let drawOut = dout || (random() < 0.5);
  // error both draw cmds are false
  let sclr = '#00000064';

  let ang = 360/nPetals;
  let diam = 2*r; 
  let rctr = r*0.3;

  push();
  translate(x,y);

  angleMode(DEGREES);
  for (var p=0; p < nPetals; p++) {
    push();
    translate(-r, -diam);
    noStroke();

    //ellipseMode(RADIUS); fill('red'); circle(0,0, 3, 3);
    ellipseMode(CORNER);
    if (drawFill) {
      fill(fclr);
      circle(0, 0, diam, diam);
    }
    if (drawOut) {
      noFill();
      stroke(sclr); //'#00000064');
      strokeWeight(3);
      arc(0, 0, diam, diam, 270-ang, 270+ang);
    }
    pop();
    rotate(ang);
  }

  if (drawFill | drawOut) {
    ellipseMode(RADIUS);
    stroke(sclr);
    fill(ctrclr);
    circle(0,0, rctr, rctr);
  }
  pop();
}
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
    if (this.alive == false) return false;
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
  grow(delr) { // return false if we are dead
    let dr = delr || kGrow;
    this.alive = this.isKeepGrowing();
    if (this.alive) {
      this.r += dr;
    }
    return this.alive;
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
  drawSpots = true;
  loop();
}

function getRandomColor () {
  return '#' + (((1<<24)*Math.random()) | 0).toString(16).padStart(6, 0);
}

function plump() { // run for a while to grow to max
  for (var j=0; j < 100; j++) {
    for (spot of spots) { spot.grow(); }
  }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function keyPressed() { 
  if (key == "n") { restart(); } 
  if (key == "f") { 
    drawSpots = !drawSpots;
    loop();
  } 
}
function mousePressed() { plump(); loop(); }
//function preload() {}

function setup() {
  createCanvas(800, 500);
  ellipseMode(RADIUS);
  restart();
}

function draw() {
  background(200);

  if (drawSpots) {
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

    for (spot of spots) { spot.show(); }
    for (spot of spots) { spot.grow(); }
  }
  else {
    for (spot of spots) { 
      var rnew = spot.r * random(0.5, 0.75);
      drawPansy(spot.x, spot.y, rnew);
    }
    noLoop();
  }
}
