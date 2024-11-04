// 16.Dijkstra
// An implementation of depth first
//
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let cities;
let roads;

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
/****
let dis of start vert from start vert = 0
let dist of all other vet = inf

repeat:
  visit unvisited ver with smallest known dist from start
  for the current ver examine unvisited neighbors
  for current ver, calc dist of each nei from start
  if calc dist of ver is lest than known, update shortest dist
  update the prev vert for each of the updated dists
  add the current vert to the list of visited vert
until all verts are visited

*****/

function dijkstra_table(bgn, end) {
  var visited = [];
  var unvisited = [];
  var shortest = [];
  var prev = [];
  var at;
  var atDist;

  function print_results() {
    for (var j=0; j < cities.length; j++) {
      if (prev[j] != -1) {
        print (j, cities[j].name, shortest[j], prev[j], cities[prev[j]].name);
      } else {
        print (j, cities[j].name, shortest[j], prev[j]);
      }
    }
  }

  // inits
  for (var j=0; j < cities.length; j++) {
    visited[j] = false;
    unvisited[j] = true;
    shortest[j] = Infinity;
    prev[j] = -1;
  }
  shortest[bgn] = 0;
  unvisited[bgn] = false;
  visited[bgn] = true;
  at = bgn;
  atDist = 0; // shortest[bgn]

  // main loop
  while (unvisited.filter(Boolean).length > 0) {
    //print ("Checking ", at);
    for (way of cities[at].adj) {
      if (unvisited[way[0]]) {
        var waydist = way[1] + atDist;
        if ((waydist+shortest[at]) < shortest[way[0]]) {
          shortest[way[0]] = waydist + shortest[at];
          prev[way[0]] = at;
        }
        visited[way[0]] = true;
      }
    }
    // get next point
    visited[at] = true;
    unvisited[at] = false;
    var nshort = Infinity;
    var nat = -1;
    for (var j=0; j < cities.length; j++) {
      if (unvisited[j]) {
        if (shortest[j] < nshort) {
          nshort = shortest[j];
          nat = j;
        }
      }
    }
    at = nat;
    //print ("new at = ", at);
  }

  // print out the result
  //print_results();

  path = [];
  path.push(end);
  at = end;
  while (prev[at] != bgn) {
    at = prev[at];
    path.push(at);
  }
  path.push(bgn);
  var outstr = cities[path[path.length-1]].name;
  for (var j=path.length-2; j >= 0; j--) {
    outstr = outstr +  "->" + cities[path[j]].name;
  }
  //print (`Path from ${cities[bgn].name} to ${cities[end].name}: ${outstr}`);
  print (`Path from ${cityName(bgn)} to ${cityName(end)}: ${outstr}`, path);
}

function cityName(n) {
  return cities[n].name;
}

function rm_element(ray, v) {
  for (var j=0; j < ray.length; j++) {
    if (ray[j] == v) {
      ray.splice(j,1);
      return;
    }
  }
}

function scratch() {
  var b = [true, true, false, false, true];
  var cnt = b.filter(Boolean).length;
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class City {
  constructor (name, x, y) {
    this.name = name;
    this.pos = createVector(x, y);
    this.adj = []; // adjacent cities
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
    cities[bgn].adj.push([end, this.dist]);
    cities[end].adj.push([bgn, this.dist]);
  }
  show() {
    strokeWeight(3);
    stroke('black');
    line(cities[this.bgn].pos.x, cities[this.bgn].pos.y, 
      cities[this.end].pos.x, cities[this.end].pos.y);
  }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function getRandomColor () {
  return '#' + (((1<<24)*Math.random()) | 0).toString(16).padStart(6, 0);
}

function get_letter(n) {
  return String.fromCharCode(("A".charCodeAt(0))+n);
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function build_world_1() {
  cities = [];
  var n=0;
  cities.push (new City(get_letter(n), 100, 100)); n++;
  cities.push (new City(get_letter(n), 200, 100)); n++;
  cities.push (new City(get_letter(n), 100, 300)); n++;
  cities.push (new City(get_letter(n), 200, 300)); n++;
  cities.push (new City(get_letter(n), 120, 250)); n++;
  cities.push (new City(get_letter(n), 400, 200)); n++;

  roads = [];
  roads.push(new Road(0, 1));
  roads.push(new Road(0, 2));
  roads.push(new Road(2, 3));
  roads.push(new Road(1, 4));
  roads.push(new Road(2, 4));
  roads.push(new Road(4, 5));
  roads.push(new Road(1, 5));
}

function init_simulation() {
  cities = [];
  roads = [];

  build_world_1();
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function keyPressed() { 
  loop();
}
function mousePressed() { 
  init_simulation();
  loop();
}

function preload() {}

function setup() {
  var now = new Date();
  var currentTime = now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
  console.log (`setup start ${currentTime}`);

  scratch();

  createCanvas(800, 500);
  textFont('Verdana');
  init_simulation();

  dijkstra_table(0, 5);
  dijkstra_table(1, 2);
}

function draw() {
  background(200);
  for (road of roads) {
    road.show();
  }
  for (city of cities) { city.show(); }
}
