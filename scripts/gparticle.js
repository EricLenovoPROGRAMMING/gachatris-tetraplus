const GTRISParticle = {
	Particle: class {
		constructor(spriteRow, spriteCell, startX, startY, endX, endY, duration, size, type) {
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
		};
		update() {
			this.duration--;
			this.elapsed++;
			if(this.type == "linear"){
			this.x = this.startX + ((this.endX - this.startX) * (this.duration / this.maxDuration));
			this.y = this.startY + ((this.endY - this.startY) * (this.duration / this.maxDuration));
			}else if (this.type == "ease") {
				this.y = (this.bezier(
					this.duration / this.maxDuration,
					this.startY,
					this.startY * 1.2,
					this.endY * 1.9,
					this.endY
					));
				this.x = this.startX + ((this.endX - this.startX) * (this.duration / this.maxDuration));
			}else if (this.type == "ease2") {
				this.x = this.startX + ((this.endX - this.startX) * this.bezier(this.duration / this.maxDuration,
				0,
				0.15,
				1,
				1));
				this.y = this.startY + ((this.endY - this.startY) * this.bezier(this.duration / this.maxDuration,
				0,
				0.3,
				1,
				1));
			}else if (this.type == "hardDrop") {
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
		};
		getX() {
			return this.x;
		};
		getY() {
			return this.y;
		}
		bezier(t , initial , p1, p2, final){
return (1 - t) * (1 - t) * (1 - t) * initial
        +
        3 * (1 - t) * (1 - t) * t * p1
        +
        3 * (1 - t) * t * t * p2
        +
        t * t * t * final;
}
	},
	ParticleManagement: class {
		constructor() {
			this.intrv = 10
		};

		refresh(context) {
			if(this.intrv < 0){
				this.intrv = -1
			if (GTRISParticle.particles.length > 0) {
				for (let i = 0, len = GTRISParticle.particles.length; i < len; i++) {
					if(typeof GTRISParticle.particles[i] !== "undefined"){
					GTRISParticle.particles[i].update();
					dynamicDraw(
						context,
						GTRISParticle.particles[i].getX(),
						GTRISParticle.particles[i].getY(),
						GTRISParticle.particles[i].spriteRow,
						GTRISParticle.particles[i].spriteCell,
						GTRISParticle.particles[i].duration > 0 ? GTRISParticle.particles[i].size : 0
					)
					if (GTRISParticle.particles[i].duration < -30) {
						GTRISParticle.particles.splice(i, 1)
					}
					}
				}
				_CTX[context].globalAlpha = 0.09;
				_CTX[context].globalCompositeOperation = "destination-out"
				_CTX[context].fillRect(0, 0, _canvasses[context].width, _canvasses[context].height)
				_CTX[context].globalCompositeOperation = "source-over"
				_CTX[context].globalAlpha = 1;

			} else {
    clear(_CTX[context])
			}
			}else{
				this.intrv--
			}
		};

		addParticle(spriteRow, spriteCell, startX, startY, endX, endY, duration, size, type) {
			if(selectedSettings.Other.Particle >= 1)
			GTRISParticle.particles.push(new GTRISParticle.Particle(spriteRow, spriteCell, endX - (size / 2), endY - (size / 2), startX - (size / 2), startY - (size / 2), duration, size, type ? type : "ease"))
		};
	},

	particles: [],
}
const GTRISParticleManagement = new GTRISParticle.ParticleManagement()
