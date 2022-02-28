var level = 0;
var gameWidth = screen.width*0.8;
var gameHeight = screen.height*0.8;
var floorHeight;
var playerSize = 75;
var backGroundColour = 'black';
var xCharacter = 200;
var yCharacter = gameHeight - 200;
var enemy;
var xObstacles = [
  [],
  [],
  [],
  []
];
var yObstacles = [
  [],
  [],
  [],
  []
];
var obsWidth = [
  [],
  [],
  [],
  []
];
var obsHeight = [
  [],
  [],
  [],
  []
];
var obsCollision = [
  [],
  [],
  [],
  []
]
var walkSpeed = 10;
var sprintSpeed = walkSpeed*2;
var crouchSpeed = walkSpeed*0.3;
var moveSpeed;
var playerSprite;
var backGround;
var gravity = 0.5;
var ySpeed = 0;
var jumpForce = 15;
var topFloor;
var levelComplete = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false
]
var xEnemy = [
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500
]
var yEnemy = [
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500
]
var enemySize = [
  100,
  100,
  100,
  100,
  100,
  100,
  100,
  100,
  100,
  100
]
function preload() {
  playerSprite = loadImage('../JS/images/MC_apple.png');
  backGround = [loadImage('../JS/images/background.png'), loadImage('../JS/images/background.png')]
  obstacle = [
    [loadImage('../JS/images/wall.jpg'), loadImage('../JS/images/wall.jpg'), loadImage('../JS/images/wall.jpg')],
    [],
    [],
    []
  ]
  enemy = [
    loadImage('../JS/images/EV_pizza.png'),
    loadImage('../JS/images/EV_fries.png'),
    loadImage('../JS/images/EV_candy_cane.png'),
    loadImage('../JS/images/EV_pizza.png'),
    loadImage('../JS/images/EV_pizza.png'),
    loadImage('../JS/images/EV_pizza.png'),
    loadImage('../JS/images/EV_pizza.png'),
    loadImage('../JS/images/EV_pizza.png'),
    loadImage('../JS/images/EV_pizza.png'),
    loadImage('../JS/images/EV_pizza.png')
  ]
}

// this creates the measures of the game
function setup() {
  createCanvas(gameWidth, gameHeight);
}

// the code will draw all the background images
function draw() {
  background(backGround[level]);
  drawObstacles();
  checkObstacles();
  moveCharacter();
  drawCharacter();
  drawEnemy();
}

function drawEnemy() {
  if (levelComplete[level] == false) {
    image(enemy[level], xEnemy[level], gameHeight - yEnemy[level], enemySize[level, enemySize[level]);
  }
}
// this code draws the apple-character
function drawCharacter() {
  image(playerSprite, xCharacter, yCharacter - playerSize, playerSize, playerSize);
}


function drawObstacles() {
  for(i = 0; i < xObstacles[level].length; i++) {
    image(obstacle[level][i], xObstacles[level][i], gameHeight - yObstacles[level][i] - obsHeight[level][i], obsWidth[level][i], obsHeight[level][i]);
  }
}

function checkObstacles() {
  for(i = 0; i < xObstacles.length; i++) { 
    if(xCharacter <= xObstacles[level][i] + obsWidth[level][i] && 
       xCharacter >= xObstacles[level][i] - playerSize && 
       yCharacter >= gameHeight - yObstacles[level][i] - obsHeight[level][i] - playerSize - 50 && 
       yCharacter <= gameHeight - yObstacles[level][i]) {
      floorHeight = gameHeight - yObstacles[level][i] - obsHeight[level][i];
      i = xObstacles.length;
    } else {
      floorHeight = gameHeight - 100;
    }
  }
  for(i = 0; i < xObstacles.length; i++) {
    if(xCharacter >= xObstacles[level][i] - playerSize * 1.3 && 
       xCharacter < xObstacles[level][i] + obsWidth[level][i] * 0.5 && 
       yCharacter >= gameHeight - yObstacles[level][i] - playerSize + 10 && 
       yCharacter <= gameHeight - yObstacles[level][i] + playerSize && 
       obsCollision[level][i] == true) {
      xCharacter = constrain(xCharacter, -10000, xObstacles[level][i] - playerSize);
    } else if(xCharacter <= xObstacles[level][i] + obsWidth[level][i] + playerSize && 
              xCharacter > xObstacles[level][i] + obsWidth[level][i] * 0.51 && 
              yCharacter >= gameHeight - yObstacles[level][i] - playerSize && 
              yCharacter <= gameHeight - yObstacles[level][i] + playerSize && 
              obsCollision[level][i] == true) {
      xCharacter = constrain(xCharacter, xObstacles[level][i] + obsWidth[level][i], 20000);
    }
  }
}

// this is how you can move the apple character
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
  } else if(yCharacter >= floorHeight) {
    ySpeed = 0;
    //yCharacter = floorHeight;
  }
  if(keyIsDown(87) && yCharacter >= floorHeight) {
    ySpeed = -jumpForce;
  }
  yCharacter = yCharacter + ySpeed;
  if(xCharacter <= 0 - playerSize) {
    xCharacter = gameWidth + playerSize;
    level--;
  } else if(xCharacter >= playerSize + gameWidth) {
    xCharacter = 0 - playerSize;
    level++
  }
  if(yCharacter > floorHeight && yCharacter < floorHeight + 5) {
    yCharacter = floorHeight;
  } else  if(yCharacter > floorHeight + 300) {
    yCharacter = floorHeight;
  }
  //yCharacter = constrain(yCharacter, 0, floorHeight - playerSize);
}

