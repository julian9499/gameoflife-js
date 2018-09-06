var slider, lenslider, angle, lendecrease;
var img;
var cell = [];
var cellnext = [];
var state;
var dikte;
var pause = false;

function preload() {
  //img = loadImage('../assets/julien.jpg');
}

function setup() {
  createCanvas(800, 800);
  angle = 0;
  stroke(0);
  dikte = 10;


  for(let x = 0; x < width/dikte; x++){
    cell[x] = [];
    for(let y = 0; y < width/dikte; y++){
      cell[x][y] = false;
    }
  }

  for(let x = 0; x < width/dikte; x++){
    cellnext[x] = [];
    for(let y = 0; y < width/dikte; y++){
      cellnext[x][y] = false;
    }
  }

}



function draw() {
  background(51);
  var g = color('blue');
  var r = color('white');

if(!pause){
  for(let x = 0; x < width/dikte; x++){
    for(let y = 0; y < width/dikte; y++){
        cellnext[x][y] = gameoflife(checkneighbours(x,y), x, y)
      }
    }

    for(let x = 0; x < width/dikte; x++){
      for(let y = 0; y < width/dikte; y++){
          if(cellnext[x][y]){
            cell[x][y] = true;
          } else {
            cell[x][y] = false;
          }
        }
      }
    }

  for(let x = 0; x < width/dikte; x++){
    for(let y = 0; y < width/dikte; y++){
      if(cell[x][y]){
        fill(g);
        rect(x*dikte, y*dikte, dikte, dikte);
      } else {
        fill(r);
        rect(x*dikte, y*dikte, dikte, dikte);
      }
    }
  }


}

function clean(){
  for(let x = 0; x < width/dikte; x++){
    cellnext[x] = [];
    for(let y = 0; y < width/dikte; y++){
      cellnext[x][y] = false;
    }
  }
  for(let x = 0; x < width/dikte; x++){
    cell[x] = [];
    for(let y = 0; y < width/dikte; y++){
      cell[x][y] = false;
    }
  }
}

function sw(){
  if(pause) {
    pause = false;
  } else {
    pause = true;
  }
}

function checkneighbours(x, y){
  let ans = 0;
  if(x != width/dikte - 1 && cell[x+1][y]){
    ans++;
  }
  if(y != width/dikte - 1 && cell[x][y+1]){
    ans++;
  }
  if(y != width/dikte - 1 && x != width/dikte - 1 && cell[x+1][y+1]){
    ans++;
  }
  if(x != 0 && cell[x-1][y]){
    ans++;
  }
  if(y != 0 && cell[x][y-1]){
    ans++;
  }
  if(y != 0 && x != 0 && cell[x-1][y-1]){
    ans++;
  }
  if(y != 0 && x != width/dikte - 1 && cell[x+1][y-1]){
    ans++;
  }
  if(x != 0 && y != width/dikte - 1 && cell[x-1][y+1]){
    ans++;
  }
  return ans

  ;
}

function gameoflife(alive, x, y){
  if(cell[x][y]){
    if( alive > 1 && alive < 4){
      return true;
    }else{
      return false;
    }
  } else{
    if(alive == 3){
      return true;
    } else {
      return false;
    }
  }
}

function branch(len){
  if(len > 4){
    line(0,0,0,-len)
    translate(0, -len)
    push();
    rotate(PI/4);
    branch(len* 0.67);
    pop();
    push();
    rotate(-PI/4);
    branch(len* 0.67);
    pop();
  }
}

function keyPressed() {
}

function mousePressed(){
  print((mouseX - mouseX % dikte)/dikte);
  print((mouseY - mouseY % dikte)/dikte);
  let x = (mouseX - mouseX % dikte)/dikte;
  let y = (mouseY - mouseY % dikte)/dikte;
  if(cell[x][y]){
    cell[x][y] = false;
  }else{
  cell[x][y] = true;
}
  /*
  cell[x][y-2] = true;
  cell[x-1][y] = true;
  cell[x+1][y] = true;
  cell[x+1][y-1] = true;
  */

}
