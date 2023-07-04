/* Beta v0.44 Gachatris AI for Gachatris Tetraplus (maintained by EricLenovo) improved obtained from Gachatris JavaScriptus*/
// Injected Gachatris Sapphirus AI Code
function GTTP_AI() {
	this.counter = 0
	this.KPSCap = 20
	this.imaginary = {
		x: 0,
		y: 0,
		rot: 0,
		hold: false,
		index: 0,
		addrot: 0,
		sft: 0
	}
	this.it_is_full = false
	this.prev_holes = false
	this.bestIndex = {}
	this.fixedCounter = 0
	this.PPSLimit = ''
	this.controllerMovements = ""
	this.customControllerMovements = []
	this.canUseControllerMovements = false
	this.aiMode = "sapphirus";
 this.ai = {
   tspinDetected: {
    tslot: [],
    bottom: [],
    tuck: [],

    tLines: [],
    tBlock: [],
    tSlot: [],
    tAvoidColumn: []


   }
 }
}
GTTP_AI.prototype = {
	run: function() {
		this.counter--
		if (keysPressed2 == 0 && this.counter <= 1 && gachamino2.y > 10) {
			if ((!field2.isFrenzy || field2.frenzy.phase < 7) || (this.controllerMovements.length == 0 || typeof this.controllerMovements === "string")) {
				if (this.customControllerMovements.length == 0 && this.aiMode === "tetraplus") {
					if (!this.imaginary.hold) {

					}
					if (this.imaginary.hold) {
						keysPressed2 |= flags.HOLD
						this.imaginary.hold = false
					} else
					if (this.imaginary.x > Math.round(gachamino2.x) && gachamino2.checkPieceValidation(1, 0, gachamino2.tetro) /**/ ) {
						keysPressed2 |= flags.RIGHT
						if (this.imaginary.rot == 1) {
						keysPressed2 |= flags.CW
						this.imaginary.rot = 0
					} else
					if (this.imaginary.rot == 2) {
						keysPressed2 |= flags[`180DEG`]
						this.imaginary.rot = 0
					} else
					if (this.imaginary.rot == 3) {
						keysPressed2 |= flags.CCW
						this.imaginary.rot = 0
					}
					}
					else if (this.imaginary.x < Math.round(gachamino2.x) && gachamino2.checkPieceValidation(-1, 0, gachamino2.tetro) /**/ ) {
						keysPressed2 |= flags.LEFT
						if (this.imaginary.rot == 1) {
						 keysPressed2 |= flags.CW
						 this.imaginary.rot = 0
						} else
						if (this.imaginary.rot == 2) {
						 keysPressed2 |= flags[`180DEG`]
						 this.imaginary.rot = 0
						} else
						if (this.imaginary.rot == 3) {
						 keysPressed2 |= flags.CCW
						 this.imaginary.rot = 0
						}
					}

					else
					if (this.imaginary.rot == 1) {
						keysPressed2 |= flags.CW
						this.imaginary.rot = 0
					} else
					if (this.imaginary.rot == 2) {
						keysPressed2 |= flags[`180DEG`]
						this.imaginary.rot = 0
					} else
					if (this.imaginary.rot == 3) {
						keysPressed2 |= flags.CCW
						this.imaginary.rot = 0
					} else
					if (this.imaginary.sft > 0) {
						keysPressed2 |= flags.SDROP
						if (!gachamino2.checkPieceValidation(0, 1, gachamino2.tetro)) {
							this.imaginary.rot += this.imaginary.addrot
							this.imaginary.sft--
						}
					} else

					if ((field2.pieces / ((frame - (120 * 3)) / 120)) < this.PPSLimit || typeof this.PPSLimit !== 'number')
					{
						keysPressed2 |= flags.HDROP
					}
				} else {
					let evC = gachamino2.y < -9 ? 0 : this.customControllerMovements.shift()
					switch (evC) {
						case 1: {
							keysPressed2 |= flags.HDROP
							break
						}
						case 2: {
							keysPressed2 |= flags.SDROP
							if (gachamino2.checkPieceValidation(0, 1, gachamino2.tetro)) {
								this.customControllerMovements.unshift(2)
							}
							break
						}
						case 4: {
							keysPressed2 |= flags.LEFT
							break
						}
						case 3: {
							keysPressed2 |= flags.RIGHT
							break
						}
						case 5: {
							keysPressed2 |= flags.CCW
							break
						}
						case 6: {
							keysPressed2 |= flags.CW
							break
						}
						case 7: {
							keysPressed2 |= flags[`180DEG`]
							break
						}
						case 8: {
							keysPressed2 |= flags.HOLD
							break
						}
					}
				}
			} else {
				if (this.controllerMovements.length !== 0) {
					var ev = gachamino2.y < -9 ? 0 : this.controllerMovements.shift()
					switch (ev) {
						case 1: {
							keysPressed2 |= flags.HDROP
							break
						}
						case 2: {
							keysPressed2 |= flags.SDROP
							if (gachamino2.checkPieceValidation(0, 1, gachamino2.tetro)) {
								this.controllerMovements.unshift(2)
							}
							break
						}
						case 3: {
							keysPressed2 |= flags.LEFT
							break
						}
						case 4: {
							keysPressed2 |= flags.RIGHT
							break
						}
						case 5: {
							keysPressed2 |= flags.CCW
							break
						}
						case 6: {
							keysPressed2 |= flags.CW
							break
						}
						case 7: {
							keysPressed2 |= flags[`180DEG`]
							break
						}
						case 8: {
							keysPressed2 |= flags.HOLD
							break
						}
					}
				}
			}
			this.counter = !(keysPressed2 & flags.SDROP) ? (selectedSettings.AI.KPDI /*+ (field2.grid.toString().replace(/,/gm, "").replace(/0/gm,"").length * -0.5)*/) : 0
		}
		else {
			keysPressed2 = 0
		}
	},
	eval: function(index, held, combo, b2b, grid, px, py, hx, hy, prot) {
	 if (this.aiMode == "tetraplus"){
		gtrisAIPredictor.eval(index)
		gtrisAIPredictor2.eval(preview2.grabBag[0])
		if (hold2.piece !== void 0) {
			gtrisAIPredictor3.eval(hold2.piece)
		}
		this.bestIndex = {}
		let hold = false
		if (field2.pieces < 1 && (index == 4 || index == 6)) {
			this.bestIndex = gtrisAIPredictor2.bestPrediction
			hold = true
		} else {
			if (hold2.piece == void 0) {
				if (gtrisAIPredictor.bestPrediction.score < gtrisAIPredictor2.bestPrediction.score && !held) {
					this.bestIndex = gtrisAIPredictor2.bestPrediction
					hold = true
				} else this.bestIndex = gtrisAIPredictor.bestPrediction
			} else
			if (gtrisAIPredictor.bestPrediction.score < gtrisAIPredictor3.bestPrediction.score && !held) {
				this.bestIndex = gtrisAIPredictor3.bestPrediction
				hold = true
			} else {
				this.bestIndex = gtrisAIPredictor.bestPrediction
				hold = false
			}
		}
		this.imaginary.x = this.bestIndex['x']
		this.imaginary.rot = this.bestIndex['rot']
		this.imaginary.y = this.bestIndex['y']
		this.imaginary.index = this.bestIndex['index']
		this.imaginary.sft = this.bestIndex.sft
		this.imaginary.addrot = this.bestIndex.addRot
		this.imaginary.hold = hold
		/** BETA */
		if (hold && this.bestIndex.canUseControllerMovements)
			this.customControllerMovements.push(8)
		for (let e of this.bestIndex.controllerMovements) this.customControllerMovements.push(e)

		/**/
	}
	if (this.aiMode == "sapphirus"){
  if (held) return;
  
  
  let gd = [0,1,2,3,4,5,6];//[4, 5, 1, 2, 3, 6, 0];
	   let jsobj = {
   grid: grid,
   b2b: b2b,
   isWarning: field2.warning,
   width: 10,
   height: 42,
   hiddenHeight: 22,
   visibleHeight: 20,
   combo: combo,
   isEnable180: true,
   piecesCount: 999,
   tFulfill: this.ai.tspinDetected.tFulfill || [],
   tPrevent: this.ai.tspinDetected.tPrevent || [],
   tLines: this.ai.tspinDetected.tLines || [],
   tAvoidColumn: this.ai.tspinDetected.tAvoidColumn || [],
   
   
   
  };
  this.customControllerMovements = [];
  requestAnimationFrame(async () => {
   let args = [gd[index], hold2.piece !== void 0 ? gd[hold2.piece] : void 0, gd[preview2.grabBag[0]], jsobj, px, py, hx, hy, prot];
   let best = await SapphirusAI.evaluate(args);
   this.customControllerMovements = best.move;
   this.ai.tspinDetected.tLines = best.tl;
   this.ai.tspinDetected.tAvoidColumn = best.ta;
   this.ai.tspinDetected.tPrevent = best.tp;
   this.ai.tspinDetected.tFulfill = best.tf;
   draw(best.g, best.x, best.y - 19.6, field2.mainAssets.field, 3, 0);
  });
	}
}
}
/* This is the beta version of this support function for the Gachatris AI, I cannot overcome the problems regarding T-SPINS*/
function GTTP_AIPredict() {
	this.grid = []
	this.x = 0
	this.y = 0
	this.tetro = []
	var h = 6666,
		T = 9373,
		Z = 0;
	this.tSpinDetector = [[
 	[h, T, h],
 	[Z, T, T],
 	[Z, T, h]
 	],
 	[
 	[Z, T, h],
 	[Z, T, T],
 	[h, T, h]
 	]
 	];


	this.landed = false;
	this.index = null;
	this.prediction = {};
	this.predictionCount = 0;
	this.rotationTrials = 0;
	this.aggregateHeight = 0;
	this.columnHeights = [];
	this.bumpiness = 0;
	this.holes = 0;
	this.completeLines = 0;
	this.tSpin = 0;
	this.column = 0
	this.failedTSpin = 0
	this.testSFT = 0
	this.addRot = 0
	this.pos = 0
	this.canTSPIN = false;
	this.heuristicsWeight = {
		aggregateHeight: -0.510066,
		bumpiness: -0.184483,
		completeLines: -0.1760666,
		holes: -14.00035663,
		blockades: -0.0666,
		tSpin: 1.5,
		failedTSpin: -1.74838,
		overall: -0.00004
	}
	this.canUseControllerMovements = false
	this.controllerMovementsAvailable = "e"
}

GTTP_AIPredict.prototype = {
	eval: function(Piece) {
		this.tetro = pieces[Piece].tetro
		this.index = Piece
		this.kickData = pieces[Piece].kickData['left']
		this.x = pieces[Piece].x /**/
		this.y = 18
		this.pos = 0
		this.grid = $copy(field2.grid)

		if (this.index == 3) this.rotationTrials = 0
		if (this.index == 4 || this.index == 0 || this.index == 6) this.rotationTrials = 1
		if (this.index == 2 || this.index == 1 || this.index == 5) this.rotationTrials = 3
		this.prediction = []
		this.predictionCount = 0

		for (let rot = 0; rot <= this.rotationTrials; rot++) {
			this.x = pieces[Piece].x
			this.y = 18
			for (let uuu = 0; uuu < 15; uuu++) {
				if (this.moveValid(-1, 0, this.tetro)) {
					this.x -= 1;
				}
			}

			if (rot != 0) {
				const direction = 1
				let rotated = [];
				if (direction === 1) {
					for (var i = 0; i < this.tetro.length; i++) {
						rotated[i] = [];
						for (var row = this.tetro.length - 1; row >= 0; row--) {
							rotated[i][row] = this.tetro[row][this.tetro.length - 1 - i];
						}
					}
				}
				var curPos = this.pos.mod(4);
				var newPos = (this.pos + direction).mod(4);

				for (var x = 0, len = this.kickData[0].length; x < len; x++) {
					if (
						this.moveValid(
							this.kickData[curPos][x][0] - this.kickData[newPos][x][0],
							this.kickData[curPos][x][1] - this.kickData[newPos][x][1],
							rotated,
						)
					) {
						this.x += this.kickData[curPos][x][0] - this.kickData[newPos][x][0];
						this.y += this.kickData[curPos][x][1] - this.kickData[newPos][x][1];
						this.tetro = rotated;
						this.pos = newPos;
						break;
					} else {

					}
				};
			}

			for (let uuu = 0; uuu < 13; uuu++) {
				if (this.moveValid(0, 0, this.tetro)) {
					this.x -= 1;
				}
			}

			for (let move = 0; move < 14; move++) {
				this.controllerMovementsAvailable = []
				this.canUseControllerMovements = false
				this.grid = $copy(field2.grid)
				this.testSFT = 0
				this.tSpin = 0
				this.failedTSpin = 0
				this.addRot = 0
				for (let GX = 0; GX < 10; GX++) {
					for (let GY = 0; GY < 42; GY++) {
						if (typeof this.grid[GX][GY] == "undefined") this.grid[GX][GY] = 0
					}
				}
				this.y = 18
				if (this.moveValid(1, 0, this.tetro)) {
					this.x += 1;
				}
				var tSX = 848
				var tSY = 0
				var tPrevent = [],
					tYes = 0,
					tSlot = 0,
					tZero = 0,
					tBlock = 0
				if (this.canTSPIN) {
					for (var TI = 0; TI < 2; TI++) {
						for (let EX of [0, 1, 2, 3, 4, 5, 6, 7]) {
							for (let EY = 30, len = this.grid[EX].length - 1; EY < len; EY++) {
								tSlot = 0;
								tZero = 0;
								tBlock = 0;
								for (let ECX = 0, len2 = this.tSpinDetector[TI].length; ECX < len2; ECX++) {
									for (let ECY = 0, len3 = this.tSpinDetector[TI][ECX].length; ECY < len3; ECY++) {
										//detect
										if (this.grid[EX + ECX][EY + ECY] == 0 && this.tSpinDetector[TI][ECX][ECY] === 9373) {
											tSlot++
										}
										if (this.grid[EX + ECX][EY + ECY] == 0 && this.tSpinDetector[TI][ECX][ECY] === 0) {
											tZero++
										}
										if (this.grid[EX + ECX][EY + ECY] >= 1 && this.tSpinDetector[TI][ECX][ECY] == 6666) {
											tBlock++
										}
									}
								}
								if (tSlot == 4 && tBlock == 3 && tZero == 2) {
									tYes++
								}
								if (tYes == 1) {
									for (let ECX = 0, len2 = this.tSpinDetector[TI].length; ECX < len2; ECX++) {
										for (let ECY = 0, len3 = this.tSpinDetector[TI][ECX].length; ECY < len3; ECY++) {
											if (this.tSpinDetector[TI][ECX][ECY] == 0 || this.tSpinDetector[TI][ECX][ECY] == 9373) {
												tPrevent[tPrevent.length] = [EX + ECX, EY + ECY]
											}
											tSX = EX
											tSY = EY
										}
									}

									break
								}
							}
						}
					}
				}



				this.y += this.getDrop(79)
				this.completeLines = 0
				if (this.canTSPIN && this.index !== 5) {
					for (var TE = 0; TE < tPrevent.length; TE++) {
						for (let TX = 0; TX < this.tetro.length; TX++) {
							for (let TY = 0; TY < this.tetro[TX].length; TY++) {
								if (this.tetro[TX][TY] > 0 && this.tetro[TX][TY] !== 6 && TX + this.x == tPrevent[TE][0] && TY + this.y == tPrevent[TE][1]) {
									this.failedTSpin++
									break
								}
							}
						}
					}
				}

				this.columnHeights = []
				//this.lineCount=0
				this.lines = 0
				{
					let tetro = this.tetro
					this.once = false
					let range = [];
					let tSpinPrep = 0
					if (this.canTSPIN && this.index == 5) {
						for (var TE = 0; TE < tPrevent.length; TE++) {
							for (let TX = 0; TX < this.tetro.length; TX++) {
								for (let TY = 0; TY < this.tetro[TX].length; TY++) {
									if (this.tetro[TX][TY] == 6 && TX + this.x == tPrevent[TE][0] && TY + this.y == tPrevent[TE][1]) {
										tSpinPrep++
									}
								}
							}
						}
					}


					if (this.canTSPIN && this.index == 5 && tSpinPrep > 2  && tSX == this.x && tSY >= this.y/**/ ) {
						if (rot == 1) {
							{
								const direction = 1
								let rotated = [];
								if (direction === 1) {
									for (var i = 0; i < this.tetro.length; i++) {
										rotated[i] = [];
										for (var row = this.tetro.length - 1; row >= 0; row--) {
											rotated[i][row] = this.tetro[row][this.tetro.length - 1 - i];
										}
									}
								}
								var curPos = this.pos.mod(4);
								var newPos = (this.pos + direction).mod(4);

								for (var x = 0, len = this.kickData[0].length; x < len; x++) {
									if (
										this.moveValid(
											this.kickData[curPos][x][0] - this.kickData[newPos][x][0],
											this.kickData[curPos][x][1] - this.kickData[newPos][x][1],
											rotated,
										)
									) {
										this.x += this.kickData[curPos][x][0] - this.kickData[newPos][x][0];
										this.y += this.kickData[curPos][x][1] - this.kickData[newPos][x][1];
										this.tetro = rotated;
										this.pos = newPos;
										break;
									}
								};
								this.addRot++
							}
						}
						else
						if (rot == 3) {
							for (var ttt = 0; ttt < 3; ttt++) {
								const direction = 1
								let rotated = [];
								if (direction === 1) {
									for (var i = 0; i < this.tetro.length; i++) {
										rotated[i] = [];
										for (var row = this.tetro.length - 1; row >= 0; row--) {
											rotated[i][row] = this.tetro[row][this.tetro.length - 1 - i];
										}
									}
								}
								var curPos = this.pos.mod(4);
								var newPos = (this.pos + direction).mod(4);

								for (var x = 0, len = this.kickData[0].length; x < len; x++) {
									if (
										this.moveValid(
											this.kickData[curPos][x][0] - this.kickData[newPos][x][0],
											this.kickData[curPos][x][1] - this.kickData[newPos][x][1],
											rotated,
										)
									) {
										this.x += this.kickData[curPos][x][0] - this.kickData[newPos][x][0];
										this.y += this.kickData[curPos][x][1] - this.kickData[newPos][x][1];
										this.tetro = rotated;
										this.pos = newPos;
										break;
									}
								};
								this.addRot++
							}

						}
						this.tSpin += 73
						this.testSFT++
						this.controllerMovementsAvailable = []


						if (rot == 1) {
							this.controllerMovementsAvailable.push(6)
						}
						else if (rot == 3) {
							this.controllerMovementsAvailable.push(5)
						}

						let thisX = this.x
						if (thisX == 0) {
							for (var i = 0; i < 3; i++) {
								this.controllerMovementsAvailable.push(3)
							}
						}
						else if (thisX == 1) {
							for (var i = 0; i < 2; i++) {
								this.controllerMovementsAvailable.push(3)
							}
						}
						else if (thisX == 2) {
							for (var i = 0; i < 1; i++) {
								this.controllerMovementsAvailable.push(3)
							}
						}
						else if (thisX == 4) {
							for (var i = 0; i < 1; i++) {
								this.controllerMovementsAvailable.push(4)
							}
						}
						else if (thisX == 5) {
							for (var i = 0; i < 2; i++) {
								this.controllerMovementsAvailable.push(4)
							}
						}
						else if (thisX == 6) {
							for (var i = 0; i < 3; i++) {
								this.controllerMovementsAvailable.push(4)
							}
						}
						else if (thisX == 7) {
							for (var i = 0; i < 4; i++) {
								this.controllerMovementsAvailable.push(4)
							}
						}

						this.controllerMovementsAvailable.push(2)

						if (rot == 1) {
							this.controllerMovementsAvailable.push(6)
						}
						else if (rot == 3) {
							this.controllerMovementsAvailable.push(5)
						}
						this.controllerMovementsAvailable.push(1)
						this.canUseControllerMovements = true
					}
					for (var x = 0, LENGTHX = this.tetro.length; x < LENGTHX; x++) {
						for (var y = 0, LENGTHY = this.tetro[x].length; y < LENGTHY; y++) {
							if (tetro[x][y]) {
								try {
									this.grid[x + this.x][y + this.y] = this.tetro[x][y];
								} catch (e) {}
								if (!this.once || x + this.x < this.column) {
									this.column = x + this.x;
									this.once = true;
								}
								if (range.indexOf(y + this.y) === -1) {
									range.push(y + this.y);
								}
							}
						}

					}
					range = range.sort(function(a, b) {
						return a - b;
					});
					for (let row = 18, len = 42; row < len; row++) {
						let count = 0
						for (var x = 0; x < 10; x++) {
							if (this.grid[x][row] !== 0 && typeof this.grid[x][row] == 'number') {
								count++
								this.lineCount++

							} else {}
						}
						if (count > 9)
						{
							this.completeLines++
							this.lines++
							for (var y = row; y >= 18; y--) {
								for (var x = 0; x < 10; x++) {
									{
										this.grid[x][y] = this.grid[x][y - 1];
									}
								}
							} /**/
						}
					}
				}


				tYes = 0, tSlot = 0, tZero = 0, tBlock = 0
				if (this.canTSPIN) {
					for (var TI = 0; TI < this.tSpinDetector.length; TI++) {
						for (let EX of [0, 1, 2, 3, 4, 5, 6, 7]) {
							for (let EY = 30, len = this.grid[EX].length - 1; EY < len; EY++) {
								tSlot = 0;
								tZero = 0;
								tBlock = 0;
								for (let ECX = 0, len2 = this.tSpinDetector[TI].length; ECX < len2; ECX++) {
									for (let ECY = 0, len3 = this.tSpinDetector[TI][ECX].length; ECY < len3; ECY++) {
										//detect
										if (this.grid[EX + ECX][EY + ECY] == 0 && this.tSpinDetector[TI][ECX][ECY] === 9373) {
											tSlot++
										}
										if (this.grid[EX + ECX][EY + ECY] == 0 && this.tSpinDetector[TI][ECX][ECY] === 0) {
											tZero++
										}
										if (this.grid[EX + ECX][EY + ECY] >= 1 && this.tSpinDetector[TI][ECX][ECY] == 6666) {
											tBlock++
										}
									}
								}
								if (tSlot == 4 && tBlock == 3 && tZero == 2) {
									tYes++
								}
								if (tYes == 1) {
									for (let ECX = 0, len2 = this.tSpinDetector[TI].length; ECX < len2; ECX++) {
										for (let ECY = 0, len3 = this.tSpinDetector[TI][ECX].length; ECY < len3; ECY++) {

											if (this.tSpinDetector[TI][ECX][ECY] == 0 || this.tSpinDetector[TI][ECX][ECY] == 9373)
												this.tSpin++
										}
									}
								}
							}
						}
					}
				}
				//this.tSpin *= this.completeLines

				this.aggregateHeight = 0
				for (let gx = 0; gx < 10; gx++) {
					for (let gy = 18; gy < 42; gy++) {}
					var r = 0;
					for (; r < 42 && (this.grid[gx][r] == 0 || typeof this.grid[gx][r] == "undefined"); r++);
					this.columnHeights[gx] = 21 - r;

				}
				for (let value of this.columnHeights)
					this.aggregateHeight += value

				this.bumpiness = 0
				for (var c = 0, T = this.columnHeights.length - 1; c < T; c++) {
					this.bumpiness += Math.abs(this.columnHeights[c] - this.columnHeights[c + 1]);
				}

				this.holes = 0
				{
					for (var x = 0; x < 10; x++) {
						var block = false;
						for (var y = 18; y < 42; y++) {
							if (this.grid[x][y]) {
								block = true;
							} else if (this.grid[x][y] == 0 && block) {
								this.holes++;
							}
						}
					}
				}
				this.blockades = 0; {
					let count = 0;
					for (var c = 0; c < 10; c++) {
						var hole = false;
						for (var r = 42; r >= 18; r--) {
							if (this.grid[c][r] == 0 || typeof this.grid[c][r] == "undefined") {
								hole = true;
							} else if ((this.grid[c][r] != 0 && hole || typeof this.grid[c][r] !== "undefined" && hole)) {
								count++;
							}
						}
					}
					this.blockades = count;
				}
				let tryEmpty = 0;
				for (var x = 0; x < this.tetro.length; x++) {
      for (var y = 0; y < this.tetro[x].length; y++) {
       if (this.x + x > 8 && this.y + y > 10) tryEmpty+=0;
      }
     };
     let maxHeightReached = false;
     for (var x = 0; x < field2.width; x++) {
      for (var y = 0; y < field2.height - 14; y++) {
       if (this.grid[x][y]) maxHeightReached = true;
      }
     };
     if(field2.warning || field2.renInteger > -1) tryEmpty = 0;

				
				this.score = (tryEmpty * -94999.9999999) + (this.heuristicsWeight.failedTSpin * this.failedTSpin) + ((this.heuristicsWeight.aggregateHeight * (this.aggregateHeight))) + (this.heuristicsWeight.completeLines * (this.completeLines)) + (this.heuristicsWeight.holes * (this.holes)) + (this.heuristicsWeight.bumpiness * (this.bumpiness)) + (this.heuristicsWeight.blockades * (this.blockades)) + (this.heuristicsWeight.tSpin * (this.tSpin))
				{
					this.prediction.push({
						index: this.predictionCount,
						x: this.x,
						columnHeights: this.columnHeights,
						aggregateHeight: this.aggregateHeight,
						bumpiness: this.bumpiness,
						holes: this.holes,
						lines: this.completeLines,
						rot: rot,
						pieceIndex: this.index,
						score: this.score,
						y: this.y,
						sft: this.testSFT,
						addRot: this.addRot,
						canUseControllerMovements: $copy(this.canUseControllerMovements),
						controllerMovements: $copy(this.controllerMovementsAvailable)
					})
					this.predictionCount++
				}
			}

			let highestScore = -888833883778
			let highestLine = -3848883
			this.selectedIndex = 0
			for (let HIGH of this.prediction) {
				let evalS = HIGH['score'] //+(HIGH['lines']*50)
				if (highestScore < evalS) {
					highestScore = evalS
					this.selectedIndex = HIGH['index']
				}
				if (highestLine < HIGH['lines']) {

				}

			}
			this.bestPrediction = this.prediction[this.selectedIndex]
		}
	},
	getDrop: function(distance) {
		for (var i = 1; i <= distance; i++) {
			if (!this.moveValid(0, i, this.tetro)) {; return i - 1; break }
		}
		return i - 1
	},
	moveValid: function(cx, cy, tetro) {
		try {
			cx = cx + this.x;
			cy = Math.floor(cy + this.y);

			for (var x = 0; x < tetro.length; x++) {
				for (var y = 0; y < tetro[x].length; y++) {
					if (
						tetro[x][y] &&
						(cx + x < 0 ||
							cx + x >= 10 ||
							cy + y >= 42 ||
							this.grid[cx + x][cy + y])
					) {
						return false;
					}
				}
			}
			return true;
		} catch (e) {}
	}
}
var gtrisAIPredictor = new GTTP_AIPredict()
var gtrisAIPredictor2 = new GTTP_AIPredict()
var gtrisAIPredictor3 = new GTTP_AIPredict()


var gtrisAI = new GTTP_AI()





const workerManager = new class {

 #importScripts = `
importScripts("<{IMPORT_URL}>");

onmessage = (d) => {
 let result = _eval(d.data);
 postMessage(result);
}
 `;
 
 #workers = {};
 
 #$BTOBASE64(blob, call) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
     var base64 = reader.result;
     call(base64);
    }
   }

 constructor() {
  //this.#workers = {};
 }
 engageWorker(name, impscrtext, on) {
  
  if (this.#workers?.[name]) {
   if (this.#workers[name].worker instanceof Worker) {
    this.#workers[name].worker.terminate();
   }
   
  }
  
  this.#workers[name] = {
   worker: {
    postMessage: () => {},
   },
   base64: ""
  };


  let f = new Blob([impscrtext], { type: 'text/plain' });
  this.#$BTOBASE64(f, blobA => {
   //console.log(blobA);
   let blobABlob = new Blob([blobA], { type: 'text/plain' });
   let blobAURL = URL.createObjectURL(f);
   let blobAText = this.#importScripts.replace("<{IMPORT_URL}>", blobAURL);

   let fw = new Blob([blobAText], { type: 'text/plain' });
   let fwe = URL.createObjectURL(fw);
   this.#workers[name].base64 = blobA;
   this.#workers[name].worker = new Worker(fwe);
   on(this.#workers[name]);
   ////console.log(this.#worker);
   //this.#worker.postMessage("he")



   ////console.log(blobAText, this.#worker);
  });
  
  //let base64, worker;
  return this.#workers[name];

 }
 
 
 stopAll() {
  for (let w in this.#workers) {
   this.#workers[w].worker.terminate();
  }
 }
}

const SapphirusAI = new class {
 #worker;
 #base64;
 constructor(name) {
  let h;
  fetch("./scripts/sapphirus_ai/worker.js").then(y => y.text()).then(j => {
   h = j;
  this.#worker = workerManager.engageWorker(name || "AAAAIIIII", h, (worker) => {
   this.#worker = worker.worker;
  }).worker;
  this.#worker.onerror = (u) => {
   console.error(u + "NOOO")
  }
  });

 }

 evaluate(jsobj) {
  try {
   this.#worker.postMessage(jsobj);
  } catch (e) {
   //console.log(e);
  }

  return new Promise((res) => {
   this.#worker.addEventListener("message", (te) => {
    res(te.data);
   }, { once: true });
  });
 }



}(); /**/