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
    let d = dist(this.x, this.y, ship.x, ship.y);
    let r = this.r/2 + ship.r/2;
    return (d<r);
  }
  this.checkHitBlocker = function (blocker) {
    let d = dist(this.x,this.y,blocker.x,blocker.y);
    let r = this.r/2 + blocker.r/2;
    return (d<r);
  }
}
