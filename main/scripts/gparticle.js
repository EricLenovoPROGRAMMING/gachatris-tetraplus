const GTRISParticle = {
 Particle: class {
  constructor(spriteRow, spriteCell, startX, startY, endX, endY, duration, size, type, rotSpeed) {
   this.x = startX;
   this.y = startY;
   this.startX = startX;
   this.startY = startY;
   this.spriteCell = spriteCell;
   this.spriteRow = spriteRow;
   this.endX = endX;
   this.endY = endY;
   this.duration = duration;
   this.size = size;
   this.maxDuration = duration;
   this.elapsed = 0;
   this.type = type;
   this.rotSpeed = rotSpeed || 0;
   this.rotPos = 0;
  };
  update() {
   this.duration--;
   this.elapsed++;
   if (this.type == "linear") {
    this.x = this.startX + ((this.endX - this.startX) * (this.duration / this.maxDuration));
    this.y = this.startY + ((this.endY - this.startY) * (this.duration / this.maxDuration));
   } else if (this.type == "ease") {
    this.y = (this.bezier(
     this.duration / this.maxDuration,
     this.startY,
     this.startY * 1.2,
     this.endY * 1.9,
     this.endY
    ));
    this.x = this.startX + ((this.endX - this.startX) * (this.duration / this.maxDuration));
   } else if (this.type == "ease2") {
    this.x = this.startX + ((this.endX - this.startX) * this.bezier(this.duration / this.maxDuration,
     0,
     1,
     1.1,
     1));
    this.y = this.startY + ((this.endY - this.startY) * this.bezier(this.duration / this.maxDuration,
     0,
     1,
     1,
     1));
   } else if (this.type == "hardDrop") {
    this.x = this.startX + ((this.endX - this.startX) * this.bezier(this.duration / this.maxDuration,
     0,
     0,
     0,
     1));
    this.y = this.startY + ((this.endY - this.startY) * this.bezier(this.duration / this.maxDuration,
     0,
     0,
     0,
     1));
   }
   else if (this.type == "fallField") {
    this.x = this.startX + ((this.endX - this.startX) * this.duration / this.maxDuration);
    this.y = this.startY + ((this.endY - this.startY) * this.bezier(this.duration / this.maxDuration,
     0,
     0.4,
     1.5,
     1));
   }
   this.rotPos += this.rotSpeed;
  };
  getX() {
   return this.x;
  };
  getY() {
   return this.y;
  }
  bezier(t, initial, p1, p2, final) {
   return (1 - t) * (1 - t) * (1 - t) * initial +
    3 * (1 - t) * (1 - t) * t * p1 +
    3 * (1 - t) * t * t * p2 +
    t * t * t * final;
  }
 },
 ParticleManagement: class {
  constructor() {
   this.intrv = 10
  }
  
  dynamicDraw(tctx, x, y, r, cell, size, rotate) {
   let ctx = _CTX[tctx];
 x = ~~x;
 var row
 var type
 if (r < 2) {
  type = _canvasses.spriteParticle
  row = 0
 }
 else {
  type = _canvasses.sprite
  row = r - 2
 }
// console.log(row*cellSize)

 /*_CTX[ctx].drawImage(
  type,
  cell * cellSize,
  row * cellSize,
  cellSize,
  cellSize,
  x,
  y,
  size * totalTetrionSize,
  size * totalTetrionSize,
 );*/
 let tsize = size * totalTetrionSize;
 ctx.save();
 ctx.translate(x + tsize / 2, y + tsize / 2);

ctx.rotate((Math.PI / 2) * (rotate / 180));
ctx.drawImage(type,
   cell * cellSize,
    row * cellSize,
    cellSize,
    cellSize, -tsize / 2, -tsize / 2, tsize, tsize);
ctx.restore();
 
};




  refresh(context) {
   if (this.intrv < 0) for (let g = 0; g < 2; g++)  {
    this.intrv = -1;
    clear(_CTX[context]);
    if (GTRISParticle.particles.length > 0) {
     
     //_CTX[context].save();
     //_CTX[context].translate(1,1);
     for (let i = 0, len = GTRISParticle.particles.length; i < len; i++) {
      if (typeof GTRISParticle.particles[i] !== "undefined") {
       GTRISParticle.particles[i].update();
       this.dynamicDraw(
        context,
        GTRISParticle.particles[i].getX(),
        GTRISParticle.particles[i].getY(),
        GTRISParticle.particles[i].spriteRow,
        GTRISParticle.particles[i].spriteCell,
        GTRISParticle.particles[i].duration > 0 ? GTRISParticle.particles[i].size : 0,
        GTRISParticle.particles[i].rotPos
       )
       if (GTRISParticle.particles[i].duration < -30) {
        GTRISParticle.particles.splice(i, 1)
       }
      }
     }
     //_CTX[context].restore();
     /*_CTX[context].globalAlpha = 0.09;
     _CTX[context].globalCompositeOperation = "destination-out"
     _CTX[context].fillRect(0, 0, _canvasses[context].width, _canvasses[context].height)
     _CTX[context].globalCompositeOperation = "source-over"
     _CTX[context].globalAlpha = 1;*/

    } else {
     clear(_CTX[context]);
    }
   } else {
    this.intrv--;
   }
  };

  addParticle(spriteRow, spriteCell, startX, startY, endX, endY, duration, size, type, rotSpeed) {
   if (selectedSettings.Other.Particle >= 1)
    GTRISParticle.particles.push(new GTRISParticle.Particle(spriteRow, spriteCell, endX - ((size * totalTetrionSize) / 2), endY - ((size * totalTetrionSize) / 2), startX - ((size * totalTetrionSize) / 2), startY - ((size * totalTetrionSize) / 2), duration, size, type ? type : "ease", rotSpeed))
  };
 },

 particles: [],
}
const GTRISParticleManagement = new GTRISParticle.ParticleManagement()
