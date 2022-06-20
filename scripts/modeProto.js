class UltraScoreAttack {
	constructor() {
		this.time = 0;
		this.isTimerEnabled = false;
	};
	run(bool) {
		if (this.isTimerEnabled && bool) {
			this.time--;
			if (this.time <= 10 * 120 && this.time > 0) {
				if (this.time % 120 == 0) {
					this.ringTimer(this.time < 120 * 3.1 ? 1 : '')
					countDownText(`${(this.time / 120).toFixed(0)}`, false, true)
				}
			}
			switch (this.time) {
				case 120 * 15: {
					this.ringTimer()
					break
				}
				case 120 * 30: {
					this.ringTimer()
					break
				}
			}
			if (this.time < 0) {
				this.endGame()
				soundPlayer.playse('timeup')
				countDownText(`u_finishCTD`, true)
			}
		}
	};
	enableTimer(bool) {
		this.isTimerEnabled = bool;
	};
	setTimer(int) {
		this.time = int;
	};
	returnTimer() {
		return Math.max(0, this.time)
	};
	endGame() {
		field.fieldResult('u_finish', 'win', 'win')
		endGame('u_finish', 'win')
		this.isTimerEnabled = false
	};
	ringTimer(hurrytype) {
		soundPlayer.playse(`hurry${hurrytype == 1?'2':''}`)
	}
}

class CenterFourWide {
	constructor() {
		this.time = 0;
		this.isTimerEnabled = false;
		this.grid = []
	};
	run(bool) {
		if (this.isTimerEnabled && bool) {
			this.time--;
			if (this.time <= 10 * 120 && this.time > 0) {
				if (this.time % 120 == 0) {
					this.ringTimer(this.time < 120 * 3.1 ? 1 : '')
					countDownText(`${(this.time / 120).toFixed(0)}`, false, true)
				}
			}
			switch (this.time) {
				case 120 * 15: {
					this.ringTimer()
					break
				}
				case 120 * 30: {
					this.ringTimer()
					break
				}
			}
			if (this.time < 0) {
				if (field.are.line < 1)
					this.endGame()
				if (this.time == -1) {
					soundPlayer.playse('timeup')
					countDownText(`u_finishCTD`, true)
				}
			}
		}
	};
	enableTimer(bool) {
		this.isTimerEnabled = bool;
	};
	setTimer(int) {
		this.time = int;
	};
	returnTimer() {
		return Math.max(0, this.time)
	};
	endGame() {
		field.fieldResult('c4w_finish', 'win', 'win')
		endGame('c4w_finish', 'win')
		this.isTimerEnabled = false
	};
	ringTimer(hurrytype) {
		soundPlayer.playse(`hurry${hurrytype == 1?'2':''}`)
	}
	makeArrayLength(int) {
		var i = []
		i.length = int
		for (var e = 0; e < int - 1; e++)
			i[e] = 0
		return i
	}
	generateC4W() {
		var grid = this.makeArrayLength(10)
		for (var i = 0; i < 10; i++) {
			grid[i] = this.makeArrayLength(23)
		}
		for (var x = 0; x < 10; x++) {
			for (var y = 0; y < 23; y++) {
				grid[x][y] = 8
			}
		}
		for (var x = 3; x < 7; x++) {
			for (var y in grid[x]) {
				grid[x][y] = 0
			}
		}
		grid[3][22] = 10
		grid[4][22] = 10
		grid[5][22] = 10
		return grid
	}
}

const [scoreAtk, fourWide] = [new UltraScoreAttack(), new CenterFourWide()]

const garbageSurvival = new class {
	constructor() {
		this.garbageSpeed = [
 		800,
 		676,
 		558,
 		495,
 		370,
 		300,
 		274,
 		251,
 		220,
 		199
 		]
		this.strength = [
 		4,
 		4,
 		4,
 		4,
 		5,
 		5,
 		6,
 		7,
 		8,
 		9
 		]
		this.selectedLevel = 0
		this.random = new ParkMillerPRNG()
		this.initDelay = 0
	}
	init(seed, initDelay, selected) {
		this.random.seed = seed
		this.selectedLevel = selected
		this.initDelay = initDelay
	}
	returnGarb() {
		return {
			garbageRow: Math.floor(this.random.next() * 10),
			count: Math.floor(this.random.next() * this.strength[this.selectedLevel - 1]),
		}
	}
	run(e, func) {
		if (e % this.garbageSpeed[this.selectedLevel - 1] == 0 && e > this.initDelay) {
			var h = this.returnGarb()
			func(h.count, h.garbageRow)
		}
	}
}()

const amogusSus = new class extends UltraScoreAttack {
	constructor() {
		super()
		var a = 9
		this.arrayDetect = [
			[
			[0, 0, 0, 0, 0, 0, a],
			[0, a, a, a, a, a, a],
			[a, a, 0, a, a, 0, 0],
			[0, a, a, a, a, a, a],
			[0, 0, a, a, 0, 0, a],
			],
			[
			[0, 0, a, a, 0, 0, a],
			[0, a, a, a, a, a, a],
			[a, a, 0, a, a, 0, 0],
			[0, a, a, a, a, a, a],
			[0, 0, 0, 0, 0, 0, a],
			]
			]
		this.susCounter = 0
	}

	init() {
		this.susCounter = 0
		this.pieceLimit = 7
	}
	/**
	 * WTF
	 */
	detect(count, grid, result) {
		if (this.pieceLimit == count) {
			this.pieceLimit += 7
			var sus = 0
			for (var e = 0; e < this.arrayDetect.length; e++) {
				for (var x /*= 0; x < grid.length - this.arrayDetect[e].length ; x++/**/ of[0,1,2,3,4,5]) {
					for (var y = grid[0].length - this.arrayDetect[e][0].length; y >= grid[0].length - this.arrayDetect[e][0].length - 3; y--) {
						let blanks = 0,
							detects = 0
						for (var cx = 0; cx < this.arrayDetect[e].length; cx++) {
							for (var cy = 0; cy < this.arrayDetect[e][cx].length; cy++){
								if(grid[x + cx][y + cy] == 0 && this.arrayDetect[e][cx][cy] == 0 && typeof grid[x+cx][y+cy] !== "undefined"){
									blanks++
								}
								if((grid[x + cx][y + cy] >= 1) && this.arrayDetect[e][cx][cy] === 9){
									detects++
								}
							}
						}
						if (blanks >= 14 && (detects == 20)) {
							sus = 1
						}
					}
				}
			}
			if (sus == 1) {
				result("yes")
			} else {
				result("no")
			}
		}
	}
}()
