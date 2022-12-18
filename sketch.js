const delaytime = 100;
const shipcount = 33;

let gundelay = 20;
let level;
let gunspeed;
let randomZaps;
let paddle;
let ships = [];
let bullets = [];
let zaps = [];
let fires = [];
let ship1, ship2, ship3;
let dlay = 0;
let blockers = [];
let paddleImg;
let paddleImg2;
let bolt;
let gameisover = false;
let zaphit;
let damage;
let winner = false;
let endgame = false;
let turboActive = false;
let spreadActive = false;
let turboEnabled = false;
let spreadEnabled = false;
let trboCounter = 0;
let sprdCounter = 0;
let trbo;
let sprd;
let newlevel;
let playonce;



function setup() {
  createCanvas(800, 800);
  newGame();
}

function draw() {
  if (level==1) background(0, 30, 110,160);
  else background(110,30,30,160);
  textSize(32);
  textAlign(CENTER);
  fill(250,250,250,100);
  noStroke();
  text('Level '+level,width/2,height*0.1);
  if (gameisover) gameOver()
  else Play();

}

function newGame() {
  paddle = new Paddle();
  playonce=true;
  level=1;
  ships = [];
  bullets = [];
  zaps = [];
  createShips();
  gameisover = false;
  winner = false;
  damage = 0;
  turboEnabled = false;
  spreadEnabled = false;
  randomZaps = 0.995
  paddle.img = paddleImg;
  trbo = null;
  sprd = null;
  createShips();
  createBlockers();
  whoosh.stop();
}

function Level2() {
  level = 2;
  newlevel = false;
  paddle = new Paddle();
  ships = [];
  zaps = [];
  bullets = [];
  createShips();
  gameisover = false;
  damage = 0;
  turboEnabled = false;
  spreadEnabled = false;
  randomZaps = 0.98;
  paddle.img = paddleImg;
  trbo = null;
  sprd = null;
  endgame = false;
  createShips();
  createBlockers();  
}

function Play() {
  fireGun();
  paddle.show();
  paddleOnFire();
  checkShipHits();
  showUFOs();
  checkBulletHits();
  checkZapHits();
  turboDrop();
  spreadDrop();
  randomZaps -= 0.00001;
  if (ships.length == 0 && endgame == false) {
    endgame = true;
    if (level == 1) randomZaps = 0.999;
    else randomZaps = 0.88;
    for(let i=0;i<blockers.length;i++) blockers[i].yMove = random(-2,-5);
  }
}

function fireGun() {
  if (turboEnabled) gunspeed = 5;
  if (mouseIsPressed) {
    dlay++;
    if (dlay % gunspeed == 0 && spreadEnabled) {
      fire.play(0, 1.5, 0.15);
      for (let i = -1; i <= 1; i++) {
        let bullet = new Bullet(paddle.x, height * 0.9, i);
        bullets.push(bullet);
      }
    } else if (dlay % gunspeed == 0) {
      let bullet = new Bullet(paddle.x, height * 0.9, 0);
      if (turboEnabled) fire.play(0, 1.7, 0.15);
      else fire.play(0, 1.2, 0.15);
      bullets.push(bullet);
    }
  } else dlay = 0;
}

function checkShipHits() {
  for (let i = ships.length-1; i >=0; i--) {
    if (ships[i].checkHit()) {
      zaphit.play(0, 1, 0.5);
      paddle.img = paddleImg2;
      gameisover = true;
    }
    if (ships[i].alive) ships[i].show();
    else ships.splice(i, 1);
  }
}

function checkBulletHits() {
  for (let i = bullets.length-1; i >=0; i--) {
    bullets[i].show();
    bullets[i].move();
    for (let j = 0; j < ships.length; j++) {
      if (bullets[i].checkHit(ships[j])) {        
        if (ships[j].hits > 0) {
          ships[j].alive = false;
          shiphit.play(0,1);
        } else shiphit.play(0,2.5);
        bullets[i].alive = false;
        ships[j].hits++;
      }
    }
    for (let k = blockers.length-1; k >=0; k--) {
      if (bullets[i].checkHitBlocker(blockers[k])) {
        bullets[i].alive = false;
        if (endgame) {
          blockers[k].dmg++;
          blockers[k].speedup = true;
          zaphit.play();
        }
        if (blockers[k].dmg > 4) blockers.splice(k, 1);
        if (blockers.length == 0) {
          if (level == 2) {
            winner = true;
            gameisover = true;
          }
          else newlevel = true;
        }
      }
    }
    if (!bullets[i].alive || bullets[i].y < 10) {
      bullets.splice(i, 1);
    }
  }
  if (newlevel) Level2();
}

function showUFOs() {
  for (let i = 0; i < blockers.length; i++) {
    blockers[i].show();
  }
  if (blockers.length > 1){
    let d = dist(blockers[0].x,blockers[0].y,blockers[1].x,blockers[1].y);
    
    if (d < blockers[0].w){
      for (let i=0;i<2;i++) {
        blockers[i].xMove*=-1;
        blockers[i].yMove*=-1;
      }
    }
  }
}

function checkZapHits() {
  let rnd = random();
  if (rnd > randomZaps && ships.length > 0) {
    let ship = random(ships);
    let zap = new Zap(ship);
    zaps.push(zap);
  } else if (rnd > randomZaps && endgame) {
    let blocker = random(blockers);
    let zap = new Zap(blocker);
    zaps.push(zap);
  }
  for (let i = zaps.length-1; i >=0; i--) {
    if (zaps[i].y > height) zaps.splice(i, 1);
    else {
      zaps[i].checkHit();
      if (zaps[i].alive) zaps[i].show();
    }
  }
}

function turboDrop() {
  let rnd = random();
  if (rnd > 0.997 && !turboActive) {
    turboActive = true;
    let trbox = random(width * 0.1, width * 0.9);
    trbo = new Special(trbox, height * 0.1, "turbo");
  }
  if (turboActive && trbo != null) {
    if (trbo.checkHit()) {
      turboEnabled = true;
      trbo = null;
    } else if (trbo.y > height) {
      turboActive = false;
      trbo = null;
    } else trbo.show();
  }

  if (turboEnabled && trboCounter < delaytime) {
    trboCounter++;
  } else if (trboCounter >= delaytime) {
    trboCounter = 0;
    turboEnabled = false;
    turboActive = false;
  } else gunspeed = gundelay;
}

function spreadDrop() {
  let rnd = random();
  if (rnd > 0.997 && !spreadActive) {
    spreadActive = true;
    let sprdx = random(width * 0.1, width * 0.9);
    sprd = new Special(sprdx, height * 0.1, "spread");
  }
  if (spreadActive && sprd != null) {
    if (sprd.checkHit()) {
      spreadEnabled = true;
      sprd = null;
    } else if (sprd.y > height) {
      spreadActive = false;
      sprd = null;
    } else sprd.show();
  }

  if (spreadEnabled && sprdCounter < delaytime) {
    sprdCounter++;
  } else if (sprdCounter >= delaytime) {
    sprdCounter = 0;
    spreadEnabled = false;
    spreadActive = false;
  }
}

function createFire(){
  for (let i=0;i<300;i++){
    fires[i] = new Fire();
  }
}

function paddleOnFire() {
  for (let i=0;i<fires.length;i++){
    if (fires[i].y < random(height*0.7,height*0.75)){
      fires[i] = new Fire();
    }
  }
  for (let i=0;i<fires.length;i++){
      if (damage>0 && !winner) fires[i].show();
    }
}


function createBlockers() {
  let bposx = width * 0.1;
  let dir = 1;
  for (let i = 0; i < 2; i++) {
    blockers[i] = new Blocker(bposx, height / 1.5, dir);
    bposx += width * 0.8;
    dir *= -1;
  }
}

function createShips() {
  let offsetW = width * 0.08;
  let offsetH = height * 0.1;
  let counter = 0;
  let img = 1;
  let totalships = level * shipcount;
  for (let i = 0; i < totalships; i++) {
    counter++;
    ships[i] = new Ship(counter * offsetW, offsetH, img);
    if (counter % 11 == 0) {
      counter = 0;
      offsetH += height * 0.05;
      img *= -1;
    }
  }
}

function gameOver() {
  paddle.show();
  paddleOnFire();
  for (let i = 0; i < blockers.length; i++) blockers[i].show();
  for (let i = 0; i < ships.length; i++) ships[i].show();
  for (let i = 0; i < zaps.length; i++) if (zaps[i].alive == true) zaps[i].show();
  turboActive = false;
  textSize(width*.06);
  textAlign(CENTER);
  noStroke();
  fill(255, 0, 0, 100);
  endgame = false;
  if (winner) text("WINNER!", height / 2, width / 2);
  else text("GAME OVER", height / 2, width / 2);
  if (winner && playonce){
    fire.stop();
    zaphit.stop();
    whoosh.play();
    playonce=false;
  }
}

function keyPressed() {
  if (key === " " && spreadEnabled && !gameisover && dlay == 0) {
    fire.play(0, 1.5, 0.15);
    for (let i = -1; i <= 1; i++) {
      let bullet = new Bullet(paddle.x, height * 0.9, i);
      bullets.push(bullet);
    }
  } else if (key === " " && !gameisover && dlay == 0) {
    let bullet = new Bullet(paddle.x, height * 0.9, 0);
    fire.play(0, 1.2, 0.15);
    bullets.push(bullet);
  } else if (key === "q") gundelay = 5;
  else if (key === "w") gundelay = 20;
}

function mousePressed() {
  if (spreadEnabled && !gameisover) {
    fire.play(0, 1.2, 0.15);
    for (let i = -1; i <= 1; i ++) {
      let bullet = new Bullet(paddle.x, height * 0.9, i);
      bullets.push(bullet);
    }
  } 
  else if (!gameisover && turboEnabled) gundelay = 5;
  else if (!gameisover) {
    let bullet = new Bullet(paddle.x, height * 0.9, 0);
    fire.play(0, 1.2, 0.15);
    bullets.push(bullet);
  } else newGame();
}

function preload() {
  soundFormats("mp3", "ogg", "wav");
  ship1 = loadImage("images/ship1.png");
  ship2 = loadImage("images/ship2.png");
  ship3 = loadImage("images/ship3.png");
  paddleImg = loadImage("images/paddle.png");
  paddleImg2 = loadImage("images/paddle2.png");
  bolt = loadImage("images/bolt.png");
  blockerImg = loadImage("images/blocker.png");
  fire = loadSound("images/fire.mp3");
  zaphit = loadSound("images/zap-hit.mp3");
  whoosh = loadSound("images/whoosh.wav");
  shiphit = loadSound("images/shiphit.mp3");
}
