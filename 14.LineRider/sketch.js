// 14.LineRider
// Prework for Dijkstra algo
// Create some cities and roads and have the rider randomly travel
// between them
//
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let cities;
let roads;
let riders;

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class City {
  constructor (name, x, y) {
    this.name = name;
    this.pos = createVector(x, y);
  }
  show () {
    noStroke();
    fill('red');
    circle(this.pos.x, this.pos.y, 20);
    noFill();
    stroke('black');
    strokeWeight(1);
    textSize(10);
    text(this.name, this.pos.x- 3, this.pos.y+2);
  }
}

class Road {
  constructor(bgn, end) {
    this.bgn = bgn;
    this.end = end;
    this.dist = cities[this.bgn].pos.dist(cities[this.end].pos);
    //print ("dist from " + cities[this.bgn].name + " to " + cities[this.end].name + " = " + this.dist);
  }
  show() {
    strokeWeight(3);
    stroke('black');
    line(cities[this.bgn].pos.x, cities[this.bgn].pos.y, 
      cities[this.end].pos.x, cities[this.end].pos.y);
  }
}

class Rider {
  constructor(atCity, clr) {
    this.pos = createVector(cities[atCity].pos.x, cities[atCity].pos.y);
    this.vel = 0;
    this.clr = clr || getRandomColor();
    this.gotoCityN = atCity;
  }
  gotoCity(gotoCityN) {
    let vbgn = createVector(this.pos.x, this.pos.y);
    let vend = createVector(cities[gotoCityN].pos.x, cities[gotoCityN].pos.y);
    this.gotoCityN = gotoCityN;
    this.vel = 2;
    this.heading = vend.sub(vbgn).heading();
  }
  update() {
    var move = createVector(this.vel,0);
    move.setHeading(this.heading);
    this.pos.add(move);
    var dist = p5.Vector.sub(this.pos, cities[this.gotoCityN].pos).mag();
    if (abs(dist) < 3) { 
      //this.vel = 0; 
      var next = getRoads(this.gotoCityN);
      var got = random(next);
      if (got.bgn == this.gotoCityN) {
        this.gotoCity(got.end);
      }
      else {
        this.gotoCity(got.bgn);
      }
    }
  }
  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    noStroke();
    fill(this.clr);
    const del = 8;
    triangle(del, 0, -del, del, -del, -del);
    pop();
  }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function getRandomColor () {
  return '#' + (((1<<24)*Math.random()) | 0).toString(16).padStart(6, 0);
}

function getRoads(from) {
  let nextRoads = [];
  for (road of roads) {
    if (road.bgn == from  || road.end == from) {
      nextRoads.push(road);
    }
  }
  return nextRoads;
}

function getLetter(n) {
  return String.fromCharCode(("A".charCodeAt(0))+n);
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function keyPressed() { // } //if (key == "g") { loop(); } 
  init_simulation();
}
function mousePressed() { loop(); }


function preload() {}
function init_simulation() {
  init3();
}

function init3() {
  cities = [];
  // make a loop of cities
  const outpts = floor(random(6, 15));
  const rad = height*0.4;
  const ctrPt = createVector (width/2, height/2);
  const ang = 2*3.14159/outpts;
  var atAng = 0;
  var ltrCity = 0;
  for (var c=0; c < outpts; c++) {
    var vRad = rad * random(0.8, 1.1);
    var dist = createVector(vRad, 0);
    dist.setHeading(atAng);
    var citypos = p5.Vector.add(ctrPt, dist);
    cities.push(new City(getLetter(ltrCity), citypos.x, citypos.y));
    ltrCity++;
    atAng += ang*random(0.8, 1.2);
  }
  
  roads = [];
  for (n=0; n < cities.length-1; n++) {
    roads.push(new Road(n, n+1));
  }
  roads.push(new Road(0, cities.length-1));

  // add a center city
  cities.push(new City(getLetter(ltrCity), width*random(0.35,0.48), height*random(0.4,0.6)));
  ltrCity++;
  // and the roads
  for (n=0; n < cities.length-2; n++) {
    if (cities[n].pos.x < width*0.55 && random() < 0.75) {
      roads.push(new Road(cities.length-1, n));
    }
  }
  // add a center city
  cities.push(new City(getLetter(ltrCity), width*random(0.55,0.68), height*random(0.4,0.6)));
  ltrCity++;
  // and the roads
  for (n=0; n < cities.length-3; n++) {
    if (cities[n].pos.x > width*0.45 && random() < 0.75) {
      roads.push(new Road(cities.length-1, n));
    }
  }
  roads.push(new Road(cities.length-1,cities.length-2));
    

  riders = [];
  const nriders = floor(random(4)) + 1;
  for (var j=0; j < nriders; j++) {
    riders.push(new Rider(floor(random(cities.length-1))));
  }
}

function large_init() {
  function randPt(dim, res) {
    var mx = floor(dim/res) - 1;
    return res * (floor(random(mx)) + 1);
  }
  const Res=25;
  cities = [];
  cities.push(new City("A", randPt(width,Res), randPt(height,Res)));
  cities.push(new City("B", randPt(width,Res), randPt(height,Res)));
  cities.push(new City("C", randPt(width,Res), randPt(height,Res)));
  cities.push(new City("D", randPt(width,Res), randPt(height,Res)));
  cities.push(new City("E", randPt(width,Res), randPt(height,Res)));
  cities.push(new City("F", randPt(width,Res), randPt(height,Res)));
  cities.push(new City("G", randPt(width,Res), randPt(height,Res)));
  cities.push(new City("H", randPt(width,Res), randPt(height,Res)));
  
  roads = [];
  for (n=0; n < cities.length-1; n++) {
    roads.push(new Road(n, n+1));
    var end = floor(random(cities.length));
    if (random() > 0.5 && end != n && end != n+1) {
      roads.push(new Road(n, end));
    }
  }
  //for (road of roads) { print(road.bgn, road.end); }

  riders = [];
  riders.push(new Rider(0, 'yellow'));
  riders.push(new Rider(0));
}

function simple_init() {
  cities = [];
  cities.push(new City("A", 100, 100));
  cities.push(new City("B", 700, 100));
  cities.push(new City("C", 200, 200));
  
  roads = [];
  roads.push(new Road(0, 1));
  roads.push(new Road(0, 2));

  riders = [];
  riders.push(new Rider(0));
  riders[0].gotoCity(2);
}


function setup() {
  createCanvas(800, 500);
  init_simulation();
}

function draw() {
  background(200);
  for (road of roads) {
    road.show();
  }
  for (city of cities) { city.show(); }
  for (rider of riders) { 
    rider.show();
    rider.update();
  }
}
