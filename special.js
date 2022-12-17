function Special(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.r = (width / height) * 20;
  this.xspeed = random(1, 3);
  let rnd = random();
  if (rnd > 0.5) this.xspeed *= -1;
  this.yspeed = random(1, 2);

  this.show = function () {
    if (this.type == "spread" && !gameisover) {
      fill(0);
      stroke(0);
      circle(this.x, this.y, this.r);
      fill(255, 0, 0);
      textAlign(CENTER);
      textSize(this.r);
      text("S", this.x, this.y + this.r / 2 - 2);
    } else if (this.type == "turbo" && !gameisover) {
      fill(115);
      stroke(0);
      circle(this.x, this.y, this.r);
      fill(0, 225, 0);
      textAlign(CENTER);
      textSize(this.r);
      text("T", this.x, this.y + this.r / 2 - 2);
    }
    this.x += this.xspeed;
    this.y += this.yspeed;
    if (this.x < 0 + this.r / 2 || this.x > width - this.r / 2)
      this.xspeed *= -1;
  }
  this.checkHit = function () {
    let d = dist(this.x, this.y, paddle.x, paddle.y);
    let r = this.r / 2 + paddle.r / 2;
    return (d < r && !gameisover)
  }
}
