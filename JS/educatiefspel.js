function preload(){
  img = loadImage('apple-tfa-2.jpg');
}
function setup() {
  createCanvas(300, 200);
  image(img, 0, 0);
  textSize(18);
  text("Answer:", 20, 20);
  usernameInput = createInput('Your answer', 'text');
  usernameInput.position(30, 40);
}
// niet definitief.
