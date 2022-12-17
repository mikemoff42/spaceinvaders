function Blocker(x, y, dir) {
  this.x = x;
  this.y = y;
  this.w = width * 0.1;
  this.h = height * 0.05;
  this.r = this.w;
  this.xMove = dir * 2;
  this.yMove = 0;
  this.dmg = 0;
  this.speedup = false;

  this.show = function () {
    fill(0);
    noStroke();
    if (this.dmg > 0 && this.speedup == true) {
      this.xMove*=1.5;
      this.speedup = false;
      if (level == 1) this.yMove-=random(-2,-1);
      else this.yMove-=random(-5,-2);
    }
    
    image(blockerImg, this.x, this.y, this.w, this.h);
    if (!gameisover) {
      this.x += this.xMove;
      this.y += this.yMove;
    }
    if (this.x > width - this.w / 2 || (this.x < this.w / 2 && !gameisover))
      this.xMove *= -1;
    if (this.y < this.w/2 || this.y > height*0.8) this.yMove*=-1;
  }
}
