function Field2(NUMBER, ASSETS) {
	this.playerType = NUMBER
 this.canClearLines = "normal"
	this.allAssetsLoaded = false
	this.assetsLength = 30
	this.assetsLoaded = 0
	this.mainAssets = {
		["gtris-body"]: ASSETS["gtris-body"],
		classP: ASSETS.classP,
		perfectClear1: ASSETS.perfectClear1,
		perfectClear2: ASSETS.perfectClear2,
		showResultCharImg: ASSETS.showResultCharImg,
		characterBackground: ASSETS.characterBackground,
		resultCharImg: ASSETS.resultCharImg,
		tetrionResultText: ASSETS.tetrionResultText,
		holdTextPlaceholder: ASSETS.holdTextPlaceholder,
		nextTextPlaceholder: ASSETS.nextTextPlaceholder,
		playField: ASSETS.playField,
		field: ASSETS.field,
		active: ASSETS.active,
		meterBarRight: ASSETS.meterBarRight,
		meterBarLeft: ASSETS.meterBarLeft,
		bgFrenzyLayout: ASSETS.bgFrenzyLayout,
		colorFrenzyOverlay: ASSETS.colorFrenzyOverlay,
		dynamicFrenzyBg: ASSETS.dynamicFrenzyBg,
		keyframeAnimationCanvas: ASSETS.keyframeAnimationCanvas,
		meter_A: ASSETS.meter_A,
		"meter_A-under": ASSETS["meter_A-under"],
		meter_FRENZY: ASSETS.meter_FRENZY,
		hold: ASSETS.hold,
		next: ASSETS.next,
		queue: ASSETS.queue,
		TEXT_next: ASSETS.TEXT_next,
		TEXT_hold: ASSETS.TEXT_hold,
		regular: ASSETS.regular,
		tSpin: ASSETS.tSpin,
		REN: ASSETS.REN,
		B2B: ASSETS.B2B,
		frenzyTimerText: ASSETS.frenzyTimerText
	}
	this.valid = false
	this.renInteger = 0;
	this.neutralline = 0
	this.isActive = false
	this.is1v1 = false
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
	this.counterVoice = false
	this.garbvoice = 0
	this.linesend = 0
	this.renenable = false;
	this.warning = false
	this.isFrenzyOngoing = false
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
		frenzyExt: 0,
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
			damage1: '',
			damage2: '',
			counter: '',
			gtris: '',
			gtrisplus: '',
			frenzy: '',
			success: '',
			fail: '',
			win: '',
			lose: '',
			fwar_enter: '',
			fwar_send1: '',
			fwar_send2: '',
			fwar_win: '',
			fwar_receive1: '',
			fwar_receive2: '',
			fwar_lose: '',
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

	this.canVoiceFrenzy = true

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
		maxTimerGauge: 3 * 360,
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
	this.frenzyWar = {
		garbageContributed: 0,
		maxHealth: 200,
		health: 200,
	}
	this.temp = {
		grid: [],
		held: 0,
		b2b: 0,
		ren: 0,
		prev: [],
	}
}

Field2.prototype = {
	pieceSettings: {
		DAS: 10,
		ARR: 0,
		SFT: 146,
		GRAV: 0,
		LCK: 60,
		PREV: 5,
		Ghost: 0,
		OUTL: 0,
	},


	initFrenzySettings: function(obj) {
		this.initFrenzy = {
			activatorMax: obj.gMax || 10,
			activatorGauge: obj.gauge || 0,
			maxTimerGauge: obj.tMax || 2999,
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
			this.speakTest(this.totalStrength, this.initStrength, this.isVoice.pc, this.isVoice.line, )
	},
	speakTest: function(totalStrength, initStrength, pc, line) {
		if (this.counterVoice) {
			this.playVoice('counter')
			this.rectanim.execute("c")
			this.counterVoice = false
		} else {
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
				this.rectanim.execute('s1')
			}
			if (totalStrength == 2) {
				this.playVoice('spell2')
				this.rectanim.execute('s2')
			}
			if (totalStrength == 3) {
				this.playVoice('spell3')
				this.rectanim.execute('s3')
			}
			if (totalStrength == 4) {
				if (line == 4 && this.gtrisenable)
					this.playVoice('gtris')
				else
					this.playVoice('spell4')
				this.rectanim.execute('s4')
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
				this.rectanim.execute('s5')
			}
		}
		this.initStrength = -1
		this.totalStrength = -1
	},
	engagePC: function(bool, innerHTML) {
		var pc = [docId(this.mainAssets.perfectClear1), docId(this.mainAssets.perfectClear2)]
		if (bool == true) {
			if (selectedSettings.Other.ClearText >= 1) {
				for (var e of pc) {
					e.style.animationName = 'none'
				}
				$iH(this.mainAssets.perfectClear1, innerHTML)
				$iH(this.mainAssets.perfectClear2, innerHTML)
				setTimeout(() => {
					pc[0].style.animationName = 'PCAnim1'
					pc[1].style.animationName = 'PCAnim2'
					pc[0].style.animationDuration = '4500ms'
					pc[1].style.animationDuration = '4500ms'
					pc[0].style.animationTimingFunction = 'linear'
					pc[1].style.animationTimingFunction = 'linear'
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
			docId(this.mainAssets.characterBackground).style.opacity = '1'
			docId(this.mainAssets.showResultCharImg).style.display = 'block'

			for (let load in this.character.voices) {
				this.character.voices[load] = new Howl({ src: [`assets/characters/${settingsList.NonIterable.Character[this.character.current]}/voices/${load}.ogg`], preload: false })
			}
			this.character.voices.gtris.once('loaderror', () => {
				this.gtrisenable = false
			})
			this.character.voices.gtrisplus.once('loaderror', () => {
				this.gtrisenableplus = false
			})

			for (let load in this.character.load) {
				this.character.load[load] = new Image()
				this.character.load[load].src = this.character.fields[load] = `assets/characters/${settingsList.NonIterable.Character[this.character.current]}/${load}.png`
				this.character.load[load].onerror = () => {
					this.isFieldEnable = false
					docId(this.mainAssets.characterBackground).style.opacity = '0'
				}
			}
			for (let load in this.character.loadAnim) {
				this.character.loadAnim[load] = new Image()
				this.character.loadAnim[load].src = this.character.anim[load] = `assets/characters/${settingsList.NonIterable.Character[this.character.current]}/${load}.png`
				this.character.loadAnim[load].onerror = () => {
					docId(this.mainAssets.showResultCharImg).style.display = 'none'
				}
			}
			this.rectanim.init(this.character.current, settingsList.NonIterable.Character[this.character.current])
			this.assetsLength = Object.keys(this.character.loadAnim).length + Object.keys(this.character.voices).length
			this.assetsLoaded = 0
			this.allAssetsLoaded = false
			console.log(this.assetsLength)
			for (let I in this.character.voices) {
				for (let Y of ["load", "loaderror"])
					this.character.voices[I].once(Y, () => {
						this.assetsLoaded++
						this.checkLoaded()
					})
			}
			for (let I in this.character.voices) {
				setTimeout(() => {
					this.character.voices[I].load()
				}, 1000 * Math.random())
			}
			for (let I in this.character.loadAnim) {
				for (let Y of ["load", "error"])
					this.character.loadAnim[I].addEventListener(Y, () => {
						this.assetsLoaded++
						this.checkLoaded()
					}, { once: true })
			}
		}
	},
	checkLoaded: function() {
		if (this.assetsLoaded >= this.assetsLength) {
			this.allAssetsLoaded = true
		} else {
			this.allAssetsLoaded = false
		}
	},

	playVoice: function(name) {
		var vol = selectedSettings.Volume.Character / 100
		if (vol !== 0) {
			this.character.voices[name].volume(vol)
			// this.character.voices[name].stop()
			this.character.voices[name].play()
		}
	},
	showResultAnimation: function(bool, str) {
		var img = docId(this.mainAssets.resultCharImg),
			text = docId(this.mainAssets.tetrionResultText),
			show = docId(this.mainAssets.showResultCharImg)
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
				held: hold2.piece,
				b2b: this.b2b,
				ren: this.renInteger,
				prev: $copy(preview2.grabBag),
			}
			console.table(this.temp)
		}
		if (r == "receive") {
			this.modifyGrid(0, $copy(this.temp.grid), false)
			hold2.piece = this.temp.held
			this.b2b = this.temp.b2b
			this.renInteger = this.temp.ren
			preview2.grabBag = $copy(this.temp.prev)

			this.temp = {
				grid: [],
				held: 0,
				b2b: 0,
				ren: 0,
				prev: [],
			}
		}
	},

	clearGrid: function() {
		var cells = this.makeArrayLength(this.width);
		for (var i = 0; i < this.width; i++) {
			cells[i] = this.makeArrayLength(this.height);
		}
		this.grid = cells;
		this.draw();
	},
	frenzyWarInit: function(max) {
		this.frenzyWar = {
			garbageContributed: 0,
			maxHealth: max,
			health: max,
		}
	},

	new: function(x, y) {
		var cells = this.makeArrayLength(x)
		for (var i = 0; i < x; i++) {
			cells[i] = this.makeArrayLength(y)
		}
		this.canClearLines = "normal"
		this.canVoiceFrenzy = true
		this.isActive = true
		this.level = 1
		this.levelMax = 15
		this.score = 0
		this.grid = cells
		this.width = x
		this.height = y
		this.is1v1 = false
		this.lineTotal = 0
		this.pieces = 0
		this.renInteger = -1
		this.b2b = -1
		docId(this.mainAssets.colorFrenzyOverlay).style.animation = "none"
		this.showClearText('hide')
		this.showClearTextREN('hide')
		this.showClearTextTSPIN('hide')
		this.showClearTextB2B('hide')
		hold2.piece = void 0
		this.clearRows = []
		this.frenzyWar = {
			garbageContributed: 0,
			maxHealth: 200,
			health: 200,
		}
		clear(_CTX[this.mainAssets.hold])
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
		if (this.canCheckGarbageBar && this.canCheckGarbageBar !== "custom")
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
		this.isFrenzyOngoing = false
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
		docId(this.mainAssets.characterBackground).src = this.character.fields.normal
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
		if (gachamino2.landed == true && gachamino2.moved == false) {
			if (gachamino2.index == 5) {
				var checkPoints = 0
				this.spinCheckCount = 0;
				var spinCount = this.spinCheckCount
				this.miniSpinCount = 0
				this.mini2SpinCount = 0

				for (var i = 0; i < pieces[5].spin.highX[0].length; i++) {
					if ((this.testSpace(gachamino2.x + pieces[5].spin.highX[gachamino2.pos][i], gachamino2.y + pieces[5].spin.highY[gachamino2.pos][i])) == true && gachamino2.landed == true) {
						this.miniSpinCount++;
						checkPoints++
					}
				}

				for (var i = 0; i < pieces[5].spin.highX[0].length * pieces[5].spin.lowY[0].length; i++) {
					if ((this.testSpace(gachamino2.x + pieces[5].spin.highX[i][gachamino2.pos], gachamino2.y + pieces[5].spin.lowY[i][gachamino2.pos])) == false && gachamino2.landed == true) {
						this.mini2SpinCount += 0.5 + (this.miniSpinCount * .2) * (this.spinCheckCount / 0.2);
					}
				}

				for (var i = 0; i < pieces[5].spin.lowX[0].length; i++) {
					if ((this.testSpace(gachamino2.x + pieces[5].spin.lowX[gachamino2.pos][i], gachamino2.y + pieces[5].spin.lowY[gachamino2.pos][i])) == true && gachamino2.landed == true) {
						this.spinCheckCount += 0.8
						checkPoints++;
					}
				}
				if (gachamino2.stsd.y == -2) {
					if (gachamino2.stsd.x == 1) {
						this.spinCheckCount += 0.6
					}
					if (gachamino2.stsd.x == -1) {
						this.spinCheckCount += 0.6
					}
				}
				if (checkPoints >= 3) {
					if (this.miniSpinCount >= 1 && this.spinCheckCount >= 0.7 && gachamino2.spinX == gachamino2.x && gachamino2.spinY == gachamino2.y) {
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
					if (this.miniSpinCount == 1 && this.spinCheckCount >= 1 && this.mini2SpinCount <= 1 && gachamino2.spinX == gachamino2.x && gachamino2.spinY == gachamino2.y) {
						this.isSpin = false;
						this.spinrecog = this.isSpin
						this.isMini = true
						this.spinrecogmini = this.isMini
					}
					if (gachamino2.stsd.y == -2 && this.spinCheckCount >= 0.7 && this.miniSpinCount >= 1) {
						if (gachamino2.stsd.x == 1) {
							this.isSpin = true
							this.isMini = false
						}
						if (gachamino2.stsd.x == -1) {
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
		if (this.isActive) {
			if (downfall == true) {
				this.mainAssets["gtris-body"].style.transition = 'transform 2.5s ease-in'
				this.mainAssets["gtris-body"].style.transform = 'translateY(4800px) rotateZ(90deg)'
			}
			if (winlose == 'win') {
				this.showResultAnimation('win', typeof title !== 'object' ? gtris_transText(title) : gtris_transText(title.name, title.array))
				this.mainAssets["gtris-body"].style.opacity = 0
				this.mainAssets["gtris-body"].style.animation = 'gameWin'
				this.mainAssets["gtris-body"].style.animationDuration = '4s'
				this.mainAssets["gtris-body"].style.animationTimingFunction = 'linear'
				this.isActive = false
				setTimeout(() => this.playVoice("win"), 2000)
			} else if (winlose == 'lose') {
				this.showResultAnimation('lose', typeof title !== 'object' ? gtris_transText(title) : gtris_transText(title.name, title.array))
				soundPlayer.playse('game-lose')
				this.isActive = false
				setTimeout(() => this.playVoice("lose"), 500)
				if ((this.is1v1 == "garbage" || this.is1v1 == "frenzywar")) {
					field.fieldResult("onevone_pwinres", false, "win")
					endGame({ name: "onevone_pwin", array: replayData.tuning.name == "" ? gtris_character_details(settingsList.NonIterable.Character[field.character.current]).name : replayData.tuning.name }, "lose")
				}
			} else if (winlose !== void 0) {
				this.showResultAnimation('win', typeof title !== 'object' ? gtris_transText(title) : gtris_transText(title.name, title.array))
				this.isActive = false
			}
		}
		this.rectanim.clear()
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
			if (numLimit >= 3 && numLimit < 5) {
				this.playVoice("damage1")
			} else if (numLimit >= 4) {
				this.playVoice("damage2")
				this.rectanim.execute("sd")
			}
			soundPlayer.playse('lineup')
		}
		if (this.canCheckGarbageBar && this.canCheckGarbageBar !== "custom")
			this.checkGarbageBar()
	},
	addGarbageToArray: function(count, row) {
		var _count = count || 0
		for (var e = 0; e < _count; e++)
			this.garbageArray.push(row)
		if (this.canCheckGarbageBar && this.canCheckGarbageBar !== "custom")
			this.checkGarbageBar()
	},
	offsetGarbage: function(count, line, pc) {
		var _count = count || 0

		if (this.is1v1 == "garbage" && selectedSettings.Other.Particle >= 1 && SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT) {
			if (this.garbageArray.length > 0 && count > 0) {
				GTRISParticleManagement.addParticle(
					0.00000,
					gachamino2.index + 1,
					getElemPos(this.mainAssets.playField, "x") + (gachamino2.x * cellSize),
					getElemPos(this.mainAssets.playField, "y") + ((gachamino2.y - 20.4) * cellSize),
					getElemPos(this.mainAssets.meterBarRight, "x"),
					getElemPos(this.mainAssets.meterBarRight, "y") + (getElemPos(this.mainAssets.meterBarRight, "height") / 2),
					this.isFrenzy ? 20 : 70,
					3,
					"ease2"
				)
			}
			if (this.garbageArray.length < count && SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT) {
				GTRISParticleManagement.addParticle(
					0.00000,
					gachamino2.index + 1,
					getElemPos(this.mainAssets.playField, "x") + (gachamino2.x * cellSize),
					getElemPos(this.mainAssets.playField, "y") + ((gachamino2.y - 20.4) * cellSize),
					getElemPos(field.mainAssets.meterBarRight, "x"),
					getElemPos(field.mainAssets.meterBarRight, "y") + (getElemPos(field.mainAssets.meterBarRight, "height") / 2),
					this.isFrenzy ? 20 : 70,
					3,
					"ease2"
				)
			}
		}


		if (this.is1v1 == "garbage")
			var ROW = Math.floor(this.rng.next() * 9.99999);
		if (count > this.garbageArray.length && this.garbageArray.length > 0 && line >= 3 && !pc) {
			this.counterVoice = true
		} else this.counterVoice = false
		for (var e = 0; e < _count; e++) {
			if (this.garbageArray.length > 0) {
				this.garbageArray.shift()
			} else if (this.is1v1 == "garbage") {
				field.addGarbageToArray(1, ROW)
			} else if (this.is1v1 == "frenzywar") {
				this.frenzyWar.garbageContributed++
			}
			this.statistics.atk++
		}
		if (this.canCheckGarbageBar && this.canCheckGarbageBar !== "custom")
			this.checkGarbageBar()
	},
	checkGarbageBar: function(change, color) {
		if (this.canCheckGarbageBar == true) {
			docId(this.mainAssets.meter_A).style.marginTop = docId(this.mainAssets["meter_A-under"]).style.marginTop = `${Math.max(0,(cellSize*20.4)-(cellSize * this.garbageArray.length))}px`
			this.checkWarning(this.valid ? void 0 : 'stop')
		} else if (this.canCheckGarbageBar == "custom") {
			docId(this.mainAssets.meter_A).style.marginTop = docId(this.mainAssets["meter_A-under"]).style.marginTop = `${Math.max(0,(cellSize*20.4)-(cellSize * (change || 0) * 20.4))}px`
			if (color !== void 0) {
				docId(this.mainAssets.meter_A).style.backgroundColor = typeof color === "object" ? `rgba(${color.r},${color.g},${color.b},${color.a})` : color
			}
			else docId(this.mainAssets.meter_A).style.background = "#a00"
		}
	},
	openGarbageBar: function(bool) {
		this.canCheckGarbageBar = bool
		docId(this.mainAssets.meterBarRight).style.display = bool == true || bool == "custom" ? 'block' : 'none';
		switch (bool) {
			case true: {
				this.checkGarbageBar()
				break
			}
			case "custom": {
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
		docId(this.mainAssets.meterBarLeft).style.display = bool == true ? 'block' : 'none';
	},
	checkFrenzyBar: function() {
		if (this.isFrenzy) {
			meterBar.frenzy2.style.marginTop = `${Math.max(0,(cellSize*20.4)-(cellSize * ((this.frenzy.timer / this.frenzy.maxTimer)*20.4)))}px`
			$iH(this.mainAssets.frenzyTimerText, Math.max(0, Math.ceil(this.frenzy.timer / 120)))
		}
	},
	frenzyTimerRun: function() {
		if (this.isFrenzy == true && this.frenzy.timerEnabled == true && this.isActive) {
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
		this.offsetGarbage(totalStrength, line, pc)
	},
	openFrenzy: function(bool) {
		var a = $CN(`gtris-rainbow-border-${this.mainAssets.classP}`)
		var b = $CN(`gtris-rainbow-bg-${this.mainAssets.classP}`)
		var bg = docId(this.mainAssets.bgFrenzyLayout)
		var spin = docId(this.mainAssets.dynamicFrenzyBg)

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
		var e = docId(this.mainAssets.colorFrenzyOverlay)
		var d = docId(this.mainAssets.dynamicFrenzyBg)
		const b = ["#222", "#066", "#006", "#610", "#660", "#060", "#606", "#600"]
		if (type == "change") {
			e.style.background = col == "n" ? b[0] : b[gachamino2.index + 1]
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
					this.grid[x + gachamino2.x][y + gachamino2.y] = tetro[x][y]
					if (!once || x + gachamino2.x < column) {
						column = x + gachamino2.x
						once = true
					}
					if (range.indexOf(y + gachamino2.y) === -1) {
						range.push(y + gachamino2.y);
						if (y + gachamino2.y > 21) this.valid = true;
					}
				}
			}
		}
		if (!this.valid) {
			if (this.isTSDOnly == true) {
				if (this.statistics.tsd >= 20) {
					this.fieldResult({ name: 'tsd_reached', array: this.statistics.tsd }, 'win', 'win')
					if (!this.is1v1 && this.is1v1 !== "garbage")
						endGame({ name: 'tsd_reached_result', array: this.statistics.tsd }, 'win')
				} else {
					this.fieldResult('lockout', true, 'lose')
					if (!this.is1v1 && this.is1v1 !== "garbage")
						endGame('lockout', 'lose')
				}
			} else {
				this.fieldResult('lockout', true, 'lose')
				if (!this.is1v1 && this.is1v1 !== "garbage")
					endGame('lockout', 'lose')
			}
			this.checkWarning('stop')
			return false;
		}
		range = range.sort(function(a, b) {
			return a - b;
		});
		var row = this.height,
		len = this.height
		if(this.canClearLines === "normal"){
			row = 0
		} else if (this.canClearLines === "zone") {
		 row = range[0]
		 len = row + range.length
		}
		for (var len = this.height; row < len; row++) {
			var count = 0;
			for (var x = 0; x < this.width; x++) {
				if (this.testSpace(x, row)) count++;
			}
			if (count > 9) {
				if(this.canClearLines === "normal"){
				linesDetection++;
				this.lineTotal++
				if (typeof this.lineLeft === "number" && this.lineLeft > 0)
					this.lineLeft--
				if (this.isFrenzy) {
					this.frenzy.requireLines--
				}
				if (SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT && selectedSettings.Other.Particle >= 3)
					for (var x = 0; x < this.width; x++)
						GTRISParticleManagement.addParticle(
							2,
							this.grid[x][row],
							getElemPos(this.mainAssets.playField, "x") + ((x) * cellSize),
							getElemPos(this.mainAssets.playField, "y") + ((row - 20.4) * cellSize),
							getElemPos(this.mainAssets.playField, "x") + ((x + 1 + (Math.random() * 15) + (Math.random() * -15)) * cellSize),
							getElemPos(this.mainAssets.playField, "y") + getElemPos("wholeCanvas", "height") + (Math.random() * 50 * cellSize),
							150,
							1,
							"fallField"
						)


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
				} else if (this.canClearLines === "zone") {
					linesDetection++
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
		if(this.canClearLines === "zone"){
		 for(var e = 0; e < linesDetection; e++){
			for (var x = 0; x < this.width; x++) {
				for (var y = 0; y < this.height; y++) {
					this.grid[x][y] = this.grid[x][y + 1]
				}
			}
			for (var x = 0; x < this.width; x++) {
				this.grid[x][this.height - 1] = 8
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
			if (!this.isFrenzyOngoing && !this.isFrenzy)
				this.addGarbageToField()
			if (this.renInteger > 1) {
				soundPlayer.playse('ren-end')
			}
			this.renInteger = -1
			this.showClearTextREN('hide')
			if (this.isMini) {
				this.showClearText('hide')
				this.showClearTextTSPIN('hide')
				this.showClearTextTSPIN('', gtris_transText('mini'), "outward", gtris_transText('miniAnimated'))
				this.statistics.mini.zero++
				this.score += 100 * this.level
				soundPlayer.playse('mini0')
			}
			if (this.isSpin) {
				this.showClearText('hide')
				this.showClearTextTSPIN('hide')
				this.showClearTextTSPIN('', gtris_transText('spin'), "outward", gtris_transText('spinAnimated'))
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
				this.engagePC(true, gtris_transText("pc"))
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
			this.offsetGarbageByClear(linesDetection, this.linespinrecog, this.renInteger, perfectClear)
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
						if (!this.is1v1 && this.is1v1 !== "garbage")

							endGame({ name: 'tsd_reached_result', array: this.statistics.tsd }, 'win')
					} else {
						this.fieldResult('tsd_failed', true, 'lose')
						if (!this.is1v1 && this.is1v1 !== "garbage")

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
		this.mainAssets["gtris-body"].style.transition = 'transform 0s linear'
		this.mainAssets["gtris-body"].style.transform = 'translateY(0) rotateZ(0deg)'
	},

	showClearText: function(compo, text, animation, aText, isEffect) {
		let components = $(`#${this.mainAssets.regular}`),
			docid = docId(this.mainAssets.regular)
		docid.style.opacity = "0%"
		components.stop()
		$iH(this.mainAssets.regular, "")
		docid.style.animation = "none"
		if (compo == 'hide') {
			components.animate({ opacity: 0, letterSpacing: `${cellSize * 0.03}px` }, 0, 'linear')
		} else if (selectedSettings.Other.ClearText == 1) {
			$iH(this.mainAssets.regular, text)
			components.animate({ opacity: 1, letterSpacing: `${cellSize * 0.03}px` }, 0, 'linear')
			components.animate({ opacity: 1, letterSpacing: `${cellSize * 0.13}px` }, 1800, 'linear')
			components.animate({ opacity: 0, letterSpacing: `${cellSize * 0.13}px` }, 200, 'linear')
		} else if (selectedSettings.Other.ClearText == 2) {
			if (animation == "outward") {
				$iH(this.mainAssets.regular, aText ? (isEffect ? (() => {
					var a = aText.split("")
					var e = ""
					for (var t = 0, len = a.length; t < len; t++) {
						e += `<span class="gtrisLetter" style="animation: gtrisCLEARTEXTAnim 2.1s 1 ease-out ${t * 0.12}s; opacity: 0%">${a[t]}</span>`
					}
					return e
				})() : aText) : text)
				requestAnimationFrame(() => docid.style.animation = "cleartextOutward 2.1s 1 ease-out")
			}
			else if (animation == "inward") {
				$iH(this.mainAssets.regular, aText ? (isEffect ? (() => {
					var a = aText.split("")
					var e = ""
					for (var t = 0, len = a.length; t < len; t++) {
						e += `<span class="gtrisLetter" style="animation: gtrisCLEARTEXTAnim 2.1s 1 ease-out ${t * 0.12}s; opacity: 0%">${a[t]}</span>`
					}
					return e
				})() : aText) : text)
				requestAnimationFrame(() => docid.style.animation = "cleartextInward 2.1s 1 ease-out")
			}
		}
	},
	showClearTextTSPIN: function(compo, text, animation, aText, isEffect) {
		let components = $(`#${this.mainAssets.tSpin}`),
			docid = docId(this.mainAssets.tSpin)
		docid.style.opacity = "0%"
		components.stop()
		$iH(this.mainAssets.tSpin, "")
		docid.style.animation = "none"
		if (compo == 'hide') {
			components.animate({ opacity: 0, letterSpacing: `${cellSize * 0.03}px` }, 0, 'linear')
		} else if (selectedSettings.Other.ClearText == 1) {
			$iH(this.mainAssets.tSpin, text)
			components.animate({ opacity: 1, letterSpacing: `${cellSize * 0.03}px` }, 0, 'linear')
			components.animate({ opacity: 1, letterSpacing: `${cellSize * 0.13}px` }, 1800, 'linear')
			components.animate({ opacity: 0, letterSpacing: `${cellSize * 0.13}px` }, 200, 'linear')
		} else if (selectedSettings.Other.ClearText == 2) {
			if (animation == "outward") {
				$iH(this.mainAssets.tSpin, aText ? (isEffect ? (() => {
					var a = aText.split("")
					var e = ""
					for (var t = 0, len = a.length; t < len; t++) {
						e += `<span class="gtrisLetter" style="animation: gtrisCLEARTEXTAnim 2.1s 1 ease-out ${t * 0.12}s; opacity: 0%">${a[t]}</span>`
					}
					return e
				})() : aText) : text)
				requestAnimationFrame(() => docid.style.animation = "cleartextOutward 2.1s 1 linear")
			}
			else if (animation == "inward") {
				$iH(this.mainAssets.tSpin, aText ? (isEffect ? (() => {
					var a = aText.split("")
					var e = ""
					for (var t = 0, len = a.length; t < len; t++) {
						e += `<span class="gtrisLetter" style="animation: gtrisCLEARTEXTAnim 2.1s 1 ease-out ${t * 0.12}s; opacity: 0%">${a[t]}</span>`
					}
					return e
				})() : aText) : text)
				requestAnimationFrame(() => docid.style.animation = "cleartextInward 2.1s 1 linear")
			}
		}
	},
	showClearTextB2B: function(compo, text) {
		let components = docId(this.mainAssets.B2B)
		if (compo == 'hide') {
			components.style.opacity = '0%'
			components.style.letterSpacing = '0.5px'
			components.style.transition = "letter-spacing 200ms ease-out"
			components.style.transition = "opacity 200ms linear"
		} else if (selectedSettings.Other.ClearText >= 1) {
			components.style.opacity = '100%'
			$iH(this.mainAssets.B2B, text)
			components.style.transition = 'opacity 100ms linear'
			components.style.transition = 'letter-spacing 0s linear'
			components.style.letterSpacing = '0.5px'
			components.style.opacity = '100%'
			setTimeout(function() {
				components.style.letterSpacing = `${cellSize*0.2}px`
				components.style.transition = "letter-spacing 2s ease-out"
			}, 2)
		} else {
			$iH(this.mainAssets.B2B, '')
		}
	},
	showClearTextREN: function(showhide, text) {
		let components = docId(this.mainAssets.REN)
		if (selectedSettings.Other.ClearText >= 1) {
			if (text !== void 0)
				$iH(this.mainAssets.REN, text)
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
			$iH(this.mainAssets.REN, "")
		}
	},
	clearLines: function(line, spin, mini, b2b, pc) {
		if (this.linespinrecog) {
			this.showClearTextTSPIN('', gtris_transText('spin'), "outward", gtris_transText('spinAnimated'))
			this.b2b++
		}
		if (this.minispinrecog) {
			this.showClearTextTSPIN('', gtris_transText('mini'), "outward", gtris_transText('miniAnimated'))
			this.b2b++
		}
		if (line > 3) {
			this.b2b++
		}
		if (!this.linespinrecog && !this.minispinrecog && line < 4) {
			this.b2b = -1
		}
		if (line == 1) {
			this.showClearText('', gtris_transText('line1'), "outward")
		}
		if (line == 2) {
			this.showClearText('', gtris_transText('line2'), "outward")
		}
		if (line == 3) {
			this.showClearText('', gtris_transText('line3'), "outward")
		}
		if (line == 4) {
			this.showClearText('', gtris_transText('line4'), "inward", gtris_transText('line4'), true)
		}
		if (line >= 5) {
			this.showClearText('', gtris_transText('line5'), "inward", gtris_transText('line5'), true)
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
		if (this.b2b > 0) {
			this.showClearTextB2B('show', gtris_transText("b2bcounter", this.b2b))
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
				docId(this.mainAssets.holdTextPlaceholder).style.backgroundColor = "#f00"
				docId(this.mainAssets.nextTextPlaceholder).style.backgroundColor = "#f00"
				docId(this.mainAssets.playField).style.borderColor = "#f00"
				docId(this.mainAssets.meterBarRight).style.borderColor = "#f00"
				docId(this.mainAssets.meterBarLeft).style.borderColor = "#f00"
				if (this.isFieldEnable && stop !== 'stop' && stop !== 'paused') {
					docId(this.mainAssets.characterBackground).src = this.character.fields.danger
				}
				this.warning = true
			}
		} else {
			if (this.warning) {
				this.warning = false
				docId(this.mainAssets.holdTextPlaceholder).style.backgroundColor = "#fff"
				docId(this.mainAssets.nextTextPlaceholder).style.backgroundColor = "#fff"
				docId(this.mainAssets.playField).style.borderColor = "#fff"
				docId(this.mainAssets.meterBarRight).style.borderColor = "#fff"
				docId(this.mainAssets.meterBarLeft).style.borderColor = "#fff"
				soundPlayer.stopse("alarm")
				soundPlayer.fadese('alarm', 100, 0, 0)
				if (this.isFieldEnable && stop !== 'stop' && stop !== 'paused') {
					docId(this.mainAssets.characterBackground).src = this.character.fields.normal
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
			if (gachamino2.lockoutActive) {
				soundPlayer.playse('topoutwarning')
			}
		}
	},

	draw: function() {
		clear(_CTX[this.mainAssets.field]);
		draw(this.grid, 0, -19.6, this.mainAssets.field, void 0, 0);
		_CTX[this.mainAssets.field].globalCompositeOperation = 'source-atop'
		_CTX[this.mainAssets.field].fillStyle = 'rgba(0,0,0,0.2)'
		_CTX[this.mainAssets.field].fillRect(0, 0, _canvasses[this.mainAssets.field].width, _canvasses[this.mainAssets.field].height);
		_CTX[this.mainAssets.field].globalCompositeOperation = 'source-over'

		if (this.pieceSettings.OUTL == 1) {
			var b = ~~(cellSize / 6);
			var c = cellSize;
			var lineCanvas = document.createElement('canvas');
			lineCanvas.width = _canvasses[this.mainAssets.field].width;
			lineCanvas.height = this.height * cellSize;
			var lineCtx = lineCanvas.getContext('2d');
			lineCtx.fillStyle = 'rgba(255,255,255,1)';
			lineCtx.beginPath();
			for (var x = 0, len = this.grid.length; x < len; x++) {
				for (var y = 20, wid = this.grid[x].length; y < wid; y++) {
					if (this.grid[x][y]) {
						if (x < 9 && !this.grid[x + 1][y]) {
							lineCtx.fillRect(x * c + c - b, y * c - 2 * c, b, c);
						}
						if (x > 0 && !this.grid[x - 1][y]) {
							lineCtx.fillRect(x * c, y * c - 2 * c, b, c);
						}
						if (y < 41 && !this.grid[x][y + 1]) {
							lineCtx.fillRect(x * c, y * c - 2 * c + c - b, c, b);
						}
						if (!this.grid[x][y - 1]) {
							lineCtx.fillRect(x * c, y * c - 2 * c, c, b);
						}
						if (x < 9 && y < 41) {
							if (!this.grid[x + 1][y] && !this.grid[x][y + 1]) {
								lineCtx.clearRect(x * c + c - b, y * c - 2 * c + c - b, b, b);
								lineCtx.fillRect(x * c + c - b, y * c - 2 * c + c - b, b, b);
							} else if (
								!this.grid[x + 1][y + 1] &&
								this.grid[x + 1][y] &&
								this.grid[x][y + 1]
							) {
								lineCtx.moveTo(x * c + c, y * c - 2 * c + c - b);
								lineCtx.lineTo(x * c + c, y * c - 2 * c + c);
								lineCtx.lineTo(x * c + c - b, y * c - 2 * c + c);
								lineCtx.arc(
									x * c + c,
									y * c - 2 * c + c,
									b,
									(3 * Math.PI) / 2,
									Math.PI,
									true,
								);
							}
						}
						if (x < 9) {
							if (!this.grid[x + 1][y] && !this.grid[x][y - 1]) {
								lineCtx.clearRect(x * c + c - b, y * c - 2 * c, b, b);
								lineCtx.fillRect(x * c + c - b, y * c - 2 * c, b, b);
							} else if (
								!this.grid[x + 1][y - 1] &&
								this.grid[x + 1][y] &&
								this.grid[x][y - 1]
							) {
								lineCtx.moveTo(x * c + c - b, y * c - 2 * c);
								lineCtx.lineTo(x * c + c, y * c - 2 * c);
								lineCtx.lineTo(x * c + c, y * c - 2 * c + b);
								lineCtx.arc(
									x * c + c,
									y * c - 2 * c,
									b,
									Math.PI / 2,
									Math.PI,
									false,
								);
							}
						}
						if (x > 0 && y < 41) {
							if (!this.grid[x - 1][y] && !this.grid[x][y + 1]) {
								lineCtx.clearRect(x * c, y * c - 2 * c + c - b, b, b);
								lineCtx.fillRect(x * c, y * c - 2 * c + c - b, b, b);
							} else if (
								!this.grid[x - 1][y + 1] &&
								this.grid[x - 1][y] &&
								this.grid[x][y + 1]
							) {
								lineCtx.moveTo(x * c, y * c - 2 * c + c - b);
								lineCtx.lineTo(x * c, y * c - 2 * c + c);
								lineCtx.lineTo(x * c + b, y * c - 2 * c + c);
								lineCtx.arc(
									x * c,
									y * c - 2 * c + c,
									b,
									Math.PI * 2,
									(3 * Math.PI) / 2,
									true,
								);
							}
						}
						if (x > 0) {
							if (!this.grid[x - 1][y] && !this.grid[x][y - 1]) {
								lineCtx.clearRect(x * c, y * c - 2 * c, b, b);
								lineCtx.fillRect(x * c, y * c - 2 * c, b, b);
							} else if (
								!this.grid[x - 1][y - 1] &&
								this.grid[x - 1][y] &&
								this.grid[x][y - 1]
							) {
								lineCtx.moveTo(x * c + b, y * c - 2 * c);
								lineCtx.lineTo(x * c, y * c - 2 * c);
								lineCtx.lineTo(x * c, y * c - 2 * c + b);
								lineCtx.arc(
									x * c,
									y * c - 2 * c,
									b,
									Math.PI / 2,
									Math.PI * 2,
									true,
								);
							}
						}
					}
				}
			}
			lineCtx.fill();
			_CTX[this.mainAssets.field].drawImage(lineCanvas, 0, cellSize * -19.6, lineCanvas.width, lineCanvas.height);
		}


	},
	rectanim: new class {
		constructor(id) {
			this.arr = ["s1", "s2", "s3", "s4", "s5", "c", "sd"]
			this.assets = (() => {
				const obj = {}
				for (let e of this.arr) {
					obj[e] = ""
				}
				return obj
			})()
			this.current = null
			this.spell = null
			this.loaded = true
			this.int = {
				interval: 0,
				x: 0,
				y: 0
			}
			this.main = docId(id)
			this.ctx = this.main.getContext("2d")
			this.allLoaded = true
			this.loadedAsset = 0
		}
		init(num, assetPath) {
			if (this.current !== num) {
				this.loadedAsset = 0
				this.allLoaded = false
				this.loaded = true
				this.current = num
				for (let e of this.arr) {
					this.assets[e] = new Image()
					this.assets[e].src = `assets/characters/${assetPath}/rectangularAnimations/${e}.png`
					this.assets[e].onerror = () => {
						this.loaded = false
						this.loadedAsset++
						this.checkLoad()
					}
					this.assets[e].addEventListener("load", () => {
						this.loadedAsset++
						this.checkLoad()
					}, { once: true })
					try {
						var s = document.createElement("CANVAS"),
							c = s.getContext("2d")
						c.drawImage(this.assets[e], 0, 0)
					} catch (e) {}
				}
			}
		}
		checkLoad() {
			if (this.loadedAsset >= 7) {
				this.allLoaded = true
				console.log("all rectanim test")
			} else {
				this.allLoaded = false
			}
		}
		switchPage(type, x, y) {
			try {
				if (this.spell !== "")
					this.ctx.drawImage(
						this.assets[type],
						this.assets[type].naturalWidth /**/ * (x / 5),
						this.assets[type].naturalHeight /**/ * (y / 10),
						this.assets[type].naturalWidth / 5,
						this.assets[type].naturalHeight / 10,
						0,
						0,
						this.main.width,
						this.main.height
					)
			} catch (e) {}
		}
		loop() {
			if (this.loaded) {
				this.int.interval -= 1
				while (this.int.interval < 0) {
					this.int.interval += 5
					if (this.spell !== '') {
						clear(this.ctx)
						this.int.x++
						if (this.int.x >= 5) {
							this.int.x = 0
							this.int.y++
						}
						if (this.int.y >= 10) {
							this.int.x = 0
							this.int.y = 0
							this.spell = ''
						}
						this.switchPage(this.spell, this.int.x, this.int.y)
						this.main.style.transform = `rotateX(${this.rectRotate(this.int.x,this.int.y)})`
					}
				}
			}
		}
		execute(spell) {
			if (this.loaded) {
				this.spell = spell
				this.int = {
					interval: 0,
					x: 0,
					y: 0
				}
			}
		}
		clear() {
			this.spell = ''
			clear(this.ctx)
		}
		rectRotate(hx, hy) {
			if (hy >= 9) {
				return `${((hx/4))*90}deg`
			}
			if (hy > 0 && hy <= 8) {
				return `0deg`
			}
			if (hy <= 0) {
				return `${(((4-hx)/4))*-90}deg`
			}
		}
	}("keyframeAnimationCanvas2"),
}
const field2 = new Field2(1, {
	"gtris-body": docId("gtris-body2"),
	classP: "p2",
	perfectClear1: "perfectClear12",
	perfectClear2: "perfectClear22",
	showResultCharImg: "showResultCharImg2",
	characterBackground: "characterBackground2",
	resultCharImg: "resultCharImg2",
	tetrionResultText: "tetrionResultText2",
	holdTextPlaceholder: "holdTextPlaceholder2",
	nextTextPlaceholder: "nextTextPlaceholder2",
	playField: "playField2",
	field: "field2",
	active: "active2",
	meterBarRight: "meterBarRight2",
	meterBarLeft: "meterBarLeft2",
	bgFrenzyLayout: "bgFrenzyLayout2",
	colorFrenzyOverlay: "colorFrenzyOverlay2",
	dynamicFrenzyBg: "dynamicFrenzyBg2",
	keyframeAnimationCanvas: "keyframeAnimationCanvas2",
	meter_A: "meter_A2",
	"meter_A-under": "meter_A-under2",
	regular: "regular2",
	tSpin: "tSpin2",
	REN: "REN2",
	B2B: "B2B2",
	meter_FRENZY: "meter_FRENZY2",
	hold: "hold2",
	next: "next2",
	queue: "queue2",
	TEXT_next: "TEXT_next2",
	TEXT_hold: "TEXT_hold2",
	frenzyTimerText: "frenzyTimerText2",
})
