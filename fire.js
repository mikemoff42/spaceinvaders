function Fire() {
  this.x=paddle.x// + random(-5,5);
  this.y=height*0.98 + random(-2,2);
  this.xspeed = random(-3,3);
  this.yspeed = random(-3,-1);
  this.alpha = 255;
  
  this.show = function() {
    stroke(random(200,255),random(80,100),0,this.alpha);
    strokeWeight(this.y/250);
    point(this.x,this.y);
    this.x+=this.xspeed;
    this.y+=this.yspeed;
    this.alpha-=20;
  }
}