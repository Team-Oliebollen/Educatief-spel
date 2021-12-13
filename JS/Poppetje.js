var gameWidth = screen.width;
var gameHeight = screen.height - 300;
var backGroundColour = 'black';
var xCharacter = gameWidth*0.5;
var yCharacter = gameHeight*0.5;
function setup() {
  createCanvas(gameWidth, gameHeight);
}
function draw() {
  background(backGroundColour);
  moveCharacter();
}
function moveCharacter() {
  fill('blue');
  ellipse(xCharacter, yCharacter, 50, 50);
  if(keyIsDown(68)) {
    xCharacter++;
  }
  if(keyIsDown(65)) {
    xCharacter--;
  }
  if(keyIsDown(83)) {
    yCharacter++;
  }
  if(keyIsDown(87)) {
    xCharacter--;
  }
  
}
