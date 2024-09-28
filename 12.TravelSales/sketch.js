// Traveling Salesperson
// Randomly try to find the shortest path
//
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let cities;  // current colletion of cities
let travelCities; // path that is the shortest
let gDistShortest; // distance that is the shortest

const INIT_CITIES = 20; // initial cities
const SWAPS = 10000;  // speed it up by makeing multiple swaps per turn


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class City {
  constructor (x, y) {
    this.pos = createVector(x,y);
    this.r = 5;
    this.c = 'red';
  }
  show() {
    noStroke();
    fill(this.c);
    circle(this.pos.x, this.pos.y, this.r);
  }
}

function distance() {
  let dist = 0;
  for (var n=0; n < cities.length-1; n++) {
    dist += p5.Vector.dist(cities[n].pos, cities[n+1].pos)
  }
  return dist;
}


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function keyPressed() { 
  //if (key == "g") { loop(); } 
  print(gDistShortest);
}
function mousePressed() { 
  init_simulation();
  loop();
}

function tripleSwap() {
  var a = floor(random(cities.length));
  var b = floor(random(cities.length));
  var c = floor(random(cities.length));
  var t = cities[a];
  cities[a] = cities[b];
  cities[b] = cities[c];
  cities[c] = t;
  var d = distance();
  if (d < gDistShortest) {
    gDistShortest = d;
    travelCities = cities.slice();
  }
  loop();
}

function swapCities() {
  var a = floor(random(cities.length));
  var b = floor(random(cities.length));
  var t = cities[a];
  cities[a] = cities[b];
  cities[b] = t;
  var d = distance();
  if (d < gDistShortest) {
    gDistShortest = d;
    travelCities = cities.slice();
  }
  loop();
}
//function preload() {}

function init_simulation() {
  cities = [];
  for (var n=0; n < INIT_CITIES; n++) {
    cities.push(new City(random(width), random(height)));
  }
  gDistShortest = 1000000000000;
  travelCities = cities.slice();
}


function setup() {
  createCanvas(800, 500);
  init_simulation();
}

function draw() {
  background(200);
  for (city of cities) {
    city.show()
  }
  stroke(128,64,64);
  strokeWeight(1);
  for (var n=0; n < cities.length-1; n++) {
    line(cities[n].pos.x, cities[n].pos.y, cities[n+1].pos.x, cities[n+1].pos.y);
  }

  stroke('blue');
  strokeWeight(3);
  for (var n=0; n < cities.length-1; n++) {
    line(travelCities[n].pos.x, travelCities[n].pos.y, 
          travelCities[n+1].pos.x, travelCities[n+1].pos.y);
  }
  for (var n=0; n < SWAPS; n++) {
    swapCities();
    //tripleSwap();
  }
  stroke('black');
  strokeWeight(1);
  noFill();
  textSize(40);
  text(floor(gDistShortest), 10, 50);
}
