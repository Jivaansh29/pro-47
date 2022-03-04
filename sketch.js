var playerpaddle, comppaddle
var ball, bg
var playerimg, compimg, bgimg, heartimg, ballimg
var edges
var goal1, goal2
var PLAY = 1
var END = 0
var gamestate = PLAY
var score = 0
var rollsound
var restart, gameover
var restartimg, gameoverimg
var flag = 0
function preload() {
  playerimg = loadImage("./assets/playerpaddle.png")
  compimg = loadImage("./assets/comppaddle.png")
  bgimg = loadImage("./assets/bg.png")
  heartimg = loadImage("./assets/life.png")
  ballimg = loadImage("./assets/ball.png")
  rollsound = loadSound("./assets/sound.wav")
  restartimg = loadImage("./assets/restart.png")
  gameoverimg = loadImage("./assets/gameo.png")
}

function setup() {
  createCanvas(400, 800)
  bg = createSprite(200, 400);
  bg.addImage(bgimg);
  bg.scale = 1.15;

  playerpaddle = createSprite(500, 700)
  playerpaddle.addImage(playerimg);
  playerpaddle.scale = .2;
  goal1 = createSprite(200, 760, 100, 20)
  goal1.visible = false;

  comppaddle = createSprite(250, 80)
  comppaddle.addImage(compimg);
  comppaddle.scale = .2;
  goal2 = createSprite(200, 30, 100, 20,)
  goal2.visible = false;

  ball = createSprite(200, 200, 50, 50);
  ball.addImage(ballimg);
  ball.scale = 0.4;
  
  ball.velocityX = 20
  ball.velocityY = -10


  restart = createSprite(200, 400, 20, 20);
  restart.addImage(restartimg);
  restart.scale = .2


  gameover = createSprite(200, 350, 20, 20);
  gameover.addImage(gameoverimg);
  gameover.scale = .4


  edges = createEdgeSprites()
 

  ball.debug = true
  playerpaddle.debug = true;
  ball.setCollider("rectangle", 0, 0, 50, 50)
  playerpaddle.setCollider("rectangle", 0, 0, 100, 100)
}
function draw() {
  background("white")
  if (gamestate === PLAY) {
    console.log("In GameState")
    restart.visible = false;
    gameover.visible = false;
    flag = 1;

    playerpaddle.x = mouseX


    playerpaddle.bounceOff(edges)
    comppaddle.bounceOff(edges)
    ball.bounceOff(edges)
    ball.bounceOff(playerpaddle)
    ball.bounceOff(comppaddle)

    comppaddle.x = ball.x

    if (ball.bounceOff(goal1)) {
      rollsound.play()
      score += 1
      ball.x = 200
      ball.y = 200
    }
    if (score >= 1) {
      gamestate = END;
      restart.visible = true;
      gameover.visible = true;
      flag = 2;

    }
  }
  else if (gamestate === END) {
    gamestate = "reset"
    ball.velocityX = 0;
    ball.velocityY = 0;
    comppaddle.x = 200;
    score = 0

  }

  else if (gamestate === "reset") {
    if (keyDown("space")) {
      reset()
    }
  }

  drawSprites()

  textSize(20)
  fill("black")
  text("SCORE: " + score, 260, 50)
}
function reset() {

  gamestate = PLAY
  ball.velocityX = 20
  ball.velocityY = -10
  gameover.visible = false;
  restart.visible = false;
  console.log("space key pressed");
}