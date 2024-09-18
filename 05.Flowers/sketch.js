// Draw some flowers
//
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function getRandomColorRGB () {
  return '#' + (((1<<24)*Math.random()) | 0).toString(16).padStart(6, 0);
}

function getRandomColor () {
  let c = ((1<<24)*Math.random()) | 0;
  let a = floor(random(128)) + 64;
  return ('#' + (c.toString(16).padStart(6,0)) + (a.toString(16).padStart(2,0)));
}

function drawPansy(xi, yi, ri, dfill, dout) {
  let x = xi || random(width);
  let y = yi || random(height);
  let nPetals = 3 + floor(random(4)); // can use anything
  let rMax = 40;
  let rMin = 10;
  let r = ri || (rMin + random(rMax));
  let fclr = getRandomColor();
  let ctrclr = getRandomColor();
  let drawFill = dfill || (random() < 0.5);
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

function drawFlower(xi, yi) {
  let x = xi || random(width);
  let y = yi || random(height);
  let nPetals = 3 + floor(random(4));
  let rMax = 50;
  let rMin = 10;
  let r = rMin + random(rMax);
  let fclr = getRandomColor();
  let ctrclr = getRandomColor();

  r = 100;
  nPetals = 3;


  ellipseMode(CENTER);
  ellipseMode(RADIUS);
  angleMode(DEGREES);
  // draw the petals
  let dAng = 360/nPetals;
  push();
  translate(x,y);
  //rotate(30); // make this random eventually
  for (var j=0; j < nPetals; j++) {
    push();
    translate(r, 0);

    noStroke();
    fill(fclr);
    circle(0, 0, r);

    stroke(0);
    strokeWeight(3);
    line(0, 0, r, 0);
    pop();
    rotate(dAng);
  }
  fill(ctrclr);
  circle(0, 0, r*0.4);
  pop();

  push();
  translate(x,y);
  rotate(60); // make this random eventually
  stroke('yellow');
  line(0, 0, r, 0);
  
  pop();
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function keyPressed() { if (key == "g") { ; } }
function mousePressed() { loop(); }

//function preload() {}
function setup() {
  createCanvas(800, 500);
  //colorMode(HSB, 360, 100, 100, 100);
  //test();
}

function draw() {
  colorMode(HSB, 360, 100, 100, 100);
  background(80);
  var delta = 150;
  for (var y=0; y < height; y+= delta) {
    for (var x=0; x < width; x+= delta) {
      //drawFlower(400, 250);
      drawPansy(x, y);
    }
  }
  noLoop();
}
