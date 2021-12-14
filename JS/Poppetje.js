var gameWidth = screen.width - 500;
var gameHeight = screen.height - 500;
var backGroundColour = 'black';
var xCharacter = gameWidth*0.5;
var yCharacter = gameHeight*0.5;
var walkSpeed = 10;
var sprintSpeed = walkSpeed*2;
var crouchSpeed = walkSpeed*0.3;
var moveSpeed;
var playerSprite;
var playerSize = 25;
var backGround;

function preload() {
  playerSprite = loadImage('../JS/images/sprite-player.jpg')
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
  if(keyIsDown(83)) {
    yCharacter = yCharacter + moveSpeed;
  }
  if(keyIsDown(87)) {
    yCharacter = yCharacter - moveSpeed;
  }
  xCharacter = constrain(xCharacter, 0, gameWidth - playerSize);
  yCharacter = constrain(yCharacter, 0, gameHeight - playerSize);
}

