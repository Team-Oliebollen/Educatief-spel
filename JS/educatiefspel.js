function setup() {
  createCanvas(300, 200);
  textSize(18);
  
  text("Enter username:", 20, 20);
  usernameInput = createInput('Your username', 'text');
  usernameInput.position(30, 40);
  
  text("Enter password:", 20, 80);
  passInput = createInput('', 'password');
  passInput.position(30, 100);
  
  text("Enter Date of Birth:", 20, 140); 
  dobInput = createInput('1970-01-01', 'date');
  dobInput.position(30, 160);
}
