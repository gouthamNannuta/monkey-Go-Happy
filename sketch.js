var sceneimage,scene;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var monkey, monkey_running;
var invisibleground;
var bananaGroup, bananaimage;
var stoneGroup, obstacleimage;

var gameOver;
var score=0;

function preload(){
 sceneimage=loadImage("jungle.jpg");
 monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaimage = loadImage("banana.png");
  obstacleimage = loadImage("stone.png");
}
function setup() {
  createCanvas(600, 300);
  scene = createSprite(300,20,400,20);
  scene.addImage(sceneimage);
  scene.x = scene.width /2;
  scene.velocityX = -2;
   
  monkey = createSprite(50,40,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
    
  invisibleground = createSprite(200,240,400,10);
  invisibleground.x=invisibleground.width/2;
  invisibleground.visible = false;
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  score=0;
}

function draw() {
  background(180);  
  
  if (gamestate===PLAY){
    if (scene.x < 100){
    scene.x = scene.width/2;
  }
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    score = score + 2;
    }
  
      switch(score){
        case 16: monkey.scale=0.12;
                break;
        case 26: monkey.scale=0.14;
                break;
        case 36: monkey.scale=0.16;
                break;
        case 46: monkey.scale=0.18;
                break;
        default: break;
    }
  if(keyDown("space") && monkey.y>100) {
    monkey.velocityY = -8;
  
  } 
  monkey.velocityY = monkey.velocityY + 0.8
     if(stoneGroup.isTouching(monkey)){ 
      monkey.scale=0.07;
     }
  if (stoneGroup.isTouching(monkey)){
    gamestate=END;
      }
      }else if(gamestate===END){
        scene.velocityX=0;
        monkey.velocityY=0;
        stoneGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        stoneGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);
    score=score+0;
        
  stroke("red");
  textSize(20); 
  fill("black");
  text("GameOver", 350,50);  
      }
      
  monkey.collide(invisibleground);
      spawnFood();
    spawnObstacles();
  
    
  drawSprites();  
  stroke("white");
  textSize(20); 
  fill("white");
  text("Score : "+ score, 350,50);  
}
function spawnFood() {
  if (World.frameCount % 120 ===0) {
    var banana = createSprite(400,150,40,10);
    banana.y = random(100,180);    
    banana.addImage(bananaimage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 150;
    monkey.depth = banana.depth + 1;
    bananaGroup.add(banana);
  }
}
function spawnObstacles() {
  if(World.frameCount % 100 === 0) {
    var obstacle = createSprite(600,220,10,40);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleimage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 150;
   stoneGroup.add(obstacle);
  }
}
