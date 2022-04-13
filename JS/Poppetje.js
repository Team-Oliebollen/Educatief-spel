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
var cat;

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

//dit zijn wat variabelen met betrekking tot beweging van het karakter
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

//dit zijn wat variabelen met betrekking tot de vragen
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
  ['garden', 'tuin'],
  ['dog', 'hond'],
  ['pizza', 'pizza'],
  ['grape', 'druif'],
  ['fruit', 'fruit'],
]
var word = ['engels', 'nederlands'];

//hier worden de afbeeldingen en muziek geladen
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
  cat = loadImage('../JS/images/cat.gif');
  
}

//hier worden de geluiden geïnitialiseerd en het canvas gemaakt
function setup() {
  createCanvas(gameWidth, gameHeight);
  randomWords();
  song = floor(random() * 14);
  caS = loadSound('../JS/sound/correctanswer.mp3');
  waS = loadSound('../JS/sound/wronganswer.mp3');
  jump = loadSound('../JS/sound/jump.mp3');
  
  //dit is om ervoor te zorgen dat het spel niet breekt wanneer je heel veel levels voltooit
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
}


function draw() {
  background(random(backGround)); //maak achtergrond
  drawObstacles(); //teken de obstakels
  checkObstacles(); //check of het karakter een obstakel raakt
  moveCharacter(); //beweeg het karakter
  drawEnemy(); //teken de vraag (eerst was er een "enemy", maar die bestaat niet meer, ik heb de naam van de code zo gehouden om niks te breken)
  if(levelComplete[level] == false) {
    checkEnemy(); //als de vraag nog niet beantwoord is: check of de speler bij een bepaald antwoord staat
  }
  drawText(); //zet de algemene tekst neer
  drawCharacter(); //teken het karakter
  playMusic(); //speel muziek af
  if(keyIsDown(76) && keyIsDown(18)) {image(cat, random(0, gameWidth), random(0, gameHeight), random(50, 500), random(50, 500))} //shhhhhh
}

//functie die muziek laat afspelen als er op dit moment geen muziek bezig is, op willekeurige intervallen
function playMusic() {
  if(!music[song].isPlaying() && floor(random(0, 120)) == 89) {
    song = floor(random() * 14);
    music[song].play();
  }
}

//alle tekst die niet of weinig variabel is
function drawText() {
  if(levelComplete[level] == true) {
    textSize(50)
    text("CONGRATULATIONS!", 300, 100);
  } else if(levelComplete[level] == false) {
    textSize(30)
    text('Answer the following question:', 500, 100)
    textSize(50);
    text('What is "' + word[0] + '" in Dutch?', 500, 250);
  }
  textSize(30);
  text('health: ' + hp, 50, gameHeight - 100);
  text('level: ' + (level + 1), 50, gameHeight - 150);
}

//functie die de woorden die niet het goede antwoord zijn willekeurig maakt
function randomWords() {
  correctAnswer = floor(random(1, 5));
  word1 = random(words)[1];
  word2 = random(words)[1];
  word3 = random(words)[1];
  for(i = 0; i < 1; i--) {
    //dit if-statement checkt of de woorden niet hetzelfde zijn als elkaar of het goede antwoord
    if(word1 == words[level][1] || word2 == words[level][1] || word3 == words[level][1] || word1 == word2 || word2 == word3 || word1 == word3) {
      word1 = random(words)[1];
      word2 = random(words)[1];
      word3 = random(words)[1];
    } else {
      i = 100;
    }
  }
}

//functie die de vraaghokjes tekent
function drawEnemy() {
  if (levelComplete[level] == false) {
    rect(answerX[0], answerY[0], 200, 100);
    rect(answerX[1], answerY[1], 200, 100);
    rect(answerX[2], answerY[2], 200, 100);
    rect(answerX[3], answerY[3], 200, 100);
    textSize(30)
    word = words[level];
    if(word1 == undefined) {
      word1 = random(words)[1];
      word2 = random(words)[1];
      word3 = random(words)[1];
      for(i = 0; i < 1; i--) {
        if(word1 == words[level][1] || word2 == words[level][1] || word3 == words[level][1] || word1 == word2 || word2 == word3 || word1 == word3) {
          word1 = random(words)[1];
          word2 = random(words)[1];
          word3 = random(words)[1];
        } else {
          i = 100;
        }
      }
    }
    //hier worden de woorden, afhankelijk van waar het goede antwoord staat, neergezet
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

//hier wordt het karakter neergezet, lekker simpel
function drawCharacter() {
  image(playerSprite, xCharacter, yCharacter - playerSize, playerSize, playerSize);
}

//hier worden de obstakels neergezet, ook niet al te moeilijk
function drawObstacles() {
  for(i = 0; i < xObstacles.length; i++) {
    image(obstacle[i], xObstacles[i], gameHeight - yObstacles[i] - obsHeight[i], obsWidth[i], obsHeight[i]);
  }
}

//functie die checkt of het karakter een obstakel raakt, een hele slechte collision engine dus
function checkObstacles() {
  for(i = 0; i < xObstacles.length; i++) { 
    if(xCharacter <= xObstacles[i] + obsWidth[i] && 
       xCharacter >= xObstacles[i] - playerSize && 
       yCharacter >= gameHeight - yObstacles[i] - obsHeight[i] - playerSize - 50 && 
       yCharacter <= gameHeight - yObstacles[i]) /*als het karakter binnen de coordinaten van een obstakel zit*/{
      floorHeight = gameHeight - yObstacles[i] - obsHeight[i]; //maak de hoogte van de vloer de bovenkant van het obstakel
      i = xObstacles.length; //en eindig de controle
    } else {
      floorHeight = gameHeight - 100; //als er geen obstakel in de buurt is val je tot 100 pixels boven de onderkant van het scherm
    }
  }
  for(i = 0; i < xObstacles.length; i++) {
    if(xCharacter >= xObstacles[i] - playerSize * 1.3 && 
       xCharacter < xObstacles[i] + obsWidth[i] * 0.5 && 
       yCharacter >= gameHeight - yObstacles[i] - playerSize + 10 && 
       yCharacter <= gameHeight - yObstacles[i] + playerSize && 
       obsCollision[i] == true) { //als het karakter zich links van een obstakel bevindt
      xCharacter = constrain(xCharacter, -10000, xObstacles[i] - playerSize); //constrain dan het karakter
    } else if(xCharacter <= xObstacles[i] + obsWidth[i] + playerSize && 
              xCharacter > xObstacles[i] + obsWidth[i] * 0.51 && 
              yCharacter >= gameHeight - yObstacles[i] - playerSize && 
              yCharacter <= gameHeight - yObstacles[i] + playerSize && 
              obsCollision[i] == true) { //als het karakter zich rechts van een obstakel bevindt
      xCharacter = constrain(xCharacter, xObstacles[i] + obsWidth[i], 20000); //constrain dan het karakter
    }
  }
}

//deze functie checkt of het karakter bij een antwoord is, en of dat het goede antwoord is
function checkEnemy() {
  for(i = 0; i < answerX.length; i++) {
    if(xCharacter < answerX[i] + 175 && 
       xCharacter > answerX[i] - 75 && 
       yCharacter > answerY[i] - 75 && 
       yCharacter < answerY[i] + 175) { //als het karakter een antwoordvakje raakt
      if(i == correctAnswer - 1) { //en het antwoord is goed
        caS.play(); //speel geluidje
        levelComplete[level] = true; //en het level is klaar
        i = 100;
      } else if(i != correctAnswer - 1) { //en het antwoord is fout
        waS.play(); //speel zoemer
        hp--; //levens naar beneden
        xCharacter = 25;
        yCharacter = 600;
        if(hp == 0) { //als de levens op zijn, verwijs de pagina door naar de levelselectie
         /* for(i = 0; i <= level; i++) {
            levelComplete[i] = false;
          }
          level = 0;
          hp = 3; */
          window.location = "https://informatica-leerling.pzsg.nl/20414/Educatief_spel/ingelogd.php";
        }
        
      }
    }
  }
}

//functie waarmee het karakter beweegt
function moveCharacter() {
  //hiermee kun je langzamer of sneller lopen
  if(keyIsDown(32)) {
    moveSpeed = sprintSpeed;
  } else if(keyIsDown(16)) {
    moveSpeed = crouchSpeed;
  } else {
    moveSpeed = walkSpeed;
  }
  
  //als er een bepaalde toets wordt ingedrukt, laat het karakter dan een bepaalde richting in lopen
  if(keyIsDown(68)) {
    xCharacter = xCharacter + moveSpeed;
  } 
  if(keyIsDown(65)) {
     xCharacter = xCharacter - moveSpeed;
  }
  
  //als het karakter hoger is dan het punt waarnaar hij valt, dan treedt er een versnelling naar beneden op
  if(yCharacter < floorHeight) {
    ySpeed = ySpeed + gravity;
  } else if(yCharacter >= floorHeight) {
    ySpeed = 0;
  }
  
  //als het karakter op de vloer staat en er wordt een toets ingedrukt, geef dan een snelheid naar boven
  if(keyIsDown(87) && yCharacter >= floorHeight) {
    jump.play();
    ySpeed = -jumpForce;
  }
  yCharacter = yCharacter + ySpeed;
  
  //als het karakter buiten het scherm is, kan het naar het vorige of volgende sublevel, 
  //of als de vraag nog niet beantwoord is, eindigt hij aan de andere kant van het speelveld
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
  
  //het karakter "snapt" naar de vloerhoogte toe als hij dichtbij is, voor uitlijndoeleinden
  if(yCharacter > floorHeight && yCharacter < floorHeight + 5) {
    yCharacter = floorHeight;
  } else  if(yCharacter > floorHeight + 300) {
    yCharacter = floorHeight;
  }
}

//we zijn weer aan het einde van de code!

