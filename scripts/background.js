class FrenzyBackground {
 #Ray = class {
  constructor(x1, y1, x2, y2, divisions) {
   this.distanceX = x2 - x1;
   this.distanceY = y2 - y1;
   this.x1 = x1;
   this.x2 = x2;
   this.y1 = y1;
   this.y2 = y2;
   this.midpointVertexCount = divisions - 1;
   this.midpointVertexes = [];
   for (let f = 0; f < this.midpointVertexCount; f++) {
    this.midpointVertexes.push({
     x: 0,
     y: 0,
    });
   }
   this.color = "#fff";
  }
  moveStart(x, y) {
   this.x1 = x;
   this.y1 = y;
   this.distanceX = this.x2 - this.x1;
   this.distanceY = this.y2 - this.y1;
   /*for (let f = 0; f < this.midpointVertexCount; f++) {
    this.midpointVertexes[f].ox =  this.distanceX / this.midpointVertexCount;
    this.midpointVertexes[f].oy =  this.distanceY / this.midpointVertexCount;
   }*/
  }

  moveEnd(x, y) {
   this.x2 = x;
   this.y2 = y;
   this.distanceX = this.x2 - this.x1;
   this.distanceY = this.y2 - this.y1;

   /*for (let f = 0; f < this.midpointVertexCount; f++) {
    this.midpointVertexes[f].ox = this.distanceX / this.midpointVertexCount;
    this.midpointVertexes[f].oy = this.distanceY / this.midpointVertexCount;
   }*/
  }


  draw(ctx, cellSize) {
   let mx = this.distanceX / this.midpointVertexCount,
    my = this.distanceY / this.midpointVertexCount,
    cx1 = this.x1,
    cy1 = this.y1,
    cx2 = this.x2,
    cy2 = this.y2;
   ctx.beginPath();
   ctx.moveTo((this.x1 * cellSize), (this.y1 * cellSize));
   for (let g = 0, m = this.midpointVertexes.length; g < m; g++) {
    let r = this.midpointVertexes[g];

    ctx.lineTo((((g + 1) * (mx)) + r.x + this.x1) * cellSize, (((g + 1) * (my)) + r.y + this.y1) * cellSize);
    if (g == 4) break;
   }

   ctx.lineTo((this.x2 * cellSize), (this.y2 * cellSize));
   ctx.lineWidth = 0.3 * cellSize;
   ctx.strokeStyle = this.color;
   ctx.stroke();

  }
 };
 constructor(parent) {
  this.parent = parent;
  this.canvas;
  this.ctx;
  this.cellSize = 40;
  this.colors = {
   r: 250,
   g: 60,
   b: 48,
  }
  this.eye = {
   x: 0,
   y: 0,
   w: 5,
   h: 5,
   offset: {
    
    dx: 0,
    dy: 0,
    frame: 0,
    max: 0,
    state: "set"
   }
  };
  this.origStarts = [];
  this.rays = [];
  this.ctxName = this.parent.name;
  this.main + {};
  this.isOn = false;
  this.main = {};
  this.main.temp = new OffscreenCanvas(540, 540),
   this.main.tempCtx = this.main.temp.getContext("2d"),
   this.main.main = new KeyframeSpriteRenderer(540 * 3, 540 * 8, 540, 540, 0, (a, canv, x, y, w, h, frame, that) => {
    let b = a.canvas; // a.canvas is the main canvas, this.canvas
    //a.clearRect(0, 0, b.width, b.height);
    
    let eyeX = this.eye.x;
    let eyeY = this.eye.y;
    
    if (this.eye.offset.frame >= 0) {
     let be = 1 - bezier(this.eye.offset.frame / this.eye.offset.max, 1, 0, 0, 0, 0, 1);
     eyeX = this.eye.x + (this.eye.offset.dx * be);
     eyeY = this.eye.y + (this.eye.offset.dy * be);
     this.eye.offset.frame-= 0.5;;
    }
    
    let mm = ((this.spinFrames) % 360);
    this.main.tempCtx.clearRect(0, 0, w, h);
    this.main.tempCtx.save();
    this.main.tempCtx.translate(w / 2, h / 2);
    this.main.tempCtx.rotate((Math.PI / 180) * (mm));
    this.main.tempCtx.drawImage(canv, ~~(x % 3) * w, (~~(x / 3) % 8) * h, w, h, w / -2, h / -2, w, h);
    let centerSize =20;

    a.drawImage(this.main.temp, 0, 0, w, h, (cellSize * ((-10) - (centerSize / 2) + eyeX)), cellSize * ((-centerSize / 2) - 10 + eyeY), cellSize * (this.parent.fieldSize.vh + centerSize), cellSize * (this.parent.fieldSize.vh + centerSize));
    this.main.tempCtx.restore();

    that.frame.x += 0.5;
    that.frameCount += 0.5;
    this.spinFrames += 0.3;
    this.spinFrames %= 360;
    if (that.frameCount >= 24 || that.frame.x <= -1) {
     that.frameCount = 0;
     that.frame.x = 0;
    }

    //if (frame >= 30) that.enabled = false;
    if (frame == 30) that.actualFrames = 0;;
   }, (frame) => {
    //this.setStyle("CLEARTEXT-CANVTEXT", "animation-delay", `${~~((1000 / -60) * (frame))}ms`);
   }, true);
   
   this.spinSpeed = 0;
   this.spinFrames = 0;
   

  for (let f = 0; f < 12; f++) {
   this.rays.push(new this.#Ray(0, 1, 0, 1, 4));
  }
 }

 fetchAsset(canvas, ctx) {
  this.canvas = canvas;
  this.ctx = ctx;
  
  this.main.main.initialize(this.ctx);
  this.main.main.loadImages([loadedImages.frenzy]);
  this.main.main.exec(0);
  this.main.tempCtx.drawImage(this.main.main.getCanvas(), 0, 0);
  
 }
 reset() {
  this.eye.offset.frame = -9;
  this.spinSpeed = 0.3;
  this.moveEye(this.parent.fieldSize.w / 2, this.parent.fieldSize.vh / 2)
 }
 moveEye(x, y, isReset) {
  this.eye.offset.dx = this.eye.x - x;
  this.eye.offset.dy = this.eye.y - y;
  this.eye.x = x;
  this.eye.y = y;
  this.spinSpeed += 0.4;
  this.eye.offset.state = "set";
  if (isReset) {
   this.eye.offset.state = "reset";
   this.eye.offset.frame = 180;
   this.eye.offset.max = 180;
  } else {
   this.eye.offset.state = "reset";
   this.eye.offset.frame = 5;
   this.eye.offset.max = 5;
  }
  let w = this.parent.fieldSize.w;
  let vh = this.parent.fieldSize.vh;
  this.origStarts = [{
    x: 0 * (w / 3),
    y: 0 * (vh / 3)
  },
   {
    x: 1 * (w / 3),
    y: 0 * (vh / 3)
  },
   {
    x: 2 * (w / 3),
    y: 0 * (vh / 3)
  },
   {
    x: 3 * (w / 3),
    y: 0 * (vh / 3)
  },
   {
    x: 3 * (w / 3),
    y: 1 * (vh / 3)
  },
   {
    x: 3 * (w / 3),
    y: 2 * (vh / 3)
  },
   {
    x: 3 * (w / 3),
    y: 3 * (vh / 3)
  },
   {
    x: 2 * (w / 3),
    y: 3 * (vh / 3)
  },
   {
    x: 1 * (w / 3),
    y: 3 * (vh / 3)
  },
   {
    x: 0 * (w / 3),
    y: 3 * (vh / 3)
  },
   {
    x: 0 * (w / 3),
    y: 2 * (vh / 3)
  },
   {
    x: 0 * (w / 3),
    y: 1 * (vh / 3)
  }];

 }
 changeColor() {
  let ml = ~~(Math.random() * 10);
  this.colors.r = [130, 0, 0, 130, 130, 0, 130, 130, 70, 0][ml] * 2;
  this.colors.g = [0, 130, 0, 0, 130, 130, 0, 70, 130, 70][ml] * 2;
  this.colors.b = [0, 0, 130, 130, 0, 130, 70, 0, 0, 130][ml] * 2;

 }
 run() {
  this.draw();
 }
 changeColorCustom(r, g, b) {
  //let ml = ~~(Math.random() * 10);
  this.colors.r = r;
  this.colors.g = g;
  this.colors.b = b;

 }
 draw() {
  //console.log(this.ctxName)
  clear(_CTX[this.ctxName]);
  //this.eye.x = Math.random() * 10;
  //console.log("rarar")
  
  let w = this.parent.fieldSize.w;
  let vh = this.parent.fieldSize.vh;

  this.ctx.fillStyle = `rgba(${this.colors.r * 0.8},${this.colors.g * 0.8},${this.colors.b * 0.8}, 0.8)`;

  this.ctx.fillRect(
   0, 0,
   this.parent.cellSize * (w),
   this.parent.cellSize * (vh)
  );

  //this.parent.canvasCtx.insane.fillStyle = `rgba(${~~(Math.random() * 255)},${~~(Math.random() * 255)},${~~(Math.random() * 255)}, 0.5)`;

  //console.log(this.parent.cellSize)
  
  this.main.main.run();
  
  if (true) {


   

   /*this.parent.canvasCtx.insane.drawImage(
    game.insaneEye.canvas,
    this.parent.cellSize * (this.eye.x - (this.eye.w / 2)),
    this.parent.cellSize * (this.eye.y - (this.eye.h / 2)),
    this.parent.cellSize * (this.eye.w),
    this.parent.cellSize * (this.eye.h)
   );*/
  }
 }
}
class KeyframeSpriteRenderer {
 #canvas;
 #ctx;
 #target;
 constructor(width, height, frameWidth, frameHeight, fps, func, updateFunc, isLoop) {
  this.#canvas = new OffscreenCanvas(width, height);
  this.#ctx = this.#canvas.getContext("2d");
  this.frame = {
   x: 0,
   y: 0,
   w: frameWidth,
   h: frameHeight,
  };
  this.dim = {
   w: width,
   h: height
  };
  this.origDim = {
   w: width,
   h: height
  };
  this.frameCount = 0;
  this.actualFrames = 0;
  this.func = func;
  this.func2 = updateFunc;
  this.fps = fps;
  this.frameDelay = fps;
  this.enabled = false;
  this.isLoop = isLoop;
  
  /*this.#canvas.convertToBlob().then(res => {
   let a = document.createElement("a");
   a.download = Date.now() + "rawlead.png";
   a.href = URL.createObjectURL(res);
   a.click();
  })*/
  
 }
 initialize(target) {
  this.#target = target;
 }
 loadImages(arr) {
  let len = arr.length;
  this.dim.h = this.origDim.h * len;
  this.#canvas.width = this.dim.w;
  this.#canvas.height = this.dim.h;
  let count = 0;
  for (let e of arr) {
   this.#ctx.drawImage(e, 0, 0, this.origDim.w, this.origDim.h, 0, this.origDim.h * count, this.origDim.w, this.origDim.h);
   count++;
  }
  
  
  let test = new OffscreenCanvas(this.frame.w, this.frame.h);
  let testCtx = test.getContext("2d");
  testCtx.drawImage(this.#canvas, 0, 0, this.frame.w, this.frame.h);
  
  /*this.#canvas.convertToBlob().then(res => {
   let a = document.createElement("a");
   a.download = Date.now() + "rawlead.png";
   a.href = URL.createObjectURL(res);
   a.click();
  })*/
 }
 
 getCanvas() {
  return this.#canvas;
 }

 run() {
  if (!this.enabled) return;
  this.actualFrames++;
  if (this.frameDelay > 0) {
   this.frameDelay--;
  } else {
   this.frameDelay = this.fps;
   this.func(this.#target, this.#canvas, this.frame.x, this.frame.y, this.frame.w, this.frame.h, this.frameCount, this);
  }
  if (this.func2 !== void 0) this.func2(this.actualFrames);
  if (this.isLoop) {
   this.actualFrames = 0;
  }
 }

 exec(y, x) {
  this.enabled = true;
  this.frame.x = x || 0;
  this.frame.y = y;
  this.frameDelay = this.fps;
  this.frameCount = 0;
  this.actualFrames = 0;
 }
 immediateExec(y) {
  this.enabled = true;
  this.frame.x = 0;
  this.frame.y = y;
  this.frameDelay = this.fps;
  this.frameCount = 0;
  this.actualFrames = 0;
  this.run();
 }
}
