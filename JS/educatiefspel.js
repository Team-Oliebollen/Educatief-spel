//de variabelen die aan het begin een waarde moeten hebben
var size = 500; //de grootte van het spel en alles dat daarbij hoort
var huidigeSpeler = 1; //de beginnende speler: in dit geval altijd rondje
var magVeranderen = 1; //de variabele die ervoor zorgt dat het ingedrukt houden van de muis niet voor problemen zorgt
var magDoorspelen = 1; //de variabele die ervoor zorgt dat het spel stopt als er iemand gewonnen heeft of het gelijkspel is
var winnaar = 0;

//de variabelen die binnen diverse functies bepaald worden en geen vaste beginwaarde hebben:
var lijndikte;
var overigeRuimte;
var speelveld;
var gridWijdte;
var mouseXBord;
var mouseYBord;
var bord = [[0,0,0],[0,0,0],[0,0,0]];

//de constanten om de verschillende waarden die de vakjes van het bord hebben uit elkaar te kunnen houden
const LEEG = 0;
const RONDJE = 1;
const KRUISJE = -1;

function preload() {
	rondje = loadImage("assets/images/Rondje.png");
	kruisje = loadImage("assets/images/Kruisje.png");
}

function setup() {
	canvas = createCanvas(1000,1000);
}

function draw() {
	background('#f5f5dc');
	translate((1000-size)/2,(1000-size)/2);
	veranderGrootte();
	maakSpeelveld(size,lijndikte,overigeRuimte,gridWijdte);
	mouseXBord = constrain(floor((mouseX-lijndikte*0.5-(1000-size)/2)/gridWijdte),0,2);
	mouseYBord = constrain(floor((mouseY-lijndikte*0.5-(1000-size)/2)/gridWijdte),0,2);
	if (magDoorspelen == 1) {
		muisFiguur(size,mouseXBord*gridWijdte,mouseYBord*gridWijdte,lijndikte);
	}
	if (mouseIsPressed && magDoorspelen == 1) {
		if (magVeranderen == 1) {
		bezetPositie(size,mouseXBord,mouseYBord);
		}
	}
	else {
		magVeranderen = 1;
	}
	plaatsFiguur(size,lijndikte,gridWijdte);
	bepaalWinnaar(winnaar);
	toonWinnaar(size,winnaar);
}

//de volgende functie creëert het speelveld
function maakSpeelveld(s,l,o,g) {
	push();
	noStroke();
	fill('white');
	rect(0,0,s);
	fill('#4d4d4d');
	rect(o,g,3*g-o,l);
	rect(o,2*g,3*g-o,l);
	rect(g,o,l,3*g-o);
	rect(2*g,o,l,3*g-o);
	textSize(s/30);
	fill('black');
	text("Gebruik de pijltjestoetsen om de grootte van het veld aan te passen",0,gridWijdte*3+lijndikte*2);
	pop();
}

//de volgende functie bepaalt de positie van het figuur als er geklikt wordt
function bezetPositie(s,x,y) {
	push();
	//de volgende "if" zorgt ervoor dat er alleen een figuur geplaatst wordt als er binnen het speelveld wordt geklikt
	if (mouseX >= ((1000-size)/2+lijndikte) && mouseX <= ((1000-size)/2+gridWijdte*3) && mouseY >= ((1000-size)/2+lijndikte) && mouseY <= ((1000-size)/2+gridWijdte*3)) {
		if (bord[y][x] == LEEG) {
			bord[y][x] = huidigeSpeler;
			if (huidigeSpeler == 1) {
				huidigeSpeler = -1;
			}
			else {
				huidigeSpeler = 1;
			}
			magVeranderen = 0;
		}
		else {
			fill("black");
			textSize(s/15);
			text("Dit vakje is al bezet!",s/4.5,-s/50);
		}
	}
	pop();
}

//de volgende functie creëert het figuur dat met de muis meebeweegt
function muisFiguur(s,x,y,l) {
	push();
	if (huidigeSpeler == 1 && bord[mouseYBord][mouseXBord] == 0) {
		image(rondje,x+l*1.5,y+l*1.5,s/4.5,s/4.5);
	}
	if (huidigeSpeler == -1 && bord[mouseYBord][mouseXBord] == 0) {
		image(kruisje,x+l*1.5,y+l*1.5,s/4.5,s/4.5);
	}
	pop();
}

//de volgende functie creëert het figuur op de positie die bepaalt is met bezetPositie
function plaatsFiguur(s,l,g) {
	push();
	for (j = 0; j < 3; j++) {
		for (i = 0; i < 3; i++) {
			y = j*g;
			x = i*g;
			if (bord[j][i] == RONDJE) {
				image(rondje,x+l*1.5,y+l*1.5,s/4.5,s/4.5);
			}
			if (bord[j][i] == KRUISJE) {
				image(kruisje,x+l*1.5,y+l*1.5,s/4.5,s/4.5);
			}
		}
	}
	pop();
}

//de volgende functie bepaalt de winnaar door te kijken waar er drie dezelfde vormen naast elkaar staan
function bepaalWinnaar(w) {
	//variabelen die het optellen mogelijk maken
	var horOptelSom;
	var verOptelSom;
	var diaOptelSom;
	//horizontale winnaar
	for (j = 0; j < 3; j++) {
		horOptelSom = bord[j][0]+bord[j][1]+bord[j][2];
		if (horOptelSom == 3 || horOptelSom == -3) {
			w = bord[j][0];
		}
	}
	//verticale winnaar
	for (i = 0; i < 3; i++) {
		verOptelSom = bord[0][i]+bord[1][i]+bord[2][i];
		if (verOptelSom == 3 || verOptelSom == -3) {
			w = bord[0][i];
		}
	}
	//diagonale winnaar
	diaOptelSom = bord[0][0]+bord[1][1]+bord[2][2];
	if (diaOptelSom == 3 || diaOptelSom == -3) {
		w = bord[0][0];
	}
	diaOptelSom = bord[2][0]+bord[1][1]+bord[0][2];
	if (diaOptelSom == 3 || diaOptelSom == -3) {
		w = bord[2][0];
	}
	winnaar = w;
}

//de volgende functie toont de winnaar die bepaald is met bepaalWinnaar, of geeft aan als het gelijkspel is
function toonWinnaar(s,w) {
	push();
	textSize(s/15);
	if (w == 1) {
		text("Speler 1 (rondje) is de winnaar!",0,-s/10);
		text("Druk op F5 om opnieuw te beginnen.",0,-s/50);
		magDoorspelen = 0;
	}
	if (w == -1) {
		text("Speler 2 (kruisje) is de winnaar!",0,-s/10);
		text("Druk op F5 om opnieuw te beginnen.",0,-s/50);
		magDoorspelen = 0;
	}
	if (bord[0][0] != 0 && bord[0][1] != 0 && bord[0][2] != 0 && bord[1][0] != 0 && bord[1][1] != 0 && bord[1][2] != 0 && bord[2][0] != 0 && bord[2][1] != 0 && bord[2][2] != 0 && w == 0) {
		text("Gelijkspel!",s/3,-s/10);
		text("Druk op F5 om opnieuw te beginnen.",0,-s/50);
		magDoorspelen = 0;
	}
	pop();
}

//de volgende functie zorgt ervoor dat de speler de grootte van het spel kan aanpassen
function veranderGrootte() {
	if (keyCode == RIGHT_ARROW) {
		size = constrain(size+10,250,800);
		keyCode = null;
	}
	if (keyCode == LEFT_ARROW) {
		size = constrain(size-10,250,800);
		keyCode = null;
	}
	//hieronder worden de variabelen bepaalt die afhangen van de grootte (size), omdat size wordt verandert met deze functie
	lijndikte = size/20;
	overigeRuimte = size/20;
	speelveld = size-overigeRuimte*2;
	gridWijdte = size/3.16;
}
