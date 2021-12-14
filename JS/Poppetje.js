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
  playerSprite = loadImage('images/sprite-player.jpg')
  backGround = loadImage('images/grasveld.jpg')
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
  image(playerSprite, xCharacter, yCharacter, 50, 50);
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
  } else if(keyIsDown(65)) {
     xCharacter = xCharacter - moveSpeed;
  } else if(keyIsDown(83)) {
    yCharacter = yCharacter + moveSpeed;
  } else if(keyIsDown(87)) {
    yCharacter = yCharacter - moveSpeed;
  }
}

