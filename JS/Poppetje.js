var gameWidth = screen.width*0.65;
var gameHeight = screen.height*0.65;
var playerSize = 75;
var backGroundColour = 'black';
var xCharacter = 0;
var yCharacter = gameHeight - playerSize;
var walkSpeed = 10;
var sprintSpeed = walkSpeed*2;
var crouchSpeed = walkSpeed*0.3;
var moveSpeed;
var playerSprite;
var backGround;
var gravity = 0.5;
var ySpeed = 0;
var jumpForce = 50;
function preload() {
  playerSprite = loadImage('../JS/images/MC_apple.png')
  backGround = loadImage('../JS/images/grasveld.jpg')
}
function setup() {
  createCanvas(gameWidth, gameHeight);
 
}
function draw() {
  background(backGround);
  moveCharacter();
  drawCharacter();
}
function drawCharacter() {
  image(playerSprite, xCharacter, yCharacter, playerSize, playerSize);
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
  if(yCharacter < gameHeight) {
    ySpeed = ySpeed + gravity;
  } else if(yCharacter == gameHeight) {
    ySpeed = 0;
  }
  if(keyIsDown(87) && yCharacter == gameHeight - playerSize) {
    ySpeed = -jumpForce;
  }
  yCharacter = yCharacter + ySpeed;
  if(xCharacter = -playerSize) {
    xCharacter = gameWidth + playerSize;
  } else if(xCharacter = playerSize + gameWidth) {
    xCharacter = -playerSize;
  }
 // xCharacter = constrain(xCharacter, 0 - playerSize, gameWidth);
  yCharacter = constrain(yCharacter, 0, gameHeight - playerSize);
}

