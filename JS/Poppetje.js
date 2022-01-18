var gameWidth = screen.width*0.8;
var gameHeight = screen.height*0.8;
var floorHeight;
var playerSize = 75;
var backGroundColour = 'black';
var xCharacter = 0;
var yCharacter = gameHeight - playerSize + 100;
var xObstacles = [1000];
var yObstacles = [0];
var obsWidth = [500];
var obsHeight = [100];
var walkSpeed = 10;
var sprintSpeed = walkSpeed*2;
var crouchSpeed = walkSpeed*0.3;
var moveSpeed;
var playerSprite;
var backGround;
var gravity = 0.5;
var ySpeed = 0;
var jumpForce = 15;
function preload() {
  playerSprite = loadImage('../JS/images/MC_apple.png');
  backGround = loadImage('../JS/images/grasveld.jpg');
  obstacle1 = loadImage('../JS/images/rots.jpg.jpg');
}
function setup() {
  createCanvas(gameWidth, gameHeight);
 
}
function draw() {
  background(backGround);
  drawObstacles();
  checkObstacles();
  moveCharacter();
  drawCharacter();
}
function drawCharacter() {
  image(playerSprite, xCharacter, yCharacter, playerSize, playerSize);
}
function drawObstacles() {
  for(i = 0; i < xObstacles.length; i++) {
    image(obstacle1, xObstacles[i], gameHeight - yObstacles[i] - obsHeight[i], obsWidth[i], obsHeight[i]);
  }
}
function checkObstacles() {
  for(i = 0; i < xObstacles.length; i++) { 
    if(xCharacter <= xObstacles[i] + obsWidth[i] && xCharacter >= xObstacles[i] - playerSize && yCharacter > yObstacles[i] + obsHeight[i]) {
      floorHeight = yObstacles[i]/* + obsHeight[i]*/;
    } else {
      floorHeight = 100;
    }
  }
}
function moveCharacter() {
  if(keyIsDown(32)) {
    moveSpeed = sprintSpeed;

  } else if(keyIsDown(16)) {
    moveSpeed = crouchSpeed;

  } else {
    moveSpeed = walkSpeed;

  }
  if(keyIsDown(68)) {
    xCharacter = xCharacter + moveSpeed;
  } 
  if(keyIsDown(65)) {
     xCharacter = xCharacter - moveSpeed;
  }
  if(yCharacter < floorHeight) {
    ySpeed = ySpeed + gravity;
  } else if(yCharacter == floorHeight) {
    ySpeed = 0;
  }
  if(/*keyIsDown(87) && */yCharacter == floorHeight - playerSize) {
    ySpeed = -jumpForce;
  }
  yCharacter = yCharacter + ySpeed;
  if(xCharacter <= 0 - playerSize) {
    xCharacter = gameWidth + playerSize;
  } else if(xCharacter >= playerSize + gameWidth) {
    xCharacter = 0 - playerSize;
  }
  //yCharacter = constrain(yCharacter, 0, floorHeight - playerSize);
}

