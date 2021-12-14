var gameWidth = screen.width;
var gameHeight = screen.height - 300;
var backGroundColour = 'black';
var xCharacter = gameWidth*0.5;
var yCharacter = gameHeight*0.5;
var walkSpeed = 4;
var sprintSpeed = walkSpeed*1.5;
var crouchSpeed = walkSpeed*0.5;
var moveSpeed;
var playerSprite;
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
  image(playerSprite, xCharacter, yCharacter, 75, 75);
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
  xCharacter = constrain(xCharacter, 0, gameWidth - playerSprite.width);
  yCharacter = constrain(yCharacter, 0, gameHeight - playerSprite.height);
}

