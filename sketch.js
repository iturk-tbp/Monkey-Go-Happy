var bananaImage, obstacleImage, bananaGrp, obstacleGrp, score, monkey, backGround, monkey_run, background1, groundy, stone, r, banana, gameState, Score
function preload(){
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  monkey_run = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  backGround = loadImage("jungle.jpg");
}
function setup() {
  createCanvas(400, 400);
background1 = createSprite(20,20,200,200)
  background1.addImage("B", backGround);
  monkey = createSprite(50,340,20,50)
  monkey.addAnimation("MM",monkey_run)
  monkey.scale = 0.1;
  bananaGrp = createGroup();
  obstacleGrp = createGroup();
  groundy = createSprite(400,350,800,10);
  groundy.visible = false;
  gameState = 1
  Score = 0;
  }

function draw() {
  background(220);
  if(gameState == 1){
      monkey.visible = true;
    background1.velocityX = -5;
  if(background1.x < -100){
    background1. x = 200
  }
  
  if(keyDown("SPACE") && monkey.y > 290 ){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(groundy);
    console.log(monkey.y);
    if(frameCount%300 == 0){
    spawnStones();
  }
  if(frameCount%100 == 0){
    spawnFruits();
  }
  if(obstacleGrp.isTouching(monkey) && monkey.scale > 0.1){
    monkey.scale = 0.1;
    obstacleGrp.destroyEach();
      }

   if(bananaGrp.isTouching(monkey) ){
     bananaGrp.destroyEach();
     Score = Score + 2;
  }
    switch(Score){
      case 10: monkey.scale = 0.12;
      break;
      case 20: monkey.scale = 0.14;
      break;
      case 30: monkey.scale = 0.16;
      break;
      case 40: monkey.scale = 0.18;
      break;
      default: break;      
    }
     }
  
   if(obstacleGrp.isTouching(monkey) && monkey.scale == 0.1){
       gameState = 0;
  }
  if(gameState == 0){
    obstacleGrp.destroyEach();
    bananaGrp.destroyEach();
    monkey.visible = false;
    background1.velocityX = 0;
      }
  if(gameState == 0 && keyDown("R")){
    gameState = 1;
    Score = 0;
  }    
  drawSprites();
  stroke("white")
  textSize(20);
  fill("white");
  text("Score:"+Score,300,50);
  if(gameState == 0){
    stroke("white");
    text("Game Over",140,200)
    text("Press R to Replay",120,240)

      }
}
function spawnFruits(){
  banana = createSprite(400,random(180,200),10,10);
banana.addImage("B",bananaImage);
  banana.scale = 0.05;
  banana.depth = monkey.depth;
  banana.velocityX = -4;
  banana.lifetime = 101;
  bananaGrp.add(banana);
  }

function spawnStones(){
  r = Math.round(random(300,400))
  stone = createSprite(r,340,10,10);
stone.addImage("S",obstacleImage);
  stone.scale = 0.15;
  stone.depth = monkey.depth;
  stone.velocityX = -5;
  stone.lifetime = 81;
  obstacleGrp.add(stone);
  stone.setCollider("rectangle",0,0,5,5);
  
}