var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3
var gameOver, gameOverImg
var restart, restartImg

var score = 0;

//game states      
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
bgImg = loadImage("assets/background.png")

balloonImg = loadAnimation("assets/hab.png")

obsTop1 = loadImage("assets/b1.png")
obsTop2 = loadImage("assets/b2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")

gameOverImg= loadImage("assets/gameOver.png")
restartImg = loadImage("assets/restart.png")

}

function setup(){

  createCanvas(windowWidth,windowHeight)
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.987


//creating top and bottom grounds
bottomGround = createSprite(-windowHeight/2,390,800,20);
bottomGround.visible = false;

topGround = createSprite(windowHeight,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,windowHeight/2,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.5;
balloon.debug = true;

//initialising groups
topObstaclesGroup = new Group();
bottomObstaclesGroup = new Group();
barGroup = new Group();

//creating game over and restart sprites
gameOver = createSprite(windowWidth/2, windowHeight/2);
restart = createSprite(windowWidth/2,windowHeight/2 + 100);
gameOver.addImage(gameOverImg);
gameOver.scale = 1;
restart.addImage(restartImg);
restart.scale = 1;
gameOver.visible = false;
restart.visible = false;
}

function draw() {
  
  background("black");

  

  if(gameState === PLAY){

    //making the hot air balloon jump
    if(keyDown("space")) {
      balloon.velocityY = -6 ;
      
    }

    //adding gravity
     balloon.velocityY = balloon.velocityY + 2;

     
    Bar();

    //spawning top and bottom obstacles
    spawnObstaclesTop();
    spawnObstaclesBottom();

//condition for END state
if(topObstaclesGroup.isTouching(balloon) || balloon.isTouching(topGround)
|| balloon.isTouching(bottomGround) || bottomObstaclesGroup.isTouching(balloon)){

gameState = END;

}
  }

  if(gameState === END) 
    {
          gameOver.visible = true;
          gameOver.depth = gameOver.depth+1
          restart.visible = true;
          restart.depth = restart.depth+1
          
          //all sprites should stop moving in the END state
          balloon.velocityX = 0;
          balloon.velocityY = 0;
          topObstaclesGroup.setVelocityXEach(0);
          bottomObstaclesGroup.setVelocityXEach(0);
          barGroup.setVelocityXEach(0);
  
          //setting -1 lifetime so that obstacles don't disappear in the END state
          topObstaclesGroup.setLifetimeEach(-1);
          bottomObstaclesGroup.setLifetimeEach(-1);
         
          balloon.y = windowHeight/2;
          
          
          //resetting the game
          if(mousePressedOver(restart)) 
          {
                reset();
          }

    } 

    drawSprites();
    Score();     
}

function reset()
{
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  topObstaclesGroup.destroyEach();
  bottomObstaclesGroup.destroyEach();

  score=0;
}


function spawnObstaclesTop() 
{
  if(World.frameCount % 60 === 0) {
    obstacleTop = createSprite(2000,120 + 200,40,50);

//obstacleTop.addImage(obsTop1);

obstacleTop.scale = 0.3;
obstacleTop.velocityX = -4;

//random y positions for top obstacles
obstacleTop.y = Math.round(random(200,900));

//generate random top obstacles
var rand = Math.round(random(1,2));
switch(rand) {
  case 1: obstacleTop.addImage(obsTop1);
          break;
  case 2: obstacleTop.addImage(obsTop2);
          break;
  default: break;
}

 //assign lifetime to the variable
obstacleTop.lifetime = 1000;

balloon.depth = balloon.depth + 1;

topObstaclesGroup.add(obstacleTop);

  }
}

function spawnObstaclesBottom() 
{
      if(World.frameCount % 120 === 0) {
        obstacleBottom = createSprite(2000,350,40,50);
    
    obstacleBottom.addImage(obsBottom1);
    obstacleBottom.debug=true

    
    obstacleBottom.scale = 0.1;
    obstacleBottom.velocityX = -4;
    
    

   //generate random bottom obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacleBottom.addImage(obsBottom1);
              break;
      case 2: obstacleBottom.addImage(obsBottom2);
              break;
      case 3: obstacleBottom.addImage(obsBottom3);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleBottom.lifetime = 1000;
    
   balloon.depth = balloon.depth + 1;

   bottomObstaclesGroup.add(obstacleBottom);
   
      }
}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
        
          
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;

          barGroup.add(bar);
         }
}

function Score()
{
         if(World.frameCount % 5 === 0)
         {
           score = score + 1;
         }
        textFont("algerian");
        textSize(30);
        fill("yellow");
        text("Score: "+ score, 1500, 100);
       
  
}

  
