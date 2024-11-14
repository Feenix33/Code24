// 22.Grid World
// Grids and graphs experiements 
// Make the world a class with methods
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

let gLand;
let gWorld; // list of nodes
const DIM =  100;
let ROWS, COLS;
let gBgn, gEnd;
let gPrimPath = [];
let bPrim = false;

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function scratch() {
  print ("---------- SCRATCH ----------");
  const ar = [true, true, false, true, false, false];
  print (ar.length, ar.filter(Boolean).length);
  print ("---------- SCRATCH ----------");
  /*** *** 
  *** ***/
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class Graph {
  constructor (rows,cols) {
    var rtn;
    this.nodes = [];
    this.rows = rows;
    this.cols = cols;
    for (var n=0; n < rows*cols; n++) {
      rtn = n2xy(n); 
      this.nodes.push(new BaseNode(rtn.x, rtn.y, n));
    }
  }
  show () {
    for (var n in this.nodes) {this.nodes[n].show(); }
    for (var n in this.nodes) {this.nodes[n].showEdges(); }
  }
  connect(a,b) {
    this.nodes[a].connectTo(this.nodes[b]);
  }
  connect4way(a,b) {
    // only connect if a,b are next to each other w/4-way connection
    let d = b - a;
    if (b > 0 && b < ROWS*COLS) {
      if (!((a%COLS)==0 && d == -1) && !((a%COLS)==(COLS-1) && d == 1)) {
        if (this.nodes[a].edges.includes(b)) return false;
        this.nodes[a].connectTo(this.nodes[b]);
        this.nodes[b].connectTo(this.nodes[a]);
        return true;
      }
    }
    return false;
  }
  addRandomConnection() {
    var a = floor(random(ROWS * COLS));
    let b = a+random ([-1, 1, COLS, -COLS]);
    return this.connect4way(a,b);
  } 
  count_reachable(){
    //xxyyzz
    var nStart = 0;
    //while (this.nodes[nStart]) { nStart++; }
    let que = [];
    let visited = new Array(this.nodes.length);
    visited.fill(false);

    que[0] = nStart; // enqueue the first vertex
    visited[nStart] = true; // and mark as visited

    while (que.length > 0) {
      var at = que.shift();
      print (at);
      for (var b in this.nodes[at].edges) {
        var nBro =  this.nodes[at].edges[b];
        if (visited[nBro] == false) {
          que.push(nBro);
          visited[nBro] = true;
        }
      }
    }

    return visited.filter(Boolean).length;
  }
}

class BaseNode {
  constructor (x, y, type) {
    this.x = x;
    this.y = y;
    this.n = xy2n(x,y);
    this.type = type;
    this.edges = []; // neighbors
  }
  show () {
    const cType2Color = ['black','red','green','yellow','blue','magenta','cyan','white'];
    stroke(0);
    strokeWeight(1);
    fill(cType2Color[1+ (this.type % (cType2Color.length-2))]);
    rect(this.x*DIM, this.y*DIM, DIM, DIM);

    //label
    strokeWeight(1);
    stroke(255);
    fill(255);
    textSize(12);
    text(this.n, this.x*DIM+DIM/4, this.y*DIM+DIM/4);
  }
  connectTo(n) {
    if (!this.edges.includes(n)) {// check that it is not there
      this.edges.push (n);
      return true;
    }
    return false;

  }
  showEdges() {
    stroke(0);
    strokeWeight(5);
    let ax = this.x * DIM + DIM/2;
    let ay = this.y * DIM + DIM/2;
    for (var e in this.edges) {
      let ex = this.edges[e].x * DIM + DIM/2;
      let ey = this.edges[e].y * DIM + DIM/2;
      line (ax, ay, ex, ey);
    }
  }
}


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function primMST() {
  const V = ROWS * COLS;
  gPrimPath = new Array(gWorld.length).fill(-1);; // the mst
  let key = new Array(gWorld.length).fill(Infinity); // key values to pick min wt edge
  let inMST = new Array(gWorld.length).fill(false);
  let lowWt, lowN, lowP;

  key[0] = 0; // random start
  gPrimPath[0] = 0; // first node is the root
  inMST[0] = true;

  for (var count=0; count < gWorld.length; count++) { // know we do this r*c times
  //for (var count=0; count < 4; count++) { // know we do this r*c times

    // cycle through all the nodes in the mst and find the lowest cost path
    lowWt = Infinity; // low path cost
    lowN = -1; // low next node
    lowP = -1; // low gPrimPath
    for (var v=0; v < inMST.length; v++) { 
      if (inMST[v]) { // look only at nodes in the mst
        for (let i=0; i < gWorld[v].bros.length; i++) {
          let n = gWorld[v].bros[i].n;
          //print ("looking at ", v, n, gWorld[v].bros[i].w);
          if (inMST[n] == false && gWorld[v].bros[i].w < lowWt) {
            lowWt = gWorld[v].bros[i].w;
            lowN = n;
            lowP = v;
          }
        }
      }
    }
    gPrimPath[lowN] = lowP; 
    key[lowN] = lowWt;
    inMST[lowN] = true;
  } // for count
  let sum = 0;
  for (var k=0; k < key.length; k++) { sum += key[k]; }
  return (sum);
}

function drawPrim() {
  strokeWeight(5);
  stroke('yellow');
  for (var j=1; j < gPrimPath.length; j++) { // skip first
    let a = n2xy(j);
    let b = n2xy(gPrimPath[j]);
    line (a.x*DIM+DIM/2, a.y*DIM+DIM/2, b.x*DIM+DIM/2, b.y*DIM+DIM/2);
  }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function manhatten_dist(a, b) {
  let axy = n2xy(a);
  let bxy = n2xy(b);
  return abs(axy.x - bxy.x) + abs(axy.y - bxy.y);
}
function astar_path(bgn, end) {
  let pq = []; // priority queue
  let dist = new Array(gWorld.length).fill(Infinity); // dist init to inf
  let prev = new Array(gWorld.length).fill(-1); // dist init to inf
  let closed = new Array(gWorld.length).fill(false);
  let tt=1;

  pq.push([0, bgn]);
  dist[bgn] = 0;
  closed[bgn] = true;

  while (pq.length > 0 && closed[end]==false) {
    let u = pq[0][1];
    pq.shift();
    prev[bgn] = bgn;
    closed[u] = true; // visiting this node

    for (let i=0; i < gWorld[u].bros.length; i++) {
      let v = gWorld[u].bros[i].n;
      let wt = gWorld[u].bros[i].w;
      let heur = manhatten_dist(v, gWorld[u].n);
      wt += heur;

      if (dist[v] > dist[u] + wt) {
        dist[v] = dist[u] + wt;
        pq.push([dist[v], v]);
        prev[v] = u;
        pq.sort((a,b) => {
          if (a[0] == b[0]) return a[1] - b[1];
          return a[0] - b[0];
        });
      }
    }
    // print (tt, "PQ: ", pq);
    tt++;
    //my_array_print(dist, "Wt Dist");
  }
  let path = [];
  path.push(end);
  let at = end;
  while (prev[at] != bgn) {
    at = prev[at];
    path.push(at);
  }
  // my_array_print(dist, "Final Wt Dist");
  let unvisited = 0;
  for (uv in closed) {
    unvisited += closed[uv] ? 0 : 1;
  }
  print ("Unvisited = ", unvisited);
  return path;
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function dijkstra_path(bgn, end) {
  let pq = []; // priority queue
  let dist = new Array(gWorld.length).fill(Infinity); // dist init to inf
  let prev = new Array(gWorld.length).fill(-1); // dist init to inf

  pq.push([0, bgn]);
  dist[bgn] = 0;

  while (pq.length > 0) {
    let u = pq[0][1];
    pq.shift();
    prev[bgn] = bgn;

    for (let i=0; i < gWorld[u].bros.length; i++) {
      let v = gWorld[u].bros[i].n;
      let wt = gWorld[u].bros[i].w;

      if (dist[v] > dist[u] + wt) {
        dist[v] = dist[u] + wt;
        pq.push([dist[v], v]);
        prev[v] = u;
        pq.sort((a,b) => {
          if (a[0] == b[0]) return a[1] - b[1];
          return a[0] - b[0];
        });
      }
    }
  }
  let path = [];
  path.push(end);
  let at = end;
  while (prev[at] != bgn) {
    at = prev[at];
    path.push(at);
  }
  //my_array_print(dist, "Wt Dist");
  return path;
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function breath_first(nStart) {
  let que = [];
  let visited = new Array(gWorld.length);
  let prev = new Array(gWorld.length);
  visited.fill(false);
  prev.fill(-1);

  que[0] = nStart; // enqueue the first vertex
  visited[nStart] = true; // and mark as visited

  while (que.length > 0) {
    var at = que.shift();
    for (var b in gWorld[at].bros) {
      var nBro =  gWorld[at].bros[b].n;
      if (visited[nBro] == false) {
        que.push(nBro);
        visited[nBro] = true;
        prev[nBro] = at;
      }
    }
  }
  return prev;
}

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

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function set_hlite(lst, v) {
  lst.forEach( (n)=> {
    gWorld[n].hilite = v;
  });
}

function clear_all_hilite() {
  gWorld.forEach( (n)=> {
    n.hilite = 0;
  });
}

function build_random_road_from(a, type) {
  let mytype = type==null ? floor(random(Node.crayRoad.length)) : type;
  let at = n2xy(a);
  let dxy = random ([[-1,0], [0,-1], [0,1],[1,0]]);
  let nx = at.x + dxy[0];
  let ny = at.y + dxy[1];
  if (nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS) {
    let nb = xy2n(nx,ny);
    let t = mytype;
    build_road(a, nb, t);
  }
}

function build_road(a,b, ty) {
  // build a road between node and node b
  let type = ty;
  let xd = abs(a.x - b.x);
  let yd = abs(a.y - b.y);
  if (xd > 1 || yd > 1) return -1; // error
  let j = 0;
  let dex = -1;
  if (ty < 0) ty = 0;
  // check if road exists or not
  gWorld[a].bros.forEach( (bro)=> {
    if (bro.n == b) dex = j; 
    j++;
  });
  if (dex == -1) {
    let roadWt = type*10+1;// (2*type+1)
    gWorld[a].bros.push({n:b, t:type, w:roadWt});
    gWorld[b].bros.push({n:a, t:type, w:roadWt});
  }
}

function count_reachable(){
  //xxyyzz
  var nStart = 0;
  while (gWorld[nStart].wall) { nStart++; }
  let que = [];
  let visited = new Array(gWorld.length);
  visited.fill(false);

  que[0] = nStart; // enqueue the first vertex
  visited[nStart] = true; // and mark as visited

  while (que.length > 0) {
    var at = que.shift();
    for (var b in gWorld[at].bros) {
      var nBro =  gWorld[at].bros[b].n;
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

/***** cme Utilities ***** ***** ***** ***** ***** ***** ***** ***** *****/

function xy2n(x, y) {return (COLS*y+x); }
function n2xy(n) {return {x:n%COLS, y:floor(n/COLS)};}
function isValidxy(x,y) {return (x >= 0 && x < COLS && y >= 0 && y < ROWS); }
function cmeRandomColor () { return '#' + (((1<<24)*Math.random()) | 0).toString(16).padStart(6, 0); }
function cmeInt2Letter(n) { return String.fromCharCode(("A".charCodeAt(0))+n); }

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

// INIT
function init_simulation() {
  gLand = new Graph(ROWS, COLS);
  var n=60;
  while (n >= 0) {
    if (gLand.addRandomConnection()) n--;
  }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function my_array_print(arr, name) {
  let n=0;
  print (name);
  while (n < arr.length) {
    let msg = ""
    for (let j=0; j < COLS; j++) {
      msg += '(' + n + ':' + arr[n] +")   ";
      //msg += `|${n.toString().padStart(4)}:${arr[n].toString().padStart(4)}`;
      n++;
    }
    //print (msg+" |");
    print (msg);
  }
}

//KEY KK
function keyPressed() { 
  if (key === 'p') { print (gLand.nodes[9]); }
  if (key === 'R') init_simulation();

  /***
  if (key === 'm') {
    let cost = primMST();
    print ("MST cost = ", cost);
    bPrim = true;
  }
  if (key === 'M') bPrim = !bPrim;
  if (key === 'a') {
    clear_all_hilite();
    let path = astar_path(gBgn, gEnd);
    set_hlite(path, 5);
    gWorld[gBgn].hilite = 2; gWorld[gEnd].hilite = 3;
  }
  if (key === 'd') {
    clear_all_hilite();
    let path = dijkstra_path(gBgn, gEnd);
    set_hlite(path, 4);
    gWorld[gBgn].hilite = 2; gWorld[gEnd].hilite = 3;
  }
  if (key === 'e') {
    clear_all_hilite();
    gBgn = floor(random(ROWS*COLS));
    gEnd = gBgn;
    while (gEnd == gBgn) gEnd = floor(random(ROWS*COLS));
    //print (`Endpoints are ${gBgn} to ${gEnd}`);
    gWorld[gBgn].hilite = 2; gWorld[gEnd].hilite = 3;
  }
  if (key === 'f') {
    //breath_first(0);
    clear_all_hilite();
    let path = find_breadth_path(gBgn, gEnd);
    set_hlite(path, 1);
    gWorld[gBgn].hilite = 2; gWorld[gEnd].hilite = 3;
  }
  ***/
  if (key === 'c') print ("Reachable = ", gLand.count_reachable());
  loop();
}
function mousePressed() { 
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

  scratch();
  init_simulation();
}

function draw() {
  background(200);
  gLand.show();
  noLoop();
}
