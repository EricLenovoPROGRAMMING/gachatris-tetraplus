/**(C) EricLenovo 2022
 * Gachatris: Tetraplus (JS)
 * May 5, 2022 @10:46AM Philippine Time
 * GPL 3.0 license
 */
"use strict";
var gtris_version = '0.0.076 Alpha';
var syncTime = 0;
var StartTime = 0
var syncFrame = 0;
var actualFrame = 0;
var cellSize = 0
var isReplay = false
var replayData = {}
var isPaused = false
var isKeySelectorOn = false
var keyMappingSelected = null
var keysPressed = 0,
  keysLast = 0
var gameRunning, gameMode, gameRunner

var meterBar = {
  capacity: docId('meterBars'),
  garbage: docId('meter_A')
}

var gtrisBody = docId('gtris-body')

var _canvasses = {
  hold: docId('holdCanvas'),
  field: docId('fieldCanvas'),
  sprite: docId('spriteCanvas'),
  next: docId('nextCanvas'),
  queue: docId('queueCanvas'),
  grid: docId('gridCanvas'),
  active: docId('activeCanvas'),
}
var _CTX = {
  hold: _canvasses.hold.getContext('2d'),
  field: _canvasses.field.getContext('2d'),
  sprite: _canvasses.sprite.getContext('2d'),
  next: _canvasses.next.getContext('2d'),
  queue: _canvasses.queue.getContext('2d'),
  grid: _canvasses.grid.getContext('2d'),
  active: _canvasses.active.getContext('2d'),
}

function RESIZE() {
  try {
    var varSize = 0 || selectedSettings.Other.Resize
    var leftBorder = docId('leftborder')
    var rightBorder = docId('rightborder')
    var leftBorderChildren = docId('leftborder').children
    var rightBorderChildren = docId('rightborder').children
    var statistics = docId('statistics')
    var holdPlaceholder = docId('holdTextPlaceholder')
    var nextPlaceholder = docId('nextTextPlaceholder')
    var playField = docId('playField')
    var [content, contentLayer, resultText, resultImg] = [$tag('tetrionPadding'), docId('tetrionLayer'), $tag('gtris-result'), docId('showResultCharImg')]
    var clearText = docId('clearTexts')
    var holdDiv = docId('holdDiv')
    var header1 = $tag('h1')
    var customSprite = docId('customSprite')
    var gTrisButtons = $tag('gtris-button')
    var menuHeader = docId('menuHeader')
    var logoHeader = {
      body: docId('el-logoDiv'),
      logo: docId('logoEL'),
      title: docId('headerTitle'),
      back: docId('headerBackButton')
    }
    var listCellDetails = $tag('gtris-listCell-Details')
    var listCellDetails2 = $tag('gtris-listCell-Details2')
    var characterImage = docId('characterImage')
    var logoSplash = docId('splashLogoDiv')
    var gtrisBig = $tag('gtris_big')

    var screenHeight = window.innerHeight - 34;
    var screenWidth = ~~(screenHeight * 2);
    if (screenWidth > window.innerWidth) {
      screenHeight = ~~(window.innerWidth / 1.024);
    }

    docId("menus").scrollTop = 0
    docId("menus").scrollTo(0,0)

    if (varSize === 1 && screenHeight > 302) cellSize = 12;
    else if (varSize === 2 && screenHeight > 502) cellSize = 17;
    else if (varSize === 3 && screenHeight > 702) cellSize = 27;
    else if (varSize === 4 && screenHeight > 902) cellSize = 39;
    else cellSize = Math.max(~~(screenHeight / 30), 7);

    var padNum = (window.innerHeight - (cellSize * 20 + 2)) / 2.3;
    var padNum2 = (window.innerHeight - (cellSize * 20 + 20)) / 1.5
    var padNum3 = (window.innerHeight - (cellSize * 20)) / 15
    var padNum4 = (window.innerHeight - (cellSize * 20 + 2)) / 2.7;

    var pad = padNum + 'px'



    docId('tetrionPC').style.padding = `${padNum + (cellSize*6)}px 0`

    for (var e of content)
      e.style.padding = `${pad} 0`
    contentLayer.style.padding = `${padNum4}px 0`
    for (var e of resultText)
      e.style.fontSize = `${cellSize*3}px`
    resultImg.style.height = `${cellSize*23}px`
    resultImg.style.width = `${cellSize*23}px`


    logoHeader.body.style.height = logoHeader.body.style.width =
      logoHeader.logo.style.height = logoHeader.logo.style.width =
      menuHeader.style.height = `${cellSize*2.1}px`

    logoHeader.back.style.height = logoHeader.logo.style.width = `${cellSize*2.1}px`

    for (let g of listCellDetails) {
      g.style.height = `${cellSize*4}px`
    }
    for (let g of listCellDetails2) {
      g.style.height = `${cellSize*6}px`
    }
    characterImage.style.height = `${cellSize*4}px`
    docId('character-cells').style.paddingBottom = `${cellSize*10}px`
    for (let g of $tag('gtris-text-large')) {
      g.style.fontSize = `${cellSize*1.8}px`
    }

    for (let g of gTrisButtons) {
      g.style.height = `${cellSize*0.9}px`
      g.style.width = `${cellSize*10.5}px`
      g.style.fontSize = `${cellSize*0.9}px`
    }

    logoHeader.title.style.fontSize = `${cellSize}px`

    logoSplash.style.width = logoSplash.style.height = `${cellSize*16}px`

    leftBorder.style.width = `${cellSize*5}px`
    rightBorder.style.width = `${cellSize*5}px`

    for (let i of leftBorderChildren) {
      i.style.width = leftBorder.style.width
    }
    for (let e of rightBorderChildren) {
      e.style.width = rightBorder.style.width
    }

    holdPlaceholder.style.height = `${cellSize*1}px`
    _canvasses.hold.height = cellSize * 3
    _canvasses.hold.style.height = `${_canvasses.hold.height}px`
    _canvasses.hold.width = cellSize * 5
    _canvasses.hold.style.width = `${_canvasses.hold.width}px`

    nextPlaceholder.style.height = `${cellSize*1}px`
    _canvasses.next.height = cellSize * 3
    _canvasses.next.style.height = `${_canvasses.next.height}px`
    _canvasses.next.width = cellSize * 5
    _canvasses.next.style.width = `${_canvasses.next.width}px`


    _canvasses.queue.height = cellSize * 3 * 10
    _canvasses.queue.style.height = `${_canvasses.queue.height*0.5}px`
    _canvasses.queue.width = cellSize * 6
    _canvasses.queue.style.width = `${_canvasses.queue.width*0.5}px`


    _canvasses.field.height = cellSize * 20.4
    _canvasses.field.style.height = docId('characterBackground').style.height = `${_canvasses.field.height}px`
    _canvasses.field.width = cellSize * 10
    _canvasses.field.style.width = docId('characterBackground').style.width = `${_canvasses.field.width}px`

    _canvasses.active.height = cellSize * 20.4
    _canvasses.active.style.height = `${_canvasses.active.height}px`
    _canvasses.active.width = cellSize * 10
    _canvasses.active.style.width = `${_canvasses.active.width}px`

    _canvasses.grid.height = cellSize * 20.4
    _canvasses.grid.style.height = `${_canvasses.grid.height}px`
    _canvasses.grid.width = cellSize * 10
    _canvasses.grid.style.width = `${_canvasses.grid.width}px`


    playField.style.height = `${_canvasses.field.height}px`
    playField.style.width = `${_canvasses.field.width}px`

    for (var e in meterBar) {
      meterBar[e].style.height = `${playField.style.height}`
      meterBar[e].style.width = `${cellSize*0.6}px`
    }

    clearText.style.height = `${cellSize*3}px`
    //clearText.style.width = `${cellSize * 6}px`
    statistics.style.width = `${_canvasses.field.width}px`
    statistics.style.height = leftBorder.style.height
    statistics.style.top = `${cellSize*9}px`
    statistics.style.left = `${-_canvasses.field.width * 0.5}px`
    for (var large of $tag('statLarge')) {
      large.style.height = `${cellSize*1.4}px`
      large.style.fontSize = `${cellSize*1.4}px`
    }
    for (var large of $tag('statMedium')) {
      large.style.height = `${cellSize*1.1}px`
      large.style.fontSize = `${cellSize*1.1}px`
    }
    for (var large of $tag('stat')) {
    //  large.style.height = `${cellSize*0.7}px`
      large.style.fontSize = `${cellSize*0.7}px`
    }


    _canvasses.sprite.width = cellSize * 11
    _canvasses.sprite.height = cellSize * 2
    customSprite.style.width = customSprite.width = _canvasses.sprite.style.width = `${_canvasses.sprite.width}px`
    customSprite.style.height = customSprite.height = _canvasses.sprite.style.height = `${_canvasses.sprite.height}px`

    holdDiv.style.height = `${cellSize*5}px`

    document.documentElement.style.fontSize = `${cellSize*0.9}px`
    for (var i of header1) {
      i.style.fontSize = `${cellSize*2}px`
    }

    docId('tSpin').style.fontSize = `${cellSize*0.4}px`
    docId('regular').style.fontSize = `${cellSize*0.7}px`
    docId('B2B').style.fontSize = `${cellSize*0.4}px`
    docId('tSpin').style.height = `${cellSize*0.4}px`
    docId('regular').style.height = `${cellSize*0.7}px`
    docId('B2B').style.height = `${cellSize*0.4}px`
    docId('REN').style.height = `${cellSize*1.2}px`
    docId('REN').style.fontSize = `${cellSize*1.2}px`

    makeSprite()
    localizeText()
    setTimeout(() => {
      if (gameRunning) {
        if (hold.piece) hold.draw()
        field.draw()
        preview.draw()
        piece.draw()
        piece.drawGhost()
      }
    }, 100)
    gridLines(_CTX.grid)
  } catch (e) { alert(e) }
}
addEventListener('resize', function() {
  for (var x = 0; x < 4; x++)
    setTimeout(function() {
      RESIZE()
    }, 40 * x)
}, false)
addEventListener('DOMContentLoaded', RESIZE, false)

function gridLines(ctx) {
  clear(ctx)
  ctx.fillStyle = '#000000';
  for (var x = -1; x < ctx.canvas.width + 1; x += cellSize) {
    ctx.fillRect(x, 0, 7 / cellSize, ctx.canvas.height);
  }
  for (var y = -1; y < ctx.canvas.height + 1; y += cellSize) {
    if (y == -1)
      ctx.fillStyle = '#ff0000';
    else ctx.fillStyle = '#000000';
    ctx.fillRect(0, (cellSize * 0.4) + y, ctx.canvas.width, 7 / cellSize);
  }
}

function drawCell(x, y, color, ctx, row) {
  x = x * cellSize;
  x = ~~x;
  y = y * cellSize - 2 * cellSize;
  _CTX[ctx].drawImage(
    _canvasses.sprite,
    color * cellSize,
    row * cellSize,
    cellSize,
    cellSize,
    x,
    y,
    cellSize,
    cellSize,
  );
}

function draw(tetro, cx, cy, ctx, color, row) {
  for (var x = 0, len = tetro.length; x < len; x++) {
    for (var y = 0, wid = tetro[x].length; y < wid; y++) {
      if (tetro[x][y])
        drawCell(x + cx, y + cy, color !== void 0 ? color : tetro[x][y], ctx, row);
    }
  }
}

function makeSprite() {
  var spriteCustom = docId('customSprite')
  spriteCustom.src = 'tetrimino/default.png'
  spriteCustom.onload = () =>
    _CTX.sprite.drawImage(spriteCustom, 0, 0, spriteCustom.width, spriteCustom.height)
}

function clear(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}



var pieceSettings = {
  DAS: 10,
  ARR: 0,
  SFT: 146,
  GRAV: 0,
  LCK: 60,
  PREV: 5,
  Ghost: 0,
}
var defaultBinds = {
  pause: 27,
  LEFT: 37,
  RIGHT: 39,
  SDROP: 40,
  HDROP: 32,
  HOLD: 67,
  CW: 88,
  CCW: 90,
 ['180DEG']: 16,
  retry: 82,
};

var bindsText = {
  pause: 'Pause',
  LEFT: 'Shift Left',
  RIGHT: 'Shift Right',
  SDROP: 'Soft Drop',
  HDROP: 'Hard Drop',
  HOLD: 'Hold',
  CW: 'Rotate Right',
  CCW: 'Rotate Left',
 ['180DEG']: 'Rotate 180',
  retry: 'Retry',
};

var flags = {
  HDROP: 1,
  RIGHT: 2,
  LEFT: 4,
  SDROP: 8,
  HOLD: 16,
  CW: 32,
  CCW: 64,
 ['180DEG']: 128,
};
var settingsRange = {
  Tuning: {
    DAS: range(0, 200),
    ARR: range(0, 150),
    GRAV: (function() {
      let arr = []
      arr.push('Matic')
      arr.push('0G')
      for (let fraction = 1; fraction < 128; fraction++)
        arr.push(`${fraction}/128G`)
      for (let whole = 1; whole <= 20; whole++)
        arr.push(`${whole}G`)
      return arr
    })(),
    SFT: (function() {
      let arr = []
      for (let fraction = 1; fraction < 128; fraction++)
        arr.push(`${fraction}/128G`)
      for (let whole = 1; whole <= 20; whole++)
        arr.push(`${whole}G`)
      return arr
    })(),
    LCK: range(0, 361),
    PREV: range(0, 11),
  },
  Volume: {
    SFX: range(0, 101),
    Music: range(0, 101),
    Character: range(0, 101),
    PieceNext: range(0, 101),
    UI: range(0,101)
  },
}
var settingsList = {
  Sound: {
    SoundBank: ['Default', 'JavaScriptus', 'Tetra Legends', 'TETR.IO'],
    Music: ['Menu', 'Default Rock']
  },
  NonIterable: {
    Character: ['No Character', 'EricLenovo', 'Betelgeuse Abbygaile', 'Sun Gabbryielle', 'Pikumon10', 'Forest', 'Mars'],
  },
  Other: {
    Skin: ['Default'],
    Ghost: ['Off', 'Outlined', 'Gray', 'Colored', 'Shadow'],
    Resize: [`Automatic`, `Small`, `Medium`, `Large`, `Extra-Large`],
    Gridlines: [`OFF`, 'ON'],
    Language: ['English', 'Filipino']
  }
}

var selectedSettings = {
  Sound: {
    SoundBank: 0,
    Music: 0,
  },
  Volume: {
    SFX: 100,
    Music: 30,
    Character: 50,
    PieceNext: 50,
    UI: 100
  },
  Tuning: {
    DAS: 18,
    ARR: 1,
    GRAV: 0,
    SFT: 110,
    LCK: 60,
    PREV: 5
  },
  NonIterable: {
    Character: 1,
  },
  Other: {
    Skin: 0,
    Ghost: 2,
    Resize: 0,
    Gridlines: 0,
    Language: 0
  },
  Binds: {
    Pause: 27,
    LEFT: 37,
    RIGHT: 39,
    SDROP: 40,
    HDROP: 32,
    HOLD: 67,
    CW: 88,
    CCW: 90,
  ['180DEG']: 16,
    Retry: 82,
  },
  Modes: {
    linerun: {
      LINE: 1,
      TYPE: 0
    },
    scoreatk: {
      TIMER: 6
    },
    fourwide: {
      TIMER: 6
    }
  }
}

function loadSTORAGE() {
  let ev = JSON.parse(localStorage['GTTP$#&6%26'])
  for (let A in ev) {
    for (let B in ev[A]) {
      if (selectedSettings[A][B] !== null)
        selectedSettings[A][B] = ev[A][B]
    }
  }
}

function saveSTORAGE() {
  localStorage['GTTP$#&6%26'] = JSON.stringify(selectedSettings)
}
try {
  loadSTORAGE()
} catch (e) {}

function pause() {
  if (gameRunning) {
    isPaused = true
    field.checkWarning('paused')
    musicPlayer.muteAllMfx(true)
    activeMenu(true, '0', true)
    switchMenu(9, true, 'Paused', true)
  }
}

function unPause() {
  isPaused = false
  musicPlayer.muteAllMfx(false)
  field.checkWarning('resumed')
  activeMenu(false)
}

function countDownText(text, spreadOut, gtrisTransText) {
  var $e = $('#gtris-readygo')
  $e.css('display', 'block')
  $e.stop(true)
  docId('gtris-readygo').innerHTML = text !== '' ? `${!gtrisTransText ? gtris_transText(text) : text}` : ''
  $e.animate({ opacity: 1, letterSpacing: `0em`, paddingLeft: '0em' }, 0)
  if (spreadOut == false) {
    $e.animate({ opacity: 0.8 }, 600)
    $e.animate({ opacity: 0.2 }, 600)
  }
  if (spreadOut == true) {
    $e.animate({ opacity: 0, letterSpacing: `1em`, paddingLeft: '1em' }, 600, function() {
      $e.css('display', 'none')
    })
  }
}

function init(mode, parameter) {
  if (mode == 'REPLAY') {
    isReplay = true
    if (typeof parameter !== 'undefined' && typeof parameter == 'number')
      gameMode = parameter
  } else {
    isReplay = false
    replayData = {
      keyList: {},
      seed: ~~(Math.random() * 2147483647),
      tuning: {},
      mode: mode ? mode : 0
    }
    for (let i in settingsRange.Tuning) {
      replayData.tuning[i] = selectedSettings.Tuning[i]
    }
    actualCustomInit(mode)
    gameMode = mode
  }
  piece.rng.seed = field.rng.seed = replayData.seed
  field.new(10, 42)
  setTimeout(function(){
    field.showResultAnimation("hide")
  }, 100)
  piece.reset()
  clear(_CTX.field)
  clear(_CTX.active)
  customInit()
  pieceSettings[`Ghost`] = selectedSettings.Other.Ghost
  isPaused = false
  for (let i in settingsRange.Tuning) {
    pieceSettings[i] = replayData.tuning[i]
  }
  for (var e of $CN('stats-text'))
    e.innerHTML = ''
  keysPressed = 0
  keysLast = 0
  StartTime = Date.now()
  actualFrame = 0

  frame = 0
  stopFrame = 0
  soundPlayer.selected.se = selectedSettings.Sound.SoundBank
  soundPlayer.load()
  field.resetFieldPosition()
  if (!gameRunning)
    gameRunner = setInterval(function() {
      syncTime = Math.floor((Date.now() - StartTime) / (1000 / 120))
      syncFrame = syncTime - actualFrame
      for (var i = 0; i < syncFrame; i++, actualFrame++)/**/
      /*while(piece.y<-9){
        G_LOOP()
        if(gameRunning == false) break
      }*/
      G_LOOP()
    }, 1000 / 120)
  gameRunning = true
}

function gameStart(gametype, parameter) {
  docId('replayCenter-station').innerHTML = ''
  musicPlayer.killAllMfx()
  musicPlayer.loadMfx(settingsList.Sound.Music[selectedSettings.Sound.Music].toLowerCase().replace(/ /g, '-'))
  musicPlayer.switchCurrent(settingsList.Sound.Music[selectedSettings.Sound.Music].toLowerCase().replace(/ /g, '-'))
  field.openGarbageBar(false)
  gtrisBody.style.opacity = 1
  gtrisBody.style.animation = 'none'
  gtrisBody.style.animationDuration = '4s'
  gtrisBody.style.animationTimingFunction = 'linear'

  init(gametype, parameter)
  activeMenu(false)
  docId('gtris').style.display = 'block'
}

var frame = 0
var stopFrame = 0

function actualCustomInit(mode) {
  switch (mode) {
    case 1: {
      replayData.lineRun = {
        lines: modeParameters.texts.linerun.LINE[selectedSettings.Modes.linerun.LINE],
        type: selectedSettings.Modes.linerun.TYPE
      }
      break
    }
    case 2: {
      replayData.scoreAtk = {
        timer: modeParameters.texts.scoreatk.TIMER[selectedSettings.Modes.scoreatk.TIMER],
      }
      break
    }
    case 3: {
      replayData.fourWide = {
        timer: modeParameters.texts.fourwide.TIMER[selectedSettings.Modes.fourwide.TIMER],
      }
      break
    }
  }
}

function customInit() {
  var mode = gameMode
  scoreAtk.enableTimer(false)
  fourWide.enableTimer(false)
  preview.bag = [0, 1, 2, 3, 4, 5, 6]
  field.isC4W = false
  var s = (num, tx) => docId(`stats${num}`).innerHTML = tx
  var t = (num, tx) => docId(`TEXT_stats${num}`).innerHTML = tx
  field.openGarbageBar(false)
  s(1, 0)
  t(1, gtris_transText('pieces', ['0.000']))
  for (var i = 2; i < 4; i++) {
    s(i, '')
    t(i, '')
  }
  switch (mode) {
    default: {
      t(2, gtris_transText('lines'))
      break
    }
    case 1: {
      field.lineLeft = replayData.lineRun.lines
      preview.bag = {
        0: [0, 1, 2, 3, 4, 5, 6],
        1: [0, 0, 0, 0, 0, 0, 0],
        2: [1, 2, 3, 4, 5, 6]
      } [selectedSettings.Modes.linerun.TYPE]
      t(2, gtris_transText('lines'))
      s(2, field.lineLeft)
      break
    }
    case 2: {
      scoreAtk.enableTimer(true)
      scoreAtk.setTimer(replayData.scoreAtk.timer)

      t(2, gtris_transText('texttime'))
      s(2, returnStatistics(scoreAtk.time))
      break
    }
    case 3: {
      fourWide.enableTimer(true)
      fourWide.setTimer(replayData.fourWide.timer)
      field.isC4W = true
      t(2, gtris_transText('texttime'))
      s(2, returnStatistics(fourWide.time))
      t(3, gtris_transText('c4w_combo'))
      s(3, field.statistics.maxREN)
      field.modifyGrid(19, fourWide.generateC4W())
      field.draw()
      break
    }
    case 4: {
      field.isTSDOnly = true

      t(2, gtris_transText('tsd_goal'))
      s(2, 0)
      break
    }
  }
  preview.init()
  preview.draw()
}

function G_LOOP() {
  if (gameRunning && !isPaused) {
    frame++
    switch (frame - 1) {
      case 0: {
        soundPlayer.playse('game-3')
        countDownText('ready3', false)
        break
      }
      case 120: {
        soundPlayer.playse('game-2')
        countDownText('ready2', false)
        break
      }
      case 120 * 2: {
        soundPlayer.playse('game-1')
        countDownText('ready1', false)
        break
      }
      case 120 * 3: {
        soundPlayer.playse('game-start')
        countDownText('ready0', true)
        musicPlayer.playMfx()
        break
      }
    }
    if (frame == 120 * 3) piece.new(preview.next())
    P_UPDATE()
    if (frame > 120 * 3) {
      G_ACTIVITY()
    }
    Statistics()
  } else if (!gameRunning) {
    keysLast = keysPressed = 0
    clearInterval(gameRunner)
  }
}

function P_UPDATE() {
  if (keysPressed !== keysLast && !isReplay) {
    replayData.keyList[frame] = keysPressed
  } else if (frame in replayData.keyList) {
    keysPressed = replayData.keyList[frame]
    if (replayData.keyList[frame] == 'end') {
      endGame('replayended', true, 'lose')
    }
  }
  if (keysPressed & flags.HOLD && !(keysLast & flags.HOLD)) {
    piece.hold()
  }
  if (keysPressed & flags.CW && !(keysLast & flags.CW)) {
    piece.rotate(1)
  }
  if (keysPressed & flags.CCW && !(keysLast & flags.CCW)) {
    piece.rotate(-1)
  }
  if (keysPressed & flags[`180DEG`] && !(keysLast & flags[`180DEG`])) {
    piece.rotate180()
  }
  piece.DASPreloadAndCheckShift(keysPressed, keysLast)
  if (keysPressed & flags.SDROP) {
    piece.shiftDown()
  }
  if (keysPressed & flags.HDROP && !(keysLast & flags.HDROP)) {
    piece.hardDrop()
  }
  
  piece.update()
  
  keysLast = keysPressed
  if (field.are.line >= 0 || field.are.piece >= 0) {
    if (field.are.line >= 0) {
      field.are.line--
    } else
    if (field.are.piece >= 0) {
      field.are.piece--
    }
    if (field.are.line == 0) {
      field.removeLines()
      if (field.are.piece < 0) {
        if (frame > 120 * 3)
          piece.new(preview.next())
      }
    }
    if (field.are.piece == 0) {
      if (frame > 120 * 3)
        piece.new(preview.next())
    }
  }
}

function Statistics() {
  if (gameRunning && frame > 120 * 3) {
    var time = frame - (120 * 3)
    var seconds = ((time / 120) % 60).toFixed(3)
    var minutes = (Math.floor((time) / (3600 * 2))).toFixed(0)
    $iH('stopwatch', gtris_transText('main_timer', [minutes, `${seconds<10?'0':''}${seconds}`]))
    $iH('TEXT_stats1', gtris_transText('pieces', (field.pieces / (time / 120)).toFixed(3)))
  }
}

function returnStatistics(e) {
  var time = e
  var seconds = ((time / 120) % 60).toFixed(3)
  var minutes = (Math.floor((time) / (3600 * 2))).toFixed(0)
  return gtris_transText('main_timer', [minutes, `${seconds<10?'0':''}${seconds}`])
}

function endGame(title, downfall, winlose) {
  if (gameRunning)
    replayData.keyList[frame + 40] = 'end'
  musicPlayer.killAllMfx()
  musicPlayer.muteAllMfx()
  if (downfall == true) {
    gtrisBody.style.transition = 'transform 2.5s ease-in'
    gtrisBody.style.transform = 'translateY(4800px) rotateZ(90deg)'
  }
  if (winlose == 'win') {
    field.showResultAnimation('win', typeof title !== 'object' ? gtris_transText(title) : gtris_transText(title.name, title.array))
    soundPlayer.playse('game-win')
    gtrisBody.style.opacity = 0
    gtrisBody.style.animation = 'gameWin'
    gtrisBody.style.animationDuration = '4s'
    gtrisBody.style.animationTimingFunction = 'linear'
  } else if (winlose == 'lose') {
    field.showResultAnimation('lose', typeof title !== 'object' ? gtris_transText(title) : gtris_transText(title.name, title.array))
    soundPlayer.playse('game-lose')
  } else if (winlose !== void 0) {
    field.showResultAnimation('win', typeof title !== 'object' ? gtris_transText(title) : gtris_transText(title.name, title.array))
    soundPlayer.playse('game-win')
  }
  isPaused = false
  clearInterval(gameRunner)
  field.checkWarning('stop')
  countDownText('')
  gameRunning = false
  stopFrame = frame - 1
  activeMenu(true, 0.5, true)
  switchMenu(8, true, typeof title !== 'object' ? gtris_transText(title) : gtris_transText(title.name2, title.array), "startPoint")

  placeStats(['time', `pieces`, 'lines', 'gtris', 'score', 'pc', 'tsd', 'maxren'])
}

function placeStats(array) {
  var summary = docId('gamesummary')
  var str = ''
  summary.innerHTML = 'STATISTICS: <br>'
  for (let D of array) {
    switch (D.toLowerCase()) {
      case 'time': {
        str = gtris_transText("ss_time", [(function() {
          var time = stopFrame - (120 * 3)
          var seconds = ((time / 120) % 60).toFixed(3)
          var minutes = (Math.floor((time) / (3600 * 2))).toFixed(0)
          return `${minutes}:${seconds<10?'0':''}${seconds}`
        })(), stopFrame])
        break
      }
      case 'lines': {
        str = gtris_transText('ss_lines', [field.lineTotal, (field.lineTotal / field.pieces).toFixed(3)])
        break
      }
      case 'pieces': {
        str = gtris_transText('ss_pieces', [field.pieces, (field.pieces / ((stopFrame - (120 * 3)) / 120)).toFixed(3)])
        break
      }
      case 'level': {
        str = `Level: ${field.level}`
        break
      }
      case 'score': {
        str = gtris_transText('ss_score', field.score)
        break
      }
      case 'gtris': {
        str = gtris_transText('ss_gtris', [field.statistics.line.gtris, (field.lineTotal !== 0) ? (((field.statistics.line.gtris * 4) / field.lineTotal) * 100).toFixed(2) : '0.00'])
        break
      }
      case 'pc': {
        str = gtris_transText('ss_pc', field.statistics.pc)
        break
      }
      case 'tsd': {
        str = gtris_transText('ss_tsd', field.statistics.spin.double + field.statistics.mini.double)
        break
      }
      case 'maxren': {
        str = gtris_transText('ss_maxren', field.statistics.maxREN)
        break
      }
    }
    summary.innerHTML += `${str} <br>`
  }
}


function G_ACTIVITY() {
  docId('score').innerHTML = field.score
  docId('stats1').innerHTML = field.pieces
  switch (gameMode) {
    default: {
      docId('stats2').innerHTML = field.lineTotal
      break
    }
    case 1: {
      docId('stats2').innerHTML = Math.max(field.lineLeft, 0)
      if (field.lineLeft < 1) {
        endGame('l_success', false, 'win')
      }
      break
    }
    case 2: {
      docId('stats2').innerHTML = returnStatistics(scoreAtk.returnTimer())
      break
    }
    case 3: {
      docId('stats2').innerHTML = returnStatistics(fourWide.returnTimer())
      docId('stats3').innerHTML = field.statistics.maxREN
      break
    }
    case 4: {
      docId('stats2').innerHTML = field.statistics.tsd
      break
    }
  }
  scoreAtk.run(frame > 120 * 3)
  fourWide.run(frame > 120 * 3)
  /*if(frame>500&& frame % 200 == 0)
   field.addGarbageToArray(Math.floor(field.rng.next()*4),Math.floor(field.rng.next() * 10))
  */

}

window.onblur = () => {
  musicPlayer.muteAllMfx(true)
  soundPlayer.muteallse(true)
}
window.onfocus = () => {
  musicPlayer.muteAllMfx(false)
  soundPlayer.muteallse(false)

}
