// 19.GridsGraphs
// Grids and graphs experiements 
// based on articles on RedBlobGames.com
// implement the 2D grid using a 1D array structure to simplify the search algos
//
//    0  1  2  3  4  5  6  7
// 0 00 01 02 03 04 05 06 07
// 1 08 09 10 11 12 13 14 15
// 2 16 17 18 19 20 21 22 23
// 3 24 25 26 27 28 29 30 31
// 4 32 33 34 35 36 37 38 39
//
// function bogus(n) { return {x:n+1, y:n-1};}
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let graph;
const DIM = 100;
let ROWS, COLS;
let oneShot = true;

function find_breadth_path(bgn, end) {
  // build the breadth first 
  let prev = breath_first(bgn);
  return find_path(bgn, end, prev);
}

function find_path(bgn, end, prev) {
  let path = [];
  for (var at=end; at != -1; at = prev[at]) {
    path.push(at);
  }
  path.reverse();
  if (path[0] == bgn) return path;
  return [];
}

function check_network() {
  var nStart = 0;
  while (graph[nStart].wall) { nStart++; }
  let que = [];
  let visited = new Array(graph.length);
  visited.fill(false);

  que[0] = nStart; // enqueue the first vertex
  visited[nStart] = true; // and mark as visited

  while (que.length > 0) {
    var at = que.shift();
    for (var b in graph[at].bros) {
      var nBro =  graph[at].bros[b];
      if (visited[nBro] == false) {
        que.push(nBro);
        visited[nBro] = true;
      }
    }
  }

  var cnt = 0;
  for (visit of visited) { if (visit) cnt++ }
  return cnt;
}

function breath_first(nStart) {
  let que = [];
  let visited = new Array(graph.length);
  let prev = new Array(graph.length);
  visited.fill(false);
  prev.fill(-1);

  que[0] = nStart; // enqueue the first vertex
  visited[nStart] = true; // and mark as visited

  while (que.length > 0) {
    var at = que.shift();
    for (var b in graph[at].bros) {
      var nBro =  graph[at].bros[b];
      if (visited[nBro] == false) {
        que.push(nBro);
        visited[nBro] = true;
        prev[nBro] = at;
      }
    }
  }
  return prev;
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function scratch() {
  /*** *** 
  var x, y, n, rtn;
  print ("---------- SCRATCH ----------");
  print ("---------- SCRATCH ----------");
  *** ***/
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class Node {
  constructor (x, y, clr) {
    this.clr = clr || color(45, 197, 244);
    this.x = x;
    this.y = y;
    this.n = xy2n(x,y);
    this.bros = []; // neighbors
    this.wall = false;
    this.hilite = false;
  }
  setHilite() { this.hilite = true; }
  clrHilite() { this.hilite = false; }
  setColor(clr) {
    this.clr = clr;
  }
  removeBro(n) {
    var nx = this.bros.indexOf(n);
    if (nx == -1) return;
    this.bros.splice(nx, 1);
  }
  makeIntoWall() {
    this.wall = true;
    this.clr = 'brown';
    if (this.bros.length > 0) {
      for (var b=0; b < this.bros.length; b++) {
        graph[this.bros[b]].removeBro(this.n);
      }
    }
    this.bros = [];
  }
  show (clr) {
    stroke(0);
    strokeWeight(1);
    ellipseMode(CORNER);
    if (this.hilite) {
      strokeWeight(3);
      stroke('yellow');
    }
    fill(this.clr);
    circle(this.x*DIM, this.y*DIM, DIM);

    //label
    stroke(0);
    fill(0);
    textSize(10);
    text(this.n, this.x*DIM+DIM/4, this.y*DIM+DIM/4);
  }
  showRoads(clr) {
    // lines to neighbros
    var rclr = color(clr);
    rclr.setAlpha(64);
    ellipseMode(CENTER);
    var xc = this.x*DIM+DIM/2;
    var yc = this.y*DIM+DIM/2;

    if (this.bros.length > 0) {
      var vectC = createVector(xc,yc);

      // roads to the bros
      for (var b=0; b < this.bros.length; b++) {
        var broXY = n2xy(this.bros[b]);

        // draw dir indicator
        var vectB = createVector(broXY.x*DIM+DIM/2, broXY.y*DIM+DIM/2); // bro
        var vectR = p5.Vector.sub(vectB, vectC); // road
        var vectD = createVector(vectR.x, vectR.y); // road indicator
        vectD.setMag(vectD.mag() * 0.2);

        vectR.add(vectC);
        vectD.add(vectC);

        stroke(rclr);
        strokeWeight(7);
        line(vectC.x, vectC.y, vectR.x, vectR.y);

        noStroke();
        fill('blue'); circle(vectD.x, vectD.y, 10);
      }
      fill('red'); circle(vectC.x, vectC.y, 10);
    }
  }
  isWall() { return this.wall; }
  addBros() {
    const delta = [[-1,0],[0,-1],[1,0],[0,1]]; // dir of connections righ,up,left,down
    if (this.isWall()) return;
    for (var j=0; j<delta.length; j++) {
      // x,y grid coords of neighbor
      var nx = this.x+delta[j][0]; 
      var ny = this.y+delta[j][1];
      // chrck if neighbor on the grid
      if (nx>=0 && nx<COLS && ny>=0 && ny<ROWS) {
        // convert xy to n for grid entry
        var bro = xy2n(nx,ny);
        // check that bro is not a wall
        if (!graph[bro].isWall()) {
          if (this.bros.indexOf(bro) == -1) {
            this.bros.push(xy2n(nx,ny));
            // now add the reflection
            if (graph[bro].bros.indexOf(this.n) == -1) {
              graph[bro].bros.push(this.n);
            }
          }
        }
      }
    }
  }
}

function countBros() {
  var cnt = 0;
  for (g of graph) {
    cnt += g.bros.length;
  }
  return cnt;
}

function countNodes() {
  var cnt = 0;
  for (g of graph) {
    if (g.wall == false) cnt++;
  }
  return cnt;
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function xy2n(x, y) {return (COLS*y+x); }
function n2xy(n) {return {x:n%COLS, y:floor(n/COLS)};}
function cmeRandomColor () { return '#' + (((1<<24)*Math.random()) | 0).toString(16).padStart(6, 0); }
function cmeInt2Letter(n) { return String.fromCharCode(("A".charCodeAt(0))+n); }

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function init_simulation() {
  var rtn;
  graph = [];
  for (var n=0; n < ROWS*COLS; n++) {
    rtn = n2xy(n); 
    graph.push(new Node(rtn.x, rtn.y));
  }
  for (var n=0; n < 7; n++) {
    var j = floor(random(ROWS*COLS));
    graph[j].makeIntoWall();
  }
  for (var n=0; n < ROWS*COLS; n++) { graph[n].addBros(); }
  //graph[10].setColor('green');
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function keyPressed() { 
  if (key === 'c') {
    print (`Total number of Bros = ${countBros()}`);
    print (`Total number of Nodes = ${countNodes()}`);
  }
  if (key === 'k') {
    var net = check_network();
    var nod = countNodes();
    if (net == nod) { print ("Complete network"); }
    else { print ("Incomplete network"); }
  }
  if (key === 'f') {
    let path = find_breadth_path(3, 25);
    print (path);
    for (p in path) {
      graph[path[p]].setHilite();
    }
  }
  if (key === 'p') print (graph[10]);
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
  COLS = floor(width / DIM);
  ROWS = floor(height / DIM);
  //print (`ROWS,COLS = (${ROWS}, ${COLS})`);

  scratch();
  init_simulation();
}

function draw() {
  background(200);
  clr = color(45, 197, 244);
  for (g of graph) {
    g.show(clr);
  }
  for (g of graph) {
    g.showRoads(120);
  }
  noLoop();
}
