//Ball vars
let xBall = 300;
let yBall = 200;
let ballSize = 30;
let radius = ballSize / 2;

//Ball speed
let speedXBall = 4;
let speedYBall = 4;

//Racket vars
xMyRacket = 5;
yMyRacket = 150;
wMyRacket = 10;
hMyRacket = 90;

//Opponent Vars
let xOtherRacket = 585;
let yOtherRacket = 150;
let otherYRacketSpeed ;

let hit = false;

//Game Score
let myScore = 0;
let otherScore = 0;

//Game Sound
let racket;
let pointScored;
let soundtrack;

function preload()
{
  soundtrack = loadSound("trilha.mp3");
  pointScored = loadSound("ponto.mp3");
  racket = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  soundtrack.loop();
}

function draw() {
  background(0, 0, 50);
  showBall();
  ballMove();  
  showRacket(xMyRacket, yMyRacket);
  showRacket(xOtherRacket, yOtherRacket);
  moveMyRacket();  
  colisionVerify();
  // colisionRacketVerify();  
  racketHitLibrary(xMyRacket, yMyRacket);
  racketHitLibrary(xOtherRacket, yOtherRacket);  
  moveOtherRacket();
  scoreboard();
  scoring();
  stuckedBall();
}

function showBall()
{
  circle(xBall, yBall, ballSize)
}

function ballMove()
{
  xBall += speedXBall;
  yBall += speedYBall;
}

function colisionVerify()
{
    if(xBall + radius > width || xBall - radius < 0)
    {
      speedXBall *= -1;
    }
  if(yBall + radius > height || yBall - radius < 0)
    {
      speedYBall *= -1;
    }
}

function showRacket(x, y)
{
  rect(x, y, wMyRacket, hMyRacket)
}

function moveMyRacket()
{
  if(keyIsDown(UP_ARROW)){
    yMyRacket -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yMyRacket += 10;
  }
}

function colisionRacketVerify()
{
  if(xBall - radius < xMyRacket + wMyRacket && yBall - radius < yMyRacket + hMyRacket && yBall + radius > yMyRacket){
    speedXBall *= -1.1;
  }
}

function racketHitLibrary(x, y){
  hit = collideRectCircle(x, y, wMyRacket, hMyRacket, xBall, yBall, radius);
  if(hit){
    speedXBall *= -1;
    racket.play();
  }
}

function moveOtherRacket()
{
  //Multiplayer
    if(keyIsDown(90)){
    // 90 = Z_KEY => AZERTY keyboards
    // 87 = W_KEY => QWERTY keyboards
    yOtherRacket -= 10;
  }
  if(keyIsDown(83)){
    yOtherRacket += 10;
  }
  //Play aganist machine
  //Change the percentage to be harder or easier
  // otherYRacketSpeed = 0.7 * yBall - yOtherRacket - wMyRacket /2 -30;
  // yOtherRacket += otherYRacketSpeed;
}

function scoreboard()
{
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(myScore, 170, 26);
  fill(color(255, 140, 0));
  rect(430, 10, 40, 20);
  fill(255);
  text(otherScore, 450, 26);
}

function scoring()
{
  if(xBall > 585){
    myScore += 1;
    pointScored.play();
  }
  if(xBall < 15){
    otherScore += 1;
    pointScored.play();
  }
}

function stuckedBall(){
    if (xBall + radius < 0){
    console.log('bolinha ficou presa');
    xBall = 300;
    }
}