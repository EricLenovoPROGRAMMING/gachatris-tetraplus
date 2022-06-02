var gravityUnit = 1 / 512
var gravityArr = (function() {
  var array = []
  array.push(0);
  for (var i = 1; i < 128; i++) array.push(i / 128);
  for (var i = 1; i <= 20; i++) array.push(i);
  return array;
})()


const piece = new class {
  constructor() {
    this.x;
    this.y;
    this.pos = 0;
    this.tetro;
    this.index;
    this.kickData;
    this.lockDelay = 0;
    this.gravity = gravityUnit * 4
    this.shiftDelay = 0;
    this.shiftDir;
    this.shiftReleased;
    this.arrDelay = 0;
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
      rotate: 15
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
    this.rng = new function() {
      this.seed = 1;
      this.next = function() {
        return this.gen() / 2147483647;
      };
      this.gen = function() {
        return (this.seed = (this.seed * 16807) % 2147483647);
      };
    }()
  }
  reset() {
    this.initial.hold = 0
    this.initial.rot = 0
    soundPlayer.fadese('topoutwarning', 0, 0, 0)
    $iH('TEXT_next', gtris_transText('next'))
    $iH('TEXT_hold', gtris_transText('hold'))
    this.x = 'reset'
    this.y = -1000
    this.index = 'reset'
    this.tetro = [[]]
    this.shiftReleased = true
    this.shiftDir = 0
    this.openHold(true)
  }
  openHold(bool) {
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
  new(ind) {
    if (this.injectPiece(ind)) {
      if (this.initial.hold > 0) {
        while (this.initial.hold > 0 && this.canHold) {
          var temp = hold.piece;
          if (!this.held) {
            if (hold.piece !== void 0) {
              hold.piece = this.index;
              soundPlayer.playse('hold')
              this.injectPiece(temp)
            } else {
              hold.piece = this.index;
              soundPlayer.playse('firsthold')
              this.injectPiece(preview.next());
            }
            this.held = true;
            hold.draw();
            this.initial.hold--
          }
          this.initial.hold = 0
        }
        soundPlayer.playse('ihs')
        $iH('TEXT_hold', gtris_transText('hold'))
      }
      if (this.initial.rot !== 0) {
        soundPlayer.playse('irs')
        $iH('TEXT_next', gtris_transText('next'))
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
    }
  }
  injectPiece(index) {
    this.pos = 0;
    this.tetro = [];
    this.held = false;
    this.finesse = 0;
    this.dirty = true;
    this.landed = false;
    this.tetro = pieces[index].tetro;
    this.kickData = pieces[index].kickData;
    this.x = pieces[index].x;
    this.y = 0;
    this.index = index;
    this.lockCap = {
      move: 0,
      rotate: 0
    }

    this.checkIfGTrisLocksAtExosphere(0, this.tetro)
    this.moved = false
    this.rotateFail = false
    if (!this.moveValid(0, this.index !== 0 ? 20 : 19, this.tetro)) {
      if (field.isTSDOnly == true) {
        if (field.statistics.tsd >= 20)
          endGame({ name: 'tsd_reached', array: this.statistics.tsd }, 'win', 'win')
        else
          endGame('blockout', true, 'lose')
      } else
        endGame('blockout', true, 'lose')
      soundPlayer.playse('ko')
      this.y = -3737
      this.index = 'reset'
      this.tetro = [[]]
      return false
    } else {
      this.y = this.index !== 0 ? 20 : 19

      if (this.checkPieceValidation(0, 1, this.tetro))
        this.y += this.getDrop(1)
      if (hold.piece !== void 0) {
        hold.draw()
      }
    }
    return true
  }
  rotate(direction) {
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
        case 1:
          dir = 'left'
          break;
        case -1:
          dir = 'right'
          break;
      }
      var curPos = this.pos.mod(4);
      var newPos = (this.pos + direction).mod(4);

      for (var x = 0, len = this.kickData[dir][0].length; x < len; x++) {
        if (
          this.moveValid(
            this.kickData[dir][curPos][x][0] - this.kickData[dir][newPos][x][0],
            this.kickData[dir][curPos][x][1] - this.kickData[dir][newPos][x][1],
            rotated,
          )
        ) {
          this.x += this.kickData[dir][curPos][x][0] - this.kickData[dir][newPos][x][0];
          this.y += this.kickData[dir][curPos][x][1] - this.kickData[dir][newPos][x][1];
          this.stsd.x = this.kickData[dir][newPos][x][0]
          this.stsd.y = this.kickData[dir][newPos][x][1]
          this.tetro = rotated;
          this.pos = newPos;
          this.moved = false
          this.rotateFail = false
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
        $iH('TEXT_next', gtris_transText('next'))
      } else if (this.initial.rot == 2 || this.initial.rot == -2) {
        $iH('TEXT_next', `180`)
      } else {
        switch (this.initial.rot) {
          case 1: {
            $iH('TEXT_next', `CW x1`)
            break
          }
          case 3: {
            $iH('TEXT_next', `CW x3`)
            break
          }
          case -1: {
            $iH('TEXT_next', `CCW x1`)
            break
          }
          case -3: {
            $iH('TEXT_next', `CCW x3`)
            break
          }
        }
      }
    }
  }
  rotate180() {
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
      for (var x = 0, len = this.kickData['double'][0].length; x < len; x++) {
        if (
          this.moveValid(
            this.kickData['double'][curPos][x][0] - this.kickData['double'][newPos][x][0],
            this.kickData['double'][curPos][x][1] - this.kickData['double'][newPos][x][1],
            rotated,
          )
        ) {
          this.x += this.kickData['double'][curPos][x][0] - this.kickData['double'][newPos][x][0];
          this.y += this.kickData['double'][curPos][x][1] - this.kickData['double'][newPos][x][1];
          this.stsd.x = this.kickData['double'][newPos][x][0]
          this.stsd.y = this.kickData['double'][newPos][x][1]
          this.tetro = rotated;
          this.pos = newPos;
          this.moved = false
          this.rotateFail = false
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
          $iH('TEXT_next', gtris_transText('next'))
        } else if (this.initial.rot == 2 || this.initial.rot == -2) {
          $iH('TEXT_next', `180`)
        } else {
          switch (this.initial.rot) {
            case 1: {
              $iH('TEXT_next', `CW x1`)
              break
            }
            case 3: {
              $iH('TEXT_next', `CW x3`)
              break
            }
            case -1: {
              $iH('TEXT_next', `CCW x1`)
              break
            }
            case -3: {
              $iH('TEXT_next', `CCW x3`)
              break
            }
          }
        }
      }
    }
  }
  DASPreloadAndCheckShift(keysDown, lastKeys) {
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
      } else if (this.shiftDelay < pieceSettings.DAS) {
        this.shiftDelay++;
      } else if (this.shiftDelay === pieceSettings.DAS && pieceSettings.DAS !== 0) {
        this.shift(this.shiftDir);
        if (pieceSettings.ARR !== 0) this.shiftDelay++;
      } else if (this.arrDelay < pieceSettings.ARR) {
        this.arrDelay++;
      } else if (this.arrDelay === pieceSettings.ARR && pieceSettings.ARR !== 0) {
        this.shift(this.shiftDir);
      }
    }
  }
  shift(direction) {
    this.arrDelay = 0;
    if (this.y > -20 && this.index !== 'reset') {
      if (pieceSettings.ARR === 0 && this.shiftDelay === pieceSettings.DAS) {
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
  shiftDown() {
    if (this.y > -20 && this.index !== 'reset') {
      if (this.moveValid(0, 1, this.tetro)) {
        field.spinCheckCount = -869
        field.spinCheck()
        var grav = gravityArr[pieceSettings.SFT + 1];
        if (grav > 1) {
          field.score += this.getDrop(grav)
          soundPlayer.playse('softdrop')
          this.y += this.getDrop(grav);
        }
        else if (grav == 1) {
          this.y += this.getDrop(1)
          soundPlayer.playse('softdrop')
          field.score++
        } else {
          if (this.y >= Math.round(this.y) - grav && this.y <= Math.round(this.y)) {
            field.score++
            soundPlayer.playse('softdrop')
          }
          this.y += grav;
        }
      }
    }
  }
  hardDrop() {
    if (this.y > -20 && this.index !== 'reset') {
      for (var i = 1; this.checkPieceValidation(0, i, this.tetro); i++)
        field.score += 2
      this.y += this.getDrop(89)
      soundPlayer.playse('harddrop')
      this.hardDropEnabled = true
      this.lockDelay = 929 * pieceSettings.LCK;
    }
  }
  getDrop(distance) {
    for (var i = 1; i <= distance; i++) {
      if (!this.checkPieceValidation(0, i, this.tetro)) return i - 1;
    }
    return i - 1;
  }
  hold() {
    if (this.canHold) {
      if (this.y > -44 && this.index !== 'reset') {
        var temp = hold.piece;
        if (!this.held) {
          if (hold.piece !== void 0) {
            hold.piece = this.index;
            soundPlayer.playse('hold')
            this.injectPiece(temp)
          } else {
            hold.piece = this.index;
            soundPlayer.playse('firsthold')
            this.injectPiece(preview.next());
          }
          this.held = true;
          hold.draw();
        }
      } else if (this.y < -10) {
        if (this.initial.hold == 0) {
          this.initial.hold = 1
          $iH('TEXT_hold', `INITIAL`)
        }
        else if (this.initial.hold == 1) {
          this.initial.hold = 0
          $iH('TEXT_hold', gtris_transText('hold'))
        }
      }
    }
  }
  moveValid(cx, cy, tetro) {
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
  checkPieceValidation(cx, cy, tetro) {
    cx = cx + this.x;
    cy = Math.floor(cy + this.y);
    for (var x = 0, e = 0; x < tetro.length && e < 30; x++, e++) {
      for (var y = 0, d = 0; y < tetro[x].length && d < 30; y++, d++) {
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
  checkIfGTrisLocksAtExosphere(cy, tetro) {
      cy = Math.floor(cy + this.y);
      var range = []
      var lockout = false
      for (var x = 0, r = 0; x < tetro.length && r < 30; x++, r++) {
        for (var y = 0; y < tetro[x].length; y++) {
          if (tetro[x][y] &&  !this.checkPieceValidation(0, 1, this.tetro)){
            if (range.indexOf(y + this.y) === -1) {
              range.push(y + this.y);
              if (y + this.y < 21) {lockout = true}
            }
          }
        }
      }
      if (!lockout) {
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
  update() {
    if (this.y > -20 && this.index !== 'reset') {

      if (this.moveValid(0, 1, this.tetro)) {
        field.isSpin = false;
        field.isMini = false;
        field.spinCheckCount = -484
        this.landed = false;
        this.moved = true
        field.spinCheck()
        if (pieceSettings.GRAV) {
          var grav = gravityArr[pieceSettings.GRAV - 1];
          if (grav > 1) this.y += this.getDrop(grav);
          else this.y += grav;
        } else {
          this.y += this.gravity;
        }
      } else {
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
          this.lockDelay >= pieceSettings.LCK ||
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
          this.y > -2039
          if (field.are.add.piece > 0)
            field.are.piece = field.are.add.piece
          this.checkIfGTrisLocksAtExosphere(0, this.tetro)
          if (field.valid && field.are.line <= 0 && field.are.piece <= 0) {
            this.new(preview.next())
          }
          else {
            this.y = -3738
            this.checkIfGTrisLocksAtExosphere(0,[[]])
            return
          }
          if (hold.piece !== void 0)
            hold.draw()
        } else {
          if (field.isSpin) {
            _CTX.active.globalCompositeOperation = 'source-atop';
            if (Math.round(this.lockDelay % 5) == 0) {
              draw(this.tetro, this.x, this.y - (19.6), 'active', 9, 0);
            } else {
              draw(this.tetro, this.x, this.y - (19.6), 'active', 10, 0);
            }
            _CTX.active.globalCompositeOperation = 'source-over';
          }
          if (field.isMini) {
            _CTX.active.globalCompositeOperation = 'source-atop';
            _CTX.active.globalAlpha = 0.06
            draw(this.tetro, this.x, this.y - (19.6), 'active', 10, 0);
            _CTX.active.globalCompositeOperation = 'source-over';
            _CTX.active.globalAlpha = 1
          }
          this.lockDelay++;
        }

      }
    }
    if (
      (this.x !== this.last.x ||
      Math.floor(this.y) !== this.last.y ||
      this.pos !== this.last.pos ||
      this.dirty) &&
      this.y>-10
    ) {
      clear(_CTX.active);
      this.drawGhost();
      this.draw();
      this.checkIfGTrisLocksAtExosphere(0, this.tetro)
    } else if(this.y<-9){
      clear(_CTX.active);
    }
    this.last.x = this.x;
    this.last.y = Math.floor(this.y);
    this.last.pos = this.pos;
    this.dirty = false;
  }
  draw() {
    draw(this.tetro, this.x, Math.floor(this.y) - 19.6, 'active', void 0, 0);
  }
  drawGhost() {
    if (pieceSettings.Ghost == 1 && !this.landed) {
      draw(this.tetro, this.x, Math.floor(this.y) - 19.6 + this.getDrop(222), 'active', void 0, 1)
    } else if (pieceSettings.Ghost === 2 && !this.landed) {
      _CTX.active.globalAlpha = 0.7
      draw(this.tetro, this.x, Math.floor(this.y) - 19.6 + this.getDrop(222), 'active', 0, 0)
      _CTX.active.globalAlpha = 1
    } else if (pieceSettings.Ghost === 3 && !this.landed) {
      _CTX.active.globalAlpha = 0.6
      draw(this.tetro, this.x, Math.floor(this.y) - 19.6 + this.getDrop(222), 'active', void 0, 0)
      _CTX.active.globalAlpha = 1
    } else if (pieceSettings.Ghost === 4 && !this.landed) {
      _CTX.active.globalAlpha = 0.2
      for (let cy = Math.floor(0), l = 0; this.checkPieceValidation(0, cy, this.tetro) && l < 40; cy++, l++) {
        draw(this.tetro, this.x, Math.floor(this.y) - 19.6 + this.getDrop(cy), 'active', void 0, 0)
      }
      _CTX.active.globalAlpha = 0.6
      draw(this.tetro, this.x, Math.floor(this.y) - 19.6 + this.getDrop(222), 'active', void 0, 0)
      _CTX.active.globalAlpha = 1
    }
  }
  checkSpintoSound() {
    {
      if (field.miniSpinCount >= 1 && field.spinCheckCount >= 0.7 && this.spinX == this.x && this.spinY == this.y) {
        if (field.miniSpinCount == 2) {
          soundPlayer.playse('prespin')
        }
        else
        if (this.stsd.y == -2) {
          if (this.stsd.x == 1) {
            soundPlayer.playse('prespin')
          }
          if (this.stsd.x == -1) {
            soundPlayer.playse('prespin')
          }
        } else
        if (field.miniSpinCount == 1 && field.spinCheckCount >= 1) {
          soundPlayer.playse('prespinmini')
        }
      } else
      if (field.miniSpinCount == 1 && field.spinCheckCount >= 1 && field.mini2SpinCount <= 1 && this.spinX == this.x && this.spinY == this.y) {
        soundPlayer.playse('prespinmini')
      }
    } 
    if (this.stsd.y == -2) {
      if (this.stsd.x == 1) {
        soundPlayer.playse('prespin')
      }
      if (this.stsd.x == -1) {
        soundPlayer.playse('prespin')
      }
    }
  }
}()
