function Field(NEW) {
	this.valid = false
	this.renInteger = 0;
	this.neutralline = 0
	this.garbageArray = []
	this.voicegarbage = false
	this.voicestrength = 0;
	this.garbageLimit = 9
	this.clearRows = []
	this.b2b = 0;
	this.linevoice = 0;
	this.isSpin = false;
	this.isMini = false;
	this.spinCheckCount = 0
	this.miniSpinCount = 0
	this.mini2SpinCount = 0
	this.mini3SpinCount = 0
	this.enablespin = false;
	this.spinrecog = false;
	this.spinrecogmini = false;
	this.linespinrecog = false;
	this.minispinrecog = false;
	this.once = false
	this.sensespin
	this.gtrisinput = false
	this.gtrisenable = false
	this.gtrisenableplus = false
	this.countervoice = false
	this.garbvoice = 0
	this.linesend = 0
	this.renenable = false;
	this.warning = false
	this.pieces = 0
	this.lineTotal = 0
	this.lineLeft = 0
	this.score = 0
	this.level = 1
	this.levelMax = 15
	this.isGravityType = ""
	this.canCheckGarbageBar = false
	this.are = {
		add: {
			piece: 0,
			line: 0,
			del: 0,
			next: 0,
			frenzyEnt: 0,
			frenzyExt: 0
		},
		piece: 0,
		line: 0,
		del: 0,
		next: 0,
		frenzyEnt: 0,
		frenzyExt: 0
	}
	this.timers = {
		tSpin: '',
		regular: '',
		b2b: '',
		combo: '',
	}
	this.character = {
		current: '',
		voices: {
			init1: '',
			init2: '',
			init3: '',
			init4: '',
			init5: '',
			spell1: '',
			spell2: '',
			spell3: '',
			spell4: '',
			spell5: '',
			gtris: '',
			gtrisplus: '',
			frenzy: '',
			success: '',
			fail: '',
			win: '',
			lose: '',
		},
		fields: {
			normal: '',
			danger: '',
		},
		anim: {
			win: '',
			lose: '',
			enhancement: '',
		},
		load: {
			normal: '',
			danger: '',
		},
		loadAnim: {
			win: '',
			lose: '',
			enhancement: '',
		}
	}

	this.statistics = {
		line: {
			single: 0,
			double: 0,
			triple: 0,
			gtris: 0,
			gtrisplus: 0
		},
		spin: {
			zero: 0,
			single: 0,
			double: 0,
			triple: 0
		},
		mini: {
			zero: 0,
			single: 0,
			double: 0,
		},
		pc: 0,
		tsd: 0,
		maxREN: 0,
		atk: 0,
	}
	this.totalStrength = -1
	this.initStrength = -1
	this.isVoice = {
		pc: false,
		line: -1
	}
	this.isTSDOnly = false
	this.isC4W = false
	this.isFrenzy = false
	this.requireLines = 0
	this.remainingLevelLines = 10
	this.maxLevelLines = 10
	this.frenzy = {
		failTrigger: false,
		successTrigger: false,
		initVoice: 0,
		phase: 0,
		startingFrenzy: false,
		endingFrenzy: false,
		requireLines: 0,
		maxTimer: 0,
		maxTimerGauge: 300 * 360,
		timer: 0,
		activatorGauge: 0,
		activatorMax: 0,
		fails: 0,
		successes: 0,
		boards: 0,
		failMax: 5,
	}
	this.initFrenzy = {
		activatorMax: 1,
		activatorGauge: 0,
		timer: 0,
		maxTimerGauge: 300 * 360,
		phase: 0,
		failMax: 1,
	}
	this.temp = {
		grid: [],
		held: 0,
		b2b: 0,
		ren: 0,
		prev: [],
	}
}

Field.prototype = {
	initFrenzySettings: function(obj) {
		this.initFrenzy = {
			activatorMax: obj.gMax || 10,
			activatorGauge: obj.gauge || 0,
			maxTimerGauge: obj.tMax || 99999,
			phase: obj.phase || 1,
			failMax: obj.fMax || 2147483647
		}
		this.frenzy = {
			failTrigger: false,
			successTrigger: false,
			initVoice: 0,
			phase: this.initFrenzy.phase,
			startingFrenzy: false,
			endingFrenzy: false,
			requireLines: 0,
			maxTimer: 0,
			maxTimerGauge: this.initFrenzy.maxTimerGauge,
			timer: 0,
			activatorGauge: 0,
			activatorMax: 7,
			fails: 0,
			successes: 0,
			boards: 0,
			failMax: this.initFrenzy.failMax
		}
	},
	playVoice: function(name) {
		if (selectedSettings.Volume.Character > 0) {
			this.character.voices[name].stop()
			this.character.voices[name].volume(selectedSettings.Volume.Character / 100)
			this.character.voices[name].play()
		}
	},
	stopEverySpeak: function() {
		for (let e in this.character.voices) {
			this.character.voices[e].stop()
		}
	},
	speak: function(line, spin, ren, b2b, pc) {
		var [initStrength, renStrength, lineStrength, totalStrength, b2bStrength] = [0, 0, 0, 0, 0]
		switch (pc) {
			case false: {
				switch (spin) {
					case true: {
						if (line == 1) {
							lineStrength = 2
						}
						if (line == 2) {
							lineStrength = 4
						}
						if (line == 3) {
							lineStrength = 6
						}
						break
					}
					case false: {
						if (line == 1) {
							lineStrength = 0
						}
						if (line == 2) {
							lineStrength = 1
						}
						if (line == 3) {
							lineStrength = 2
						}
						if (line == 4) {
							lineStrength = 4
						}
						if (line > 4) {
							lineStrength = 5
						}
						break
					}
				}
				break
			}
			case true: {
				lineStrength = 10
				break
			}
		}

		if (ren < 2) {
			renStrength = 0
			if (ren == 0) {
				initStrength = 0
			}
			if (ren == 1) {
				initStrength = 1
			}
		}
		if (ren >= 2 && ren < 4) {
			renStrength = 1
		}
		if (ren >= 4 && ren < 6) {
			renStrength = 2
		}
		if (ren >= 6 && ren < 8) {
			renStrength = 3
		}
		if (ren >= 8 && ren < 11) {
			renStrength = 4
		}
		if (ren >= 11) {
			renStrength = 5
		}
		if (b2b > 0) {
			b2bStrength = 1
		}
		this.totalStrength = lineStrength + renStrength + b2bStrength
		this.initStrength = initStrength
		this.isVoice = {
			pc: pc,
			line: line
		}
		if (this.are.add.line <= 0)
			this.speakTest(this.totalStrength, this.initStrength, this.isVoice.pc, this.isVoice.line)
	},
	speakTest: function(totalStrength, initStrength, pc, line) {
		if (totalStrength == 0) {
			if (initStrength == 0) {
				this.playVoice('init1')
			}
			if (initStrength == 1) {
				this.playVoice('init2')
			}
			if (initStrength == 2) {
				this.playVoice('init3')
			}
			if (initStrength == 3) {
				this.playVoice('init4')
			}
			if (initStrength >= 4) {
				this.playVoice('init5')
			}
		}
		if (totalStrength == 1) {
			this.playVoice('spell1')
		}
		if (totalStrength == 2) {
			this.playVoice('spell2')
		}
		if (totalStrength == 3) {
			this.playVoice('spell3')
		}
		if (totalStrength == 4) {
			if (line == 4 && this.gtrisenable)
				this.playVoice('gtris')
			else
				this.playVoice('spell4')
		}
		if (totalStrength > 4) {
			if (line > 4 && this.gtrisenableplus) {
				this.playVoice('gtrisplus')
			} else if (line == 4 && this.gtrisenable)
				this.playVoice('gtris')
			else if (pc) {
				this.playVoice('spell5')
			} else {
				this.playVoice('spell5')
			}
		}
	},
	engagePC: function(bool) {
		var pc = [docId('perfectClear1'), docId('perfectClear2')]
		if (bool == true) {
			if(selectedSettings.Other.ClearText == 1){
			for (var e of pc) {
				e.style.animationName = 'none'
			}
			setTimeout(() => {
				pc[0].style.animationName = 'PCAnim1'
				pc[1].style.animationName = 'PCAnim2'
			}, 1)
			}
		} else {
			for (var e of pc) {
				e.style.animationName = 'none'
			}
		}
	},

	loadCharacter: function(number) {
		var selection = number || selectedSettings.NonIterable.Character
		if (selection !== this.character.current) {
			this.character.current = selection
			this.gtrisenable = true
			this.gtrisenableplus = true
			this.isFieldEnable = true
			docId('characterBackground').style.opacity = '1'
			docId('showResultCharImg').style.display = 'block'

			for (let load in this.character.voices) {
				this.character.voices[load] = new Howl({ src: `assets/characters/${settingsList.NonIterable.Character[this.character.current]}/voices/${load}.ogg`, preload: false })
			}
			this.character.voices.gtris.once('loaderror', () => {
				this.gtrisenable = false
			})
			this.character.voices.gtrisplus.once('loaderror', () => {
				this.gtrisenableplus = false
			})
			for (let load in this.character.voices) {
				this.character.voices[load].load()
			}

			for (let load in this.character.load) {
				this.character.load[load] = new Image()
				this.character.load[load].src = this.character.fields[load] = `assets/characters/${settingsList.NonIterable.Character[this.character.current]}/${load}.png`
				this.character.load[load].onerror = function() {
					this.isFieldEnable = false
					docId('characterBackground').style.opacity = '0'
				}
			}
			for (let load in this.character.loadAnim) {
				this.character.loadAnim[load] = new Image()
				this.character.loadAnim[load].src = this.character.anim[load] = `assets/characters/${settingsList.NonIterable.Character[this.character.current]}/${load}.png`
				this.character.loadAnim[load].onerror = function() {
					docId('showResultCharImg').style.display = 'none'
				}
			}
		}
	},
	playVoice: function(name) {
		var vol = selectedSettings.Volume.Character / 100
		if (vol !== 0) {
			this.character.voices[name].volume(vol)
			this.character.voices[name].stop()
			this.character.voices[name].play()
		}
	},
	showResultAnimation: function(bool, str) {
		var img = docId('resultCharImg'),
			text = docId('tetrionResultText'),
			show = docId('showResultCharImg')
		show.style.transition = 'clear'
		text.style.transition = 'clear'
		show.style.animationName = "none"
		text.style.animationName = "none"
		if (bool == 'hide') {
   [show.style.opacity, text.style.opacity] = [0, 0]
			show.style.transform = `translateY(${cellSize*16}px)`
		}
		text.innerHTML = str
		if (bool == 'win') {
			img.src = this.character.anim.win
			show.style.transform = `translateY(${cellSize*16}px)`
			show.style.opacity = 0
			text.style.transform = `translateY(-${cellSize*16}px)`
			text.style.opacity = 0
			setTimeout(function() {
				show.style.transform = `translateY(0px)`
				show.style.opacity = 1
				show.style.transition = 'transform 600ms cubic-bezier(0,0,0.38,1), opacity 300ms linear'
				text.style.transform = `translateY(0px)`
				text.style.opacity = 1
				text.style.transition = 'transform 600ms cubic-bezier(0,0,0.18,1), opacity 300ms linear'
			}, 1)
		}
		if (bool == 'lose') {
			img.src = this.character.anim.lose
			show.style.transform = `translateY(-${cellSize*16}px)`
			show.style.opacity = 0
			text.style.transform = `translateY(${cellSize*16}px)`
			text.style.opacity = 0
			setTimeout(function() {
				show.style.transform = `translateY(0px)`
				show.style.opacity = 1
				show.style.transition = 'transform 600ms cubic-bezier(0,0,0.38,1), opacity 300ms linear'
				text.style.transform = `translateY(0px)`
				text.style.opacity = 1
				text.style.transition = 'transform 600ms cubic-bezier(0,0,0.18,1), opacity 300ms linear'
			}, 1)
		}
		if (bool == 'frenzy') {
			img.src = this.character.anim.enhancement
			requestAnimationFrame(() => {
      [show.style.animationName, text.style.animationName] = ["frenzyActionCharacter", "frenzyActionText"]
			})
		}
	},
	makeArrayLength: function(int) {
		var i = []
		i.length = int
		for (var e = 0; e < int - 1; e++)
			i[e] = 0
		return i
	},

	modifyGrid: function(cy, gridArr, isFlipped) {
		if (isFlipped == false) {
			for (let x = 0; x < this.width; x++) {
				for (let y = 0; y < gridArr[x].length; y++)
					this.grid[x][y + cy] = gridArr[x][y]
			}
		} else {
			for (let x = 0; x < this.width; x++) {
				for (let y = 0; y < gridArr[x].length; y++)
					this.grid[x][y + cy] = gridArr[(this.width - 1) - x][y]
			}
		}
		this.draw()
	},
	sendReceiveTempField: function(r) {
		if (r == "send") {
			this.temp = {
				grid: $copy(this.grid),
				held: hold.piece,
				b2b: this.b2b,
				ren: this.renInteger,
				prev: $copy(preview.grabBag),
			}
			console.table(this.temp)
		}
		if (r == "receive") {
			this.modifyGrid(0, $copy(this.temp.grid), false)
			hold.piece = this.temp.held
			this.b2b = this.temp.b2b
			this.renInteger = this.temp.ren
			preview.grabBag = $copy(this.temp.prev)

			this.temp = {
				grid: [],
				held: 0,
				b2b: 0,
				ren: 0,
				prev: [],
			}
		}
	},
	
	clearGrid: function(){
		var cells = this.makeArrayLength(this.width);
		for (var i = 0; i < this.width; i++) {
			cells[i] = this.makeArrayLength(this.height);
		}
		this.grid = cells;
		this.draw();
	},

	new: function(x, y) {
		var cells = this.makeArrayLength(x)
		for (var i = 0; i < x; i++) {
			cells[i] = this.makeArrayLength(y)
		}
		this.level = 1
		this.levelMax = 15
		this.score = 0
		this.grid = cells
		this.width = x
		this.height = y
		this.lineTotal = 0
		this.pieces = 0
		this.loadCharacter()
		this.renInteger = -1
		this.b2b = -1
		this.showClearText('hide')
		this.showClearTextREN('hide')
		this.showClearTextTSPIN('hide')
		this.showClearTextB2B('hide')
		hold.piece = void 0
		this.clearRows = []
		clear(_CTX.hold)
		this.garbageArray = []
		this.garbageLimit = 0
		this.checkWarning('stop')
		this.showResultAnimation('hide')
		this.are = {
			add: {
				piece: 0,
				line: 0,
				del: 0,
				next: 0,
				frenzyEnt: 0,
				frenzyExt: 0,
				failing: 0
			},
			piece: -99,
			line: -99,
			del: -99,
			next: -99,
			frenzyEnt: -99,
			frenzyExt: -99,
			failing: -99,
		}
		this.totalStrength = -1
		this.initStrength = -1
		this.isVoice = {
			pc: false,
			line: -1
		}
		this.isTSDOnly = false
		this.garbageArray = []
		if (this.canCheckGarbageBar)
			this.checkGarbageBar()
		this.statistics = {
			line: {
				single: 0,
				double: 0,
				triple: 0,
				gtris: 0,
				gtrisplus: 0
			},
			spin: {
				zero: 0,
				single: 0,
				double: 0,
				triple: 0
			},
			mini: {
				zero: 0,
				single: 0,
				double: 0,
			},
			pc: 0,
			tsd: 0,
			maxREN: 0,
			atk: 0,
		}
		this.isFrenzy = false
		this.requireLines = 0
		this.maxLevelLines = 10
		this.remainingLevelLines = this.maxLevelLines
		this.isGravityType = ""
		this.temp = {
			grid: [],
			held: 0,
			b2b: 0,
			ren: 0,
			prev: [],
		}
		docId('characterBackground').src = this.character.fields.normal
	},
	frenzySetTimer: function(n) {
		this.frenzy.maxTimer = n || this.initFrenzy.maxTimerGauge
		this.frenzy.timer = this.frenzy.maxTimer
	},

	testSpace: function(x, y) {
		if (this.grid[x] !== undefined && this.grid[x] !== 0) {
			if (y < this.height) {
				if (this.grid[x][y] !== undefined && this.grid[x][y] !== 0) {
					return true;
				} else {
					return false;
				}
			} else {
				return true;
			}
		} else {
			return true;
		}
	},

	spinCheck: function() {
		var booldetect = false
		var boolline = 0
		this.isSpin = false;
		this.isMini = false;
		if (piece.landed == true && piece.moved == false) {
			if (piece.index == 5) {
				var checkPoints = 0
				this.spinCheckCount = 0;
				var spinCount = this.spinCheckCount
				this.miniSpinCount = 0
				this.mini2SpinCount = 0

				for (var i = 0; i < pieces[5].spin.highX[0].length; i++) {
					if ((this.testSpace(piece.x + pieces[5].spin.highX[piece.pos][i], piece.y + pieces[5].spin.highY[piece.pos][i])) == true && piece.landed == true) {
						this.miniSpinCount++;
						checkPoints++
					}
				}

				for (var i = 0; i < pieces[5].spin.highX[0].length * pieces[5].spin.lowY[0].length; i++) {
					if ((this.testSpace(piece.x + pieces[5].spin.highX[i][piece.pos], piece.y + pieces[5].spin.lowY[i][piece.pos])) == false && piece.landed == true) {
						this.mini2SpinCount += 0.5 + (this.miniSpinCount * .2) * (this.spinCheckCount / 0.2);
					}
				}

				for (var i = 0; i < pieces[5].spin.lowX[0].length; i++) {
					if ((this.testSpace(piece.x + pieces[5].spin.lowX[piece.pos][i], piece.y + pieces[5].spin.lowY[piece.pos][i])) == true && piece.landed == true) {
						this.spinCheckCount += 0.8
						checkPoints++;
					}
				}
				if (piece.stsd.y == -2) {
					if (piece.stsd.x == 1) {
						this.spinCheckCount += 0.6
					}
					if (piece.stsd.x == -1) {
						this.spinCheckCount += 0.6
					}
				}
				if (checkPoints >= 3) {
					if (this.miniSpinCount >= 1 && this.spinCheckCount >= 0.7 && piece.spinX == piece.x && piece.spinY == piece.y) {
						if (this.miniSpinCount == 2) {
							this.isSpin = true;
							this.spinrecog = this.isSpin
							this.isMini = false
							this.spinrecogmini = this.isMini


						}
						if (this.miniSpinCount == 1 && this.spinCheckCount >= 1) {
							this.isSpin = false;
							this.spinrecog = this.isSpin
							this.isMini = true
							this.spinrecogmini = this.isMini
						}
					}
					if (this.miniSpinCount == 1 && this.spinCheckCount >= 1 && this.mini2SpinCount <= 1 && piece.spinX == piece.x && piece.spinY == piece.y) {
						this.isSpin = false;
						this.spinrecog = this.isSpin
						this.isMini = true
						this.spinrecogmini = this.isMini
					}
					if (piece.stsd.y == -2 && this.spinCheckCount >= 0.7 && this.miniSpinCount >= 1) {
						if (piece.stsd.x == 1) {
							this.isSpin = true
							this.isMini = false
						}
						if (piece.stsd.x == -1) {
							this.isSpin = true
							this.isMini = false
						}
					}
				}
			}
			this.spinrecog = this.isSpin;
			this.spinrecogmini = this.isMini;
		} else {
			this.spinCheckCount = -85
			this.isSpin = false
			this.isMini = false
			this.spinrecog = this.isSpin
			this.spinrecogmini = this.isMini
		}
	},
	removeLines: function() {
		var doesBlockExist = false
		for (var ROW of this.clearRows) {
			for (var y = ROW; y >= -1; y--) {
				for (var x = 0; x < 10; x++) {
					if (this.testSpace(x, y)) doesBlockExist = true
					this.grid[x][y] = this.grid[x][y - 1];
					if (this.isC4W) {
						for (var cx = 0; cx < 3; cx++) {
							this.grid[cx][20] = 8
						}
						for (var cx = 7; cx < 10; cx++) {
							this.grid[cx][20] = 8
						}
					}
				}
			}
		}
		this.clearRows = []
		if (doesBlockExist)
			soundPlayer.playse('collapse')
		this.checkWarning()
		if (this.isFrenzy) {
			this.speakTest(this.totalStrength, this.frenzy.initVoice, false, 0)
		} else
			this.speakTest(this.totalStrength, this.initStrength, this.isVoice.pc, this.isVoice.line)
		this.draw()
	},
	rng: new ParkMillerPRNG(),
	fieldResult: function(title, downfall, winlose) {
		this.checkWarning('stop')
		if (downfall == true) {
			gtrisBody.style.transition = 'transform 2.5s ease-in'
			gtrisBody.style.transform = 'translateY(4800px) rotateZ(90deg)'
		}
		if (winlose == 'win') {
			this.showResultAnimation('win', typeof title !== 'object' ? gtris_transText(title) : gtris_transText(title.name, title.array))
			gtrisBody.style.opacity = 0
			gtrisBody.style.animation = 'gameWin'
			gtrisBody.style.animationDuration = '4s'
			gtrisBody.style.animationTimingFunction = 'linear'
		} else if (winlose == 'lose') {
			this.showResultAnimation('lose', typeof title !== 'object' ? gtris_transText(title) : gtris_transText(title.name, title.array))
		} else if (winlose !== void 0) {
			this.showResultAnimation('win', typeof title !== 'object' ? gtris_transText(title) : gtris_transText(title.name, title.array))
		}
	},
	addGarbageToField: function(limit) {
		var _limit = this.garbageLimit !== 0 ? this.garbageLimit : 42
		var numLimit = 1
		if (this.garbageArray.length > 0) {
			while (this.garbageArray.length > 0) {
				numLimit++
				let num = this.garbageArray.shift()
				for (var x = 0; x < this.width; x++) {
					for (var y = 0; y < this.height; y++) {
						this.grid[x][y] = this.grid[x][y + 1]
					}
				}
				for (var x = 0; x < this.width; x++) {
					this.grid[x][this.height - 1] = 8
				}
				this.grid[num][this.height - 1] = 0
				if (numLimit > _limit)
					break
			}
			soundPlayer.playse('lineup')
		}
		this.checkGarbageBar()
	},
	addGarbageToArray: function(count, row) {
		var _count = count || 0
		for (var e = 0; e < _count; e++)
			this.garbageArray.push(row)
		this.checkGarbageBar()
	},
	offsetGarbage: function(count) {
		var _count = count || 0
		for (var e = 0; e < _count; e++) {
			this.garbageArray.shift()
			this.statistics.atk++
		}
		this.checkGarbageBar()
	},
	checkGarbageBar: function() {
		if (this.canCheckGarbageBar)
			meterBar.garbage.style.marginTop = `${Math.max(0,(cellSize*20.4)-(cellSize * this.garbageArray.length))}px`
		this.checkWarning(this.valid ? void 0 : 'stop')
	},
	openGarbageBar: function(bool) {
		this.canCheckGarbageBar = bool
		meterBar.capacity.style.display = bool == true ? 'block' : 'none';
		switch (bool) {
			case true: {
				this.checkGarbageBar()
				break
			}
			default: {
				this.canCheckGarbageBar = false
				break
			}
		}
	},
	openFrenzyBar: function(bool) {
		meterBar.capacityF.style.display = bool == true ? 'block' : 'none';
	},
	checkFrenzyBar: function() {
		if (this.isFrenzy) {
			meterBar.frenzy.style.marginTop = `${Math.max(0,(cellSize*20.4)-(cellSize * ((this.frenzy.timer / this.frenzy.maxTimer)*20.4)))}px`
		}
	},
	frenzyTimerRun: function() {
		if (this.isFrenzy == true && this.frenzy.timerEnabled == true) {
			this.frenzy.timer--
			if (this.frenzy.timer <= 10 * 120 && this.frenzy.timer > 0) {
				if (this.frenzy.timer % 120 == 0) {
					soundPlayer.playse(`hurry${this.frenzy.timer < 120 * 3.1 ? '2' : ''}`)
				}
			}
			switch (this.frenzy.timer) {
				case 120 * 15: {
					soundPlayer.playse('hurry')
					break
				}
				case 120 * 30: {
					soundPlayer.playse('hurry')
					break
				}
			}
			if (this.frenzy.timer == 0) {
				soundPlayer.playse('timeup')
			}
		}
	},
	offsetGarbageByClear: function(line, spin, ren, pc) {
		var [renStrength, lineStrength, totalStrength, b2bStrength] = [0, 0, 0, 0]
		switch (pc) {
			case false: {
				switch (spin) {
					case true: {
						if (line == 1) {
							lineStrength = 2
						}
						if (line == 2) {
							lineStrength = 4
						}
						if (line == 3) {
							lineStrength = 6
						}
						break
					}
					case false: {
						if (line == 1) {
							lineStrength = 0
						}
						if (line == 2) {
							lineStrength = 1
						}
						if (line == 3) {
							lineStrength = 2
						}
						if (line == 4) {
							lineStrength = 4
						}
						if (line > 4) {
							lineStrength = 5
						}
						break
					}
				}
				break
			}
			case true: {
				lineStrength = 10
				break
			}
		}

		if (ren < 2) {
			renStrength = 0
		}
		if (ren >= 2 && ren < 4) {
			renStrength = 1
		}
		if (ren >= 4 && ren < 6) {
			renStrength = 2
		}
		if (ren >= 6 && ren < 8) {
			renStrength = 3
		}
		if (ren >= 8 && ren < 11) {
			renStrength = 4
		}
		if (ren >= 11) {
			renStrength = 5
		}
		if (this.b2b > 0) {
			b2bStrength = 1
		}
		totalStrength = lineStrength + renStrength + b2bStrength
		this.offsetGarbage(totalStrength)
	},
	openFrenzy: function(bool) {
		var a = $CN('gtris-rainbow-border-p1')
		var b = $CN(`gtris-rainbow-bg-p1`)
		var bg = docId('bgFrenzyLayout')
		var spin = docId('dynamicFrenzyBg')

		bg.style.display = "none"
		spin.style.animationName = "none"

		for (let e of a) {
			e.style.animationName = "none"
		}
		for (let e of b) {
			e.style.animationName = "none"
		}

		if (bool == true) {
			for (let e = 0; e < a.length; e++) {
				a[e].style.animationName = "frenzyBorder"
			}
			for (let e = 0; e < b.length; e++) {
				b[e].style.animationName = "frenzyFill"
			}
			bg.style.display = "flex"
			spin.style.animationName = "bgFrenzyRot"
		}

	},

	changeFrenzyColor: function(type, col, speed) {
		var e = docId('colorFrenzyOverlay')
		var d = docId('dynamicFrenzyBg')
		const b = ["#222", "#066", "#006", "#610", "#660", "#060", "#606", "#600"]
		if (type == "change") {
			e.style.background = col == "n" ? b[0] : b[piece.index + 1]
		}
		if (typeof speed !== "undefined") {
			d.style.animationDuration = speed == "fast" ? "700ms" : "2500ms"
		}
		if (type == "restore") {
			e.style.background = b[0]
			d.style.animationDuration = '2500ms'
		}
	},

	addPiece: function(tetro) {
		this.enablespin = this.spinrecog
		this.enablemini = this.spinrecogmini
		this.linespinrecog = false
		var once = false;
		var linesDetection = 0
		var perfectClear = true
		var range = [];
		this.valid = false;
		for (var x = 0; x < tetro.length; x++) {
			for (var y = 0; y < tetro[x].length; y++) {
				if (tetro[x][y]) {
					this.grid[x + piece.x][y + piece.y] = tetro[x][y]
					if (!once || x + piece.x < column) {
						column = x + piece.x
						once = true
					}
					if (range.indexOf(y + piece.y) === -1) {
						range.push(y + piece.y);
						if (y + piece.y > 21) this.valid = true;
					}
				}
			}
		}
		if (!this.valid) {
			if (this.isTSDOnly == true) {
				if (this.statistics.tsd >= 20) {
					this.fieldResult({ name: 'tsd_reached', array: this.statistics.tsd }, 'win', 'win')
					endGame({ name: 'tsd_reached_result', array: this.statistics.tsd }, 'win')
				} else {
					this.fieldResult('lockout', true, 'lose')
					endGame('lockout', 'lose')
				}
			} else {
				this.fieldResult('lockout', true, 'lose')
				endGame('lockout', 'lose')
			}
			this.checkWarning('stop')
			return false;
		}
		range = range.sort(function(a, b) {
			return a - b;
		});
		for (var row = 0, len = this.height; row < len; row++) {
			var count = 0;
			for (var x = 0; x < this.width; x++) {
				if (this.testSpace(x, row)) count++;
			}
			if (count > 9) {
				linesDetection++;
				this.lineTotal++
				if(typeof this.lineLeft === "number" && this.lineLeft > 0)
				this.lineLeft--
				if (this.isFrenzy) {
					this.frenzy.requireLines--
				}
				if (this.are.add.line > 0) {
					this.are.line = this.are.add.line
					this.clearRows.push(row)
					for (var y = row; y >= row; y--) {
						for (var x = 0; x < 10; x++) {
							this.grid[x][y] = 0
						}
					}
				} else {
					for (var y = row; y >= 0; y--) {
						for (var x = 0; x < 10; x++) {
							this.grid[x][y] = this.grid[x][y - 1]
							if (this.isC4W) {
								for (var cx = 0; cx < 3; cx++) {
									this.grid[cx][20] = 8
								}
								for (var cx = 7; cx < 10; cx++) {
									this.grid[cx][20] = 8
								}
							}
						}
					}
				}
			}
		}
		this.pieces++
		if (["marathon", "master"].indexOf(this.isGravityType) !== -1) {
			this.remainingLevelLines -= linesDetection
		}
		if (this.isSpin && linesDetection >= 1) {
			while (this.isSpin == true) {
				this.linespinrecog = true;
				this.minispinrecog = false
				this.enablespin = false;
				this.spinrecog = false;
				this.isSpin = false;
				this.isMini = false
			}
		} else
		if (linesDetection > 0) {
			while (this.isMini == true || this.enablemini == true) {
				this.minispinrecog = true;
				this.enablespin = false
				this.enablemini = false;
				this.spinrecog = false;
				this.isMini = false;
				this.spinrecogmini = false
				this.spinCheckCount = 0;
				this.miniSpinCount = 0
			}
			this.spinCheckCount = 0;
			this.miniSpinCount = 0
		}

		if (linesDetection == 0) {
			this.addGarbageToField()
			if (this.renInteger > 1) {
				soundPlayer.playse('ren-end')
			}
			this.renInteger = -1
			this.showClearTextREN('hide')
			if (this.isMini) {
				this.showClearText('hide')
				this.showClearTextTSPIN('', gtris_transText('mini'))
				this.statistics.mini.zero++
				this.score += 100 * this.level
				soundPlayer.playse('mini0')
			}
			if (this.isSpin) {
				this.showClearText('hide')
				this.showClearTextTSPIN('', gtris_transText('spin'))
				this.statistics.spin.zero++
				this.score += 400 * this.level
				soundPlayer.playse('tspin0')
			}

			if (this.isFrenzy) {
				this.frenzy.failTrigger = true
				this.frenzy.fails++
				this.are.next = 80
				this.are.del = 70
				for (var x = 0; x < this.width; x++) {
					for (var y = 0; y < this.height; y++) {
						if (this.grid[x][y] !== 0 && this.testSpace(x, y)) {
							this.grid[x][y] = 8
						}
					}
				}
			}
		}
		//---
		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.height; y++) {
				if (this.grid[x][y] !== 0 && this.testSpace(x, y) || this.isFrenzy == true) {
					perfectClear = false
				}
			}
		}
		this.checkWarning()
		if (linesDetection !== 0) {
			this.showClearText('hide')
			this.showClearTextTSPIN('hide')
			if (perfectClear) {
				soundPlayer.playse('bravo')
				this.engagePC(true)
				this.statistics.pc++
			}


			this.renInteger++
			if (this.renInteger > 0) {
				this.showClearTextREN('show', gtris_transText('combo', this.renInteger))
				this.score += this.renInteger * 50 * this.level
				if (!this.isFrenzy)
					soundPlayer.playse(`ren${Math.min(20,this.renInteger)}`)
			}
			this.clearLines(linesDetection, this.linespinrecog, this.minispinrecog, this.b2b, perfectClear)
			if (!this.isFrenzy) {
				this.speak(linesDetection, this.linespinrecog, this.renInteger, this.b2b, perfectClear)
			} else {
				this.totalStrength = 0
				this.frenzy.initVoice++
				this.changeFrenzyColor("change", "", "fast")
				if (this.frenzy.requireLines <= 0) {
					this.frenzy.successTrigger = true
					this.frenzy.successes++
					this.are.next = 80
					this.are.del = 70
					if (this.frenzy.phase < 4) {
						this.totalStrength = 1
					}
					if (this.frenzy.phase >= 4 && this.frenzy.phase < 7) {
						this.totalStrength = 2
					}
					if (this.frenzy.phase >= 7 && this.frenzy.phase < 10) {
						this.totalStrength = 3
					}
					if (this.frenzy.phase >= 10 && this.frenzy.phase < 13) {
						this.totalStrength = 4
					}
					if (this.frenzy.phase >= 13) {
						this.totalStrength = 5
					}
				}
				this.b2b = -2
			}
			if (this.renInteger > this.statistics.maxREN) {
				this.statistics.maxREN = this.renInteger
			}
			if (this.isTSDOnly == true) {
				if (!((this.linespinrecog == true || this.minispinrecog) && linesDetection == 2)) {
					if (this.statistics.tsd >= 20) {
						this.fieldResult({ name: 'tsd_reached', array: this.statistics.tsd }, 'win', 'win')
						endGame({ name: 'tsd_reached_result', array: this.statistics.tsd }, 'win')
					} else {
						this.fieldResult('tsd_failed', true, 'lose')
						endGame('tsd_failed', 'lose')
					}
				} else this.statistics.tsd++
			}
			if (this.frenzy.activatorGauge >= Math.max(this.frenzyactivatorMax, 0)) {
				if (!this.isFrenzy) {
					this.are.frenzyEnt = 200
				}
			}
		}

		if (this.frenzy.fails >= this.frenzy.failMax && this.frenzy.timer > 0) {
			this.are.failing = 1
			this.are.frenzyExt = 30
		}

		if (this.isFrenzy && this.frenzy.timer <= 0) {
			this.are.frenzyExt = 20
		}

		this.draw();
		this.linespinrecog = false
		this.minispinrecog = false
		while (this.remainingLevelLines <= 0 && ["marathon", "master"].indexOf(this.isGravityType) !== -1 && (typeof this.levelMax === "number" ? (this.levelMax > this.level) : true)) {
			this.level++
			this.remainingLevelLines += this.maxLevelLines
			soundPlayer.playse('levelup')
		}
		return true
	},

	resetFieldPosition: function() {
		gtrisBody.style.transition = 'transform 0s linear'
		gtrisBody.style.transform = 'translateY(0) rotateZ(0deg)'
	},

	showClearText: function(compo, text) {
		let components = $('#regular')
		components.stop()
		if (compo == 'hide') {
			components.animate({ opacity: 0, letterSpacing: `${cellSize * 0.03}px` }, 0, 'linear')
		} else if(selectedSettings.Other.ClearText == 1){
			$iH('regular', text)
			components.animate({ opacity: 1, letterSpacing: `${cellSize * 0.03}px` }, 0, 'linear')
			components.animate({ opacity: 1, letterSpacing: `${cellSize * 0.13}px` }, 1800, 'linear')
			components.animate({ opacity: 0, letterSpacing: `${cellSize * 0.13}px` }, 200, 'linear')
		} else {
		 $iH('regular', "")
		}
	},
	showClearTextTSPIN: function(compo, text, nent) {
		let components = $('#tSpin')
		components.stop()
		if (compo == 'hide') {
			components.animate({ opacity: 0, letterSpacing: `${cellSize * 0.03}px` }, 0, 'linear')
		} else if(selectedSettings.Other.ClearText == 1){
			$iH('tSpin', text)
			components.animate({ opacity: 1, letterSpacing: `${cellSize * 0.05}px` }, 0, 'linear')
			components.animate({ opacity: 1, letterSpacing: `${cellSize * 0.16}px` }, 1800, 'linear')
			components.animate({ opacity: 0, letterSpacing: `${cellSize * 0.17}px` }, 200, 'linear')
		} else {
						$iH('tSpin', "")
		}
	},
	showClearTextB2B: function(compo, text) {
		let components = docId('B2B')
		if (compo == 'hide') {
			components.style.opacity = '0%'
			components.style.letterSpacing = '0.5px'
			components.style.transition = "letter-spacing 200ms ease-out"
			components.style.transition = "opacity 200ms linear"
		} else if(selectedSettings.Other.ClearText == 1){
			components.style.opacity = '100%'
			$iH('B2B', text)
			components.style.transition = 'opacity 100ms linear'
			components.style.transition = 'letter-spacing 0s linear'
			components.style.letterSpacing = '0.5px'
			components.style.opacity = '100%'
			setTimeout(function() {
				components.style.letterSpacing = `${cellSize*0.2}px`
				components.style.transition = "letter-spacing 2s ease-out"
			}, 2)
		} else {
						$iH('B2B', '')
		}
	},
	showClearTextREN: function(showhide, text) {
		let components = docId('REN')
		if(selectedSettings.Other.ClearText == 1){
		if (text !== void 0)
		 $iH('REN', text)
		if (showhide == 'hide') {
			components.style.transition = 'opacity 200ms linear, letter-spacing 400ms easeOut'
			components.style.letterSpacing = '0.5px'
			components.style.opacity = '0%'
		}
		if (showhide == 'show') {
			components.style.transition = "letter-spacing 200ms ease-out, opacity 200ms linear"
			components.style.letterSpacing = `${cellSize*0.2}px`
			components.style.opacity = "100%"
		}
		} else {
			 $iH('REN', "")
		}
	},
	clearLines: function(line, spin, mini, b2b, pc) {
		if (this.linespinrecog) {
			this.showClearTextTSPIN('tSpin', gtris_transText('spin'))
			this.b2b++
		}
		if (this.minispinrecog) {
			this.showClearTextTSPIN('tSpin', gtris_transText('mini'))
			this.b2b++
		}
		if (line > 3) {
			this.b2b++
		}
		if (!this.linespinrecog && !this.minispinrecog && line < 4) {
			this.b2b = -1
		}
		if (line == 1) {
			this.showClearText('', gtris_transText('line1'))
		}
		if (line == 2) {
			this.showClearText('', gtris_transText('line2'))
		}
		if (line == 3) {
			this.showClearText('', gtris_transText('line3'))
		}
		if (line == 4) {
			this.showClearText('', gtris_transText('line4'))
		}
		if (line >= 5) {
			this.showClearText('', gtris_transText('line5'))
			soundPlayer.playse('line4')
		}

		if (mini) {
			switch (line) {
				case 1: {
					if (this.b2b > 0)
						soundPlayer.playse('mini1E')
					else
						soundPlayer.playse('mini1')
					this.statistics.mini.single++
					break
				}
				case 2: {
					if (this.b2b > 0)
						soundPlayer.playse('mini2E')
					else
						soundPlayer.playse('mini2')
					this.statistics.mini.double++
					break
				}
			}
		}
		if (spin) {
			switch (line) {
				case 1: {
					if (this.b2b > 0)
						soundPlayer.playse('tspin1E')
					else
						soundPlayer.playse('tspin1')
					this.statistics.spin.single++
					break
				}
				case 2: {
					if (this.b2b > 0)
						soundPlayer.playse('tspin2E')
					else
						soundPlayer.playse('tspin2')
					this.statistics.spin.double++
					break
				}
				case 3: {
					if (this.b2b > 0)
						soundPlayer.playse('tspin3E')
					else
						soundPlayer.playse('tspin3')
					this.statistics.spin.triple++
					break
				}
			}
		}
		if (!mini && !spin) {
			switch (Math.min(4, line)) {
				case 1: {
					soundPlayer.playse('line1')
					this.statistics.line.single++
					break
				}
				case 2: {
					soundPlayer.playse('line2')
					this.statistics.line.double++
					break
				}
				case 3: {
					soundPlayer.playse('line3')
					this.statistics.line.triple++
					break
				}
				case 4: {
					if (this.b2b > 0)
						soundPlayer.playse('line4E')
					else
						soundPlayer.playse('line4')
					this.statistics.line.gtris++
					break
				}
			}
		}
		switch (pc) {
			case true: {
				switch (Math.min(4, line)) {
					case 1: {
						this.score += 800 * this.level
						break
					}
					case 2: {
						this.score += 1200 * this.level
						break
					}
					case 3: {
						this.score += 1800 * this.level
						break
					}
					case 4: {
						if (this.b2b > 0) {
							this.score += 3200 * this.level
						}
						else this.score += 2000 * this.level
						break
					}
				}
			}
			case false: {
				switch (this.b2b > 0) {
					case true: {
						switch (spin) {
							case true: {
								switch (Math.min(3, line)) {
									case 1: {
										this.score += 1200 * this.level
										break
									}
									case 2: {
										this.score += 1800 * this.level
										break
									}
									case 3: {
										this.score += 2400 * this.level
										break
									}
								}
								break
							}
							case false: {
								switch (mini) {
									case true: {
										switch (Math.min(2, line)) {
											case 1: {
												this.score += 300 * this.level
												break
											}
											case 2: {
												this.score += 600 * this.level
												break
											}
										}
										break
									}
									case false: {
										switch (Math.min(4, line)) {
											case 1: {
												this.score += 100 * this.level
												break
											}
											case 2: {
												this.score += 300 * this.level
												break
											}
											case 3: {
												this.score += 500 * this.level
												break
											}
											case 4: {
												this.score += 1200 * this.level
												break
											}
										}
										break
									}
								}
								break
							}
						}
						break
					}
					case false: {
						switch (spin) {
							case true: {
								switch (Math.min(3, line)) {
									case 1: {
										this.score += 800 * this.level
										break
									}
									case 2: {
										this.score += 1200 * this.level
										break
									}
									case 3: {
										this.score += 1600 * this.level
										break
									}
								}
								break
							}
							case false: {
								switch (mini) {
									case true: {
										switch (Math.min(2, line)) {
											case 1: {
												this.score += 200 * this.level
												break
											}
											case 2: {
												this.score += 400 * this.level
												break
											}
										}
										break
									}
									case false: {
										switch (Math.min(4, line)) {
											case 1: {
												this.score += 100 * this.level
												break
											}
											case 2: {
												this.score += 300 * this.level
												break
											}
											case 3: {
												this.score += 500 * this.level
												break
											}
											case 4: {
												this.score += 800 * this.level
												break
											}
										}
										break
									}
								}
								break
							}
						}
						break
					}
				}
			}
		}
		this.offsetGarbageByClear(line, spin, this.renInteger, pc)
		if (this.b2b > 0) {
			this.showClearTextB2B('show', `B2B x${this.b2b}`)
			soundPlayer.playse('b2b')
		} else {
			this.showClearTextB2B('hide')
		}
	},

	checkWarning: function(stop) {
		var checked = false
		for (var i = 0; i < this.width; i++) {
			for (var y = 0; y < this.height - 16 + this.garbageArray.length; y++) {
				if (this.testSpace(i, y)) {
					checked = true
					break
				}
			}
		}
		if (stop == 'stop') checked = false
		if (checked && stop !== 'stop' && !this.isC4W && !this.isFrenzy && stop !== "warning") {
			if (!this.warning) {
				soundPlayer.stopse('alarm')
				if (stop !== 'stop') {
					soundPlayer.playse('alarm')
				}
				docId('holdTextPlaceholder').style.backgroundColor = "#f00"
				docId('nextTextPlaceholder').style.backgroundColor = "#f00"
				docId('playField').style.borderColor = "#f00"
				docId('meterBarRight').style.borderColor = "#f00"
				docId('meterBarLeft').style.borderColor = "#f00"
				if (this.isFieldEnable && stop !== 'stop' && stop !== 'paused') {
					docId('characterBackground').src = this.character.fields.danger
				}
				this.warning = true
			}
		} else {
			if (this.warning) {
				this.warning = false
				docId('holdTextPlaceholder').style.backgroundColor = "#fff"
				docId('nextTextPlaceholder').style.backgroundColor = "#fff"
				docId('playField').style.borderColor = "#fff"
				docId('meterBarRight').style.borderColor = "#fff"
				docId('meterBarLeft').style.borderColor = "#fff"
				soundPlayer.stopse("alarm")
				soundPlayer.fadese('alarm', 100, 0, 0)
				if (this.isFieldEnable && stop !== 'stop' && stop !== 'paused') {
					docId('characterBackground').src = this.character.fields.normal
				}
			}
		}
		if (this.warning && stop == 'paused') {
			soundPlayer.fadese('alarm', 100, 0, 0)
			soundPlayer.pausese('topoutwarning')
			soundPlayer.pausese('alarm')
		}
		if (this.warning && stop == 'resumed') {
			soundPlayer.playse('alarm')
			if (piece.lockoutActive) {
				soundPlayer.playse('topoutwarning')
			}
		}
	},

	draw: function() {
		clear(_CTX.field);
		draw(this.grid, 0, -19.6, 'field', void 0, 0);
		_CTX.field.globalCompositeOperation = 'source-atop'
		_CTX.field.fillStyle = 'rgba(0,0,0,0.1)'
		_CTX.field.fillRect(0, 0, _canvasses.field.width, _canvasses.field.height);
		_CTX.field.globalCompositeOperation = 'source-over'
	}
}

var field = new Field()
