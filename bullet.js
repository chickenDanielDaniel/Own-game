class Bullet {
    constructor(x, y) {
      var options = {
        isStatic: true
      };
      this.r = 30;
      this.body = Bodies.circle(x, y, this.r, options);
      this.image = loadImage("Bullet.png");
      World.add(world, this.body);
    }
  
    shoot() {
      push();
      Matter.Body.setStatic(this.body, false);
      engine.world.gravity.y = -1;
      Matter.Body.setVelocity(this.body, { x:0, y: -100});
      pop ();
   
    }
  
    display() {
      var pos = this.body.position;
      var angle = this.body.angle;
  
      push();
      translate (pos.x,pos.y);
      rotate (angle)
      imageMode(CENTER);
      image(this.image, 0,0, this.r, this.r);
      pop();
  
      /*if (this.body.velocity.x > 0 && pos.x > 10) {
        var position = [pos.x, pos.y];
        this.trajectory.push(position);
      }
  
      for (var i = 0; i < this.trajectory.length; i++) {
        image(this.image, this.trajectory[i][0], this.trajectory[i][1], 10, 10);
      }*/
    }
  }
  