function Bullet(x, y, angle) {
  this.x = x;
  this.y = y;
  this.r = width * 0.003;
  this.alive = true;
  this.angle = angle * 2;

  this.show = function () {
    fill(35, 250, 35, 120);
    noStroke();
    rect(this.x, this.y, this.r * 3,this.r*15,50);
  }
  this.move = function () {
    this.y += -10;
    this.x += angle;
  }
  this.checkHit = function (ship) {
    let checkdist = dist(this.x, this.y, ship.x, ship.y);
    return (checkdist < this.r + ship.r)
  }
  this.checkHitBlocker = function (blocker) {
    let lineX1 = blocker.x - blocker.w * 0.5;
    let lineX2 = blocker.x + blocker.w * 0.5;
    let lineY = blocker.y + blocker.h * 0.5;
    return (this.x > lineX1 && this.x < lineX2 && this.y < lineY+5)
  }
}
