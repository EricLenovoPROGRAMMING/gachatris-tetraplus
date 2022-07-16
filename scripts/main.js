/**(C) EricLenovo 2022
 * Gachatris: Tetraplus (JS)
 * May 5, 2022 @10:46AM Philippine Time
 * GPL 3.0 license
 */
"use strict";
var gtris_version = '0.1.153 Alpha';
var syncTime = 0;
var StartTime = 0
var syncFrame = 0;
var actualFrame = 0;
const MAIN_FPS = 120;
var cellSize = 0
var isReplay = false;
var is1V1 = false
var replayData = {}
var isPaused = false
var isKeySelectorOn = false
var keyMappingSelected = null
var keysPressed = 0,
	keysLast = 0,
	keysPressed2 = 0,
	keysLast2 = 0;
var gameRunning, gameMode, gameRunner

var meterBar = {
	capacity: docId('meterBarRight'),
	garbage: docId('meter_A'),
	underGarbage: docId('meter_A-under'),
	capacityF: docId('meterBarLeft'),
	frenzy: docId('meter_FRENZY'),
	capacity2: docId('meterBarRight2'),
	garbage2: docId('meter_A2'),
	underGarbage2: docId('meter_A-under2'),
	capacityF2: docId('meterBarLeft2'),
	frenzy2: docId('meter_FRENZY2')
}

var gtrisBody = docId('gtris-body')

const _canvasses = {
	sprite: docId('spriteCanvas'),
	spriteParticle: docId('spriteParticleCanvas'),
	hold: docId('holdCanvas'),
	field: docId('fieldCanvas'),
	next: docId('nextCanvas'),
	queue: docId('queueCanvas'),
	grid: docId('gridCanvas'),
	active: docId('activeCanvas'),
	rectAnim: docId('keyframeAnimationCanvas'),
	hold2: docId('holdCanvas2'),
	field2: docId('fieldCanvas2'),
	next2: docId('nextCanvas2'),
	queue2: docId('queueCanvas2'),
	grid2: docId('gridCanvas2'),
	active2: docId('activeCanvas2'),
	rectAnim2: docId('keyframeAnimationCanvas2'),
	whole: docId('wholeCanvas')
}
const _CTX = {
	sprite: _canvasses.sprite.getContext('2d'),
	spriteParticle: _canvasses.spriteParticle.getContext('2d'),
	hold: _canvasses.hold.getContext('2d'),
	field: _canvasses.field.getContext('2d'),
	next: _canvasses.next.getContext('2d'),
	queue: _canvasses.queue.getContext('2d'),
	grid: _canvasses.grid.getContext('2d'),
	active: _canvasses.active.getContext('2d'),
	rectAnim: _canvasses.rectAnim.getContext('2d'),
	hold2: _canvasses.hold2.getContext('2d'),
	field2: _canvasses.field2.getContext('2d'),
	next2: _canvasses.next2.getContext('2d'),
	queue2: _canvasses.queue2.getContext('2d'),
	grid2: _canvasses.grid2.getContext('2d'),
	active2: _canvasses.active2.getContext('2d'),
	rectAnim2: _canvasses.rectAnim2.getContext('2d'),
	whole: _canvasses.whole.getContext('2d')
}

function RESIZE() {
	SCREEN_WIDTH = window.innerWidth
	SCREEN_HEIGHT = window.innerHeight

	var varSize = 0 || selectedSettings.Other.Resize
	var leftBorder = docId('leftborder')
	var rightBorder = docId('rightborder')
	var leftBorderChildren = docId('leftborder').children
	var rightBorderChildren = docId('rightborder').children
	var statistics = docId('statistics')
	var holdPlaceholder = docId('holdTextPlaceholder')
	var nextPlaceholder = docId('nextTextPlaceholder')
	var playField = docId('playField')
	var frenzyField = docId('bgFrenzyLayout')
	var frenzyColor = docId('colorFrenzyOverlay')
	var dynamicFrenzy = docId('dynamicFrenzyBg')
	var [content, contentLayer, resultText, resultImg] = [$tag('tetrionPadding'), docId('tetrionLayer'), $tag('gtris-result'), docId('showResultCharImg')]
	var clearText = docId('clearTexts')
	var holdDiv = docId('holdDiv')
	var namePlateDiv = docId('namePlateDiv')

	/*player2*/
	var leftBorder2 = docId('leftborder2')
	var rightBorder2 = docId('rightborder2')
	var leftBorderChildren2 = docId('leftborder2').children
	var rightBorderChildren2 = docId('rightborder2').children
	var statistics2 = docId('statistics2')
	var holdPlaceholder2 = docId('holdTextPlaceholder2')
	var nextPlaceholder2 = docId('nextTextPlaceholder2')
	var playField2 = docId('playField2')
	var frenzyField2 = docId('bgFrenzyLayout2')
	var frenzyColor2 = docId('colorFrenzyOverlay2')
	var dynamicFrenzy2 = docId('dynamicFrenzyBg2')
	var [contentLayer2, resultImg2] = [docId('tetrionLayer2'), docId('showResultCharImg2')]
	var clearText2 = docId('clearTexts2')
	var holdDiv2 = docId('holdDiv2')
	var namePlateDiv2 = docId('namePlateDiv2')


	var header1 = $tag('h1')
	var customSprite = docId('customSprite')
	var customSpriteParticle = docId('customSpriteParticle')

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

	var screenHeight = SCREEN_HEIGHT - 34;
	var screenWidth = ~~(screenHeight * 2);
	if (screenWidth > SCREEN_WIDTH) {
		screenHeight = ~~(SCREEN_WIDTH / 1.024);
	}

	docId("menus").scrollTop = 0
	docId("menus").scrollTo(0, 0)

	if (varSize === 1 && screenHeight > 302) cellSize = 12;
	else if (varSize === 2 && screenHeight > 502) cellSize = 17;
	else if (varSize === 3 && screenHeight > 702) cellSize = 27;
	else if (varSize === 4 && screenHeight > 902) cellSize = 39;
	else cellSize = Math.max(~~(screenHeight / 30), 7);

	var padNum = (SCREEN_HEIGHT - (cellSize * 20 + 2)) / 2.3;
	var padNum2 = (SCREEN_HEIGHT - (cellSize * 20 + 20)) / 1.5
	var padNum3 = (SCREEN_HEIGHT - (cellSize * 20)) / 15
	var padNum4 = (SCREEN_HEIGHT - (cellSize * 20 + 2)) / 2.7;

	var pad = padNum + 'px'

	_canvasses.whole.width = SCREEN_WIDTH
	_canvasses.whole.height = SCREEN_HEIGHT
	_canvasses.whole.style.width = docId("loadingScreen").style.width = docId("menus").style.width = `${SCREEN_WIDTH}px`
	_canvasses.whole.style.height = docId("loadingScreen").style.height = docId("menus").style.height = `${SCREEN_HEIGHT}px`

	docId("gtris").style.height = docId("gtrisLayout").style.height = `${SCREEN_HEIGHT}px`


	for (var e of content)
		e.style.padding = `${pad} 0`
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

	docId('tSpin').style.fontSize = `${cellSize*0.5}px`
	docId('regular').style.fontSize = `${cellSize*0.75}px`
	docId('B2B').style.fontSize = `${cellSize*0.5}px`
	docId('tSpin').style.height = `${cellSize*0.5}px`
	docId('regular').style.height = `${cellSize*0.75}px`
	docId('B2B').style.height = `${cellSize*0.5}px`
	docId('REN').style.height = `${cellSize*1.3}px`
	docId('REN').style.fontSize = `${cellSize*1.3}px`

	/****/
	docId('tetrionPC').style.padding = `${padNum + (cellSize*6)}px 0`

	contentLayer.style.padding = `${padNum4}px 0`
	for (var e of resultText)
		e.style.fontSize = `${cellSize*3}px`
	resultImg.style.height = `${cellSize*23}px`
	resultImg.style.width = `${cellSize*23}px`

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

	holdDiv.style.height = `${cellSize*5}px`

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

	playField.style.height = frenzyField.style.height = frenzyColor.style.height = `${_canvasses.field.height}px`
	playField.style.width = frenzyField.style.width = frenzyColor.style.width = `${_canvasses.field.width}px`
	dynamicFrenzy.style.width = dynamicFrenzy.style.height = `${cellSize * 26}px`

	for (var e in meterBar) {
		meterBar[e].style.height = `${playField.style.height}`
		meterBar[e].style.width = `${cellSize*0.6}px`
	}

	namePlateDiv.style.height = `${cellSize * 1.1}px`
	namePlateDiv.style.width = `${cellSize * 13.5}px`
	namePlateDiv.style.top = `${cellSize * 21.4}px`

	var rectAnim = docId("rectAnimDiv")
	_canvasses.rectAnim.width = cellSize * 11
	_canvasses.rectAnim.height = cellSize * 3
	rectAnim.style.width = `${_canvasses.rectAnim.width * 1.1}px`
	rectAnim.style.height = `${_canvasses.rectAnim.height * 1.1}px`
	rectAnim.style.top = `${padNum + _canvasses.field.height + (cellSize * 1.05)}px`

	clearText.style.height = `${cellSize*3}px`
	statistics.style.width = `${_canvasses.field.width}px`
	statistics.style.height = leftBorder.style.height
	statistics.style.bottom = 0
	statistics.style.left = `${-_canvasses.field.width * 0.53}px`

	{
		docId('tetrionPC2').style.padding = `${padNum + (cellSize*6)}px 0`

		contentLayer2.style.padding = `${padNum4}px 0`

		resultImg2.style.height = `${cellSize*23}px`
		resultImg2.style.width = `${cellSize*23}px`

		leftBorder2.style.width = `${cellSize*5}px`
		rightBorder2.style.width = `${cellSize*5}px`

		for (let i of leftBorderChildren2) {
			i.style.width = leftBorder2.style.width
		}
		for (let e of rightBorderChildren2) {
			e.style.width = rightBorder2.style.width
		}

		holdPlaceholder2.style.height = `${cellSize*1}px`
		_canvasses.hold2.height = cellSize * 3
		_canvasses.hold2.style.height = `${_canvasses.hold2.height}px`
		_canvasses.hold2.width = cellSize * 5
		_canvasses.hold2.style.width = `${_canvasses.hold2.width}px`

		holdDiv2.style.height = `${cellSize*5}px`

		nextPlaceholder2.style.height = `${cellSize*1}px`
		_canvasses.next2.height = cellSize * 3
		_canvasses.next2.style.height = `${_canvasses.next2.height}px`
		_canvasses.next2.width = cellSize * 5
		_canvasses.next2.style.width = `${_canvasses.next2.width}px`


		_canvasses.queue2.height = cellSize * 3 * 10
		_canvasses.queue2.style.height = `${_canvasses.queue2.height*0.5}px`
		_canvasses.queue2.width = cellSize * 6
		_canvasses.queue2.style.width = `${_canvasses.queue2.width*0.5}px`


		_canvasses.field2.height = cellSize * 20.4
		_canvasses.field2.style.height = docId('characterBackground2').style.height = `${_canvasses.field2.height}px`
		_canvasses.field2.width = cellSize * 10
		_canvasses.field2.style.width = docId('characterBackground2').style.width = `${_canvasses.field2.width}px`

		_canvasses.active2.height = cellSize * 20.4
		_canvasses.active2.style.height = `${_canvasses.active2.height}px`
		_canvasses.active2.width = cellSize * 10
		_canvasses.active2.style.width = `${_canvasses.active2.width}px`

		_canvasses.grid2.height = cellSize * 20.4
		_canvasses.grid2.style.height = `${_canvasses.grid2.height}px`
		_canvasses.grid2.width = cellSize * 10
		_canvasses.grid2.style.width = `${_canvasses.grid2.width}px`

		playField2.style.height = frenzyField2.style.height = frenzyColor2.style.height = `${_canvasses.field2.height}px`
		playField2.style.width = frenzyField2.style.width = frenzyColor2.style.width = `${_canvasses.field2.width}px`
		dynamicFrenzy2.style.width = dynamicFrenzy2.style.height = `${cellSize * 26}px`


		namePlateDiv2.style.height = `${cellSize * 1.1}px`
		namePlateDiv2.style.width = `${cellSize * 13.5}px`
		namePlateDiv2.style.top = `${cellSize * 21.4}px`

		var rectAnim2 = docId("rectAnimDiv2")
		_canvasses.rectAnim2.width = cellSize * 11
		_canvasses.rectAnim2.height = cellSize * 3
		rectAnim2.style.width = `${_canvasses.rectAnim2.width * 1.1}px`
		rectAnim2.style.height = `${_canvasses.rectAnim2.height * 1.1}px`
		rectAnim2.style.top = `${padNum + _canvasses.field2.height + (cellSize * 1.05)}px`

		clearText2.style.height = `${cellSize*3}px`
		statistics2.style.width = `${_canvasses.field2.width}px`
		statistics2.style.height = leftBorder2.style.height
		statistics2.style.bottom = 0
		statistics2.style.left = `${-_canvasses.field2.width * 0.53}px`
		docId('tSpin2').style.fontSize = `${cellSize*0.5}px`
		docId('regular2').style.fontSize = `${cellSize*0.75}px`
		docId('B2B2').style.fontSize = `${cellSize*0.5}px`
		docId('tSpin2').style.height = `${cellSize*0.5}px`
		docId('regular2').style.height = `${cellSize*0.75}px`
		docId('B2B2').style.height = `${cellSize*0.5}px`
		docId('REN2').style.height = `${cellSize*1.3}px`
		docId('REN2').style.fontSize = `${cellSize*1.3}px`

	}
	if (SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT) {
		if ("player2" in replayData) {
			docId("tetrion2").style.display = "flex"
		} else {
			docId("tetrion2").style.display = "none"
		}
	} else {
		docId("tetrion2").style.display = "none"
	}
	_canvasses.sprite.width = _canvasses.spriteParticle.width = cellSize * 11
	_canvasses.sprite.height = cellSize * 2;
	_canvasses.spriteParticle.height = cellSize * 1
	customSprite.style.width = customSprite.width = _canvasses.sprite.style.width = `${_canvasses.sprite.width}px`
	customSprite.style.height = customSprite.height = _canvasses.sprite.style.height = `${_canvasses.sprite.height}px`

	customSpriteParticle.style.width = customSpriteParticle.width = _canvasses.spriteParticle.style.width = `${_canvasses.spriteParticle.width}px`
	customSpriteParticle.style.height = customSpriteParticle.height = _canvasses.spriteParticle.style.height = `${_canvasses.spriteParticle.height}px`

	document.documentElement.style.fontSize = `${cellSize*0.9}px`
	for (var i of header1) {
		i.style.fontSize = `${cellSize*2}px`
	}

	makeSprite()
	localizeText()
	setTimeout(() => {
		if (gameRunning) {
			if (hold.piece) hold.draw()
			field.draw()
			preview.draw()
			gachamino.draw()
			gachamino.drawGhost()
			if ("player2" in replayData) {
				if (hold2.piece) hold2.draw()
				field2.draw()
				preview2.draw()
				gachamino2.draw()
				gachamino2.drawGhost()
			}
		}
	}, 100)
	if (selectedSettings.Other.Gridlines == 1) {
		gridLines(_CTX.grid)
		gridLines(_CTX.grid2)
	}
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

function dynamicDraw(ctx, x, y, r, cell, size) {
	x = ~~x;
	var row
	var type
	if (r < 2) {
		type = _canvasses.spriteParticle
		row = 0
	}
	else {
		type = _canvasses.sprite
		row = r - 2
	}
	_CTX[ctx].drawImage(
		type,
		cell * cellSize,
		row * cellSize,
		cellSize,
		cellSize,
		x,
		y,
		size * cellSize,
		size * cellSize,
	);
};

function draw(tetro, cx, cy, ctx, color, row) {
	for (var x = 0, len = tetro.length; x < len; x++) {
		for (var y = 0, wid = tetro[x].length; y < wid; y++) {
			if (tetro[x][y])
				drawCell(x + cx, y + cy, color !== void 0 ? color : tetro[x][y], ctx, row)
		}
	}
}

function makeSprite() {
	var spriteCustom = docId('customSprite')
	var spriteCustomParticle = docId('customSpriteParticle')

	clear(_CTX.sprite)
	clear(_CTX.spriteParticle)
	spriteCustom.src = 'skin/default/block.png'
	spriteCustom.onload = () =>
		_CTX.sprite.drawImage(spriteCustom, 0, 0, spriteCustom.width, spriteCustom.height)
	spriteCustomParticle.src = 'skin/default/particle.png'
	spriteCustomParticle.onload = () =>
		_CTX.spriteParticle.drawImage(spriteCustomParticle, 0, 0, spriteCustomParticle.width, spriteCustomParticle.height)
}

function clear(ctx) {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
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
		UI: range(0, 101)
	},
}
var settingsList = {
	Sound: {
		SoundBank: ['Default', 'JavaScriptus', 'Tetra Legends', 'TETR.IO'],
		Music: ['Menu', 'Default Rock']
	},
	NonIterable: {
		Character: ['No Character', 'EricLenovo', 'Betelgeuse Abbygaile', 'Sun Gabbryielle', 'Pikumon10', 'Forest', 'Mars', 'PeterNavea', 'Flotalendy', 'KawaiiGirlAnna', 'ElishDimensions'],
	},
	Other: {
		Skin: ['Default'],
		Ghost: ['Off', 'Outlined', 'Gray', 'Colored', 'Shadow'],
		Outline: ['OFF', 'ON'],
		Resize: [`Automatic`, `Small`, `Medium`, `Large`, `Extra-Large`],
		Gridlines: [`OFF`, 'ON'],
		Language: ['English', 'Filipino'],
		ClearText: [`OFF`, `ON`, 'CSS'],
		Particle: ["OFF", "LOW", 'MEDIUM', 'HIGH']
	}
}

var selectedSettings = {
	Sound: {
		SoundBank: 0,
		Music: 1,
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
	Names: {
		Main: '',
		AI: 'Tetraplus AI',
	},
	Other: {
		Skin: 0,
		Ghost: 2,
		Outline: 0,
		Resize: 0,
		Gridlines: 0,
		Language: 0,
		ClearText: 1,
		Particle: 0,
	},
	Binds: {
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
	},
	AI: {
		KPDI: 19,
		Character: 1
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
		},
		dsfrenzy: {
			TIMER: 6,
			FAILS: 5,
			PHASE: 0
		},
		survival: {
			GALEVEL: 2,
			GRLIMIT: 0,
			INIT: 60
		},
		levelrun: {
			LEVEL: 0,
			LINE: 4,
			LINEREQ: 6,
			ARETYPE: 0,
			LEVELCAP: 0,
		},
		area20: {
			LEVEL: 0,
			LINE: 9,
			LINEREQ: 6,
			LEVELCAP: 14,
		},
		amogus: {
			TIMER: 6
		},
		onevonegarb: {
			GRLIMIT: 0
		},
		frenzywar: {
			TIMER: 0,
			HP: 2,
			PHASE: 0
		},
	}
}

function loadSTORAGE() {
	let ev = JSON.parse(localStorage.getItem('GTTP$#&6%26'))
	for (let A in ev) {
		for (let B in ev[A]) {
			if (selectedSettings[A][B] !== null)
				selectedSettings[A][B] = ev[A][B]
		}
	}
}

function saveSTORAGE() {
	localStorage.setItem('GTTP$#&6%26', JSON.stringify(selectedSettings))
}
try {
	loadSTORAGE()
} catch (e) {}

function pause() {
	if (gameRunning && !isPaused && GtrisLoader.loaded) {
		isPaused = true
		field.checkWarning('paused')
		if ("player2" in replayData)
			field2.checkWarning('paused')

		musicPlayer.muteAllMfx(true)
		activeMenu(true, '0', true)
		switchMenu(9, true, 'Paused', true)
	}
}

function unPause() {
	if (isPaused && gameRunning && GtrisLoader.loaded) {
		isPaused = false
		musicPlayer.muteAllMfx(false)
		field.checkWarning('resumed')
		if ("player2" in replayData)
			field2.checkWarning('resumed')
		activeMenu(false)
	}
}

function countDownText(text, spreadOut, gtrisTransText, animate) {
	var $e = $('#gtris-readygo'),
		De = docId('gtris-readygo')
	$e.css('display', 'block')
	$e.stop(true)
	De.style.animation = "none"
	docId('gtris-readygo').innerHTML = text !== '' ? `${!gtrisTransText ? gtris_transText(text) : text}` : ''
	$e.animate({ opacity: 1, letterSpacing: `0em`, paddingLeft: '0em' }, 0)
	if (spreadOut === false) {
		$e.animate({ opacity: 0.8 }, 600)
		$e.animate({ opacity: 0.2 }, 600)
	}
	if (spreadOut === true) {
		$e.animate({ opacity: 0, letterSpacing: `1em`, paddingLeft: '1em' }, 600, function() {
			$e.css('display', 'none')
		})
	}
	if (spreadOut === "animate") {
		De.style.opacity = "0%"
		requestAnimationFrame(() => De.style.animation = animate)
	}
}

function initialize(mode, parameter) {
	if (mode == 'REPLAY') {
		isReplay = true
		if (typeof parameter !== 'undefined' && typeof parameter == 'number')
			gameMode = parameter
	} else {
		isReplay = false
		replayData = {
			keyList: {},
			seed: ~~(Math.random() * 2147483647),
			character: selectedSettings.NonIterable.Character,
			tuning: {},
			mode: mode ? mode : 0
		}
		actualCustomInit(mode)
		for (let i in settingsRange.Tuning) {
			replayData.tuning[i] = selectedSettings.Tuning[i]
		}
		replayData.tuning.name = selectedSettings.Names.Main

		gameMode = mode
	}
	let udjdj = replayData.seed
	gachamino.rng.seed = field.rng.seed = replayData.seed
	if ("player2" in replayData) {
		gachamino2.rng.seed = field2.rng.seed = replayData.player2.seed
	}

	setTimeout(function() {
		field.showResultAnimation("hide")
		field2.showResultAnimation("hide")
	}, 100)
	for (let i in settingsRange.Tuning) {
		field.pieceSettings[i] = replayData.tuning[i]
	}

	gachamino.reset()
	clear(_CTX.field)
	clear(_CTX.active)
	gachamino2.reset()
	clear(_CTX.field2)
	clear(_CTX.active2)
	field.loadCharacter()

	if ("player2" in replayData) {
		field2.loadCharacter("player2" in replayData ? replayData.player2.character : 0)
		for (let i in settingsRange.Tuning) {
			field2.pieceSettings[i] = replayData.player2.tuning[i]
		}
		field2.pieceSettings[`Ghost`] = selectedSettings.Other.Ghost
		field2.pieceSettings[`OUTL`] = selectedSettings.Other.Outline
	} else {
		field2.allAssetsLoaded = true
		field2.rectanim.allLoaded = true
	}
	field.new(10, 42)
	field2.new(10, 42)
	field2.isActive = "player2" in replayData
	customInit()
	field.pieceSettings[`Ghost`] = selectedSettings.Other.Ghost
	field.pieceSettings[`OUTL`] = selectedSettings.Other.Outline
	isPaused = false

	for (var e of $CN('stats-text'))
		e.innerHTML = ''

	keysPressed = 0
	keysLast = 0
	keysPressed2 = 0
	keysLast2 = 0
	playingFrame = 0

	frame = 0
	stopFrame = 0
	stoppingFrame = 400
	soundPlayer.selected.se = selectedSettings.Sound.SoundBank
	soundPlayer.load()
	field.resetFieldPosition()
	field2.resetFieldPosition()
	if (SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT) {
		if ("player2" in replayData) {
			docId("tetrion2").style.display = "flex"
		} else {
			docId("tetrion2").style.display = "none"
		}
	} else {
		docId("tetrion2").style.display = "none"
	}
	GtrisLoader.initLoad()
}

const initializeLoop = function() {
	actualFrame = 0
	StartTime = Date.now()
	if (!gameRunning) {
		gameRunner = setInterval(function() {
			syncTime = Math.floor((Date.now() - StartTime) / (1000 / MAIN_FPS))
			syncFrame = syncTime - actualFrame
			for (var i = 0; i < syncFrame; i++, actualFrame++)
				G_LOOP()
		}, 1000 / MAIN_FPS)
	}

	gameRunning = true
}

function gameStart(gametype, parameter) {
	if (GtrisLoader.loaded) {
		clear(_CTX.whole)
		docId("wholeCanvas").style.animation = "none"
		docId('replayCenter-station').innerHTML = docId("mode-parameter-station").innerHTML = ''
		musicPlayer.killAllMfx()
		musicPlayer.loadMfx(settingsList.Sound.Music[selectedSettings.Sound.Music].toLowerCase().replace(/ /g, '-'))
		musicPlayer.loadMfx("frenzy")
		musicPlayer.switchCurrent(settingsList.Sound.Music[selectedSettings.Sound.Music].toLowerCase().replace(/ /g, '-'))
		field.mainAssets["gtris-body"].style.opacity = 1
		field.mainAssets["gtris-body"].style.animation = 'none'
		field.mainAssets["gtris-body"].style.animationDuration = '4s'
		field.mainAssets["gtris-body"].style.animationTimingFunction = 'linear'
		field2.mainAssets["gtris-body"].style.opacity = 1
		field2.mainAssets["gtris-body"].style.animation = 'none'
		field2.mainAssets["gtris-body"].style.animationDuration = '4s'
		field2.mainAssets["gtris-body"].style.animationTimingFunction = 'linear'
		requestAnimationFrame(() => docId("gtris").style.animation = "none")
		initialize(gametype, parameter)
		activeMenu(false)
		docId('gtris').style.display = 'flex'
	}
}

var frame = 0,
	stoppingFrame = 0,
	playingFrame = 0
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
		case 5: {
			replayData.dsFrenzy = {
				timer: modeParameters.texts.dsfrenzy.TIMER[selectedSettings.Modes.dsfrenzy.TIMER],
				phase: modeParameters.texts.dsfrenzy.PHASE[selectedSettings.Modes.dsfrenzy.PHASE],
				fails: modeParameters.texts.dsfrenzy.FAILS[selectedSettings.Modes.dsfrenzy.FAILS],
			}
			break
		}
		case 6: {
			replayData.garbageSurvival = {
				autolevel: modeParameters.texts.survival.GALEVEL[selectedSettings.Modes.survival.GALEVEL],
				receptioncount: modeParameters.texts.survival.GRLIMIT[selectedSettings.Modes.survival.GRLIMIT],
				initduration: modeParameters.texts.survival.INIT[selectedSettings.Modes.survival.INIT],
			}
			break
		}
		case 7: {
			replayData.levelrun = {
				lines: modeParameters.texts.levelrun.LINE[selectedSettings.Modes.levelrun.LINE],
				level: modeParameters.texts.levelrun.LEVEL[selectedSettings.Modes.levelrun.LEVEL],
				linestorequire: modeParameters.texts.levelrun.LINEREQ[selectedSettings.Modes.levelrun.LINEREQ],
				aretype: selectedSettings.Modes.levelrun.ARETYPE,
				levelcap: modeParameters.texts.levelrun.LEVELCAP[selectedSettings.Modes.levelrun.LEVELCAP],
			}
			break
		}
		case 8: {
			replayData.area20 = {
				lines: modeParameters.texts.area20.LINE[selectedSettings.Modes.area20.LINE],
				level: modeParameters.texts.area20.LEVEL[selectedSettings.Modes.area20.LEVEL],
				linestorequire: modeParameters.texts.area20.LINEREQ[selectedSettings.Modes.area20.LINEREQ],
				levelcap: modeParameters.texts.area20.LEVELCAP[selectedSettings.Modes.area20.LEVELCAP],
			}
			break
		}
		case 9: {
			replayData.amogus = {
				timer: modeParameters.texts.amogus.TIMER[selectedSettings.Modes.amogus.TIMER],
			}
			break
		}
		case 10: {
			replayData.player2 = {
				character: selectedSettings.AI.Character,
				tuning: {
					DAS: 18,
					ARR: 1,
					GRAV: 0,
					SFT: selectedSettings.Tuning.SFT,
					LCK: 60,
					PREV: 5,
				},
				name: selectedSettings.Names.AI,
				keyList: {},
				seed: ~~(Math.random() * 2147483647),
			}
			replayData.versusGarbage = {
				receptioncount: modeParameters.texts.onevonegarb.GRLIMIT[selectedSettings.Modes.onevonegarb.GRLIMIT],
			}
			break
		}
		case 11: {
			replayData.player2 = {
				character: selectedSettings.AI.Character,
				tuning: {
					DAS: 18,
					ARR: 1,
					GRAV: 0,
					SFT: selectedSettings.Tuning.SFT,
					LCK: 60,
					PREV: 5,
				},
				name: selectedSettings.Names.AI,
				keyList: {},
				seed: ~~(Math.random() * 2147483647),
			}
			replayData.frenzyWar = {
				health: modeParameters.texts.frenzywar.HP[selectedSettings.Modes.frenzywar.HP],
				timer: modeParameters.texts.frenzywar.TIMER[selectedSettings.Modes.frenzywar.TIMER],
				phase: modeParameters.texts.frenzywar.PHASE[selectedSettings.Modes.frenzywar.PHASE],
			}
			break
		}

	}
}

function customInit() {
	var mode = gameMode
	$iH('namePlate', replayData.tuning.name == '' ? `???${selectedSettings.NonIterable.Character !== 0 ? ` (${gtris_character_details(settingsList.NonIterable.Character[selectedSettings.NonIterable.Character]).name})` : ''}` : replayData.tuning.name)
	scoreAtk.enableTimer(false)
	fourWide.enableTimer(false)
	garbageSurvival.init(0, 0, 0)
	amogusSus.init()
	amogusSus.enableTimer(false)
	preview.bag = [0, 1, 2, 3, 4, 5, 6]
	field.isC4W = false
	preview2.bag = [0, 1, 2, 3, 4, 5, 6]
	field2.isC4W = false
	var s = (num, tx) => docId(`stats${num}`).innerHTML = tx
	var t = (num, tx) => docId(`TEXT_stats${num}`).innerHTML = tx
	var s2 = (num, tx) => docId(`stats2-${num}`).innerHTML = tx
	var t2 = (num, tx) => docId(`TEXT_stats2-${num}`).innerHTML = tx

	field.openGarbageBar(false)
	field.openFrenzyBar()
	field.openFrenzy()
	field.initFrenzySettings({})
	field2.openGarbageBar(false)
	field2.openFrenzyBar()
	field2.openFrenzy()
	field2.initFrenzySettings({})
	for (var i = 2; i < 4; i++) {
		s2(i, ' ')
		t2(i, ' ')
	}

	if ("player2" in replayData) {
		$iH('namePlate2', replayData.player2.name == '' ? `???${replayData.player2.character !== 0 ? ` (${gtris_character_details(settingsList.NonIterable.Character[replayData.player2.character]).name})` : ''}` : replayData.player2.name)
		$iH("stopwatch2", returnStatistics(0))
		$iH("score2", 0)
		s2(1, 0)
		t2(1, gtris_transText('pieces', ['0.000']))
	}
	$iH("stopwatch", returnStatistics(0))
	$iH("score", 0)
	for (var i = 2; i < 4; i++) {
		s(i, ' ')
		t(i, ' ')
	}
	s(1, 0)
	t(1, gtris_transText('pieces', ['0.000']))
	switch (mode) {
		default: {
			s(2, "0")
			t(2, gtris_transText('lines'))
			field.canClearLines
			break
		}
		case 1: {
			field.lineLeft = replayData.lineRun.lines
			preview.bag = {
				0: [0, 1, 2, 3, 4, 5, 6],
				1: [0, 0, 0, 0, 0, 0, 0],
				2: [1, 2, 3, 4, 5, 6]
			} [replayData.lineRun.type]
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
		case 5: {
			field.are.frenzyEnt = 60
			field.openFrenzyBar(true)
			t(1, gtris_transText("dsfr_timer"))
			field.initFrenzySettings({ tMax: replayData.dsFrenzy.timer, phase: replayData.dsFrenzy.phase, fMax: replayData.dsFrenzy.fails })
			s(1, returnStatistics(field.initFrenzy.maxTimerGauge))
			if (field.initFrenzy.phase >= 13) {
				s(2, gtris_transText("dsfr_phase", "MAX"))
			} else {
				s(2, gtris_transText("dsfr_phase", field.initFrenzy.phase))
			}
			t(2, gtris_transText("dsfr_boardssuccess", [0, 0]))
			s(3, `0${field.frenzy.failMax < 2147483647 ? `/${field.frenzy.failMax}` : ""}`)
			t(3, gtris_transText("dsfr_fails"))
			break
		}
		case 6: {
			garbageSurvival.init(replayData.seed, replayData.garbageSurvival.initduration, replayData.garbageSurvival.autolevel)
			field.garbageLimit = replayData.garbageSurvival.receptioncount
			field.openGarbageBar(true)
			s(2, "0")
			t(2, gtris_transText("survival_apm", (0).toFixed(3)))
			break
		}
		case 7: {
			field.isGravityType = "marathon"
			field.level = replayData.levelrun.level
			field.levelMax = replayData.levelrun.levelcap
			field.lineLeft = replayData.levelrun.lines
			field.maxLevelLines = replayData.levelrun.linestorequire
			field.remainingLevelLines = field.maxLevelLines * field.level
			switch (replayData.levelrun.aretype) {
				case 0: {
					field.are.add.line = 0
					field.are.add.piece = 0
					break
				}
				case 1: {
					field.are.add.line = 20
					field.are.add.piece = 8
					break
				}
				case 2: {
					field.are.add.line = 90
					field.are.add.piece = 40
					break
				}
			}
			s(2, gtris_transText("level", field.level))
			t(2, gtris_transText("levelrun_lines", typeof field.lineLeft == "number" ? field.lineLeft : field.lineTotal))
			if (field.levelMax > field.level) {
				s(3, field.remainingLevelLines)
				t(3, gtris_transText("levelrun_lineReq"))
			}
			break
		}
		case 8: {
			field.isGravityType = "master"
			field.level = replayData.area20.level
			field.levelMax = replayData.area20.levelcap
			field.lineLeft = replayData.area20.lines
			field.maxLevelLines = replayData.area20.linestorequire
			field.remainingLevelLines = field.maxLevelLines * field.level
			field.are.add.line = 90
			field.are.add.piece = 50
			s(2, gtris_transText("machlevel", field.level))
			t(2, gtris_transText("area20_lines", typeof field.lineLeft == "number" ? field.lineLeft : field.lineTotal))
			if (field.levelMax > field.level) {
				s(3, field.remainingLevelLines)
				t(3, gtris_transText("area20_lineReq"))
			}
			break
		}
		case 9: {
			amogusSus.enableTimer(true)
			amogusSus.setTimer(replayData.amogus.timer)

			t(2, gtris_transText('amogus_sustimer'))
			s(2, returnStatistics(amogusSus.time))
			t(3, gtris_transText('amogus_suscounter'))
			s(3, "0")
			soundPlayer.custom.load({
				dir: "amogus",
				files: ["sus-exist", "sus-notexist"]
			})
			break
		}
		case 10: {
			field2.is1v1 = "garbage"
			field.is1v1 = "garbage"
			field2.openGarbageBar(true)
			field.openGarbageBar(true)
			field.garbageLimit = replayData.versusGarbage.receptioncount
			field2.garbageLimit = replayData.versusGarbage.receptioncount
			s(2, "0")
			t(2, gtris_transText("onevonegarb_apm", (0).toFixed(3)))
			s2(2, "0")
			t2(2, gtris_transText("onevonegarb_apm", (0).toFixed(3)))

			break
		}
		case 11: {
			soundPlayer.custom.load({
				dir: "frenzywar",
				files: ["frenzywar-swoosh", "frenzywar-mid", "frenzywar-bang2", "frenzywar-bang3light", "frenzywar-bang3heavy", "frenzywar-0hp"]
			})
			musicPlayer.loadMfx("fw-eval")
			field.is1v1 = field2.is1v1 = "frenzywar"
			field.are.frenzyEnt = 60
			field.openFrenzyBar(true)
			t(2, gtris_transText("frenzywar_timer"))
			field.initFrenzySettings({ tMax: replayData.frenzyWar.timer, phase: replayData.frenzyWar.phase, fMax: Infinity })
			s(2, returnStatistics(field.initFrenzy.maxTimerGauge))
			field.frenzyWarInit(replayData.frenzyWar.health)
			field.openGarbageBar("custom")
			field.checkGarbageBar((field.frenzyWar.health / field.frenzyWar.maxHealth), "#0ff")
			t(1, gtris_transText("frenzywar_health"))
			s(1, field.frenzyWar.health)

			field2.are.frenzyEnt = 60
			field2.openFrenzyBar(true)
			t2(2, gtris_transText("frenzywar_timer"))
			field2.initFrenzySettings({ tMax: replayData.frenzyWar.timer, phase: replayData.frenzyWar.phase, fMax: Infinity })
			s2(2, returnStatistics(field2.initFrenzy.maxTimerGauge))
			field2.frenzyWarInit(replayData.frenzyWar.health)
			field2.openGarbageBar("custom")
			field2.checkGarbageBar((field2.frenzyWar.health / field2.frenzyWar.maxHealth), "#0ff")
			t2(1, gtris_transText("frenzywar_health"))
			s2(1, field2.frenzyWar.health)
			break
		}
	}
	preview.init()
	preview.draw()
	if ("player2" in replayData) {
		preview2.init()
		preview2.draw()
	}
}

function G_LOOP() {
	soundPlayer.resetUsed()
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
		if ("player2" in replayData)
			if (frame == 120 * 3 && field2.are.frenzyEnt <= 0) {
				gachamino2.new(preview2.next())
			}
		if (frame == 120 * 3 && field.are.frenzyEnt <= 0) {
			gachamino.new(preview.next())
		}
		if (field.isActive)
			P_UPDATE()
		if ("player2" in replayData)
			if (field2.isActive)
				P_UPDATE2()
		if (frame > 120 * 3) {
			playingFrame++
			if (field.isActive)
				P_ARE()
			if ("player2" in replayData)
				if (field2.isActive)
					P_ARE2()
			G_ACTIVITY()
		}
		Statistics()
		field.rectanim.loop()
		if ("player2" in replayData) {
			field2.rectanim.loop()
			Statistics2()
		}
	} else if (!gameRunning) {
		keysLast = keysPressed = 0
		stoppingFrame--
		if (stoppingFrame == 0) {
			showEndMenu()
		}
	}
	if (selectedSettings.Other.Particle >= 1)
		GTRISParticleManagement.refresh("whole")
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
		gachamino.hold()
	}
	if (keysPressed & flags.CW && !(keysLast & flags.CW)) {
		gachamino.rotate(1)
	}
	if (keysPressed & flags.CCW && !(keysLast & flags.CCW)) {
		gachamino.rotate(-1)
	}
	if (keysPressed & flags[`180DEG`] && !(keysLast & flags[`180DEG`])) {
		gachamino.rotate180()
	}
	gachamino.DASPreloadAndCheckShift(keysPressed, keysLast)
	if (keysPressed & flags.SDROP) {
		gachamino.shiftDown()
	}
	if (keysPressed & flags.HDROP && !(keysLast & flags.HDROP)) {
		gachamino.hardDrop()
	}

	gachamino.update()
	gachamino.simulateDraw()

	keysLast = keysPressed

}

function P_UPDATE2() {
	if ("player2" in replayData) {

		if (keysPressed2 !== keysLast2 && !isReplay) {
			replayData.player2.keyList[frame] = keysPressed2
		} else if (frame in replayData.player2.keyList) {
			keysPressed2 = replayData.player2.keyList[frame]
			if (replayData.keyList[frame] == 'end') {
				endGame('replayended', true, 'lose')
			}
		}
		if (keysPressed2 & flags.HOLD && !(keysLast2 & flags.HOLD)) {
			gachamino2.hold()
		}
		if (keysPressed2 & flags.CW && !(keysLast2 & flags.CW)) {
			gachamino2.rotate(1)
		}
		if (keysPressed2 & flags.CCW && !(keysLast2 & flags.CCW)) {
			gachamino2.rotate(-1)
		}
		if (keysPressed2 & flags[`180DEG`] && !(keysLast2 & flags[`180DEG`])) {
			gachamino2.rotate180()
		}
		gachamino2.DASPreloadAndCheckShift(keysPressed2, keysLast2)
		if (keysPressed2 & flags.SDROP) {
			gachamino2.shiftDown()
		}
		if (keysPressed2 & flags.HDROP && !(keysLast2 & flags.HDROP)) {
			gachamino2.hardDrop()
		}

		gachamino2.update()
		gachamino2.simulateDraw()

		keysLast2 = keysPressed2

		if (!isReplay)
			gtrisAI.run()
	}
}


function P_ARE() {
	if (field.are.line >= 0 || field.are.piece >= 0 || field.are.del >= 0 || field.are.next >= 0 || field.are.frenzyEnt >= 0 || field.are.frenzyExt >= 0) {
		if (field.are.line >= 0) {
			field.are.line--
		} else
		if (field.are.frenzyEnt >= 0) {
			field.are.frenzyEnt--
		} else
		if (field.are.frenzyExt >= 0) {
			field.are.frenzyExt--
			field.are.next = -8
		} else
		if (field.are.next >= 0) {
			field.are.next--
		} else
		if (field.are.del >= 0) {
			field.are.del--
		} else
		if (field.are.failing >= 0) {
			field.are.failing--
		} else
		if (field.are.piece >= 0) {
			field.are.piece--
		}
		if (field.are.line == 0) {
			field.removeLines()
			if (field.are.piece < 0) {
				if (frame > 120 * 3 && (field.isFrenzy || field.is1v1 !== "frenzywar"))
					gachamino.new(preview.next())
			}
		}
		if (field.are.frenzyEnt == 0) {
			field.are.add.piece = 10
			field.are.add.line = 50
			field.are.del = 30
			field.frenzy.startingFrenzy = true
			field.mainAssets["gtris-body"].style.opacity = "0%"
			field.mainAssets["gtris-body"].style.animationDuration = '0.3s'
			field.mainAssets["gtris-body"].style.animationName = "boardFrenzyIn"
			field.are.piece = 40
			field.showResultAnimation('frenzy', gtris_transText("dsfr_frenzy"))
			if (field.isFrenzyOngoing == false && field2.isFrenzyOngoing == false)
				musicPlayer.playMfx('frenzy')
			if (field.canVoiceFrenzy) {
				field.playVoice('frenzy')
				field.canVoiceFrenzy = false
			}
			soundPlayer.playse('frenzy')
			field.frenzySetTimer()
			field.isFrenzyOngoing = true
		}
		if (field.are.frenzyExt == 0) {
			field.isFrenzyOngoing = false
			if (field.isFrenzyOngoing == false && field2.isFrenzyOngoing == false)
				musicPlayer.playMfx(settingsList.Sound.Music[selectedSettings.Sound.Music].toLowerCase().replace(/ /g, '-'))
			field.are.add.piece = 0
			field.are.add.line = 0
			field.are.del = 50
			field.showResultAnimation('hide')
			field.frenzy.endingFrenzy = true
			field.frenzy.timerEnabled = false
			field.mainAssets["gtris-body"].style.opacity = "0%"
			field.mainAssets["gtris-body"].style.animationDuration = '0.3s'
			field.mainAssets["gtris-body"].style.animationName = "boardFrenzyIn"
			field.are.piece = 26
		}
		if (field.are.del == 0 && !field.isFrenzy && !field.frenzy.endingFrenzy && field.frenzy.startingFrenzy) {
			field.showClearText('hide')
			field.showClearTextREN('hide')
			field.showClearTextTSPIN('hide')
			field.showClearTextB2B('hide')
			field.sendReceiveTempField('send')
			field.renInteger = -1
			field.b2b = -1
			gachamino.openHold()
			field.are.del = 100
			field.frenzy.phase = field.initFrenzy.phase
			frenzy.putMap(field.frenzy.phase, field.rng.next(), field.rng.next(), field.rng.next())
			field.frenzy.initVoice = -1
			field.mainAssets["gtris-body"].style.animationDuration = '0.3s'
			field.mainAssets["gtris-body"].style.animationName = "boardFrenzyOut"
			field.mainAssets["gtris-body"].style.opacity = "100%"
			field.openFrenzy(true)
			field.isFrenzy = true
			field.checkWarning('warning')
			field.changeFrenzyColor("restore")
		}
		if (field.are.failing == 0) {
			field.fieldResult('dsfr_failed', true, 'lose')
			endGame("dsfr_failed", "lose")
		}
		if (field.isFrenzy) {
			if (field.are.del == 0) {
				if (field.frenzy.endingFrenzy) {
					field.showClearText('hide')
					field.showClearTextREN('hide')
					field.showClearTextTSPIN('hide')
					field.showClearTextB2B('hide')
					field.sendReceiveTempField('receive')
					if (field.frenzy.failTrigger) {
						field.playVoice("fail")
					}
					if (field.frenzy.successTrigger) {
						field.playVoice("success")
					}
					field.are.next = 70
					field.frenzy.failTrigger = false
					field.frenzy.successTrigger = false
					gachamino.openHold(true)
					field.frenzy.initVoice = -1
					field.mainAssets["gtris-body"].style.animationDuration = '0.3s'
					field.mainAssets["gtris-body"].style.animationName = "boardFrenzyOut"
					field.mainAssets["gtris-body"].style.opacity = "100%"
					field.openFrenzy()
					field.isFrenzy = false
					field.frenzy.endingFrenzy = false
					field.draw()
					if (hold.piece !== void 0) hold.draw()
					preview.draw()
					if (field.renInteger > 0) field.showClearTextREN('show', gtris_transText('combo', field.renInteger))
					if (field.b2b > 0) field.showClearTextB2B('show', `B2B x${field.b2b}`)
					field.checkWarning()
				} else if (field.frenzy.startingFrenzy == true) {
					field.frenzy.timerEnabled = true
					field.frenzy.startingFrenzy = false
				}
			}

			if (field.are.next == 0) {
				if (field.frenzy.successTrigger == true || field.frenzy.failTrigger == true) {
					field.changeFrenzyColor("chamge", undefined, "")
					field.frenzy.boards++
				}
				if (field.frenzy.failTrigger == true) {
					frenzy.putMap(field.frenzy.phase, field.rng.next(), field.rng.next(), field.rng.next())
					field.frenzy.initVoice = -1
					field.playVoice('fail')
					field.frenzy.failTrigger = false
				}
				if (field.frenzy.successTrigger == true) {
					field.frenzy.phase++
					frenzy.putMap(field.frenzy.phase, field.rng.next(), field.rng.next(), field.rng.next())
					field.frenzy.initVoice = -1
					field.playVoice('success')
					field.frenzy.successTrigger = false
				}

			}
		}
		if (field.are.piece == 0) {
			if (frame > 120 * 3 && (field.isFrenzy || field.is1v1 !== "frenzywar"))
				gachamino.new(preview.next())
		}
	}
	field.frenzyTimerRun()
	field.checkFrenzyBar()
}

function P_ARE2() {
	if (field2.are.line >= 0 || field2.are.piece >= 0 || field2.are.del >= 0 || field2.are.next >= 0 || field2.are.frenzyEnt >= 0 || field2.are.frenzyExt >= 0) {
		if (field2.are.line >= 0) {
			field2.are.line--
		} else
		if (field2.are.frenzyEnt >= 0) {
			field2.are.frenzyEnt--
		} else
		if (field2.are.frenzyExt >= 0) {
			field2.are.frenzyExt--
			field2.are.next = -8
		} else
		if (field2.are.next >= 0) {
			field2.are.next--
		} else
		if (field2.are.del >= 0) {
			field2.are.del--
		} else
		if (field2.are.failing >= 0) {
			field2.are.failing--
		} else
		if (field2.are.piece >= 0) {
			field2.are.piece--
		}
		if (field2.are.line == 0) {
			field2.removeLines()
			if (field2.are.piece < 0) {
				if (frame > 120 * 3(field2.isFrenzy || field2.is1v1 !== "frenzywar"))
					gachamino2.new(preview2.next())
			}
		}
		if (field2.are.frenzyEnt == 0) {
			field2.are.add.piece = 10
			field2.are.add.line = 50
			field2.are.del = 30
			field2.frenzy.startingFrenzy = true
			field2.mainAssets["gtris-body"].style.opacity = "0%"
			field2.mainAssets["gtris-body"].style.animationDuration = '0.3s'
			field2.mainAssets["gtris-body"].style.animationName = "boardFrenzyIn"
			field2.are.piece = 40
			field2.showResultAnimation('frenzy', gtris_transText("dsfr_frenzy"))
			if (field.isFrenzyOngoing == false && field2.isFrenzyOngoing == false)
				musicPlayer.playMfx('frenzy')
			if (field2.canVoiceFrenzy) {
				field2.playVoice('frenzy')
				field2.canVoiceFrenzy = false
			}
			soundPlayer.playse('frenzy')
			field2.frenzySetTimer()
			field2.isFrenzyOngoing = true
		}
		if (field2.are.frenzyExt == 0) {
			field2.isFrenzyOngoing = false
			if (field.isFrenzyOngoing == false && field2.isFrenzyOngoing == false)
				musicPlayer.playMfx(settingsList.Sound.Music[selectedSettings.Sound.Music].toLowerCase().replace(/ /g, '-'))
			field2.are.add.piece = 0
			field2.are.add.line = 0
			field2.are.del = 50
			field2.showResultAnimation('hide')
			field2.frenzy.endingFrenzy = true
			field2.frenzy.timerEnabled = false
			field2.mainAssets["gtris-body"].style.opacity = "0%"
			field2.mainAssets["gtris-body"].style.animationDuration = '0.3s'
			field2.mainAssets["gtris-body"].style.animationName = "boardFrenzyIn"
			field2.are.piece = 26
		}
		if (field2.are.del == 0 && !field2.isFrenzy && !field2.frenzy.endingFrenzy && field2.frenzy.startingFrenzy) {
			field2.showClearText('hide')
			field2.showClearTextREN('hide')
			field2.showClearTextTSPIN('hide')
			field2.showClearTextB2B('hide')
			field2.sendReceiveTempField('send')
			field2.renInteger = -1
			field2.b2b = -1
			gachamino2.openHold()
			field2.are.del = 100
			field2.frenzy.phase = field2.initFrenzy.phase
			frenzy2.putMap(field2.frenzy.phase, field2.rng.next(), field2.rng.next(), field2.rng.next())
			field2.frenzy.initVoice = -1
			field2.mainAssets["gtris-body"].style.animationDuration = '0.3s'
			field2.mainAssets["gtris-body"].style.animationName = "boardFrenzyOut"
			field2.mainAssets["gtris-body"].style.opacity = "100%"
			field2.openFrenzy(true)
			field2.isFrenzy = true
			field2.checkWarning('warning')
			field2.changeFrenzyColor("restore")
		}
		if (field2.are.failing == 0) {
			field2.field2Result('dsfr_failed', true, 'lose')
			endGame("dsfr_failed", "lose")
		}
		if (field2.isFrenzy) {
			if (field2.are.del == 0) {
				if (field2.frenzy.endingFrenzy) {
					field2.showClearText('hide')
					field2.showClearTextREN('hide')
					field2.showClearTextTSPIN('hide')
					field2.showClearTextB2B('hide')
					field2.sendReceiveTempField('receive')
					if (field2.frenzy.failTrigger) {
						field2.playVoice("fail")
					}
					if (field2.frenzy.successTrigger) {
						field2.playVoice("success")
					}
					field2.are.next = 70
					field2.frenzy.failTrigger = false
					field2.frenzy.successTrigger = false
					gachamino2.openHold(true)
					field2.frenzy.initVoice = -1
					field2.mainAssets["gtris-body"].style.animationDuration = '0.3s'
					field2.mainAssets["gtris-body"].style.animationName = "boardFrenzyOut"
					field2.mainAssets["gtris-body"].style.opacity = "100%"
					field2.openFrenzy()
					field2.isFrenzy = false
					field2.frenzy.endingFrenzy = false
					field2.draw()
					if (hold2.piece !== void 0) hold2.draw()
					preview2.draw()
					if (field2.renInteger > 0) field2.showClearTextREN('show', gtris_transText('combo', field2.renInteger))
					if (field2.b2b > 0) field2.showClearTextB2B('show', `B2B x${field2.b2b}`)
					field2.checkWarning()
				} else if (field2.frenzy.startingFrenzy == true) {
					field2.frenzy.timerEnabled = true
					field2.frenzy.startingFrenzy = false
				}
			}

			if (field2.are.next == 0) {
				if (field2.frenzy.successTrigger == true || field2.frenzy.failTrigger == true) {
					field2.changeFrenzyColor("chamge", undefined, "")
					field2.frenzy.boards++
				}
				if (field2.frenzy.failTrigger == true) {
					frenzy2.putMap(field2.frenzy.phase, field2.rng.next(), field2.rng.next(), field2.rng.next())
					field2.frenzy.initVoice = -1
					field2.playVoice('fail')
					field2.frenzy.failTrigger = false
				}
				if (field2.frenzy.successTrigger == true) {
					field2.frenzy.phase++
					frenzy2.putMap(field2.frenzy.phase, field2.rng.next(), field2.rng.next(), field2.rng.next())
					field2.frenzy.initVoice = -1
					field2.playVoice('success')
					field2.frenzy.successTrigger = false
				}

			}
		}
		if (field2.are.piece == 0) {
			if (frame > 120 * 3 && (field2.isFrenzy || field2.is1v1 !== "frenzywar")) {
				gachamino2.new(preview2.next())
			}
		}
	}
	field2.frenzyTimerRun()
	field2.checkFrenzyBar()
}

function Statistics() {
	if (gameRunning && frame > 120 * 3) {
		var time = playingFrame
		var seconds = ((time / 120) % 60).toFixed(3)
		var minutes = (Math.floor((time) / (3600 * 2))).toFixed(0)
		$iH('stopwatch', gtris_transText('main_timer', [minutes, `${seconds<10?'0':''}${seconds}`]))
	}
}

function Statistics2() {
	if (gameRunning && frame > 120 * 3) {
		var time = playingFrame
		var seconds = ((time / 120) % 60).toFixed(3)
		var minutes = (Math.floor((time) / (3600 * 2))).toFixed(0)
		$iH('stopwatch2', gtris_transText('main_timer', [minutes, `${seconds<10?'0':''}${seconds}`]))
	}
}

function returnStatistics(e) {
	var time = Math.max(e, 0)
	var seconds = ((time / 120) % 60).toFixed(3)
	var minutes = (Math.floor((time) / (3600 * 2))).toFixed(0)
	return gtris_transText('main_timer', [minutes, `${seconds<10?'0':''}${seconds}`])
}

function endGame(title, winlose) {
	if (gameRunning)
		replayData.keyList[frame + 40] = 'end'
	musicPlayer.killAllMfx()
	musicPlayer.muteAllMfx()

	if (winlose == 'win') {
		soundPlayer.playse('game-win')
	}
	else if (winlose == 'lose') {}
	else if (winlose == void 0) {
		soundPlayer.playse('game-lose')
	}
	field.checkWarning('stop')
	if ("player2" in replayData)
		field.checkWarning('stop')
	stopFrame = frame - 1
	isPaused = false
	gameRunning = false
	countDownText('')
	titleTemplate = title
}

function showEndMenu() {
	var title = titleTemplate
	clearInterval(gameRunner)
	activeMenu(true, 0.5, true)
	switchMenu(8, true, typeof title !== 'object' ? gtris_transText(title) : gtris_transText(title.name, title.array), "startPoint")

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
	switch (gameMode) {
		default: {
			$iH('stats1', `${field.pieces}`)
			$iH('TEXT_stats1', gtris_transText('pieces', (field.pieces / ((frame - (120 * 3)) / 120)).toFixed(3)))
			docId('stats2').innerHTML = field.lineTotal
			break
		}
		case 1: {
			$iH('stats1', `${field.pieces}`)
			$iH('TEXT_stats1', gtris_transText('pieces', (field.pieces / ((frame - (120 * 3)) / 120)).toFixed(3)))

			docId('stats2').innerHTML = Math.max(field.lineLeft, 0)
			if (field.lineLeft < 1) {
				field.fieldResult('l_success', false, 'win')
				endGame('l_success', 'win')
			}
			break
		}
		case 2: {
			scoreAtk.run(frame > 120 * 3)
			$iH('stats1', `${field.pieces}`)
			$iH('TEXT_stats1', gtris_transText('pieces', (field.pieces / ((frame - (120 * 3)) / 120)).toFixed(3)))

			docId('stats2').innerHTML = returnStatistics(scoreAtk.returnTimer())
			break
		}
		case 3: {
			fourWide.run(frame > 120 * 3)
			$iH('stats1', `${field.pieces}`)
			$iH('TEXT_stats1', gtris_transText('pieces', (field.pieces / ((frame - (120 * 3)) / 120)).toFixed(3)))

			docId('stats2').innerHTML = returnStatistics(fourWide.returnTimer())
			docId('stats3').innerHTML = field.statistics.maxREN
			break
		}
		case 4: {
			$iH('stats1', `${field.pieces}`)
			$iH('TEXT_stats1', gtris_transText('pieces', (field.pieces / ((frame - (120 * 3)) / 120)).toFixed(3)))

			docId('stats2').innerHTML = field.statistics.tsd
			break
		}
		case 5: {
			if (field.frenzy.phase >= 13) {
				$iH("stats2", gtris_transText("dsfr_phase", "MAX"))
			} else {
				$iH("stats2", gtris_transText("dsfr_phase", field.frenzy.phase))
			}
			$iH("TEXT_stats2", gtris_transText("dsfr_boardssuccess", [field.frenzy.boards, field.frenzy.successes]))
			$iH("stats3", `${field.frenzy.fails}${field.frenzy.failMax < 2147483647 ? `/${field.frenzy.failMax}` : ""}`)
			if (field.isFrenzy)
				$iH('stats1', returnStatistics(Math.max(field.frenzy.timer, 0)))
			if (field.are.frenzyExt == 0 && field.are.failing < 0) {
				field.openFrenzy()
				field.fieldResult('dsfr_timeup', false, 'win')
				endGame("dsfr_timeup", "win")
			}
			break
		}
		case 6: {
			$iH('stats1', `${field.pieces}`)
			$iH('TEXT_stats1', gtris_transText('pieces', (field.pieces / ((frame - (120 * 3)) / 120)).toFixed(3)))

			garbageSurvival.run(playingFrame, function(count, row) {
				field.addGarbageToArray(count, row)
			})
			$iH("stats2", field.statistics.atk)
			$iH("TEXT_stats2", gtris_transText("survival_apm", (field.statistics.atk / (playingFrame / (120 * 60))).toFixed(3)))
			break
		}
		case 7: {
			$iH('stats1', `${field.pieces}`)
			$iH('TEXT_stats1', gtris_transText('pieces', (field.pieces / ((frame - (120 * 3)) / 120)).toFixed(3)))

			$iH("stats2", gtris_transText("level", field.level))
			$iH("TEXT_stats2", gtris_transText("levelrun_lines", typeof field.lineLeft == "number" ? field.lineLeft : field.lineTotal))
			if (field.levelMax > field.level) {
				$iH("stats3", field.remainingLevelLines)
				$iH("TEXT_stats3", gtris_transText("levelrun_lineReq"))
			} else {
				$iH("stats3", "")
				$iH("TEXT_stats3", "")
			}
			if (typeof field.lineLeft === "number") {
				if (field.lineLeft <= 0 && field.are.line < 0) {
					field.fieldResult('levelrun_success', false, 'win')
					endGame('levelrun_success', 'win')
				}
			}
			break
		}
		case 8: {
			$iH('stats1', `${field.pieces}`)
			$iH('TEXT_stats1', gtris_transText('pieces', (field.pieces / ((frame - (120 * 3)) / 120)).toFixed(3)))

			$iH("stats2", gtris_transText("machlevel", field.level))
			$iH("TEXT_stats2", gtris_transText("area20_lines", typeof field.lineLeft == "number" ? field.lineLeft : field.lineTotal))
			if (field.levelMax > field.level) {
				$iH("stats3", field.remainingLevelLines)
				$iH("TEXT_stats3", gtris_transText("area20_lineReq"))
			} else {
				$iH("stats3", "")
				$iH("TEXT_stats3", "")
			}
			if (typeof field.lineLeft === "number") {
				if (field.lineLeft <= 0) {
					field.fieldResult('area20_success', false, 'win')
					endGame('area20_success', 'win')
				}
			}
			break
		}
		case 9: {
			$iH('stats1', `${field.pieces}`)
			$iH('TEXT_stats1', gtris_transText('pieces', (field.pieces / ((frame - (120 * 3)) / 120)).toFixed(3)))

			amogusSus.run(frame > 120 * 3)
			amogusSus.detect(
				field.pieces,
				field.grid,
				function(e) {
					switch (e) {
						case "yes": {
							soundPlayer.custom.playse("amogus/sus-exist")
							amogusSus.susCounter++
							break
						}
						case "no": {
							soundPlayer.custom.playse("amogus/sus-notexist")
							break
						}
					}
					gachamino.y -= 9393
					preview.modifyBag(preview.gen(), 1)
					gachamino.dirty = true
					gachamino.new(preview.next())
					gachamino.draw()
					gachamino.drawGhost()
					hold.piece = void 0
					clear(_CTX.hold)
					field.clearGrid()
				},
			)
			$iH("stats3", amogusSus.susCounter)
			$iH("stats2", returnStatistics(amogusSus.returnTimer()))
			break
		}
		case 10: {
			$iH('stats1', `${field.pieces}`)
			$iH('TEXT_stats1', gtris_transText('pieces', (field.pieces / ((frame - (120 * 3)) / 120)).toFixed(3)))
			$iH('stats2-1', `${field2.pieces}`)
			$iH('TEXT_stats2-1', gtris_transText('pieces', (field2.pieces / ((frame - (120 * 3)) / 120)).toFixed(3)))
			$iH('stats2', `${field.statistics.atk}`)
			$iH('TEXT_stats2', gtris_transText('onevonegarb_apm', (field.statistics.atk / (playingFrame / (120 * 60))).toFixed(3)))
			$iH('stats2-2', `${field2.statistics.atk}`)
			$iH('TEXT_stats2-2', gtris_transText('onevonegarb_apm', (field2.statistics.atk / (playingFrame / (120 * 60))).toFixed(3)))
			break
		}
		case 11: {
			$iH('stats2', `${returnStatistics(field.frenzy.timer)}`)
			$iH('stats1', `${field.frenzyWar.health}`)
			$iH('stats2-2', `${returnStatistics(field2.frenzy.timer)}`)
			$iH('stats2-1', `${field2.frenzyWar.health}`)
			frenzyWar.run(field.are.frenzyEnt < 0 && field.isFrenzy == false &&
				field2.are.frenzyEnt < 0 && false == field2.isFrenzy && field.are.del < 0 &&
				field2.are.del < 0,
				function(time) {
					switch (time) {
						case 15 * 120: {
							if (field.frenzyWar.garbageContributed > 0 || field2.frenzyWar.garbageContributed > 0) {
								soundPlayer.custom.playse("frenzywar/frenzywar-swoosh")
								countDownText("frenzywar_ready", "animate", false, "frenzyWar-ready 2s 1 linear")
								musicPlayer.killAllMfx()
							} else {
								frenzyWar.timer = 2 * 120
							}
							break
						}
						case 13.5 * 120: {
							docId("wholeCanvas").style.animation = "frenzyWar-fadeInBlack 0.6s 1 linear"
							docId("wholeCanvas").style.background = "#000"
							break
						}
						case 13 * 120: {
							musicPlayer.playMfx("fw-eval")
							field.playVoice("fwar_enter")
							field2.playVoice("fwar_enter")
							docId("wholeCanvas").style.animation = "frenzyWar-fadeOutWhite 1s 1 linear"
							docId("wholeCanvas").style.background = "rgba(0,0,0,0)"
							docId("gtris").style.animation = "frenzyWar-rainbow 0.6s infinite linear"
							field.openFrenzy(true)
							field2.openFrenzy(true)
							docId(field.mainAssets.colorFrenzyOverlay).style.animation = "frenzyWar-rainbow 0.4s infinite linear"
							docId(field.mainAssets.dynamicFrenzyBg).style.animationDuration = `200ms`
							field.mainAssets["gtris-body"].style.animation = `frenzyWar-shake 0.5s infinite linear -${Math.random() * 1000}ms`

							docId(field.mainAssets.perfectClear1).style.animation = "frenzyWar-showDmg 1s 1 ease-out"
							docId(field2.mainAssets.perfectClear1).style.animation = "frenzyWar-showDmg 1s 1 ease-out"

							$iH(field.mainAssets.perfectClear1, field.frenzyWar.garbageContributed)
							$iH(field2.mainAssets.perfectClear1, field2.frenzyWar.garbageContributed)

							$iH(field.mainAssets.frenzyTimerText, "")
							$iH(field2.mainAssets.frenzyTimerText, "")

							docId(field2.mainAssets.colorFrenzyOverlay).style.animation = "frenzyWar-rainbow 0.4s infinite linear"
							docId(field2.mainAssets.dynamicFrenzyBg).style.animationDuration = `200ms`
							field2.mainAssets["gtris-body"].style.animation = `frenzyWar-shake 0.5s infinite linear -${Math.random() * 1000}ms`

							requestAnimationFrame(() => countDownText("frenzywar_start", "animate", false, "frenzyWar-start 2s 1 linear"))
							soundPlayer.custom.playse("frenzywar/frenzywar-mid")

							field2.rectanim.execute("s5")
							field.rectanim.execute("s5")
							frenzyWar.timer -= 4 * 120
							if (field.frenzyWar.garbageContributed == 0 || field2.frenzyWar.garbageContributed == 0) {
								frenzyWar.timer -= (3 * 120) + 30
							}

							break
						}
						case 6 * 120: {
							docId("wholeCanvas").style.animation = "none"
							break
						}
						case 5 * 120: {
							docId("wholeCanvas").style.animation = "none"
							requestAnimationFrame(() => docId("wholeCanvas").style.animation = "frenzyWar-fadeOutWhite 1s 1 linear")
							docId("wholeCanvas").style.background = "rgba(0,0,0,0)"
							docId("gtris").style.animation = "none"
							musicPlayer.killAllMfx()
							docId(field.mainAssets.colorFrenzyOverlay).style.animation = "none"
							docId(field.mainAssets.dynamicFrenzyBg).style.animationDuration = `2200ms`
							field.mainAssets["gtris-body"].style.animation = "nonr"

							docId(field.mainAssets.perfectClear1).style.animation = "none"
							docId(field2.mainAssets.perfectClear1).style.animation = "none"

							$iH(field.mainAssets.frenzyTimerText, "")
							$iH(field2.mainAssets.frenzyTimerText, "")

							docId(field2.mainAssets.colorFrenzyOverlay).style.animation = "none"
							docId(field2.mainAssets.dynamicFrenzyBg).style.animationDuration = `2200ms`
							field2.mainAssets["gtris-body"].style.animation = "none"
							field.openFrenzy(false)
							field2.openFrenzy(false)
							GTRISParticle.particles = []
							break
						}
						case (5 * 120) - 2: {
							if (field.frenzyWar.garbageContributed > 0 && field2.frenzyWar.garbageContributed > 0) {
								if (SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT) {
									GTRISParticleManagement.addParticle(
										0,
										0,
										getElemPos(field.mainAssets.playField, "x") + (getElemPos(field.mainAssets.playField, "width") / 2),
										getElemPos(field.mainAssets.playField, "y") + (getElemPos(field.mainAssets.playField, "height") / 2),
										SCREEN_WIDTH / 2,
										SCREEN_HEIGHT / 2,
										120,
										5,
										"ease2"
									)
									if (selectedSettings.Other.Particle >= 2 && SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT)
										for (var t = 0; t < 10; t++)
											GTRISParticleManagement.addParticle(
												0,
												0,
												getElemPos(field.mainAssets.playField, "x") + (getElemPos(field.mainAssets.playField, "width") / 2),
												getElemPos(field.mainAssets.playField, "y") + (getElemPos(field.mainAssets.playField, "height") / 2),
												SCREEN_WIDTH * Math.random(),
												SCREEN_HEIGHT * Math.random(),
												50,
												2,
												"hardDrop"
											)

								}
								if (SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT) {
									GTRISParticleManagement.addParticle(
										0,
										0,
										getElemPos(field2.mainAssets.playField, "x") + (getElemPos(field2.mainAssets.playField, "width") / 2),
										getElemPos(field2.mainAssets.playField, "y") + (getElemPos(field2.mainAssets.playField, "height") / 2),
										SCREEN_WIDTH / 2,
										SCREEN_HEIGHT / 2,
										120,
										5,
										"ease2"
									)
         if (selectedSettings.Other.Particle >= 2 && SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT)
										for (var t = 0; t < 10; t++)
											GTRISParticleManagement.addParticle(
												0,
												0,
												getElemPos(field2.mainAssets.playField, "x") + (getElemPos(field2.mainAssets.playField, "width") / 2),
												getElemPos(field2.mainAssets.playField, "y") + (getElemPos(field2.mainAssets.playField, "height") / 2),
												SCREEN_WIDTH * Math.random(),
												SCREEN_HEIGHT * Math.random(),
												120,
												2,
												"hardDrop"
											)

								}
							} else {
								frenzyWar.timer -= (1 * 120) + 2
								if (field.frenzyWar.garbageContributed > 0) {
									if (SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT)
										GTRISParticleManagement.addParticle(
											0,
											0,
											getElemPos(field.mainAssets.playField, "x") + (getElemPos(field.mainAssets.playField, "width") / 2),
											getElemPos(field.mainAssets.playField, "y") + (getElemPos(field.mainAssets.playField, "height") / 2),
											getElemPos(field2.mainAssets.playField, "x") + (getElemPos(field2.mainAssets.playField, "width") / 2),
											getElemPos(field2.mainAssets.playField, "y") + (getElemPos(field2.mainAssets.playField, "height") / 2),
											120,
											5,
											"ease2"
										)
								}
								else if (field2.frenzyWar.garbageContributed > 0) {
									if (SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT)
										GTRISParticleManagement.addParticle(
											0,
											0,
											getElemPos(field2.mainAssets.playField, "x") + (getElemPos(field2.mainAssets.playField, "width") / 2),
											getElemPos(field2.mainAssets.playField, "y") + (getElemPos(field2.mainAssets.playField, "height") / 2),
											getElemPos(field.mainAssets.playField, "x") + (getElemPos(field.mainAssets.playField, "width") / 2),
											getElemPos(field.mainAssets.playField, "y") + (getElemPos(field.mainAssets.playField, "height") / 2),
											120,
											5,
											"ease2"
										)
								}
        

							}
							soundPlayer.custom.stopse("frenzywar/frenzywar-mid")
							soundPlayer.custom.playse("frenzywar/frenzywar-swoosh")
							break
						}
						case 4 * 120: {
							soundPlayer.custom.playse("frenzywar/frenzywar-bang2")
							let EVALUATE = field.frenzyWar.garbageContributed - field2.frenzyWar.garbageContributed
							if(field.frenzyWar.garbageContributed !== 0 && field2.frenzyWar.garbageContributed !== 0){
								if (selectedSettings.Other.Particle >= 2 && SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT)
										for (var t = 0; t < 10; t++)
											GTRISParticleManagement.addParticle(
												0,
												Math.round(Math.random() * 10),
            SCREEN_WIDTH / 2,
            SCREEN_HEIGHT / 2,
            SCREEN_WIDTH * Math.random(),
												SCREEN_HEIGHT * Math.random(),
												60,
												3,
												"hardDrop"
											)
							}
							if (EVALUATE < 0) {
								if(SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT)
								GTRISParticleManagement.addParticle(
									0,
									0,
									SCREEN_WIDTH / 2,
									SCREEN_HEIGHT / 2,
									getElemPos(field.mainAssets.playField, "x") + (getElemPos(field.mainAssets.playField, "width") / 2),
									getElemPos(field.mainAssets.playField, "y") + (getElemPos(field.mainAssets.playField, "height") / 2),

									120,
									5,
									"ease2"
								)
							} else if (EVALUATE > 0) {
								if(SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT)
								GTRISParticleManagement.addParticle(
									0,
									0,
									SCREEN_WIDTH / 2,
									SCREEN_HEIGHT / 2,
									getElemPos(field2.mainAssets.playField, "x") + (getElemPos(field2.mainAssets.playField, "width") / 2),
									getElemPos(field2.mainAssets.playField, "y") + (getElemPos(field2.mainAssets.playField, "height") / 2),

									120,
									5,
									"ease2"
								)
							} else if (EVALUATE == 0) {
								field2.playVoice("fwar_send1")
								field.playVoice("fwar_send1")
								frenzyWar.timer -= 130
							}
							break
						}
						case 3 * 120: {
							let EVALUATE = field.frenzyWar.garbageContributed - field2.frenzyWar.garbageContributed,
								SEVERITYP1 = EVALUATE / (field.frenzyWar.maxHealth * -1),
								SEVERITYP2 = EVALUATE / (field2.frenzyWar.maxHealth)
							if (EVALUATE < 0) {
								field.frenzyWar.health -= (EVALUATE * -1)
							} else if (EVALUATE > 0) {
								field2.frenzyWar.health -= (EVALUATE)
							}
							field.frenzyWar.health = Math.max(field.frenzyWar.health, 0)
							field2.frenzyWar.health = Math.max(field2.frenzyWar.health, 0)

							if (EVALUATE !== 0) {
								field.checkGarbageBar((field.frenzyWar.health / field.frenzyWar.maxHealth), "#0ff")
								field2.checkGarbageBar((field2.frenzyWar.health / field2.frenzyWar.maxHealth), "#0ff")
								if (SEVERITYP1 > 0.5 || SEVERITYP2 > 0.5) {
									soundPlayer.custom.playse("frenzywar/frenzywar-bang3heavy")
								} else {
									soundPlayer.custom.playse("frenzywar/frenzywar-bang3light")
								}
							}
							if (EVALUATE !== 0 && field.frenzyWar.health > 0 && field2.frenzyWar.health > 0) {
								if (EVALUATE < 0) {
									if (SEVERITYP1 > 0.5) {
										setTimeout(() => {
											field.playVoice("fwar_receive2")
											field2.playVoice("fwar_send2")
										}, 130)
										if (selectedSettings.Other.Particle >= 2&& SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT)
										for (var t = 0; t < 15; t++)
											GTRISParticleManagement.addParticle(
												0,
												0,
												getElemPos(field.mainAssets.playField, "x") + (getElemPos(field.mainAssets.playField, "width") / 2),
												getElemPos(field.mainAssets.playField, "y") + (getElemPos(field.mainAssets.playField, "height") / 2),
												SCREEN_WIDTH * Math.random(),
												SCREEN_HEIGHT * Math.random(),
												50,
												3,
												"hardDrop"
											)

									} else {
										setTimeout(() => {
											field.playVoice("fwar_receive1")
											field2.playVoice("fwar_send1")
										}, 130)
										if (selectedSettings.Other.Particle >= 2 && SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT)
										for (var t = 0; t < 5; t++)
											GTRISParticleManagement.addParticle(
												0,
												0,
												getElemPos(field.mainAssets.playField, "x") + (getElemPos(field.mainAssets.playField, "width") / 2),
												getElemPos(field.mainAssets.playField, "y") + (getElemPos(field.mainAssets.playField, "height") / 2),
												SCREEN_WIDTH * Math.random(),
												SCREEN_HEIGHT * Math.random(),
												50,
												3,
												"hardDrop"
											)
									}
								} else if (EVALUATE > 0) {
									if (SEVERITYP2 > 0.5) {
										setTimeout(() => {
											field2.playVoice("fwar_receive2")
											field.playVoice("fwar_send2")
										}, 130)
										if (selectedSettings.Other.Particle >= 2 && SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT)
										for (var t = 0; t < 15; t++)
											GTRISParticleManagement.addParticle(
												0,
												0,
												getElemPos(field2.mainAssets.playField, "x") + (getElemPos(field2.mainAssets.playField, "width") / 2),
												getElemPos(field2.mainAssets.playField, "y") + (getElemPos(field2.mainAssets.playField, "height") / 2),
												SCREEN_WIDTH * Math.random(),
												SCREEN_HEIGHT * Math.random(),
												50,
												3,
												"hardDrop"
											)

									} else {
										setTimeout(() => {
											field2.playVoice("fwar_receive1")
											field.playVoice("fwar_send1")
										}, 130)
										if (selectedSettings.Other.Particle >= 2 && SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT)
										for (var t = 0; t < 5; t++)
											GTRISParticleManagement.addParticle(
												0,
												0,
												getElemPos(field2.mainAssets.playField, "x") + (getElemPos(field.mainAssets.playField, "width") / 2),
												getElemPos(field2.mainAssets.playField, "y") + (getElemPos(field.mainAssets.playField, "height") / 2),
												SCREEN_WIDTH * Math.random(),
												SCREEN_HEIGHT * Math.random(),
												50,
												3,
												"hardDrop"
											)

									}
								}
							} else if (field.frenzyWar.health <= 0 || field2.frenzyWar.health <= 0) {
								soundPlayer.custom.playse("frenzywar/frenzywar-0hp")
								if (field.frenzyWar.health <= 0) {
									field2.playVoice("fwar_win")
									field.playVoice("fwar_lose")
									if (selectedSettings.Other.Particle >= 2)
										for (var t = 0; t < 15; t++)
											GTRISParticleManagement.addParticle(
												0,
												Math.round(Math.random() * 9),
												getElemPos(field.mainAssets.playField, "x") + (getElemPos(field.mainAssets.playField, "width") / 2),
												getElemPos(field.mainAssets.playField, "y") + (getElemPos(field.mainAssets.playField, "height") / 2),
												SCREEN_WIDTH * Math.random(),
												SCREEN_HEIGHT + (Math.random() * 7),
												70,
												5,
												"fallField"
											)
								} else if (field2.frenzyWar.health <= 0) {
									field2.playVoice("fwar_lose")
									field.playVoice("fwar_win")
									if (selectedSettings.Other.Particle >= 2 && SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT)
										for (var t = 0; t < 15; t++)
											GTRISParticleManagement.addParticle(
												0,
												Math.round(Math.random() * 9),
												getElemPos(field2.mainAssets.playField, "x") + (getElemPos(field2.mainAssets.playField, "width") / 2),
												getElemPos(field2.mainAssets.playField, "y") + (getElemPos(field2.mainAssets.playField, "height") / 2),
												SCREEN_WIDTH * Math.random(),
												SCREEN_HEIGHT + (Math.random() * 7),
												70,
												5,
												"fallField"
											)
								}
							}
							field.frenzyWar.garbageContributed = field2.frenzyWar.garbageContributed = 0
							break
						}
						case 1.5 * 120: {
							if (field.frenzyWar.health <= 0 || field2.frenzyWar.health <= 0) {
								if (field.frenzyWar.health <= 0) {
									field.fieldResult("frenzywar_lose", true, "lose")
								} else if (field2.frenzyWar.health <= 0) {
									field2.fieldResult("frenzywar_lose", true, "lose")
								}
							} else {
								field.are.frenzyEnt = field2.are.frenzyEnt = 30
							}
						}
					}
					if (time >= 5 * 120 && time < 13 * 120 && time % 15 == 0 && SCREEN_WIDTH * 0.8 > SCREEN_HEIGHT) {
						GTRISParticleManagement.addParticle(
							0,
							1 + Math.floor(Math.random() * 7.999),
							getElemPos(field.mainAssets.playField, "x") + (getElemPos(field.mainAssets.playField, "width") / 2),
							getElemPos(field.mainAssets.playField, "y") + (getElemPos(field.mainAssets.playField, "height") / 2),
							Math.random() * SCREEN_WIDTH,
							Math.random() * SCREEN_HEIGHT,
							55,
							4,
							"hardDrop"
						)
						GTRISParticleManagement.addParticle(
							0,
							1 + Math.floor(Math.random() * 7.999),
							getElemPos(field2.mainAssets.playField, "x") + (getElemPos(field2.mainAssets.playField, "width") / 2),
							getElemPos(field2.mainAssets.playField, "y") + (getElemPos(field2.mainAssets.playField, "height") / 2),
							Math.random() * SCREEN_WIDTH,
							Math.random() * SCREEN_HEIGHT,
							55,
							4,
							"hardDrop"
						)

					}
				})
			break
		}
	}
	$iH('score', field.score)
	if ("player2" in replayData)
		$iH('score2', field2.score)
}

window.onblur = () => {
	musicPlayer.muteAllMfx(true)
	soundPlayer.muteallse(true)
	pause()
}
window.onfocus = () => {
	if(!isPaused)
	musicPlayer.muteAllMfx(false)
	soundPlayer.muteallse(false)

}
