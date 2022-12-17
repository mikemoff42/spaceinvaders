function Paddle(){
  this.x = width/2;
  this.y = height*0.95;
  this.r = height*0.08;
  this.img = paddleImg;
  this.counter = 0;
  this.blastoff = true;
   
  this.show = function(){
    if (!gameisover) this.x = constrain(mouseX,0,width);
    image(this.img, this.x,this.y,height * 0.1,height * 0.1);
    if (gameisover && winner && this.y > -500){
      this.counter-= 0.05;
      this.y+=this.counter;
    }
  }
}