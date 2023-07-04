var gravityUnit = 1 / 512,
	gravityArr = (function() {
		var array = []
		array.push(0);
		for (var i = 1; i < 128; i++) array.push(i / 128);
		for (var i = 1; i <= 20; i++) array.push(i);
		return array;
	})()

const gachamino = new function() {
	this.x;
	this.y;
	this.pos = 0;
	this.tetro;
	this.index;
	this.kickData;
	this.lockDelay = 0;
	this.gravity = gravityUnit * 4
	this.currentGravity = 0
	this.shiftDelay = 0;
	this.shiftDir
	this.shiftReleased
	this.arrDelay = 0
	this.held = false;
	this.finesse = 0;
	this.dirty = false;
	this.landed = false
	this.rotateFail = false
	this.spinX = 0
	this.spinY = 0
	this.canHold = false
	this.initial = {
		rot: 0,
		hold: 0
	}
	this.lockCap = {
		move: 0,
		rotate: 0
	}
	this.lockLimit = {
		move: 15,
		rotate: 15,
		delay: 60
	}
	this.stsd = {
		x: 0,
		y: 0
	}
	this.last = {
		x: 0,
		y: 0,
		pos: 0
	}
	this.lockoutActive = false
	this.hardDropEnabled = false
	this.rng = new ParkMillerPRNG()
	this.levelGravityArr = [1, 2, 3, 4, 5, 6, 7, 8, 10, 14, 16, 19, 25, 31, 41, 59, 89, 139, 142, 148]
	this.checkBlockoutArr = [];
	
	
	this.restrictDelay = function(level) {
		if (field.isGravityType == "marathon") {
			return Math.max(0, (level - 21) * 10)
		} else if (field.isGravityType == "master") {
			return Math.max(0, level * 2)
		} else return 0
	}
	this.restrictLock = function(level) {
		if (field.isGravityType == "marathon") {
			return (Math.max(1, ((level) - 21) * 0.2 * 0.45))
		} else if (field.isGravityType == "master") {
			return Math.min(Math.max(1, ((level) - 6) * 0.086), 2.8)
		} else return 1
	}
	this.reset = function() {
		this.initial.hold = 0
		this.initial.rot = 0
		soundPlayer.fadese('topoutwarning', 0, 0, 0)
		soundPlayer.stopse("topoutwarning")
		$iH(field.mainAssets['TEXT_next'], gtris_transText('next'))
		$iH(field.mainAssets.TEXT_hold, gtris_transText('hold'))
		this.x = 'reset'
		this.y = -1000
		this.index = 'reset'
		this.tetro = [[]]
		this.shiftReleased = true
		this.shiftDir = 0
		this.currentGravity = field.pieceSettings.GRAV
		this.lockLimit.delay = field.pieceSettings.LCK
		this.openHold(true)
this.held = false
	}
	this.openHold = function(bool) {
		var e = docId('holdDiv')
		switch (bool) {
			case true: {
				e.style.opacity = 1
				this.canHold = true
				break
			}
			default: {
				e.style.opacity = 0
				this.canHold = false
				break
			}
		}
	}
	this.new = function(ind) {
		if (field.isGravityType) {
			switch (field.isGravityType) {
				case "marathon": {
					this.currentGravity = this.levelGravityArr[Math.max(0, Math.min(field.level, 19))]
					break
				}
				case "master": {
					this.currentGravity = 147
					break
				}
			}
		} else this.currentGravity = field.pieceSettings.GRAV
		if (this.injectPiece(ind, this.held)) {
			if (this.initial.hold > 0) {
				while (this.initial.hold > 0 && this.canHold) {
					var temp = hold.piece;
					if (!this.held) {
						if (hold.piece !== void 0) {
							hold.piece = this.index;
							soundPlayer.playse(field.mainAssets.hold)
							this.injectPiece(temp, true)
						} else {
							hold.piece = this.index;
							soundPlayer.playse('firsthold')
							this.injectPiece(preview.next(), true);
						}
						hold.draw();
						this.initial.hold--
					}
					this.initial.hold = 0
				}
						this.held = true;
				soundPlayer.playse('ihs')
				this.initial.hold = 0
				$iH(field.mainAssets.TEXT_hold, gtris_transText(field.mainAssets.hold))
			}
			if (this.initial.rot !== 0) {
				soundPlayer.playse('irs')
				$iH(field.mainAssets.TEXT_next, gtris_transText('next'))
				while (this.initial.rot !== 0) {
					if (this.initial.rot > 0) {
						this.rotate(1)
						this.initial.rot--
					} else
					if (this.initial.rot < 0) {
						this.rotate(-1)
						this.initial.rot++
					} else break
				}
			}
			this.y += this.getDrop(this.currentGravity !== 0 ? gravityArr[this.currentGravity - 1] : this.gravity)
		}
	}
	this.injectPiece = function(index, o) {
		this.pos = 0;
		this.tetro = [];
		this.held = o;
		this.finesse = 0;
		this.dirty = true;
		this.landed = false;
		this.tetro = pieces[index].tetro
		this.kickData = pieces[index].kickData
		this.x = pieces[index].x
		this.y = 0;
		this.index = index;
		this.lockCap = {
			move: 0,
			rotate: 0
		}

		this.lockDelay = 0

		this.checkIfGTrisLocksAtExosphere(0, this.tetro)
		this.moved = false
		this.rotateFail = false
		this.y += this.index !== 0 ? 20 : 20;
		if (!this.checkPieceValidation(0, 0, this.tetro)) {
			if (field.isTSDOnly == true) {
				if (field.statistics.tsd >= 20) {
					field.fieldResult({ name: 'tsd_reached', array: field.statistics.tsd }, 'win', 'win')
					if (!field.is1v1 && field.is1v1 !== "garbage")
						endGame({ name: 'tsd_reached_result', array: field.statistics.tsd }, 'win')
				} else {
					field.fieldResult('blockout', true, 'lose')
					if (!field.is1v1 && field.is1v1 !== "garbage")
						endGame('blockout', 'lose')
				}
			} else {
				field.fieldResult('blockout', true, 'lose')
				if (!field.is1v1 && field.is1v1 !== "garbage")
					endGame('blockout', 'lose')
			}
			soundPlayer.playse('ko')
			this.y = -3737
			this.index = 'reset'
			this.tetro = [[]]
			return false
		}
		if (this.index == 0) {
			this.y += this.getDrop(1)
		} else {
			this.y += this.getDrop(1)
		}
		if (hold.piece !== void 0) {
			hold.draw()
		}

		return true
	}
	this.rotate = function(direction) {
		if (this.y > -20 && this.index !== 'reset') {
			var rotated = [];
			this.rotateFail = true
			if (direction === -1) {
				for (var i = this.tetro.length - 1; i >= 0; i--) {
					rotated[i] = [];
					for (var row = 0; row < this.tetro.length; row++) {
						rotated[i][this.tetro.length - 1 - row] = this.tetro[row][i];
					}
				}
			} else {
				for (var i = 0; i < this.tetro.length; i++) {
					rotated[i] = [];
					for (var row = this.tetro.length - 1; row >= 0; row--) {
						rotated[i][row] = this.tetro[row][this.tetro.length - 1 - i];
					}
				}
			}
			var dir;
			switch (direction) {
				case -1:
					dir = 'left'
					break;
				case 1:
					dir = 'right'
					break;
			}
			var curPos = this.pos.mod(4);
			var newPos = (this.pos + direction).mod(4);

			for (var x = 0, len = this.kickData[dir][curPos].length; x < len; x++) {
				if (
					this.moveValid(
						this.kickData[dir][curPos][x][0],
						this.kickData[dir][curPos][x][1],
						rotated,
					)
				) {
					this.x += this.kickData[dir][curPos][x][0];
					this.y += this.kickData[dir][curPos][x][1];
					this.stsd.x = this.kickData[dir][newPos][x][0]
					this.stsd.y = this.kickData[dir][newPos][x][1]
					this.tetro = rotated;
					this.pos = newPos;
					this.moved = false
					this.rotateFail = false
					this.checkIfGTrisLocksAtExosphere(0, this.tetro)
					soundPlayer.playse('rotate')
					if (!this.moveValid(
							0,
							2,
							rotated))
						this.lockCap.rotate++
					break;
				}
			}
			if (!this.rotateFail) {
				this.spinX = Math.floor(this.x);
				this.spinY = Math.floor(this.y)
				this.moved = false
				field.isSpin = false
				field.isMini = false
				field.spinCheck()
				this.checkSpintoSound()
			}
		} else if (this.y < -10) {
			this.initial.rot += direction
			if (this.initial.rot == 4 || this.initial.rot == -4 || this.initial.rot == 0) {
				this.initial.rot = 0
				$iH(field.mainAssets.TEXT_next, gtris_transText('next'))
			} else if (this.initial.rot == 2 || this.initial.rot == -2) {
				$iH(field.mainAssets.TEXT_next, `180`)
			} else {
				switch (this.initial.rot) {
					case 1: {
						$iH(field.mainAssets.TEXT_next, `CW x1`)
						break
					}
					case 3: {
						$iH(field.mainAssets.TEXT_next, `CW x3`)
						break
					}
					case -1: {
						$iH(field.mainAssets.TEXT_next, `CCW x1`)
						break
					}
					case -3: {
						$iH(field.mainAssets.TEXT_next, `CCW x3`)
						break
					}
				}
			}
		}
	}
	this.rotate180 = function() {
		if (this.y > -20 && this.index !== 'reset') {
			var rotated = [];
			var temp = this.tetro
			this.rotateFail = true
			{
				for (var i = 0; i < this.tetro.length; i++) {
					rotated[i] = [];
					for (var row = this.tetro.length - 1; row >= 0; row--) {
						rotated[i][row] = this.tetro[row][this.tetro.length - 1 - i];
					}
				}
				temp = rotated
			}
			rotated = []
			{
				for (var i = 0; i < temp.length; i++) {
					rotated[i] = [];
					for (var row = temp.length - 1; row >= 0; row--) {
						rotated[i][row] = temp[row][temp.length - 1 - i];
					}
				}
			}

			var curPos = this.pos.mod(4);
			var newPos = (this.pos + 2).mod(4);
			for (var x = 0, len = this.kickData['double'][curPos].length; x < len; x++) {
				if (
					this.moveValid(
						this.kickData['double'][curPos][x][0],
						this.kickData['double'][curPos][x][1],
						rotated,
					)
				) {
					this.x += this.kickData['double'][curPos][x][0];
					this.y += this.kickData['double'][curPos][x][1];
					this.stsd.x = this.kickData['double'][newPos][x][0]
					this.stsd.y = this.kickData['double'][newPos][x][1]
					this.tetro = rotated;
					this.pos = newPos;
					this.moved = false
					this.rotateFail = false;
					this.checkIfGTrisLocksAtExosphere(0, this.tetro)
					soundPlayer.playse('rotate')
					if (!this.moveValid(
							0,
							2,
							rotated))
						this.lockCap.rotate += 2
					break;
				}
			}
			if (!this.rotateFail) {
				this.spinX = Math.floor(this.x);
				this.spinY = Math.floor(this.y)
				this.moved = false
				field.isSpin = false
				field.isMini = false
				field.spinCheck()
				this.checkSpintoSound()
			}
		} else if (this.y < -10) {
			for (var e = 0; e < 2; e++) {
				this.initial.rot++
				if (this.initial.rot == 4 || this.initial.rot == -4 || this.initial.rot == 0) {
					this.initial.rot = 0
					$iH(field.mainAssets.TEXT_next, gtris_transText('next'))
				} else if (this.initial.rot == 2 || this.initial.rot == -2) {
					$iH(field.mainAssets.TEXT_next, `180`)
				} else {
					switch (this.initial.rot) {
						case 1: {
							$iH(field.mainAssets.TEXT_next, `CW x1`)
							break
						}
						case 3: {
							$iH(field.mainAssets.TEXT_next, `CW x3`)
							break
						}
						case -1: {
							$iH(field.mainAssets.TEXT_next, `CCW x1`)
							break
						}
						case -3: {
							$iH(field.mainAssets.TEXT_next, `CCW x3`)
							break
						}
					}
				}
			}
		}
	}
	this.DASPreloadAndCheckShift = function(keysDown, lastKeys) {
		// Shift key pressed event.
		if (keysDown & flags.LEFT && !(lastKeys & flags.LEFT)) {
			this.shiftDelay = 0;
			this.arrDelay = 0;
			this.shiftReleased = true;
			this.shiftDir = -1;
			this.finesse++;
		} else if (keysDown & flags.RIGHT && !(lastKeys & flags.RIGHT)) {
			this.shiftDelay = 0;
			this.arrDelay = 0;
			this.shiftReleased = true;
			this.shiftDir = 1;
			this.finesse++;
		}
		if (
			this.shiftDir === 1 &&
			!(keysDown & flags.RIGHT) &&
			lastKeys & flags.RIGHT &&
			keysDown & flags.LEFT
		) {
			this.shiftDelay = 0;
			this.arrDelay = 0;
			this.shiftReleased = true;
			this.shiftDir = -1;
		} else if (
			this.shiftDir === -1 &&
			!(keysDown & flags.LEFT) &&
			lastKeys & flags.LEFT &&
			keysDown & flags.RIGHT
		) {
			this.shiftDelay = 0;
			this.arrDelay = 0;
			this.shiftReleased = true;
			this.shiftDir = 1;
		} else if (
			!(keysDown & flags.RIGHT) &&
			lastKeys & flags.RIGHT &&
			keysDown & flags.LEFT
		) {
			this.shiftDir = -1;
		} else if (
			!(keysDown & flags.LEFT) &&
			lastKeys & flags.LEFT &&
			keysDown & flags.RIGHT
		) {
			this.shiftDir = 1;
		} else if (
			(!(keysDown & flags.LEFT) && lastKeys & flags.LEFT) ||
			(!(keysDown & flags.RIGHT) && lastKeys & flags.RIGHT)
		) {
			this.shiftDelay = 0;
			this.arrDelay = 0;
			this.shiftReleased = true;
			this.shiftDir = 0;
		}
		if (this.shiftDir) {
			if (this.shiftReleased) {
				this.shift(this.shiftDir);
				this.shiftDelay++;
				this.shiftReleased = false;
			} else if (this.shiftDelay < field.pieceSettings.DAS) {
				this.shiftDelay++;
			} else if (this.shiftDelay === field.pieceSettings.DAS && field.pieceSettings.DAS !== 0) {
				this.shift(this.shiftDir);
				if (field.pieceSettings.ARR !== 0) this.shiftDelay++;
			} else if (this.arrDelay < field.pieceSettings.ARR) {
				this.arrDelay++;
			} else if (this.arrDelay === field.pieceSettings.ARR && field.pieceSettings.ARR !== 0) {
				this.shift(this.shiftDir);
			}
		}
	}
	this.shift = function(direction) {
		this.arrDelay = 0;
		if (this.y > -20 && this.index !== 'reset') {
			if (field.pieceSettings.ARR === 0 && this.shiftDelay === field.pieceSettings.DAS) {
				for (var i = 1; i < 10; i++) {
					if (!this.moveValid(i * direction, 0, this.tetro)) {
						this.x += i * direction - direction;
						break;
					}

					if (!this.moveValid(0, 1, this.tetro)) {
						this.lockCap.move++
						soundPlayer.playse('step')
					}
					soundPlayer.playse('move')
					this.moved = true
				}
			} else if (this.moveValid(direction, 0, this.tetro)) {
				this.x += direction;
				soundPlayer.playse('move')
				this.moved = true

				if (!this.moveValid(0, 1, this.tetro)) {
					this.lockCap.move++
					soundPlayer.playse('step')
				}
			}
		}
	}
	this.shiftDown = function() {
		if (this.y > -20 && this.index !== 'reset') {
			if (this.moveValid(0, 1, this.tetro)) {
				field.spinCheckCount = -869
				field.spinCheck()
				var grav = gravityArr[field.pieceSettings.SFT + 1];
				if (grav > 1) {
					if (gravityArr[this.currentGravity - 1] !== 20)
						field.score += this.getDrop(grav)
					soundPlayer.playse('softdrop')
					this.y += this.getDrop(grav);
				}
				else if (grav == 1) {
					this.y += this.getDrop(1)
					soundPlayer.playse('softdrop')
					if (gravityArr[this.currentGravity - 1] !== 20)
						field.score++
				} else {
					if (this.y >= Math.round(this.y) - grav && this.y <= Math.round(this.y)) {
						if (gravityArr[this.currentGravity - 1] !== 20)
							field.score++
						soundPlayer.playse('softdrop')
					}
					this.y += grav;
				}
			}
		}
	}
	this.hardDrop = function() {
		if (this.y > -20 && this.index !== 'reset') {
			for (var i = 1; this.checkPieceValidation(0, i, this.tetro); i++)
				if (gravityArr[this.currentGravity - 1] !== 20)
					field.score += 2
			this.y += this.getDrop(89)
			soundPlayer.playse('harddrop')
			for (let x = 0, len = this.tetro.length; x < len; x++)
				for (let y = 0, len2 = this.tetro[x].length; y < len2; y++)
					if (selectedSettings.Other.Particle >= 2 && this.tetro[x][y])
						for (let e = 0; e < 2; e++)
							GTRISParticleManagement.addParticle(
								0,
								this.index + 1,
								getElemPos(field.mainAssets.playField, "x") + ((this.x + x) * totalTetrionSize),
								getElemPos(field.mainAssets.playField, "y") + ((this.y - 20.4 + y) * totalTetrionSize),
								getElemPos(field.mainAssets.playField, "x") + ((this.x + (Math.random() * 6) + (Math.random() * -6)) * totalTetrionSize),
								getElemPos(field.mainAssets.playField, "y") + ((this.y - 35.4 + y + (Math.random() * 6)) * totalTetrionSize),
								80,
								1,
								"hardDrop"
							)

			this.hardDropEnabled = true
			this.lockDelay = 929 * field.pieceSettings.LCK;
		}
	}
	this.getDrop = function(distance) {
		for (var i = 1; i <= distance; i++) {
			if (!this.checkPieceValidation(0, i, this.tetro)) return i - 1;
		}
		return i - 1;
	}
	this.hold = function() {
		if (this.canHold) {
			if (this.y > -44 && this.index !== 'reset') {
				var temp = hold.piece;
				if (!this.held) {
					this.held = true;
					if (hold.piece !== void 0) {
						hold.piece = this.index;
						soundPlayer.playse(field.mainAssets.hold)
						this.new(temp, this.held)
					} else {
						hold.piece = this.index;
						soundPlayer.playse('firsthold')
						this.new(preview.next(), this.held);
					}
					hold.draw();
				}
			} else if (this.y < -10) {
				if (this.initial.hold == 0) {
					this.initial.hold = 1
					$iH(field.mainAssets.TEXT_hold, `INITIAL`)
				}
				else if (this.initial.hold == 1) {
					this.initial.hold = 0
					$iH(field.mainAssets.TEXT_hold, gtris_transText(field.mainAssets.hold))
				}
			}
		}
	}
	this.moveValid = function(cx, cy, tetro) {
		cx = cx + this.x;
		cy = Math.floor(cy + this.y);
		for (var x = 0, e = 0; x < tetro.length && e < 30; x++, e++) {
			for (var y = 0; y < tetro[x].length; y++) {
				if (
					tetro[x][y] &&
					(cx + x < 0 ||
						cx + x >= field.width ||
						cy + y >= field.height ||
						field.grid[cx + x][cy + y])
				) {
					return false;
				}
			}
		}
		this.lockDelay = 0;
		if (cy > 0) {
			field.spinCheckCount = -869
			this.moved = true
			field.spinCheck()
		}
		return true;
	}
	this.checkPieceValidation = function(cx, cy, tetro) {
		cx = cx + this.x;
		cy = Math.floor(cy + this.y)
		for (var x = 0; x < tetro.length; x++) {
			for (var y = 0; y < tetro[x].length; y++) {
				if (
					tetro[x][y] &&
					(cx + x < 0 ||
						cx + x >= field.width ||
						cy + y >= field.height ||
						field.grid[cx + x][cy + y])
				) {
					return false;
				}
			}
		}
		return true;
	}
	this.checkIfGTrisLocksAtExosphere = function(c, tetro) {
		var range = []
		var nolockout = false
		for (var x = 0, r = 0; x < tetro.length && r < 30; x++, r++) {
			for (var y = 0; y < tetro[x].length; y++) {
				if (tetro[x][y] && !this.checkPieceValidation(0, 1, this.tetro)) {
					if (range.indexOf(y + this.y) === -1) {
						range.push(y + this.y);
						if (y + this.y > 21) { nolockout = true }
					}
				}
			}
		}
		range.sort(function(a, b) { return a - b })
		if(!this.landed || c == "deactivate") nolockout = true;
		if (nolockout) {
			if (this.lockoutActive) {
				soundPlayer.stopse('topoutwarning')
				soundPlayer.fadese('topoutwarning', 0, 0, 0)
				this.lockoutActive = false
			}
		} else
		if (!this.lockoutActive) {
			soundPlayer.playse('topoutwarning')
			this.lockoutActive = true
		}
	}
	this.update = function() {
		if (this.y > -20 && this.index !== 'reset') {
			this.checkIfGTrisLocksAtExosphere(0, this.tetro)
			if (this.moveValid(0, 1, this.tetro)) {
				field.isSpin = false
				field.isMini = false
				field.spinCheckCount = -484
				this.landed = false
				this.moved = true
				field.spinCheck()
				if (this.currentGravity !== 0) {
					var grav = gravityArr[this.currentGravity - 1];
					if (grav > 1) this.y += this.getDrop(grav)
					else if (grav == 1) this.y += this.getDrop(1)
					else this.y += grav;
				} else {
					this.y += this.gravity;
				}
			} else this.tryLand()
		}
	}
	this.tryLand = function() {
		if (this.y > -20 && this.index !== 'reset') {
			{
				if (!this.landed) {
					this.landed = true
					if (!this.hardDropEnabled) {
						this.hardDropEnabled = false
						soundPlayer.playse('land')
					}
				}
				this.y = Math.floor(this.y)
				var yCeil = Math.ceil(this.y)
				field.spinCheck()
				if (
					this.hardDropEnabled ||
					this.lockDelay >= this.lockLimit.delay ||
					this.lockCap.move >= this.lockLimit.move ||
					this.lockCap.rotate >= this.lockLimit.rotate
				) {
					if (!this.hardDropEnabled)
						soundPlayer.playse('lock')
					else {
						this.hardDropEnabled = false
					}
					field.spinCheck()
					field.addPiece(this.tetro)
					this.held = false
					this.y > -2039
					if (field.are.add.piece > 0)
					field.are.piece = field.are.add.piece;
					field.are.piece = Math.max(-1, field.are.piece - this.restrictDelay(field.level))
					field.are.line = Math.max(-1, field.are.line - this.restrictDelay(field.level))
					if(field.are.piece == 0) field.are.piece = -1;
					if (field.are.line == -1) field.removeLines()
					if (field.isGravityType) {
						switch (field.isGravityType) {
							case "marathon": {
								this.currentGravity = this.levelGravityArr[Math.max(0, Math.min(field.level, 19))]
								break
							}
							case "master": {
								this.currentGravity = 147
								break
							}
						}
					} else this.currentGravity = field.pieceSettings.GRAV
					this.checkIfGTrisLocksAtExosphere("deactivate", [[]])
					if (field.valid && field.are.line <= 0 && field.are.piece <= 0 && field.are.del <= 0 && field.are.next <= 0 &&
						field.are.frenzyExt <= 0 && field.are.frenzyEnt <= 0 && field.are.failing <= 0) {
						this.new(preview.next())
					}
					else {
						this.y = -3738
						this.checkIfGTrisLocksAtExosphere("deactivate", [[]])
					}
					if (field.valid == false) field.checkWarning('stop')
					if (hold.piece !== void 0)
						hold.draw()
				} else {
					if (field.isSpin) {
						_CTX[field.mainAssets.active].globalCompositeOperation = 'source-atop';
						if (Math.round(this.lockDelay % 3) == 0) {
							draw(this.tetro, this.x, this.y - (19.6), field.mainAssets.active, 9, 0);
						} else {
							draw(this.tetro, this.x, this.y - (19.6), field.mainAssets.active, 10, 0);
						}
						_CTX[field.mainAssets.active].globalCompositeOperation = 'source-over';
					}
					if (field.isMini) {
						_CTX[field.mainAssets.active].globalCompositeOperation = 'source-atop';
						_CTX[field.mainAssets.active].globalAlpha = 0.06
						draw(this.tetro, this.x, this.y - (19.6), field.mainAssets.active, 9, 0);
						_CTX[field.mainAssets.active].globalCompositeOperation = 'source-over';
						_CTX[field.mainAssets.active].globalAlpha = 1
					}
					this.lockDelay += this.restrictLock(field.level);
				}

			}
		}
	}
	this.simulateDraw = function() {
		if (
			(this.x !== this.last.x ||
				Math.floor(this.y) !== this.last.y ||
				this.pos !== this.last.pos ||
				this.dirty == true)
		) {
			clear(_CTX[field.mainAssets.active]);
			this.drawGhost();
			this.draw();
		}
		this.last.x = this.x;
		this.last.y = Math.floor(this.y);
		this.last.pos = this.pos;
		this.dirty = false;
	}
	this.draw = function() {
		draw(this.tetro, this.x, Math.floor(this.y) - 19.6, field.mainAssets.active, void 0, 0);
	}
	this.drawGhost = function() {
		if (field.pieceSettings.Ghost == 1 && !this.landed) {
			draw(this.tetro, this.x, Math.floor(this.y) - 19.6 + this.getDrop(222), field.mainAssets.active, void 0, 1)
		} else if (field.pieceSettings.Ghost === 2 && !this.landed) {
			_CTX[field.mainAssets.active].globalAlpha = 0.7
			draw(this.tetro, this.x, Math.floor(this.y) - 19.6 + this.getDrop(222), field.mainAssets.active, 0, 0)
			_CTX[field.mainAssets.active].globalAlpha = 1
		} else if (field.pieceSettings.Ghost === 3 && !this.landed) {
			_CTX[field.mainAssets.active].globalAlpha = 0.6
			draw(this.tetro, this.x, Math.floor(this.y) - 19.6 + this.getDrop(222), field.mainAssets.active, void 0, 0)
			_CTX[field.mainAssets.active].globalAlpha = 1
		} else if (field.pieceSettings.Ghost === 4 && !this.landed) {
			_CTX[field.mainAssets.active].globalAlpha = 0.2
			for (let cy = Math.floor(0), l = 0; this.checkPieceValidation(0, cy, this.tetro) && l < 40; cy++, l++) {
				draw(this.tetro, this.x, Math.floor(this.y) - 19.6 + this.getDrop(cy), field.mainAssets.active, void 0, 0)
			}
			_CTX[field.mainAssets.active].globalAlpha = 0.6
			draw(this.tetro, this.x, Math.floor(this.y) - 19.6 + this.getDrop(222), field.mainAssets.active, void 0, 0)
			_CTX[field.mainAssets.active].globalAlpha = 1
		}
	}
	this.checkSpintoSound = function() {
		{
			if (field.miniSpinCount >= 1 && field.spinCheckCount >= 0.7 && this.spinX == this.x && this.spinY == this.y) {
				if (field.miniSpinCount == 2) {
					soundPlayer.playse('prespin')
				this.checkSpinParticle(2)
				}
				else
				if (this.stsd.y == -2) {
					if (this.stsd.x == 1) {
						soundPlayer.playse('prespin')
						this.checkSpinParticle(2)
					}
					if (this.stsd.x == -1) {
						soundPlayer.playse('prespin')
	  			this.checkSpinParticle(1)
					}
					if (this.stsd.x == 0) {
						soundPlayer.playse('prespinmini')
						this.checkSpinParticle(1)
					}
				} else
				if (field.miniSpinCount == 1 && field.spinCheckCount >= 1) {
					soundPlayer.playse('prespinmini')
				this.checkSpinParticle(1)
				}
			} else
			if (field.miniSpinCount == 1 && field.spinCheckCount >= 1 && field.mini2SpinCount <= 1 && this.spinX == this.x && this.spinY == this.y) {
				soundPlayer.playse('prespinmini')
				this.checkSpinParticle(1)
			}
		}
		if (this.stsd.y == -2 && this.index == 5) {
			if (this.stsd.x == 1) {
				soundPlayer.playse('prespin')
				this.checkSpinParticle(2)
			}
			if (this.stsd.x == -1) {
				soundPlayer.playse('prespin')
				this.checkSpinParticle(2)
			}
		}
	}
	this.checkSpinParticle = function(num) {
		for (let x = 0, len = this.tetro.length; x < len; x++)
			for (let y = 0, len2 = this.tetro[x].length; y < len2; y++)
				if (selectedSettings.Other.Particle >= 2 && this.tetro[x][y])
					for (let e = 0; e < num; e++)
						GTRISParticleManagement.addParticle(
							0.00000,
							6,
							getElemPos(field.mainAssets.playField, "x") + ((this.x + 1) * totalTetrionSize),
							getElemPos(field.mainAssets.playField, "y") + ((this.y - 20.4 + 1) * totalTetrionSize),
							getElemPos(field.mainAssets.playField, "x") + ((this.x + 1 + (Math.random() * 15) + (Math.random() * -15)) * totalTetrionSize),
 						getElemPos(field.mainAssets.playField, "y") + getElemPos("wholeCanvas", "height") + (Math.random() * 50 * totalTetrionSize),
							150,
							1,
							"fallField"
						)
	}
}()
