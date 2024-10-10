// 15.DepthFirst
// An implementation of depth first
//
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let cities;
let roads;
let adjacent;

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
  }
  show() {
    strokeWeight(3);
    stroke('black');
    line(cities[this.bgn].pos.x, cities[this.bgn].pos.y, 
      cities[this.end].pos.x, cities[this.end].pos.y);
  }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
// push first vertex on stack
// mark as visited
// repeat
//  visit next vertex adjacent to one on top of stack
//  mark this vertex as visited
//  if there isn't a vertex to visit
//    pop this vertex off the stack
//  end if
// until the stack is empty

function depth_first(start) {
  //console.log("----- Depth First -----");
  let stack = [];
  let visited = new Array(cities.length);
  visited.fill(false);
  stack.push(start);

  //console.table(stack);
  while (stack.length > 0) {
    let last = stack.shift();
    //print (`popped ${last}`);
    visited[last] = true;
    for (var c=0; c < cities.length; c++) {
      if (adjacent[last][c] == true && visited[c] == false) {
        stack.push(c);
        //print (`pushed ${c}`);
      }
    }
  }
  // see if we have a full map
  var cnt = 0;
  for (visit of visited) {
    if (visit) cnt++
  }
  return (cnt == cities.length);
}

// Breadth first 
// from computer science lessons
// graph data structure 3. traversing a graph
// enque the first vertex
// mark the first vertex as visited
// repeat
//    visit next vertex adjacent to the first vertex
//    mark this vertex as visited
//    enqueue this vertex
// until all adjacent vertices visited
// repeat
//     dequeu the next vertex from the queue
//     repeat
//        visit next unvisted vertex adjacent to that at front of the queue
//        mark this vertex as visited
//        enqueu this vertex
//     until all adjacent vertices visited
//  until the queu is empty
// 

function breath_first(start) {
  //console.log("----- Breath First -----");
  let que = [];
  let visited = new Array(cities.length);
  visited.fill(false);
  que[0] = start; // enqueue the first vertex
  visited[start] = true; // and mark as visited
  for (var c=0; c < cities.length; c++) {
      if (adjacent[start][c] == true) {
        visited[c] = true;
        que.push(c);
        //print (`enqueue ${c}`);
      }
  }
  do {
    var at = que.shift();
      //print (`dequeue ${at}`);
      for (var c=0; c < cities.length; c++) {
        if (adjacent[at][c] == true && visited[c] == false) {
          visited[c] = true;
          que.push(c);
          //print (`enqueue ${c}`);
        }
      }
  } while (que.length > 0);

  // see if we have a full map
  var cnt = 0;
  for (visit of visited) {
    if (visit) cnt++
  }
  //if (cnt != cities.length){ console.table(visited); }
  return (cnt == cities.length);
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function getRandomColor () {
  return '#' + (((1<<24)*Math.random()) | 0).toString(16).padStart(6, 0);
}

function get_letter(n) {
  return String.fromCharCode(("A".charCodeAt(0))+n);
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

const dim = 150;
var xCity;
var yCity;

function build_world03() {
  //print ("Build world 03");
  build_world02();
  while (!breath_first(0)) {
    build_random_road01A();
  }
}

function build_world02() {
  build_world01();
  adjacent = [];
  for (var j=0; j < cities.length; j++) {
    adjacent[j] = []
    for (var i=0; i < cities.length; i++) {
      adjacent[j][i] = false;
    }
  }

  var bgn, end, delta;
  // start by connecting each city to something
  for (var y=0; y < yCity; y++) {
    for (var x=0; x < xCity; x++) {
      bgn = [x, y];
      delta = random([[-1,0],[1,0],[0,-1],[0,1]]); // 4-way
      //delta = random([[-1,0],[1,0],[0,-1],[0,1], [-1,-1],[1,-1],[-1,1],[1,1]]); // 8-way
      //delta = random([[-1,0],[1,0],[0,-1],[0,1], [-1,-1],[1, 1]]); // 6-way
      delta = random([[-1,0],[1,0],[0,-1],[0,1], [-1, 1],[-1,1]]); // 6-way
      end = [bgn[0]+delta[0], bgn[1]+delta[1]];
      if (is_valid_coord(end[0], end[1])) {
        var nbgn = bgn[0] + xCity*bgn[1];
        var nend = end[0] + xCity*end[1];
        roads.push(new Road(nbgn, nend));
        if (!adjacent[nbgn][nend]) {
          adjacent[nbgn][nend] = true;
          adjacent[nend][nbgn] = true;
        }
      }
    }
  }
}

function build_world01() {
  cities = [];
  var ncity = 0;
  for (var y=dim/2; y <= height-(dim/2); y+= dim) {
    for (var x=dim/2; x <= width-(dim/2); x += dim) {
      cities.push (new City(get_letter(ncity), x, y));
      ncity++;
    }
  }
  xCity = floor((width-dim)/dim) + 1;
  yCity = floor((height-dim)/dim) + 1;

  roads = [];
}

function is_valid_coord(x,y) {
  return (x>=0 && x < xCity && y >= 0 && y < yCity);
}
function build_random_road01A() {
  var bgn = [floor(random(xCity)),floor(random(yCity))]
  var delta, end;
  do {
    delta = random([[-1,0],[1,0],[0,-1],[0,1]]);
    end = [bgn[0]+delta[0], bgn[1]+delta[1]];
  } while (!is_valid_coord(end[0], end[1]));

  //if (!is_valid_coord(end[0], end[1])) { return false; }

  var nbgn = bgn[0] + xCity*bgn[1];
  var nend = end[0] + xCity*end[1];
  roads.push(new Road(nbgn, nend));
  if (!adjacent[nbgn][nend]) {
    adjacent[nbgn][nend] = true;
    adjacent[nend][nbgn] = true;
  }
}

function build_world00() {
  cities = [];
  cities.push (new City("A", 100, 100));
  cities.push (new City("B", 200, 100));
  cities.push (new City("C", 100, 200));
  cities.push (new City("D", 200, 200));
  cities.push (new City("E", 400, 100));

  roads = [];
  roads.push(new Road(0, 1));
  roads.push(new Road(0, 2));
  roads.push(new Road(3, 2));
  roads.push(new Road(2, 4));
}

function init_simulation() {
  cities = [];
  roads = [];
  adjacent = [];
  build_world03();

  // build the adjaceny matrix
  adjacent = [];
  for (var j=0; j < cities.length; j++) {
    adjacent[j] = []
    for (var i=0; i < cities.length; i++) {
      adjacent[j][i] = false;
    }
  }
  for (road of roads) {
    adjacent[road.bgn][road.end] = true;
    adjacent[road.end][road.bgn] = true;
  }
  //console.table(adjacent);
  //if (depth_first(0)) { print ("Complete"); }
  //if (breath_first(0)) { print ("Complete"); }
  //else {print ("Incomplete"); }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function keyPressed() { 
  build_random_road01A();
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


  createCanvas(800, 500);
  textFont('Verdana');
  init_simulation();
}

function draw() {
  background(200);
  frameRate(3);
  for (road of roads) {
    road.show();
  }
  for (city of cities) { city.show(); }

  if (!depth_first(0)) {
    build_random_road01A();
  }
  else {
    //print ("Done");
    noLoop();
  }
}
