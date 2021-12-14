var gameWidth = screen.width;
var gameHeight = screen.height - 300;
var backGroundColour = 'black';
var xCharacter = gameWidth*0.5;
var yCharacter = gameHeight*0.5;
var walkSpeed = 4;
var sprintSpeed = walkSpeed*1.5;
var crouchSpeed = walkSpeed*0.5;
var moveSpeed;
function setup() {
  createCanvas(gameWidth, gameHeight);
}
function draw() {
  background(backGroundColour);
  moveCharacter();
  drawCharacter();
}
function drawCharacter() {
  fill('brown');
  ellipse(xCharacter, yCharacter, 50, 50);
}

function moveCharacter() {
  if(keyIsDown(17)) {
    moveSpeed = sprintSpeed;
    return false;
  } else if(keyIsDown(16)) {
    moveSpeed = crouchSpeed;
    return false;
  } else {
    moveSpeed = walkSpeed;
    return false;
  }
   function keyPressed() {
   if(keyCode === 68) {
     xCharacter = xCharacter + moveSpeed;
   } else if(keyCode === 65) {
     xCharacter = xCharacter - moveSpeed;
   } else if(keyCode === 83) {
     yCharacter = yCharacter + moveSpeed;
   } else if(keyCode === 87) {
     yCharacter = yCharacter - moveSpeed;
  }
    return false;
  }
  //keyPressed();
}

