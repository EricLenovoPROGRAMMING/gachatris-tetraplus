function Field(NEW) {
  this.valid = false
  this.renInteger = 0;
  this.neutralline = 0
  this.garbageArray = []
  this.voicegarbage = false
  this.voicestrength = 0;
  this.varpiecedelayadd = 100
  this.varpiecedelay = 0
  this.clearRows = []
  this.b2b = 0;
  this.linevoice = 0;
  this.isSpin = false;
  this.isMini = false;
  this.spinCheckCount = 0
  this.miniSpinCount = 0
  this.mini2SpinCount = 0
  this.mini3SpinCount = 0
  this.mini3REVSpinCount = 0
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
  this.renstrengthinit = 0
  this.countervoice = false
  this.varseqvoice
  this.garbvoice = 0
  this.linesend = 0
  this.renenable = false;
  this.warning = false
  this.pieces = 0
  this.lineTotal = 0
  this.lineLeft = 0
  this.score = 0
  this.level = 1
  this.canCheckGarbageBar = false
  this.are = {
    add: {
      piece: 0,
      line: 0,
    },
    piece: 0,
    line: 0,
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
      spell1: '',
      spell2: '',
      spell3: '',
      spell4: '',
      spell5: '',
      gtris: '',
      gtrisplus: '',
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
      lose: ''
    },
    load: {
      normal: '',
      danger: '',
    },
    loadAnim: {
      win: '',
      lose: ''
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
    tsd:0,
    maxREN: 0,
  }
  this.totalStrength = -1
  this.initStrength = -1
  this.isVoice = {
    pc: false,
    line: -1
  }
  this.isTSDOnly = false
  this.isC4W = false
}

Field.prototype = {
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
      for (var e of pc) {
        e.style.animationName = 'none'
      }
      requestAnimationFrame(() => {
        pc[0].style.animationName = 'PCAnim1'
        pc[1].style.animationName = 'PCAnim2'
      })
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
        field.gtrisenable = false
      })
      this.character.voices.gtrisplus.once('loaderror', () => {
        field.gtrisenableplus = false
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
  },
  makeArrayLength: function(int) {
    var i = []
    i.length = int
    for (var e = 0; e < int - 1; e++)
      i[e] = 0
    return i
  },

  modifyGrid: function(cy, gridArr, isFlipped) {
    if (!isFlipped) {
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < gridArr[x].length; y++)
          this.grid[x][y + cy] = gridArr[x][y]
      }
    } else {
      for (let x = this.width; x >= 0; x--) {
        for (let y = 0; y < gridArr[x].length; y++)
          this.grid[x][y + cy] = gridArr[x][y]
      }
    }
    this.draw()
  },

  new: function(x, y) {
    var cells = this.makeArrayLength(x)
    for (var i = 0; i < x; i++) {
      cells[i] = this.makeArrayLength(y)
    }
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
    this.checkWarning('stop')
    this.showResultAnimation('hide')
    this.are.line = -99
    this.are.piece = -99
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
    }
    docId('characterBackground').src = this.character.fields.normal
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
            for (var cx = 0; cx < 10; cx++) {
              this.grid[cx][20] = Math.max(1, Math.floor(Math.random() * 9))
            }
            for (var cx = 3; cx < 7; cx++) {
              this.grid[cx][20] = 0
            }
          }
        }
      }
    }
    this.clearRows = []
    if (doesBlockExist)
      soundPlayer.playse('collapse')
    this.checkWarning()
    this.speakTest(this.totalStrength, this.initStrength, this.isVoice.pc, this.isVoice.line)
    this.draw()
  },
  rng: new function() {
    this.seed = 1;
    this.next = function() {
      return this.gen() / 2147483647;
    };
    this.gen = function() {
      return (this.seed = (this.seed * 16807) % 2147483647);
    };
  }(),
  addGarbageToField: function(limit) {
    var _limit = 9
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
    for (var e = 0; e < _count; e++)
      this.garbageArray.shift()
    this.checkGarbageBar()
  },
  checkGarbageBar: function() {
    if (this.canCheckGarbageBar)
      meterBar.garbage.style.marginTop = `${Math.max(0,(cellSize*20.4)-(cellSize * this.garbageArray.length))}px`
    this.checkWarning()
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
  addPiece: function(tetro) {
    this.enablespin = this.spinrecog
    this.enablemini = this.spinrecogmini
    this.linespinrecog = false
    var once = false;
    var linesDetection = 0
    var perfectClear = true
    var range = [];
    this.valid = false;
    for (var x = 0, xa = 0; x < tetro.length && xa < 31; x++, xa++) {
      for (var y = 0, ya = 0; y < tetro[x].length && ya < 31; y++, ya++) {
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
        if (this.statistics.tsd >= 20)
          endGame({ name: 'tsd_reached', name2: 'tsd_reached_result', array: this.statistics.tsd}, 'win', 'win')
        else
          endGame('lockout', true, 'lose')
      } else
        endGame('lockout', true, 'lose')
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
        this.lineLeft--
        if (this.are.add.line > 0) {
          this.are.line = this.are.add.line
          this.clearRows.push(row)
          for (var y = row; y >= row; y--) {
            for (var x = 0; x < 10; x++) {
              this.grid[x][y] = 0
            }
          }
        } else {
          for (var y = row; y >= -1; y--) {
            for (var x = 0; x < 10; x++) {
              this.grid[x][y] = this.grid[x][y - 1]
              if (this.isC4W) {
                for (var cx = 0; cx < 10; cx++) {
                  this.grid[cx][20] = Math.max(1, Math.floor(Math.random() * 9))
                }
                for (var cx = 3; cx < 7; cx++) {
                  this.grid[cx][20] = 0
                }
              }
            }
          }
        }
      }
    }
    this.pieces++
    //---
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
    }
    //---
    for (var x = 0; x < this.width; x++) {
      for (var y = 0; y < this.height; y++) {
        if (this.grid[x][y] !== 0 && this.testSpace(x, y)) {
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
        soundPlayer.playse(`ren${Math.min(20,this.renInteger)}`)
      }
      this.clearLines(linesDetection, this.linespinrecog, this.minispinrecog, this.b2b, perfectClear)
      this.speak(linesDetection, this.linespinrecog, this.renInteger, this.b2b, perfectClear)
      if (this.renInteger > this.statistics.maxREN) {
        this.statistics.maxREN = this.renInteger
      }
      if (this.isTSDOnly == true) {
        if (!((this.linespinrecog == true || this.minispinrecog) && linesDetection == 2)) {
          if (this.statistics.tsd >= 20)
            endGame({ name: 'tsd_reached', name2: 'tsd_reached_result', array: this.statistics.tsd }, 'win', 'win')
          else
            endGame('tsd_failed', true, 'lose')
        } else this.statistics.tsd++
      }
    }
    this.draw();
    this.linespinrecog = false
    this.minispinrecog = false
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
    } else {
      docId('regular').innerHTML = text
      components.animate({ opacity: 1, letterSpacing: `${cellSize * 0.03}px` }, 0, 'linear')
      components.animate({ opacity: 1, letterSpacing: `${cellSize * 0.13}px` }, 1800, 'linear')
      components.animate({ opacity: 0, letterSpacing: `${cellSize * 0.13}px` }, 200, 'linear')
    }
  },
  showClearTextTSPIN: function(compo, text, nent) {
    let components = $('#tSpin')
    components.stop()
    if (compo == 'hide') {
      components.animate({ opacity: 0, letterSpacing: `${cellSize * 0.03}px` }, 0, 'linear')
    } else {
      docId('tSpin').innerHTML = text
      components.animate({ opacity: 1, letterSpacing: `${cellSize * 0.05}px` }, 0, 'linear')
      components.animate({ opacity: 1, letterSpacing: `${cellSize * 0.16}px` }, 1800, 'linear')
      components.animate({ opacity: 0, letterSpacing: `${cellSize * 0.17}px` }, 200, 'linear')
    }
  },
  showClearTextB2B: function(compo, text) {
    let components = docId('B2B')
    if (compo == 'hide') {
      components.style.opacity = '0%'
      components.style.letterSpacing = '0.5px'
      components.style.transition = "letter-spacing 200ms ease-out"
      components.style.transition = "opacity 200ms linear"
    } else {
      components.style.opacity = '100%'
      components.innerHTML = text
      components.style.transition = 'opacity 100ms linear'
      components.style.transition = 'letter-spacing 0s linear'
      components.style.letterSpacing = '0.5px'
      components.style.opacity = '100%'
      setTimeout(function() {
        components.style.letterSpacing = `${cellSize*0.2}px`
        components.style.transition = "letter-spacing 2s ease-out"
      }, 2)
    }
  },
  showClearTextREN: function(showhide, text) {
    let components = docId('REN')
    if (text !== void 0)
      components.innerHTML = text
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
        if (this.testSpace(i, y)){
          checked = true 
          break
        }
      }
    }
    if (checked && stop !== 'stop' && !this.isC4W) {
      if (!this.warning) {
        soundPlayer.stopse('alarm')
        soundPlayer.playse('alarm')
        docId('holdTextPlaceholder').style.backgroundColor = "#f00"
        docId('nextTextPlaceholder').style.backgroundColor = "#f00"
        docId('playField').style.borderColor = "#f00"
        docId('meterBars').style.borderColor = "#f00"
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
        docId('meterBars').style.borderColor = "#fff"
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
    _CTX.field.globalCompositeOperation = 'source-atop';
    _CTX.field.fillStyle = 'rgba(0,0,0,0.05)';
    _CTX.field.fillRect(0, 0, _canvasses.field.width, _canvasses.field.height);
    _CTX.field.globalCompositeOperation = 'source-over';
  }
}

var field = new Field()
