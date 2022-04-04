var level = 0;
var hp = 3;
var maxLevel = 30;
var gameWidth = screen.width*0.8;
var gameHeight = screen.height*0.8;
var floorHeight;
var playerSize = 75;
var backGroundColour = 'black';
var xCharacter = 200;
var yCharacter = gameHeight - 200;
var enemy;
var question;
var xObstacles = [
  200, 900
];
var yObstacles = [
 300, 300
];
var obsWidth = [
  400, 400
];
var obsHeight = [
150, 150
];
var obsCollision = [
true, true
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
var xEnemy = 500;
var yEnemy = 500;
var enemySize = 100;
var answerX = [
  300, 300, 1000, 1000
]

var answerY = [
 650, 300, 650, 300
  
]

var correctAnswer;
var word1;
var word2;
var word3;
var words = [
  ['chocolate', 'chocolade'],
  ['lime', 'limoen'],
  ['strawberry', 'aardbei'],
  ['garden', 'tuin']
]
var word;
function preload() {
  playerSprite = loadImage('../JS/images/MC_apple.png');
  backGround = [loadImage('../JS/images/background.png'), 
                loadImage('../JS/images/background.png'), 
                loadImage('../JS/images/background.png'), 
                loadImage('../JS/images/background.png'), 
                loadImage('../JS/images/background.png'), 
                loadImage('../JS/images/background.png'), 
                loadImage('../JS/images/background.png')]
  obstacle = [
    loadImage('../JS/images/wall.jpg'), loadImage('../JS/images/wall.jpg'), loadImage('../JS/images/wall.jpg'),
    loadImage('../JS/images/wall.jpg'), loadImage('../JS/images/wall.jpg'), loadImage('../JS/images/wall.jpg')
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
  randomWords();
}


function draw() {
  background(random(backGround));
  drawObstacles();
  checkObstacles();
  moveCharacter();
  drawEnemy();
  checkEnemy();
  drawText();
  drawCharacter();
}

function drawText() {
  if(levelComplete[level] == true) {
    textSize(100)
    text("CONGRATULATIONS, you're f@#*ing EPIC", 100, 100);
  } else if(levelComplete[level] == false) {
    textSize(30)
    text('Defeat the enemy!', 500, 100)
    textSize(50);
    text('What is "' + word[0] + '" in Dutch?', 500, 250);
  }
  textSize(30);
  text('health: ' + hp, 50, gameHeight - 100);
  text('level: ' + (level + 1), 50, gameHeight - 150);
  
  
}
function randomWords() {
  correctAnswer = floor(random(1, 5));
  word1 = random(words)[1];
  word2 = random(words)[1];
  word3 = random(words)[1];
}
function drawEnemy() {
  if (levelComplete[level] == false) {
    image(enemy[level], xEnemy[level], gameHeight - yEnemy[level], enemySize[level], enemySize[level]);
    rect(answerX[0], answerY[0], 200, 100);
    rect(answerX[1], answerY[1], 200, 100);
    rect(answerX[2], answerY[2], 200, 100);
    rect(answerX[3], answerY[3], 200, 100);
    textSize(30)
    if(level > words.length) {
      word = random(words);
    } else if(level <= words.length) {
      word = words[level];
    }
    
    if(correctAnswer == 1) {
      text(word[1], answerX[0] + 5, answerY[0] + 50);
      text(word1, answerX[1] + 5, answerY[1] + 50);
      text(word2, answerX[2] + 5, answerY[2] + 50);
      text(word3, answerX[3] + 5, answerY[3] + 50);
    } else if(correctAnswer == 2) {
      text(word1, answerX[0] + 5, answerY[0] + 50);
      text(word[1], answerX[1] + 5, answerY[1] + 50);
      text(word2, answerX[2] + 5, answerY[2] + 50);
      text(word3, answerX[3] + 5, answerY[3] + 50);
    } else if(correctAnswer == 3) {
      text(word1, answerX[0] + 5, answerY[0] + 50);
      text(word2, answerX[1] + 5, answerY[1] + 50);
      text(word[1], answerX[2] + 5, answerY[2] + 50);
      text(word3, answerX[3] + 5, answerY[3] + 50);
    } else if(correctAnswer == 4) {
      text(word1, answerX[0] + 5, answerY[0] + 50);
      text(word2, answerX[1] + 5, answerY[1] + 50);
      text(word3, answerX[2] + 5, answerY[2] + 50);
      text(word[1], answerX[3] + 5, answerY[3] + 50);
    }
  }
}

function drawCharacter() {
  image(playerSprite, xCharacter, yCharacter - playerSize, playerSize, playerSize);
}


function drawObstacles() {
  for(i = 0; i < xObstacles.length; i++) {
    image(obstacle[i], xObstacles[i], gameHeight - yObstacles[i] - obsHeight[i], obsWidth[i], obsHeight[i]);
  }
}

function checkObstacles() {
  for(i = 0; i < xObstacles.length; i++) { 
    if(xCharacter <= xObstacles[i] + obsWidth[i] && 
       xCharacter >= xObstacles[i] - playerSize && 
       yCharacter >= gameHeight - yObstacles[i] - obsHeight[i] - playerSize - 50 && 
       yCharacter <= gameHeight - yObstacles[i]) {
      floorHeight = gameHeight - yObstacles[i] - obsHeight[i];
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

function checkEnemy() {
  for(i = 0; i < answerX.length; i++) {
    if(xCharacter < answerX[i] + 175 && 
       xCharacter > answerX[i] - 75 && 
       yCharacter > answerY[i] - 75 && 
       yCharacter < answerY[i] + 175) {
      if(i == correctAnswer) {
        levelComplete[level] = true;
        i = 100;
      } else if(i != correctAnswer) {
        hp--;
        //xCharacter = 650;
        //yCharacter = 600;
        if(hp == 0) {
          for(i = 0; i <= level; i++) {
            levelComplete[i] = false;
          }
          level = 0;
          hp = 3;
        }
        
      }
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
    if(level > 0 && levelComplete[level] == true) {
      level--;
    }
  } else if(xCharacter >= playerSize + gameWidth) {
    xCharacter = 0 - playerSize;
    if(levelComplete[level] == true) {
      level++;
      randomWords();
    }
  }
  if(yCharacter > floorHeight && yCharacter < floorHeight + 5) {
    yCharacter = floorHeight;
  } else  if(yCharacter > floorHeight + 300) {
    yCharacter = floorHeight;
  }
  //yCharacter = constrain(yCharacter, 0, floorHeight - playerSize);
}

