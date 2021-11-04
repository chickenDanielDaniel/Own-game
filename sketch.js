const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var spaceship,alien,bgd,ground
var spaceshipImg,alienImg,bgdImg
var aliens = [];
var bullets = [];
var d,bulletgrp;
var score = 0;
var bullet;
var alien,aliensgrp;
var bgdSound,laughSound,shootSound;
var gameState = "play"

function preload(){
  spaceshipImg = loadImage("spaceship.png");
  alienImg = loadImage("images.jpeg");
  bgdImg = loadImage("Space.jpeg");
  bulletImg= loadImage("Bullet.png");
  bgdSound = loadSound("SpaceBgd.mp3");
  laughSound = loadSound("Laugh.mp3");
  shootSound = loadSound("shoot.mp3");
}




function setup() {
  createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;
  bgd = createSprite(400, 200, 50, 50);
  bgd.addImage(bgdImg);
  bgd.velocityY = 10;
  bgd.scale = 5;
  
  spaceship = createSprite(windowWidth/2,windowHeight/2+300,1,1);
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.4
  spaceship.debug = false;
  spaceship.setCollider("circle",0,0,140)
  bulletgrp = createGroup();

  aliensgrp = createGroup();
}

function draw() {
  background(255,255,255); 
  if(gameState == "play"){
    if(bgdSound.isPlaying()){
      bgdSound.stop()
    }else{
      bgdSound.play();
    }
    if(bgd.y > 900){
      bgd.y = bgd.height/2
    }
    if(keyIsDown(LEFT_ARROW)){
      spaceship.x -= 12
    }
    if(keyIsDown(RIGHT_ARROW)){
      spaceship.x += 12
    }
    spawnAliens();

    /*if(aliensgrp.isTouching(bulletgrp)){
      aliensgrp.destroyEach()
      bulletgrp.destroyEach()
      score += 1
    }*/
    if(bulletgrp.collide(aliensgrp,alienHit) == true){
      bulletgrp.destroyEach()
    }

    if(aliensgrp.isTouching(spaceship)){
      gameState = "end"
      
  }
  
  if(gameState == "end"){
    
    aliensgrp.setVelocityYEach(0)
      bgd.velocityY = 0
      gameOver();
      if(laughSound.isPlaying()){
        laughSound.stop()
      }else{
        laughSound.play();
      }
    }
  }
  drawSprites();
  Engine.update(engine);

  
  /*if(keyIsDown(UP_ARROW)){
    spaceship.y -= 5
  }
  if(keyIsDown(DOWN_ARROW)){
    spaceship.y += 5
  }
  */
 /* for(var i = 0; i < bullets.length; i++){
    showBullets(bullets[i], i);
  }*/

  
  
  /*for(var j = 0; j < aliens.length; j++){
   
    if(collided(aliens[j].body,spaceship,150) == true){
    //  console.log(d);
      console.log("Collided");
      bgd.velocityY = 0;
      World.remove(world,aliens[j].body)
      delete aliens[j]
      gameOver();
    }

  }*/
  
 
textSize(30)
text ("Score:"+score,100,100)
  
 
}
/*function showAliens() {
  if (aliens.length > 0) {
   if (
     aliens[aliens.length - 1] === undefined ||
      aliens[aliens.length - 1].body.position.y > height
    ) {
     // var positions = [-40, -60, -70, -20];
      var position = random(0,width);
      var alien = new Alien(position, 0, 170, 170);

      aliens.push(alien);
    }

    for (var i = 0; i < aliens.length; i++) {
    if (aliens[i]) {
        Matter.Body.setVelocity(aliens[i].body, {
          x: 0,
          y: 10
        });

        aliens[i].display();
      } 
    }
  
  } else {
    var position = random(0,width);
    var alien = new Alien(position, 0, 170, 170);
    aliens.push(alien);
  }
}*/
function keyPressed(){
  if(keyCode === DOWN_ARROW){
  //  var bullet = new Bullet(spaceship.x,spaceship.y)
   // bullets.push(bullet)
    bullet = createSprite(spaceship.x,spaceship.y);
   bullet.addImage(bulletImg);
   bullet.velocityY = -5;
   bullet.scale = 0.2;
   bulletgrp.add(bullet);
   shootSound.play();
  }
}
/*function keyReleased(){
  if(keyCode === DOWN_ARROW){
    bullets[bullets.length-1].shoot();
  }
}*/
function showBullets(bullet, index){
  if(bullet){
    bullet.display();
    if(bullet.body.position.y<0){
      World.remove(world,bullets[index].body)
      delete bullets[index]
    }
  }
}

function collided(body,sprite,x){
  if(body!=null){
  
     d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
     console.log(d);
    if(d<=x){
      return true
    }else{
      return false
    }
  
   }
}

function gameOver(){
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
      "spaceship.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function spawnAliens() {

  if (frameCount % 60 === 0) {
    alien = createSprite(600,10,40,10);
    alien.x = Math.round(random(10,width-55));
    alien.addImage('alien',alienImg);
    alien.scale = 1;
    alien.velocityY = 5;
    aliensgrp.add(alien)
    alien.debug = false;
    alien.setCollider("circle",0,0,45)
    alien.lifetime = 200;
  }  
}
function alienHit(bulletgrp,alien){
  alien.destroy()
  //bulletgrp.destroyEach()
  score += 1;
  return true
}