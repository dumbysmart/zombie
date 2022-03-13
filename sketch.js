var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;

var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var gun2Img

var redBubbleGroup, redBubbleGroup, bulletGroup;

var zombie,zombie2
var zombieImg
var zombieGroup,zombieGroup2


var life =3;
var score=0;
var gameState=1

var l=4
var zombieFrameCount1=70
var zombieFrameCount2=120

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
  zombieImg=loadImage('zombie.png')
  gun2Img=loadImage('gun.png')
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage("gun1",gunImg)
  gun.addImage("gun2",gun2Img)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();  
  zombieGroup=createGroup() 
  zombieGroup2=createGroup()

  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background("#BDA297");
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    gun.y=mouseY  
    if (score % 10 ===0 && score>0){
      zombieFrameCount1-=0.5
      zombieFrameCount2-=0.5
    }

    if (frameCount % zombieFrameCount1 === 0) {
      drawZombie();
    }

    if (frameCount % zombieFrameCount2 === 0) {
      drawZombie2();
    }

    if(keyDown("space")){
      shootBullet();
      
    }

    if (zombieGroup.collide(backBoard,handleGameover)){
      //handleGameover(zombieGroup);
    }
    
    if (zombieGroup2.collide(backBoard,handleGameover2)) {
      //handleGameover2(zombieGroup2);
    }
    
    
    
    if(zombieGroup.isTouching(bulletGroup,handleZombieCollision)){
      //handleZombieCollision(zombieGroup);
    }

    if(zombieGroup2.isTouching(bulletGroup,handleZombieCollision2)){
      //handleZombieCollision2(zombieGroup2)
    }
     upgrade()

    
    drawSprites();
  }
    
  
}


function shootBullet(){
  bullet= createSprite(gun.x, gun.y, 50,20)
  
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX=7
  bulletGroup.add(bullet)
  if(score<1){
    bullet.velocityX=7
  } 

  //for (var i=4;i<50;i+=2){
 // bullet.velocityX=i
  //}
  
  console.log(bullet.velocityX)
  
  
}

function drawZombie(){
  zombie=createSprite(windowWidth,random(20,600),40,40)
  zombie.addImage(zombieImg)
  zombie.scale=0.2
  zombie.velocityX=-4
  zombie.lifetime=400
  zombieGroup.add(zombie)
}

function drawZombie2(){
  zombie2=createSprite(windowWidth,random(20,600),40,40)
  zombie2.addImage(zombieImg)
  zombie2.scale=0.2
  zombie2.velocityX=-4
  zombie2.lifetime=400
  zombieGroup2.add(zombie2)
}

function handleZombieCollision(zombie){
    if (life > 0) {
       score=score+1;
       l+=0.2
       bulletGroup.setVelocityXEach(l)
       console.log(l)
    }

     blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) 

  
    
    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    zombie.destroy()
    
}

function handleZombieCollision2(zombie2){
  if (life > 0) {
     score=score+1;
     l+=0.2
       bulletGroup.setVelocityXEach(l)
       console.log(l)
  }

   blast= createSprite(bullet.x+60, bullet.y, 50,50);
  blast.addImage(blastImg) 

  
  blast.scale=0.3
  blast.life=20
  bulletGroup.destroyEach()
  zombie2.destroy()
  
}



function handleGameover(zombie,backBoard){
  
    life=life-1;
    zombie.destroy();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
}

function handleGameover2(zombie2,backBoard){
  
  life=life-1;
  zombie2.destroy();
  

  if (life === 0) {
    gameState=2
    
    swal({
      title: `Game Over`,
      text: "Oops you lost the game....!!!",
      text: "Your Score is " + score,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }

}

function upgrade(){
  if(score>20){
    bullet.velocityX=12
    gun.changeAnimation('gun2')
    

  }
}