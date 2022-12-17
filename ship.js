function Ship(x, y, img) {
  this.x = x;
  this.y = y;
  this.r = height * 0.04;
  this.alive = true;
  this.hits = 0;
  this.xMove = width/3700;
  if (img == 1) this.img = ship1;
  else this.img = ship3;

  this.show = function () {
    imageMode(CENTER);

    if (this.hits == 0) {
      image(this.img, this.x, this.y, this.r, this.r);
    } else {
      image(ship2, this.x, this.y, this.r, this.r);
    }
    if (!gameisover) this.x += this.xMove;
    if (this.x > width - this.r || (this.x < this.r && !gameisover)) {
      for (let i = 0; i < ships.length; i++) {
        ships[i].xMove *= -1;
        ships[i].y += height / 25;
      }
    }
    if (!gameisover) this.x += this.xMove;
  }
  
  this.checkHit = function() {
    let d = dist(this.x,this.y,paddle.x,paddle.y);
    let r = this.r/2 + paddle.r/2;
    return (d<r && !gameisover && this.alive || this.y > height && !gameisover)
  }
}
