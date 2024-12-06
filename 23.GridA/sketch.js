// 23.Grid World A
// Grids and graphs experiements 
// Nodes and roads separate, but pointers to roads in the nodes
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

const DIM =  100;
let COLS, ROWS;
let gGraph;
let gMover;
let gSpawn;


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function scratch() {
  /*** ****
  console.log("Scratch ---------------------------------");
  const names = ["alpha", "bravo", "charlie", "delta"];
  print(names.findIndex(a => a == "bravo"))
  const objs = [{x:1, y:1},{x:2, y:4},{x:3, y:9},{x:4, y:16}]
  print(objs.findIndex(a => a.x == 3));
  print(objs.findIndex(a => a.y == 3));
  console.log("-----------------------------------------");
  **** ***/
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class Mover {
  constructor (name, graph, atNode) {
    this.name = name;
    this.graph = graph;
    this.atNode = atNode;
    this.clr = 'blue';
    this.dim = 8;
    this.dir = 8;
    this.x = graph.getNode(atNode).x;
    this.y = graph.getNode(atNode).y;
    this.tgtx = null;
    this.tgty = null;
    this.path = [];
  }
  setPathToRandom() {
    var a = this.atNode;
    var b = a;
    while (b == a) b = floor(random(0,gGraph.dim));

    this.setPathToTarget(b);
    print ("Moving to " + this.tgtNode);
    //print ("Path edited "+ a+ " to "+ b+ " = " + this.path);
  }
  setTargetNode(node) {
    this.tgtNode = node;
    this.tgtx = this.graph.getNode(node).x;
    this.tgty = this.graph.getNode(node).y;
    if (this.tgtx < this.x) this.dir = 4;
    if (this.tgtx > this.x) this.dir = 6;
    if (this.tgty < this.y) this.dir = 8;
    if (this.tgty > this.y) this.dir = 2;
  }
  setPathToTarget(tgtNode) {
    var a = this.atNode;
    var b = tgtNode;
    this.tgtNode = tgtNode;

    this.path = gGraph.path2name(gGraph.bfsPath(a, b));
    this.path.shift() // we are at this node
    print ("Path edited "+ a+ " to "+ b+ " = " + this.path);
  }
  setNextPathNode() {
    if (this.path.length == 0) return;
    var tgt = this.path.shift();
    var dx = this.x - gGraph.getNode(tgt).x;
    var dy = this.y - gGraph.getNode(tgt).y;
    this.setTargetNode(tgt);
    //print ("Set Direction ", tgt, dx, dy, this.dir);
  }
  isAtTarget() {
    return (this.x == this.tgtx && this.y == this.tgty);
  }
  debugPrint() {
    print ("Path: " + this.path);
  }
  update() {
    if (this.tgtx == null || this.tgty == null) return;
    if (this.x != this.tgtx || this.y != this.tgty) {
      switch (this.dir) {
        case 8: this.y--; break;
        case 6: this.x++; break;
        case 2: this.y++; break;
        case 4: this.x--; break;
      }
    }
    else {
      var newNode = gGraph.findNodeAt(this.x, this.y); 
      if (newNode != this.atNode) {
        this.atNode = newNode;
        print ("Now at node ", this.atNode);
      }
    }
  }
  show() {
    //const node = this.graph.getNode(this.atNode);
    push();
    translate(this.x, this.y);
    switch (this.dir) {
      case 6: rotate(PI/2); break;
      case 2: rotate(PI  ); break;
      case 4: rotate(-PI/2); break;
    }
    noStroke();
    fill(this.clr);
    triangle(-this.dim,this.dim, this.dim,this.dim, 0,-this.dim);
    //circle(0,0,4);
    pop();
  }
}


class Brain extends Mover {
  constructor (name, graph, atNode) {
    super (name, graph, atNode);
    this.clr = 'green';
    this.clr2 = 'yellow'
    super.setPathToRandom();
    super.setNextPathNode();
  }
  show() {
    //const node = this.graph.getNode(this.atNode);
    push();
    translate(this.x, this.y);
    switch (this.dir) {
      case 6: rotate(PI/2); break;
      case 2: rotate(PI  ); break;
      case 4: rotate(-PI/2); break;
    }
    noStroke();
    fill(this.clr);
    triangle(-this.dim,this.dim, this.dim,this.dim, 0,-this.dim);
    fill(this.clr2);
    circle(0,0,4);
    pop();
  }
  update() {
    super.update();
    if (super.isAtTarget()) {
      this.atNode = gGraph.findNodeAt(this.x, this.y); 
      if (this.path.length == 0) {
        super.setPathToRandom();
        super.setNextPathNode();
      }
      else {
        super.setNextPathNode();
      }
    }
  }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class Node {
  constructor (name, x,y) {
    this.name = String(name); // name or number id
    this.x = x; // x pos
    this.y = y; // y
    this.edges = []; // what nodes are adjacent
  }
  show() {
    push();
    translate (this.x, this.y);
    stroke(0);
    strokeWeight(1);
    noFill();
    circle(0, 0, DIM);

    // label
    strokeWeight(1);
    stroke(255);
    fill(255);
    textSize(14);
    //let xx = -(this.name.length)*DIM/2/16;
    let xx = -(this.name.length)*DIM/2/4;
    text(this.name, xx, -DIM/8);
    pop();
  }
  debugPrint() {
    console.log(`N[${this.name}] at (${this.x},${this.y}) edges=[${this.edges}]`);
  }
}

class City extends Node {
  constructor (n, x,y) {
    super (n, x, y);
  }
  show() {
    push();
    translate (this.x, this.y);
    stroke('grey');
    strokeWeight(3);
    fill('grey');
    circle(0, 0, DIM);
    pop();
  }
}

class Graph {
  constructor (dim) {
    this.dim = 0;
    this.nodes = [];
  }
  getNode(name) {
    return this.nodes[name];
  }
  findNodeAt(x, y) {
    for (var node of this.nodes) {
      if (node.x == x && node.y == y) {return node.name;}
    }
    return null;
  }
  addNode (node) {
    this.nodes.push(node);
    this.dim++;
  }
  addEdge(v,w) {
    if (!this.nodes[v].edges.includes(w)) this.nodes[v].edges.push(w);
    if (!this.nodes[w].edges.includes(v)) this.nodes[w].edges.push(v);
    return 1;
  }
  addEdgeByName(an,bn) {
    let aj = this.nodes.findIndex(n => n.name == an);
    let bj = this.nodes.findIndex(n => n.name == bn);
    if (aj == -1 || bj == -1) return -1;
    return this.addEdge(aj,bj);
  }
  show () {
    // draw the nodes
    for (var node of this.nodes) {
      if (node) node.show();
    }
    // draw the edges
    /***/
    for (var node of this.nodes) {
      if (node) {
        for (var edge of node.edges) {
          stroke('red'); strokeWeight(3); noFill();
          line(node.x, node.y, this.nodes[edge].x, this.nodes[edge].y);
          fill('yellow'); noStroke();
          circle(node.x, node.y, 8);
        }
      }
    }
    /***/
  }
  debugPrint() {
    for (var node of this.nodes) {
      if (node) {
        node.debugPrint();
      }
    }
  }
  bfs(start) {
    // Breath First Search
    // checks if all the nodes are reachable
    // start node can be arbitrary if checking for completeness
    // my version returns the number of nodes visited
    let visited = new Array(this.dim).fill(false);
    let queue = []; // the frontier

    // init the search
    visited[start] = true;
    queue.push(start);

    while (queue.length > 0) {
      const curr = queue.shift(); // pop front of q

      //console.log("current = " + curr + " ", queue);

      for (const edge of this.nodes[curr].edges) {
        if (!visited[edge]) {
          visited[edge] = true;
          queue.push(edge);
        }
      }
    }
    return visited.filter(Boolean).length;
  }
  isComplete() {
    return this.bfs(0) == this.dim;
  }
  bfsPath(bgn, end) {
    let visited = new Array(this.dim).fill(false);
    let queue = []; // the frontier
    let prev = new Array(this.dim).fill(null);

    // init the search
    visited[bgn] = true;
    queue.push(bgn);

    while (queue.length > 0) {
      const curr = queue.shift(); // pop front of q

      //console.log("current = " + curr + " ", queue);

      for (const edge of this.nodes[curr].edges) {
        if (!visited[edge]) {
          visited[edge] = true;
          queue.push(edge);
          prev[edge] = curr;
          if (edge == end) {
            let path = []; let pathName = [];
            let at = end;
            while (prev[at] != null) {
              path.push(at); pathName.push(this.nodes[at].name);
              at = prev[at];
            }
            path.push(bgn); pathName.push(this.nodes[bgn].name);
            return path.reverse();;
            //return pathName.reverse();;
          }
        }
      }
    }
    return [];
  }
  path2name(path) {
    var rtn = [];
    for (var p in path) {
      rtn.push(this.nodes[path[p]].name);
    }
    return rtn;
  }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

/***** cme Utilities ***** ***** ***** ***** ***** ***** ***** ***** *****/

function xy2n(x, y) {return (COLS*y+x); }
function n2xy(n) {return {x:n%COLS, y:floor(n/COLS)};}
function isValidxy(x,y) {return (x >= 0 && x < COLS && y >= 0 && y < ROWS); }
function cmeRandomColor () { return '#' + (((1<<24)*Math.random()) | 0).toString(16).padStart(6, 0); }
function cmeInt2Letter(n) { return String.fromCharCode(("A".charCodeAt(0))+n); }

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

// INIT
function init_simulation() {
  var n, x, y;
  gGraph = new Graph(ROWS*COLS);
  init_simulation_grid();
  //init_simulation_simple();
  init_hardcode();
  gMover = new Mover ("alp", gGraph, 0);
  gSpawn = new Brain ("beta", gGraph, 7);
}

function init_hardcode() {
  gGraph.addEdgeByName(0,1);
  gGraph.addEdgeByName(1,2);
  gGraph.addEdgeByName(2,3);
  gGraph.addEdgeByName(3,4);
}

function init_simulation_simple() {
  n=0; x = 1; y=1; gGraph.addNode(new Node("A", (x*DIM)+(DIM/2), (y*DIM)+DIM/2));
  n=1; x = 3; y=0; gGraph.addNode(new Node("B", (x*DIM)+(DIM/2), (y*DIM)+DIM/2));
  n=2; x = 5; y=1; gGraph.addNode(new Node("C", (x*DIM)+(DIM/2), (y*DIM)+DIM/2));
  n=3; x = 1; y=4; gGraph.addNode(new Node("D", (x*DIM)+(DIM/2), (y*DIM)+DIM/2));
  n=4; x = 3; y=4; gGraph.addNode(new Node("E", (x*DIM)+(DIM/2), (y*DIM)+DIM/2));
  n=5; x = 5; y=4; gGraph.addNode(new Node("F", (x*DIM)+(DIM/2), (y*DIM)+DIM/2));
  //n=6; x = 7; y=2; gGraph.addNode(n, new Node(n, (x*DIM)+(DIM/2), (y*DIM)+DIM/2));

  gGraph.addEdgeByName("A", "B");
  gGraph.addEdgeByName("A", "D");
  gGraph.addEdgeByName("A", "E");
  gGraph.addEdgeByName("B", "C");
  gGraph.addEdgeByName("C", "E");
  gGraph.addEdgeByName("C", "F");
  gGraph.addEdgeByName("D", "E");
  gGraph.addEdgeByName("E", "F");
}

function init_simulation_grid() {
  var n = 0;
  for (var y=0; y < ROWS; y++) {
    for (var x=0; x < COLS; x++) {
      gGraph.addNode(new Node(n, (x*DIM)+(DIM/2), (y*DIM)+DIM/2));
      n++;
    }
  }
  //init_simulation_full_edge();
  init_simulation_grid_rand();
}

//function xy2n(x, y) {return (COLS*y+x); }
//function n2xy(n) {return {x:n%COLS, y:floor(n/COLS)};}
//function isValidxy(x,y) {return (x >= 0 && x < COLS && y >= 0 && y < ROWS); }

function init_simulation_grid_rand() {
  const nd = [-1,-COLS,1,COLS];

  while (!gGraph.isComplete()) {
    var a = floor(random(ROWS*COLS));
    var axy = n2xy(a);
    var del =  random(nd);
    var b = a+del;
    var bxy = n2xy(b);
    if (isValidxy(bxy.x, bxy.y) 
      && ((axy.x==bxy.x && axy.y!=bxy.y) || (axy.x!=bxy.x && axy.y==bxy.y) )) {
      gGraph.addEdgeByName(a, a+del);
    }
    //else { print ("nope", a, axy, b, bxy); }
  }
}

function init_simulation_full_edge() {
  for (var y=0; y < ROWS; y++) {
    for (var x=1; x < COLS; x++) {
      gGraph.addEdgeByName(x+(y*COLS),x-1+(y*COLS));
    }
  }
  for (var x=0; x < COLS; x++) {
    for (var y=1; y < ROWS; y++) {
        gGraph.addEdgeByName(x+(y*COLS),(x+(y-1)*COLS));
    }
  }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

//KEY KK
function keyPressed() { 
  if (key === 'R') init_simulation();
  else if (key === 's') { 
    gMover.setPathToTarget(39);
    gMover.setNextPathNode();
  }
  else if (key === 'r') { 
    gMover.setPathToRandom();
    gMover.setNextPathNode();
  }

  else if (key === '1') print(gGraph.getNode(1));
  else if (key === 'p') gGraph.debugPrint();
  else if (key === 'b') print("Visited=" + gGraph.bfs(0));
  else if (key === 'B') print("Complete=" + gGraph.isComplete());
  else if (key === 'f') print (gGraph.path2name(gGraph.bfsPath(3, 2)));
  else if (key === 'F') {
    var a = floor(random(0,gGraph.dim));
    var b = a;
    while (b == a) b = floor(random(0,gGraph.dim));
    print ("Path from "+ a+ " to "+ b+ " = " + gGraph.path2name(gGraph.bfsPath(a, b)));
  }
  else if (key === 'm') {for (var j=0; j < 10; j++) {gMover.update()}}
  else if (key === 'Shift') ;
  else print ('unhandled key', key);

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
  textFont('Gill Sans');

  createCanvas(800, 500);
  COLS = floor(width / DIM);
  ROWS = floor(height / DIM);

  scratch();
  init_simulation();
}

function draw() {
  background(200);
  gGraph.show();
  gMover.show();
  gMover.update();
  if (gMover.isAtTarget()) {
    gMover.setNextPathNode();
  }
  gSpawn.show();
  gSpawn.update();
  //noLoop();
}
