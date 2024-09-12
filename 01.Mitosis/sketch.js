// Dan Shipman's Coding Challenges
// 6 Mitosis
// Replicated the mitosis then added steering with drawing to the target
//
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

var cells;
const gVel = 1; // max velocity
const gAcc = 0.01; // max accelleration

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class Cell {
  constructor (pos, r, c) {
    if (pos) {
      this.pos = pos.copy();
    }
    else {
      this.pos = createVector(random(width), random(height));
    }
    this.c = c || color(random(100,255), random(100,255), random(100,255));
    this.r = r || 40;
    this.vel = createVector(random(-gVel,gVel), random(-gVel,gVel));
    this.acc = createVector(random(-gAcc,gAcc), random(-gAcc,gAcc));
    this.target = createVector(random(width), random(height));
  }
  applyForce(force) {
    this.acc.add(force);
    this.acc.limit(gAcc);
    // add limiters
  }
  seekTarget() {
    let desired = p5.Vector.sub(this.target, this.pos);
    desired.setMag(gVel);
    let steer = p5.Vector.sub(desired, this.vel);
    this.applyForce(steer);
  }
  updateTarget() {
    let taxi = abs(this.target.x-this.pos.x) + abs(this.target.y - this.pos.y);
    if ((taxi*2) < this.r) {
      this.target = createVector(random(width), random(height));
    }
  }
  update() {
    // move
    this.pos.add(this.vel);
    this.seekTarget();
    this.updateTarget();

    // edges
    if (this.pos.x < 0) { this.pos.x += width; }
    if (this.pos.x > width) { this.pos.x -= width; }
    if (this.pos.y < 0) { this.pos.y += height; }
    if (this.pos.y > height) { this.pos.y -= height; }

    // accelerate
    this.vel.add(this.acc);
    this.vel.limit(gVel);

    //this.acc = createVector(random(-gAcc,gAcc), random(-gAcc,gAcc));

    // grow
    if (this.r < 40) { this.r += 0.01; }
  }
  isHit(x,y) {
    return (x > (this.pos.x-this.r) && x < (this.pos.x+this.r)) && 
           (y > (this.pos.y-this.r) && y < (this.pos.y+this.r));
  }
  mitosis() {
    var next = new Cell(this.pos, this.r*0.8, this.c);
    next.pos.x += random(-this.r,this.r)
    next.pos.y += random(-this.r,this.r)
    next.c = color(red(this.c)+random(-20,20),green(this.c)+random(-20,20),blue(this.c)+random(-20,20));
    return next;
  }
  show() {
    noStroke();
    fill(this.c);
    circle(this.pos.x, this.pos.y, this.r);
    stroke(this.c)
    line(this.pos.x, this.pos.y, this.target.x, this.target.y);
    circle(this.target.x, this.target.y, 3);
  }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function keyPressed() { if (key == "g") { ; } }

function mousePressed() {
  for (var n=cells.length-1; n >= 0; n--) {
    if (cells[n].isHit(mouseX, mouseY)) {
      cells.push(cells[n].mitosis());
      cells.push(cells[n].mitosis());
      cells.splice(n,1);
    }
  }
}

function setup() {
  createCanvas(800, 500);
  cells = [];
  for (var j=0; j < 5; j++) {
    cells.push(new Cell());
  }
}

function draw() {
  background(200);
  for (var n=0; n < cells.length; n++) {
    cells[n].show();
    cells[n].update();
  }
}

