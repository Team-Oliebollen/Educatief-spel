//Het begin van de code, we gaan lekker variabelen declareren, kom je mee?
//hier hebben we wat basisvariabelen, zoals het level, het hoogste aantal mogelijke levels, de breedte en hoogte van de game, enz.
var level = 0;
var hp = 3;
var maxLevel = 40;
var gameWidth = screen.width*0.8;
var gameHeight = screen.height*0.8;
var floorHeight;
var playerSize = 75;
var backGroundColour = 'black';
var xCharacter = 200;
var yCharacter = gameHeight - 200;
var enemy;
var question;
var playerSprite;

//hier zijn wat basiswaarden voor de obstakels waar je op kunt staan in het spel
var xObstacles = [
  150, 850
];
var yObstacles = [
 250, 250
];
var obsWidth = [
  500, 500
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
var backGround;
var gravity = 0.5;
var ySpeed = 0;
var jumpForce = 17.5;
var topFloor;

//hier zijn de ongedeclareerde variabelen om geluiden mee in te laden
var song;
var music;
var jumpS;
var caS;
var waS;
var jump;

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
    loadImage('../JS/images/obstacle_double_rock.png'), loadImage('../JS/images/obstacle_double_rock.png')
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
  
  music = [loadSound('../JS/sound/m-0.mp3'),
           loadSound('../JS/sound/m-1.mp3'),
           loadSound('../JS/sound/m-2.mp3'),
           loadSound('../JS/sound/m-3.mp3'),
           loadSound('../JS/sound/m-4.mp3'),
           loadSound('../JS/sound/m-5.mp3'),
           loadSound('../JS/sound/m-6.mp3'),
           loadSound('../JS/sound/m-7.mp3'),
           loadSound('../JS/sound/m-8.mp3'),
           loadSound('../JS/sound/m-9.mp3'),
           loadSound('../JS/sound/m-10.mp3'),
           loadSound('../JS/sound/m-11.mp3'),
           loadSound('../JS/sound/m-12.mp3'),
           loadSound('../JS/sound/m-13.mp3')]
  
}

// this creates the measures of the game
function setup() {
  createCanvas(gameWidth, gameHeight);
  randomWords();
  song = floor(random() * 14);
  caS = loadSound('../JS/sound/correctanswer.mp3');
  waS = loadSound('../JS/sound/wronganswer.mp3');
  jump = loadSound('../JS/sound/jump.mp3');
  if(maxLevel > levelComplete.length) {
    for(i = 0; i < maxLevel - levelComplete.length; i++) {
      levelComplete.push(false);
    }
  }
  if(words.length < maxLevel) {
    for(i = 0; i < maxLevel - words.length; i++) {
      words.push(random(words));
    }
}


function draw() {
  background(random(backGround));
  drawObstacles();
  checkObstacles();
  moveCharacter();
  drawEnemy();
  if(levelComplete[level] == false) {
    checkEnemy();
  }
  drawText();
  drawCharacter();
  playMusic();
}

function playMusic() {
  if(!music[song].isPlaying() && floor(random(0, 120)) == 89) {
    song = floor(random() * 14);
    music[song].play();
  }
}

function drawText() {
  if(levelComplete[level] == true) {
    textSize(50)
    text("CONGRATULATIONS!", 300, 100);
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
  for(i = 0; i < 1; i--) {
    if(word1 == word[level] || word2 == word[level] || word3 == word[level]) {
      word1 = random(words)[1];
      word2 = random(words)[1];
      word3 = random(words)[1];
    } else {
      i = 100;
    }
  }
}
  
function drawEnemy() {
  if (levelComplete[level] == false) {
    image(enemy[level], xEnemy[level], gameHeight - yEnemy[level], enemySize[level], enemySize[level]);
    rect(answerX[0], answerY[0], 200, 100);
    rect(answerX[1], answerY[1], 200, 100);
    rect(answerX[2], answerY[2], 200, 100);
    rect(answerX[3], answerY[3], 200, 100);
    textSize(30)
    word = words[level];
    
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
    if(xCharacter >= xObstacles[i] - playerSize * 1.3 && 
       xCharacter < xObstacles[i] + obsWidth[i] * 0.5 && 
       yCharacter >= gameHeight - yObstacles[i] - playerSize + 10 && 
       yCharacter <= gameHeight - yObstacles[i] + playerSize && 
       obsCollision[i] == true) {
      xCharacter = constrain(xCharacter, -10000, xObstacles[i] - playerSize);
    } else if(xCharacter <= xObstacles[i] + obsWidth[i] + playerSize && 
              xCharacter > xObstacles[i] + obsWidth[i] * 0.51 && 
              yCharacter >= gameHeight - yObstacles[i] - playerSize && 
              yCharacter <= gameHeight - yObstacles[i] + playerSize && 
              obsCollision[i] == true) {
      xCharacter = constrain(xCharacter, xObstacles[i] + obsWidth[i], 20000);
    }
  }
}

function checkEnemy() {
  for(i = 0; i < answerX.length; i++) {
    if(xCharacter < answerX[i] + 175 && 
       xCharacter > answerX[i] - 75 && 
       yCharacter > answerY[i] - 75 && 
       yCharacter < answerY[i] + 175) {
      if(i == correctAnswer - 1) {
        caS.play();
        levelComplete[level] = true;
        i = 100;
      } else if(i != correctAnswer - 1) {
        waS.play();
        hp--;
        xCharacter = 25;
        yCharacter = 600;
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
    jump.play();
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

