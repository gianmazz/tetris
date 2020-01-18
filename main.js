
const moveTime = 30;
const dTime = 1;
const nPixel = 20;
const totRow = 20;
const totCol = 10;
const XG = 2 * nPixel;
const YG = 5 * nPixel;
const XS = 3 * nPixel;
const YS = 5 * nPixel;
let shapes;
let grid;
let stopFlag = false;

let angle = 0;
let pos_dx = 0;
let pos_dy = 0;
let time = 0;
let dt = dTime;

function setup(){

  createCanvas(600,600);

  grid = new Grid(XG, YG, nPixel, totCol, totRow);
  newShape();
}

function draw(){
  background(255);
  endGameCheck();
  if(stopFlag === true){
    noLoop();
  }
  controlPosition();
  shapes.update(pos_dx, pos_dy, angle);
  grid.draw(shapes.dimShape);
  shapes.draw();
  initialize();
  time += dt;
  //console.log(time);
  if (time >= moveTime){
    pos_dy = 1;
    time = 0;
    dt = dTime;
  }else{
    pos_dy = 0;
  }

  endGameCheck();
  
  
  
}

function newShape(){
  let stype = Math.floor(Math.random() * 7);
  shapes = new Shape(XS, YS, angle, stype, nPixel);
}

function initialize(){
  angle = 0;
  pos_dx = 0;
  pos_dy = 0;
}

function controlPosition(){
  let xmax = shapes.x;
  let ymax = shapes.y;
  let xmin = shapes.x + shapes.dimShape * shapes.nPixel;
  let ymin = shapes.y + shapes.dimShape * shapes.nPixel;
  for (let i = 0; i < shapes.dimShape; i++){
    let y = shapes.y + i * shapes.nPixel;
    for (let j = 0; j < shapes.dimShape; j++){
      let x = shapes.x + j * shapes.nPixel;
      if (shapes.form[i][j] === 1){
        if (x < xmin){
          xmin = x;
        }
        if (x > xmax){
          xmax = x;
        }
        if (y < ymin){
          ymin = y;
        }
        if (y > ymax){
          ymax = y;
        }
      }
    }
  }

  //console.log(xmin);
  //console.log(grid.x);
  //console.log(shapes);

  if (xmin < grid.x){
    shapes.x = shapes.x + shapes.nPixel;
  }

  if (xmax > grid.x + (grid.totCellsX - 1) * grid.nPixel){
    shapes.x = shapes.x - shapes.nPixel;
  }

  if (ymin < grid.y){
    shapes.y = shapes.y + shapes.nPixel;
  }

  if (ymax > grid.y + (grid.totCellsY - 1) * grid.nPixel){
    shapes.y = shapes.y - shapes.nPixel;
    grid.update(shapes, XG, YG);
    newShape();
    return;
  }

  let check = grid.check(shapes, XG, YG);
  //console.log(check);
  if (check === true){
    shapes.y = shapes.y - shapes.nPixel;
    grid.update(shapes, XG, YG);
    newShape();
  }

  grid.removeRows();

}

function endGameCheck(){
  for (let i = 0; i < grid.totCellsX; i++){
    if (grid.form[0][i] === 1){
      stopFlag = true;
      textSize(32);
      fill(0, 0 ,0);
      text('End Game', XG + 0.5 * totRow * nPixel, YG + 0.5 * totCol * nPixel);
    }
  }
}

function keyPressed() {
  //console.log(keyCode);
  if (keyCode === 32){ //BACKSPACE
    angle = 1;
  }else if (keyCode == LEFT_ARROW){
    pos_dx = -1;
  }else if (keyCode == RIGHT_ARROW){
    pos_dx = 1;
  }else if (keyCode == UP_ARROW){
    angle = 1;
  }else if (keyCode == DOWN_ARROW){
    //angle = -1;
    dt += 15 * dt;
  }
}

function keyTyped() {
  if (key === 's') {
    console.log('stop');
    if (stopFlag === false){
      stopFlag = true;
    }
  }
}

function mousePressed() {
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      angle = 1;
    }
    if (mouseButton === RIGHT) {
      angle = -1;
    }
    if (mouseButton === CENTER) {
      angle = -1;
    }
  }
}



