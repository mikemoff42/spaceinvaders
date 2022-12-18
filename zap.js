function Zap(ship) {
  this.x = ship.x;
  this.y = ship.y;
  this.r = width * 0.02;
  this.speed = random(2, 5);
  this.angle = random(-3, 3);
  this.alive = true;

  this.show = function () {
    if (!winner) image(bolt, this.x, this.y, this.r * 1.5, this.r * 1.5);
    if (!gameisover) {
      this.y += this.speed;
      this.x += this.angle;
    }
  }

  this.checkHit = function () {
    let d = dist(this.x, this.y, paddle.x, paddle.y);
    let r = this.r / 2 + paddle.r / 4;
    if (d < r && !gameisover && this.alive) {
      damage++;
      createFire();
      zaphit.play(0, 1, 0.5);
      paddle.img = paddleImg2;
      if (damage > 1) gameisover = true;
      else this.alive = false;
    }
  }
}
