/**(C) EricLenovo 2022
 * Gachatris: Tetraplus (One JS)
 * May 5, 2022 @10:46AM Philippine Time
 * GPL 3.0 license
 */

"use-strict"

/*
eval = function() {
 return console.warn('JS Console is not usable in this site.')
}*/

var gtris_version = '0.0.021 Alpha Release'
var syncTime = 0
var syncFrame = 0
var actualFrame = 0
var cellSize = 0
var isReplay = false
var replayData = {}
var isPaused = false
var isKeySelectorOn = false
var keyMappingSelected = null
var keysPressed, keysLast
var gameRunning, gametype, gameRunner

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
 var characterImage = docId('characterImage')
 var logoSplash = docId('splashLogoDiv')

 var screenHeight = window.innerHeight - 34;
 var screenWidth = ~~(screenHeight * 2);
 if (screenWidth > window.innerWidth) {
  screenHeight = ~~(window.innerWidth / 1.024);
 }

 if (varSize === 1 && screenHeight > 602) cellSize = 10;
 else if (varSize === 2 && screenHeight > 602) cellSize = 20;
 else if (varSize === 3 && screenHeight > 902) cellSize = 34;
 else cellSize = Math.max(~~(screenHeight / 28), 7);

 var padNum = (window.innerHeight - (cellSize * 20 + 2)) / 3;
 var padNum2 = (window.innerHeight - (cellSize * 20 + 20)) / 1.5
 var padNum3 = (window.innerHeight - (cellSize * 20)) / 15
 var padNum4 = (window.innerHeight - (cellSize * 20 + 2)) / 3.5;

 var pad = padNum + 'px'
 for(var e of content)
 e.style.padding = `${pad} 0`
 contentLayer.style.padding = `${padNum4}px 0`
 for(var e of resultText)
 e.style.fontSize = `${cellSize*3}px`
 resultImg.style.height=`${cellSize*23}px`
 resultImg.style.width=`${cellSize*23}px`
 
 menuHeader.style.height = `${cellSize*2.1}px`
 logoHeader.body.style.height = logoHeader.body.style.width =
  logoHeader.logo.style.height = logoHeader.logo.style.width =
  menuHeader.style.height
  
  logoHeader.back.style.height = logoHeader.logo.style.width = `${cellSize*2.1}px`
  
 for (let g of listCellDetails) {
  g.style.height = `${cellSize*4}px`
 }
 characterImage.style.height = `${cellSize*4}px`
 docId('character-cells').style.paddingBottom = `${cellSize*4}px`
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
 _canvasses.queue.width = cellSize * 5
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
 statistics.style.width = `${_canvasses.field.width}px`
 statistics.style.height = leftBorder.style.height
 statistics.style.top = `${cellSize*13}px`
 statistics.style.left = `${-_canvasses.field.width * 0.5}px`
 for (var large of $tag('statLarge')) {
  large.style.height = `${cellSize*1.4}px`
  large.style.fontSize = `${cellSize*1.4}px`
 }
 for (var large of $tag('stat')) {
  large.style.height = `${cellSize*0.7}px`
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
 if(gameRunning){
  if(hold.piece) hold.draw()
  field.draw()
  preview.draw()
  piece.draw()
  piece.drawGhost()
 }
 gridLines(_CTX.grid)
}
addEventListener('resize', function(){
 for(var x=0; x<4; x++)
 setTimeout(function(){
 RESIZE()
 },40*x)
}, false)
addEventListener('DOMContentLoaded', RESIZE, false)

function gridLines(ctx) {
 clear(ctx)
 ctx.fillStyle = '#000000';
 for (var x = -1; x < ctx.canvas.width + 1; x += cellSize) {
  ctx.fillRect(x, 0, 10 / cellSize, ctx.canvas.height);
 }
 for (var y = -1; y < ctx.canvas.height + 1; y += cellSize) {
  if(y==-1)
   ctx.fillStyle = '#ff0000';
   else ctx.fillStyle = '#000000';
  ctx.fillRect(0, (cellSize * 0.4) + y, ctx.canvas.width, 10 / cellSize);
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
  Character: range(0, 101),
  PieceNext: range(0, 101)
 },
}
var settingsList = {
 Sound: {
  SoundBank: ['Default', 'JavaScriptus'],
 },
 NonIterable: {
  Character: ['No Character', 'EricLenovo', 'Betelgeuse Abbygaile', 'Sun Gabbryielle', 'Pikumon10'],
 },
 Other: {
  Skin: ['Default'],
  Ghost: ['Off', 'Outlined Ghost', 'Gray', 'Colored'],
  Resize: [`Automatic`, `Small`, `Medium`, `Large`],
  Gridlines: [`-`, 'O']
 }
}

var selectedSettings = {
 Sound: {
  SoundBank: 0,
 },
 Volume: {
  SFX: 100,
  Character: 50,
  PieceNext: 50,
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
  Gridlines: 0
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
 if(gameRunning){
 isPaused = true
 field.checkWarning('paused')
 activeMenu(true,'0', true)
 switchMenu(9, true, 'Paused', true)
}
}

function unPause() {
 isPaused = false
 field.checkWarning('resumed')
 activeMenu(false)
}

function countDownText(text, spreadOut){
 var $e = $('#gtris-readygo')
 $e.css('display','block')
 $e.stop(true)
 docId('gtris-readygo').innerHTML = text
 $e.animate({opacity:1}, 0)
 if(spreadOut==false){
  $e.animate({opacity:0.8}, 600)
  $e.animate({opacity:0.2}, 600)
 }
 if (spreadOut == true) {
  $e.animate({ opacity: 0 }, 600, function(){
  $e.css('display','none')})
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
   mode: parameter
  }
  for (let i in settingsRange.Tuning) {
   replayData.tuning[i] = selectedSettings.Tuning[i]
  }
 } 
 isPaused = false
 clear(_CTX.field)
 clear(_CTX.active)
 for (let i in settingsRange.Tuning) {
  pieceSettings[i] = replayData.tuning[i]
 }
 pieceSettings[`Ghost`] = selectedSettings.Other.Ghost
 piece.rng.seed = replayData.seed
 keysPressed = 0
 keysLast = 0
 StartTime = Date.now()
 actualFrame = 0
 preview.init()
 preview.draw()
 field.new(10, 42)
 piece.reset()
 frame = 0
 stopFrame = 0
 soundPlayer.selected.se = selectedSettings.Sound.SoundBank
 soundPlayer.load()
 field.resetFieldPosition()
 if (!gameRunning)
  gameRunner = setInterval(function() {
   syncTime = Math.floor((Date.now() - StartTime) / (1000 / 120))
   syncFrame = syncTime - actualFrame
   for (i = 0; i < syncFrame; i++, actualFrame++)
    G_LOOP()
  }, 1000 / 120)
 gameRunning = true
 G_LOOP()
}
function gameStart(gametype, parameter) {
 init(gametype, parameter);
 activeMenu(false)
 docId('gtris').style.display = 'block'
}

var frame = 0
var stopFrame = 0

function G_LOOP() {
 if (gameRunning && !isPaused) {
  frame++
  switch (frame - 1) {
   case 0: {
    soundPlayer.playse('game-3')
    countDownText('READY <br> 3', false)
    break
   }
   case 120: {
    soundPlayer.playse('game-2')
    countDownText('READY <br> 2', false)
    break
   }
   case 120 * 2: {
    soundPlayer.playse('game-1')
    countDownText('READY <br> 1', false)
    break
   }
   case 120 * 3: {
    soundPlayer.playse('game-start')
    countDownText('START', true)
    break
   }
  }
  if (frame == 120 * 3) piece.new(preview.next())
  G_ACTIVITY()
  P_UPDATE()
  Statistics()
 } else if (!gameRunning) {
  clearInterval(gameRunner)
 }
 //console.log(`${field.spinCheckCount} ${field.isSpin} ${field.miniSpinCount} ${field.isMini}`)
}

function P_UPDATE() {
 if (keysPressed !== keysLast && !isReplay) {
  replayData.keyList[frame] = keysPressed
 } else if (frame in replayData.keyList) {
  keysPressed = replayData.keyList[frame]
  
  if (replayData.keyList[frame] == 'end') {
   endGame('Replay Ended', true, 'lose')
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
 if (keysPressed & flags.SDROP) {
  piece.shiftDown()
 }
 if (keysPressed & flags.HDROP && !(keysLast & flags.HDROP)) {
  piece.hardDrop()
 }
 piece.checkShift(keysPressed, keysLast)
 piece.update()
 keysLast = keysPressed
 if(field.are.line>=0||field.are.piece>=0){
  if(field.are.line>=0){
   field.are.line--
  }else
  if(field.are.piece>=0){
   field.are.piece--
  }
  if(field.are.line==0){
  field.removeLines()
  if (field.are.piece < 0) {
   if (frame > 120 * 3)
    piece.new(preview.next())
  }
  }
 if(field.are.piece==0){
  if(frame>120*3)
   piece.new(preview.next())
  }
 }
}

function Statistics() {
 if (gameRunning && frame > 120 * 3) {
  var time = frame - (120 * 3)
  var seconds = ((time / 120) % 60).toFixed(3)
  var minutes = (Math.floor((time) / (3600 * 2))).toFixed(0)
  $iH('stopwatch', `${minutes}:${seconds<10?'0':''}${seconds}`)
  $iH('TEXT_stats1', `PIECES, ${(field.pieces/(time /120)).toFixed(3)}/sec`)
 }
}

function endGame(title, downfall, winlose) {
 if(gameRunning)
 replayData.keyList[frame + 40] = 'end'
 if (downfall == true) {
  gtrisBody.style.transition = 'transform 2.5s ease-in'
  gtrisBody.style.transform = 'translateY(4800px) rotateZ(90deg)'
  field.checkWarning('stop')
 }
 if (winlose == 'win') {

 } else if (winlose == 'lose') {
  field.showResultAnimation('lose', title)
  soundPlayer.playse('game-lose')
 } else if (winlose !== void 0) {

 }
 clearInterval(gameRunner)
 countDownText('')
 gameRunning = false
 stopFrame = frame
 activeMenu(true, 0.5, true)
 switchMenu(8, true, title, true)
 placeStats(['time',`pps`])
}

function placeStats(array){
 var summary = docId('gamesummary')
 var str = ''
 summary.innerHTML='STATUS: <br>'
 for(let D of array){
  switch(D.toLowerCase()){
   case 'time': {
    str = `Time: ${(function(){
    var time = frame - (120 * 3)
    var seconds = ((time / 120) % 60).toFixed(3)
    var minutes = (Math.floor((time) / (3600 * 2))).toFixed(0)
    return `${minutes}:${seconds<10?'0':''}${seconds}`
})()} (${stopFrame})`
    break
   }
   case 'lines': {
    str = `Lines: ${field.lineTotal}`
    break
   }
   case 'pps': {
    str = `Pieces: ${field.pieces}, ${(field.pieces / ((stopFrame - (120 * 3)) / 120))}/sec`
    break
   }
   case 'level': {
    str = `Level: ${field.level}`
    break
   }
   case 'score': {
    str = `Score: ${field.score}`
    break
   }
   case 'gtris': {
    str = `Gachatrises: ${field.statistics.line.gtris}`
    break
   }
   case 'pc': {
    str = `Bravos: ${field.statistics.pc}`
    break
   }
  }
  summary.innerHTML+=`${str} <br>`
 }
}

!function() {
 setTimeout(
  async function() {
   let array = ['menus']
   for (let i in array) {
     $create('script', function(a) {
      a.src = `scripts/${array[i]}.js`
      a.id = `script-${array[i]}`
      a.type = 'text/javascript'
      document.body.appendChild(a)
     })
   }
  },10)
}()


function G_ACTIVITY(){
 docId('stats1').innerHTML=field.pieces
 docId('stats2').innerHTML=field.lineTotal
}
