// 19.GridsGraphs
// Grids and graphs experiements 
// based on articles on RedBlobGames.com
// implement the 2D grid using a 1D array structure to simplify the search algos
//
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let graph;
const DIM = 100;
let rows, cols;

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function scratch() {
  /*** ***
  print ("vvvvv----- SCRATCH -----vvvvv");
  print ("^^^^^----- SCRATCH -----^^^^^");
  *** ***/
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class Node {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.wall = false;
    this.neighbors = [];
  }
  show (clr) {
    const MGN = 8;
    //stroke(0);
    //noFill();
    //rect(this.x * DIM, this.y*DIM, DIM, DIM);
    noStroke();
    stroke(clr);
    fill(clr);
    //rect(this.x * DIM, this.y*DIM, DIM, DIM);
    circle(this.x * DIM+MGN, this.y*DIM+MGN, DIM-2*MGN);
    if (this.wall) {
      fill('brown');
      circle(this.x * DIM+MGN, this.y*DIM+MGN, DIM-2*MGN);
    }

    stroke(0);
    strokeWeight(3);
    noFill();
    for (var j=0; j < this.neighbors.length; j++) {
      var nx = this.neighbors[j][0];
      var ny = this.neighbors[j][1];
      line(this.x * DIM+DIM/2, this.y*DIM+DIM/2, nx*DIM+DIM/2, ny*DIM+DIM/2);
    }
  }
  addFourNeighbors() {
    if (this.wall) return;
    var dirs = [[1,0],[0,1],[-1,0],[0,-1]];
    for (var d=0; d < dirs.length; d++) {
      var nx = this.x + dirs[d][0];
      var ny = this.y + dirs[d][1];
      if (nx >=0 && nx < cols && ny >= 0 && ny < rows) {
        if (graph[nx][ny].wall == false) {
          this.neighbors.push([nx,ny]);
        }
      }
    }
  }
  findNeighbor(x,y) {
    for (var j=0; j < this.neighbors.length; j++) {
      //print ("findN", j, this.neighbors[j][0], this.neighbors[j][1], x, y);
      if (this.neighbors[j][0] == x && this.neighbors[j][1] == y) {
        return j;
      }
    }
    return -1;
  }
  removeNeighbor(x,y) {
    // remove the xy neighbor from the list
    var n = this.findNeighbor(x,y);
    //print (this.neighbors);
    //print ("removing neighbor ", x, y, n);
    if (n > -1) {
      this.neighbors.splice(n, 1);
      //print ("removed", this.neighbors);
    }
  }
  makeIntoWall() {
    this.wall = true;
    for (var n=0; n < this.neighbors.length; n++) {
      var x = this.neighbors[n][0];
      var y = this.neighbors[n][1];
      graph[x][y].removeNeighbor(this.x,this.y);
    }
    this.neighbors = [];
  }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function cmeRandomColor () { return '#' + (((1<<24)*Math.random()) | 0).toString(16).padStart(6, 0); }
function cmeInt2Letter(n) { return String.fromCharCode(("A".charCodeAt(0))+n); }

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function init_simulation() {
  graph = [];
  for (var i=0; i < cols; i++) {
    graph[i] = new Array(rows);
  }
  for (var i=0; i < cols; i++) {
    for (var j=0; j < rows; j++) {
      graph[i][j] = new Node(i, j);
    }
  }
  // add all the neighbors
  for (var i=0; i < cols; i++) {
    for (var j=0; j < rows; j++) {
      graph[i][j].addFourNeighbors();
    }
  }
  for (var n=0; n < 10; n++) {
    var wx = floor(random(cols));
    var wy = floor(random(rows));
    graph[wx][wy].makeIntoWall();
  }
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
  cols = floor(width / DIM);
  rows = floor(height / DIM);
  print (`rows,cols = (${rows}, ${cols})`);

  ellipseMode(CORNER);
  init_simulation();
}

function draw() {
  background(200);
  clr = color(45, 197, 244);
  for (var i=0; i < cols; i++) {
    for (var j=0; j < rows; j++) {
      graph[i][j].show(clr);
    }
  }
}
