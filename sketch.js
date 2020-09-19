//Global Variables
var monkey, jungle;
var monkeyAnimation, stoneImage, bananaImage, jungleImage;
var score = 0;



function preload(){
  monkeyAnimation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png",
  "Monkey_05.png","Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  jungleImage = loadImage("jungle.jpg");
  stoneImage = loadImage("stone.png");
  bananaImage = loadImage("banana.png"); 
}


function setup() {
  createCanvas(800,500);

  jungle = createSprite(300,150);
  jungle.addImage(jungleImage);
  jungle.velocityX = -3;

  monkey = createSprite(80,height-100);
  monkey.addAnimation("monkey", monkeyAnimation);
  monkey.scale = 0.2;

  invGround = createSprite(width/2,height-10,width,20);
  invGround.visible = false;

  bananaGroup = new Group();
  stoneGroup = new Group();
}


function draw(){
 background(255); 

 if (jungle.x<300){
   jungle.x = 400;
 }

 if (keyDown("space") && monkey.y>=418){
   monkey.velocityY = -20;
 }
 monkey.velocityY = monkey.velocityY + 0.8;
 
 spawnBananas();
 spawnStones();

 if (bananaGroup.isTouching(monkey)){
   bananaGroup.destroyEach();
   score = score+2;
 }

 if (stoneGroup.isTouching(monkey)){
   monkey.scale = 0.1;
 }

 switch (score){
   case 10: monkey.scale = 0.22;
   break;
   case 20: monkey.scale = 0.24;
   break;
   case 30: monkey.scale = 0.26;
   break;
   case 40: monkey.scale = 0.28;
   break;
   case 50: monkey.scale = 0.30;
   break;
   default: break;
 }
 

 monkey.collide(invGround);
 drawSprites();

 textSize(20);
 fill(255);
 text("Score: "+score,width-100,100);
}

function spawnBananas(){
  if (frameCount%200===0){
    var banana = createSprite(width,height/2);
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.07;
    banana.y = Math.round(random(height/2-100,height/2+150));
    banana.lifetime = width/4;
    bananaGroup.add(banana);
  }
}

function spawnStones(){
  if (frameCount%300==0){
    var stone = createSprite(width,height-60);
    stone.addImage(stoneImage);
    stone.velocityX = -4;
    stone.scale = 0.2;
    stone.lifetime = width/4;
    stoneGroup.add(stone);
  }
}