var gameWidth = screen.width;
var gameHeight = screen.height - 300;
var backGroundColour = 'black';
var xCharacter = gameWidth*0.5;
var yCharacter = gameHeight*0.5;
var walkSpeed = 5;
var sprintSpeed = walkSpeed*1.25;
var crouchSpeed = walkSpeed*0.75;
var moveSpeed;
function setup() {
  createCanvas(gameWidth, gameHeight);
}
function draw() {
  background(backGroundColour);
  moveCharacter();
}
function drawCharacter() {
  fill('blue');
  ellipse(xCharacter, yCharacter, 50, 50);
}

function moveCharacter() {
  if(keyIsDown(17)) {
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
  
}
