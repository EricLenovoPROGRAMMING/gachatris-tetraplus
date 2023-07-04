 const menuClass = $CN('menuClass')
var settingKey = undefined
var titleTemplate = null


var keysText = {
	0: `Error`,
	8: 'Backspace',
	9: 'Tab',
	13: 'Enter',
	16: 'Shift',
	17: 'Control',
	18: 'Alt',
	19: 'Pause',
	20: 'Capitals Lock',
	27: 'Esc',
	32: 'Space',
	33: 'Page Up',
	34: 'Page Down',
	35: 'End',
	36: 'Home',
	37: '←',
	38: '↑',
	39: '→',
	40: '↓',
	45: 'Insert',
	46: 'Delete',
	48: '0',
	49: '1',
	50: '2',
	51: '3',
	52: '4',
	53: '5',
	54: '6',
	55: '7',
	56: '8',
	57: '9',
	59: ';',
	61: '=',
	65: 'A',
	66: 'B',
	67: 'C',
	68: 'D',
	69: 'E',
	70: 'F',
	71: 'G',
	72: 'H',
	73: 'I',
	74: 'J',
	75: 'K',
	76: 'L',
	77: 'M',
	78: 'N',
	79: 'O',
	80: 'P',
	81: 'Q',
	82: 'R',
	83: 'S',
	84: 'T',
	85: 'U',
	86: 'V',
	87: 'W',
	88: 'X',
	89: 'Y',
	90: 'Z',
	96: 'Keypad 0',
	97: 'Keypad 1',
	98: 'Keypad 2',
	99: 'Keypad 3',
	100: 'Keypad 4',
	101: 'Keypad 5',
	102: 'Keypad 6',
	103: 'Keypad 7',
	104: 'Keypad 8',
	105: 'Keypad 9',
	106: '*',
	107: '+',
	109: '-',
	110: '.',
	111: '/',
	112: 'F1',
	113: 'F2',
	114: 'F3',
	115: 'F4',
	116: 'F5',
	117: 'F6',
	118: 'F7',
	119: 'F8',
	120: 'F9',
	121: 'F10',
	122: 'F11',
	123: 'F12',
	173: '-',
	187: '=',
	188: ',',
	190: '.',
	191: '/',
	192: '`',
	219: '[',
	220: '\\',
	221: ']',
	222: "'",
 [undefined]: '???',
 NONE: "???"
}

function keyCodeToKeyFlag(keyCode) {
	if (keyCode === selectedSettings.Binds.LEFT) {
		return flags.LEFT;
	} else if (keyCode === selectedSettings.Binds.RIGHT) {
		return flags.RIGHT;
	} else if (keyCode === selectedSettings.Binds.SDROP) {
		return flags.SDROP;
	} else if (keyCode === selectedSettings.Binds.HDROP) {
		return flags.HDROP;
	} else if (keyCode === selectedSettings.Binds.CW) {
		return flags.CW;
	} else if (keyCode === selectedSettings.Binds.CCW) {
		return flags.CCW;
	} else if (keyCode === selectedSettings.Binds['180DEG']) {
		return flags['180DEG'];
	} else if (keyCode === selectedSettings.Binds.HOLD) {
		return flags.HOLD;
	} else {
		return 0;
	}
}

function keyUpDown(e) {
	if ([32, 37, 38, 39, 40].indexOf(e.keyCode) !== -1)
		e.preventDefault();
	if (!isKeySelectorOn) {
		if (e.type === "keydown" && e.keyCode === selectedSettings.Binds.pause) {
			if (isPaused) {
				unPause();
			} else {
				pause();
			}
		}
		if (e.type === "keydown" && e.keyCode === selectedSettings.Binds.retry) {
			if ($QSA('.menuActive', 0)?.innerHTML) {
				if ($QSA('.menuActive', 0).innerHTML.indexOf('<textarea') == -1)
					gameStart(gameMode);
			} else {
				gameStart(gameMode);
			}
		}
		if (!isReplay) {
			var flag = keyCodeToKeyFlag(e.keyCode);
			if (e.type === "keydown") {
				keysPressed |= flag
			} else if (e.type === "keyup") {
				keysPressed &= ~flag
			}
		}
	} else {
		if (e.type === "keydown") {
			isKeySelectorOn = false

			for (var i in selectedSettings.Binds) {
				if (selectedSettings.Binds[i] == e.keyCode)
					selectedSettings.Binds[i] = "NONE"
			}
			selectedSettings.Binds[keyMappingSelected] = e.keyCode
			keyMappingSelected = "NONE"
			loadKeyboardSettingss()
			saveSTORAGE()
			switchMenu(2, true, 'h_controls', true)
		}
	}
}



var movedMenuSessions = [],
	menuLast = 0,
	headerLast = 'title'

function activeMenu(activateMenu, opacity, eliminateundo) {
 mobileButtons.enableButtons(!activateMenu)
	if (activateMenu == true) {
		docId('menus').style.opacity = '100%'
		docId('menus').style.top = '0%'
		docId('menuHeader').style.bottom = '0%'
		docId('menus').style.visibility = 'visible'
		if (opacity && typeof opacity !== "undefined") {
			docId('menus').style.background = `rgba(${Math.random()*53},${Math.random()*53},${Math.random()*53},${opacity})`
		} else docId('menus').style.background = `rgba(${Math.random() * 53},${Math.random() * 53},${Math.random() * 53},1)`
	} else {
		try {
			for (let i = 0; i < menuClass.length; i++) {
				menuClass[i].classList.remove('menuActive')
			}
		} catch (e) {}
		docId('menuHeader').style.bottom = '50%'
		docId('menus').style.opacity = '0%'
		docId('menus').style.top = '100%'
		docId('menus').style.visibility = 'hidden'
	}
	if (eliminateundo || typeof eliminateundo !== 'undefined') {
		movedMenuSessions = []
	}
}

function switchMenu(menuInd, showheader, title, disableUndo) {
	if (disableUndo == false || typeof disableUndo == 'undefined') {
		movedMenuSessions.push({ index: menuLast, show: showheader, header: headerLast })
		menuLast = menuInd
		headerLast = title
	} else
	if (disableUndo == "startPoint") {
		menuLast = menuInd
		headerLast = title
	}
	for (let i = 0; i < menuClass.length; i++) {
		menuClass[i].classList.remove('menuActive')
	}
	if (menuInd == 0)
	{
		movedMenuSessions = []
	}
	menuClass[menuInd].classList.add('menuActive')
	if (showheader) {
		docId('menuHeader').style.bottom = '0%'
	} else {
		docId('menuHeader').style.bottom = '50%'
	}
	$iH('headerTitle', gtris_transText(title))
	if (movedMenuSessions.length !== 0) {
		docId('headerBackButton').style.display = 'flex'
	} else {
		headerLast = 'title'
		$iH('headerTitle', title ? title : headerLast)
		docId('headerBackButton').style.display = 'none'
	}
}

function backButton() {
	if (!isKeySelectorOn) {
		var el = movedMenuSessions.pop()
		menuLast = el.index
		for (let i = 0; i < menuClass.length; i++) {
			menuClass[i].classList.remove('menuActive')
		}
		menuClass[el.index].classList.add('menuActive')
		if (el.show) {
			docId('menuHeader').style.opacity = '100%'
		} else {
			docId('menuHeader').style.opacity = '0%'
		}
		$iH('headerTitle', gtris_transText(el.header))
		if (movedMenuSessions.length !== 0) {
			docId('headerBackButton').style.display = 'flex'
			headerLast = el.header
		} else {
			headerLast = 'title'
			docId('headerBackButton').style.display = 'none'
		}
	} else {
		keyMappingSelected = null
		isKeySelectorOn = false
		switchMenu(2, true, 'h_controls', true)
	}
}

function loadTuningSettingss() {
	var controllersDIV = docId('settingsList-HANDLING')
	controllersDIV.innerHTML = ''
	for (let LOADING in settingsRange.Tuning) {
		var listCell = document.createElement('div')
		var div1 = document.createElement('div')
		var div2 = document.createElement('div')
		var gtris_normalText = document.createElement('gtris_normalText')
		var input = document.createElement('input')
		div1.style = 'display:flex;'
		div2.style = 'display:flex;'
		listCell.style = `height:10%;display:table;width:100%`
		listCell.className = `gtrisParameter list-${LOADING}`

		gtris_normalText.style = 'width:100%;height:100%'
		gtris_normalText.innerHTML = `${LOADING}: ${settingsRange.Tuning[LOADING][selectedSettings.Tuning[LOADING]]}`
		input.setAttribute('type', 'range')
		input.setAttribute('min', '0')
		input.setAttribute('max', `${settingsRange.Tuning[LOADING].length - 1}`)
		input.setAttribute('value', `${selectedSettings.Tuning[LOADING]}`)
		input.style.height = `100%`
		gtris_normalText.className = `gtrisParameter-TEXT list-${LOADING}`
		input.className = `gtrisParameter-slider list-${LOADING}`

		input.oninput = () => {
			$CN(`gtrisParameter-TEXT list-${LOADING}`, 0).innerHTML = `${LOADING}: ${settingsRange.Tuning[LOADING][$CN(`gtrisParameter-slider list-${LOADING}`,0).value]}`
			selectedSettings.Tuning[LOADING] = ~~($CN(`gtrisParameter-slider list-${LOADING}`, 0).value)
		}
		input.onchange = () => {
			saveSTORAGE()
		}
		div1.appendChild(gtris_normalText)
		div2.appendChild(input)
		listCell.appendChild(div1)
		listCell.appendChild(div2)
		controllersDIV.appendChild(listCell)
	}
}

function loadKeyboardSettingss() {
	var controllersDIV = docId('control-cells')
	controllersDIV.innerHTML = ''
	for (let LOADING in defaultBinds) {
		var listCell = document.createElement('gtris-listCell')
		var input = document.createElement('gtris-button')
		listCell.style = `height:10%;display:flex;justify-content:center;width:100%`
		listCell.className = `gtrisParameter list-${LOADING}`

		input.className = `gtrisParameter-keyboard-change list-${LOADING}`
		input.innerHTML = `${bindsText[LOADING]}: ${keysText[selectedSettings.Binds[LOADING]]}`
		input.onclick = () => {
			switchMenu(4, true, 'h_setkey', true)
			isKeySelectorOn = true
			keyMappingSelected = LOADING
			docId('keysSelecting').innerHTML = `${bindsText[LOADING]}`
		}

		listCell.appendChild(input)
		controllersDIV.appendChild(listCell)
	}
	RESIZE()
}

function loadAudioSettingss() {
	var controllersDIV = docId('volume-cells')
	controllersDIV.innerHTML = ''
	var VARIABLE = 'Volume'
	var NAME = 'vol'
	for (let LOADING in settingsRange[VARIABLE]) {
		let listCell = document.createElement('gtris-listCell')
		let div1 = document.createElement('div')
		let div2 = document.createElement('div')
		let gtris_normalText = document.createElement('gtris_normalText')
		let input = document.createElement('input')
		div1.style = 'display:flex;'
		div2.style = 'display:flex;'
		listCell.style = `height:10%;display:table;width:100%`
		gtris_normalText.style = 'width:100%;height:100%'
		gtris_normalText.innerHTML = `${LOADING}: ${settingsRange[VARIABLE][LOADING][selectedSettings[VARIABLE][LOADING]]}`
		input.setAttribute('type', 'range')
		input.setAttribute('min', '0')
		input.setAttribute('max', `${settingsRange[VARIABLE][LOADING].length - 1}`)
		input.setAttribute('value', `${selectedSettings[VARIABLE][LOADING]}`)
		input.style.height = `100%`
		gtris_normalText.className = `gtrisParameter-TEXT-${NAME} list-${LOADING}`
		input.className = `gtrisParameter-slider-vol list-${LOADING}`
		input.oninput = () => {
			$CN(`gtrisParameter-TEXT-${NAME} list-${LOADING}`, 0).innerHTML = `${LOADING}: ${settingsRange[VARIABLE][LOADING][$CN(`gtrisParameter-slider-${NAME} list-${LOADING}`,0).value]}`
			selectedSettings[VARIABLE][LOADING] = ~~($CN(`gtrisParameter-slider-${NAME} list-${LOADING}`, 0).value)
			musicPlayer.changeVol()
		}
		input.onchange = () => {
			saveSTORAGE()
		}
		div1.appendChild(gtris_normalText)
		div2.appendChild(input)
		listCell.appendChild(div1)
		listCell.appendChild(div2)
		controllersDIV.appendChild(listCell)
	}

	for (let LOADING in settingsList.Sound) {
		let div = document.createElement('gtris-listCell');
		let b = document.createElement('b');
		let div1 = document.createElement('div');
		let div2 = document.createElement('div');
		let Prev = document.createElement('gtris-text-large');
		let span = document.createElement('gtris-text');
		let Next = document.createElement('gtris-text-large');
		div1.style = 'display:flex;justify-content:center; height:50%;width:100%'
		div2.style = 'display:flex;justify-content:center; height:100%;width:100%'
		Prev.style = Next.style = 'display:flex;font-size:230%;padding-left:10%;padding-right:10%'
		span.style.fontSize = '150%'
		span.id = `gtris-textid-audio-${LOADING}`;
		div.style = `height:10%;display:grid;grid-columns:1;width:100%;justify-content:center`
		b.innerHTML = LOADING + ':';
		span.innerHTML = settingsList.Sound[LOADING][selectedSettings.Sound[LOADING]];
		Prev.innerHTML = '<';
		Next.innerHTML = '>';
		Prev.onmousedown = () => settingManipulate('Sound', LOADING, 1, span.id)
		Next.onmousedown = () => settingManipulate('Sound', LOADING, -1, span.id)
		controllersDIV.appendChild(div);
		div1.appendChild(b);
		div.appendChild(div1);
		div.appendChild(div2);
		div2.appendChild(Prev);
		div2.appendChild(span);
		div2.appendChild(Next);
	}
}

function loadMiscSettingss() {
	try {
		var controllersDIV = docId('misc-cells')
		controllersDIV.innerHTML = ''
		var VARIABLE = 'Other'
		var NAME = 'misc'
		for (let LOADING in settingsList[VARIABLE]) {
			let div = document.createElement('gtris-listCell');
			let b = document.createElement('b');
			let div1 = document.createElement('div');
			let div2 = document.createElement('div');
			let Prev = document.createElement('gtris-text-large');
			let span = document.createElement('gtris-text');
			let Next = document.createElement('gtris-text-large');
			div1.style = 'display:flex;justify-content:center;text-align:middle;width:100%'
			div2.style = 'display:flex;justify-content:center;text-align:middle;width:100%'
			Prev.style = Next.style = 'display:inline-flex;background:#743;font-size:230%;padding-left:10%;padding-right:10%'
			span.style.fontSize = '150%'
			span.id = `gtris-textid-${NAME}-${LOADING}`;
			div.style = `height:10%;display:grid;grid-columns:1;width:100%;justify-content:center`
			b.innerHTML = LOADING + ':';
			span.innerHTML = settingsList[VARIABLE][LOADING][selectedSettings[VARIABLE][LOADING]];
			Prev.innerHTML = '<';
			Next.innerHTML = '>';
			Prev.onmousedown = () => settingManipulate(VARIABLE, LOADING, 1, span.id)
			Next.onmousedown = () => settingManipulate(VARIABLE, LOADING, -1, span.id)

			controllersDIV.appendChild(div);
			div1.appendChild(b);
			div.appendChild(div1);
			div.appendChild(div2);
			div2.appendChild(Prev);
			div2.appendChild(span);
			div2.appendChild(Next);
		}
	} catch (e) {}
}

function settingManipulate(parent, variable, PLUS, id) {
	var e = id;
	selectedSettings[parent][variable] -= PLUS
	if (selectedSettings[parent][variable] <= -1) {
		selectedSettings[parent][variable] = settingsList[parent][variable].length - 1
	} else
	if (typeof settingsList[parent][variable][selectedSettings[parent][variable]] === 'undefined') {
		selectedSettings[parent][variable] = 0
	}
	docId(e).innerHTML = settingsList[parent][variable][selectedSettings[parent][variable]]
	saveSTORAGE()
	RESIZE()
	loadCharacterSettingss()
}


function loadCharacterSettingss() {
	var controllersDIV = docId('character-cells')
	controllersDIV.innerHTML = ''
	for (let LOADING = 0; LOADING < settingsList.NonIterable.Character.length; LOADING++) {
		let listDetail = LOADING !== 0 ? gtris_character_details(settingsList.NonIterable.Character[LOADING]) : void 0
		var listCell = document.createElement('div')
		var input = document.createElement('gtris-button-list')
		listCell.style = `height:10%;display:flex;justify-content:center;width:100%`
		listCell.className = `gtrisParameter-charlist-${settingsList.NonIterable.Character[LOADING].replace(' ', '%20')}`

		input.className = `gtrisParameter-charSelectList`
		input.innerHTML = `${LOADING !== 0 ? listDetail.name:'----'}`
		input.onclick = () => {
			selectedSettings.NonIterable.Character = LOADING
			saveSTORAGE()
			setCharacterTest()
		}
		listCell.appendChild(input)
		controllersDIV.appendChild(listCell)
	}
	$iH("guiText-characterUse", gtris_transText("characteruse"))
	setCharacterTest()
}
loadMiscSettingss()
loadAudioSettingss()
loadTuningSettingss()
loadKeyboardSettingss()
loadCharacterSettingss()

function setCharacterTest() {
	var main = $CN('gtrisParameter-charSelectList')
	var charDetailPrepare = gtris_character_details(settingsList.NonIterable.Character[selectedSettings.NonIterable.Character])
	if (selectedSettings.NonIterable.Character == 0) {
		docId('characterImage').style.opacity = 0;
		$iH('characterFurtherDetail', '')
	} else {
		docId('characterImage').style.opacity = 1
		$iH('characterFurtherDetail', gtris_transText('characterdetail', [
      charDetailPrepare.gender,
      charDetailPrepare.author,
      charDetailPrepare.date_existed,
      charDetailPrepare.date_version,
      charDetailPrepare.description
      ]))
	}
	for (let t = 0; t < main.length; t++)
		try {
			main[t].classList.remove('char-ACTIVE')
		} catch (e) {}
	main[selectedSettings.NonIterable.Character].classList.add('char-ACTIVE')
	docId("characterImage").src = `assets/characters/${settingsList.NonIterable.Character[selectedSettings.NonIterable.Character]}/icon.png`
	$iH('characterName', selectedSettings.NonIterable.Character == 0 ? '---' : charDetailPrepare.name)
}

function initSetNameWindow() {
	switchMenu(12, true, "h_namechange")
	//for optimization, we use a pre-existing DIV
	docId('replayCenter-station').innerHTML = `
	         <gtris-listCell>
	           <gtris-text style="text-align:center">${gtris_transText("nameChangeDesc")}</gtris-text>
	         </gtris-listCell>
	         <gtris-listCell>
	            <textarea onchange="changePlayerName('Main',this.value)" spellcheck="false" maxlength=25 style="width:80%;height:1em;resize:none;background:#232323;color:#fff;font-size:2em">${selectedSettings.Names.Main}</textarea>
	         </gtris-listCell>
	         `
}

function changePlayerName(obj, val) {
	var target = e => selectedSettings.Names[obj] = e
	target(val)
	saveSTORAGE(val)
}

function setKey(NAME, variable, id, $iH) {
	let list = variable
	let result = ~~($CN(`gtrisParameter_values ${NAME}`, 0).value)
	$CN(`gtrisParameter ${id}`, 0).innerHTML = `${$iH}: ${list[result]}`
}

function aiCharacterSettings() {
	var controllersDIV = docId('character-cells')
	controllersDIV.innerHTML = ''
	for (let LOADING = 0; LOADING < settingsList.NonIterable.Character.length; LOADING++) {
		let listDetail = LOADING !== 0 ? gtris_character_details(settingsList.NonIterable.Character[LOADING]) : void 0
		var listCell = document.createElement('div')
		var input = document.createElement('gtris-button-list')
		listCell.style = `height:10%;display:flex;justify-content:center;width:100%`
		listCell.className = `gtrisParameter-charlist-${settingsList.NonIterable.Character[LOADING].replace(' ', '%20')}`

		input.className = `gtrisParameter-charSelectList`
		input.innerHTML = `${LOADING !== 0 ? listDetail.name:'----'}`
		input.onclick = () => {
			selectedSettings.AI.Character = LOADING
			try {
				$iH("ai-characteruse", listDetail.name)
			} catch (e) {}
			saveSTORAGE()
			setCharacterTest2()
		}
		listCell.appendChild(input)
		controllersDIV.appendChild(listCell)
	}
	setCharacterTest2()
	$iH("guiText-characterUse", gtris_transText("ai_characteruse"))
	switchMenu(6, true, 'h_characterAI');
}

function setCharacterTest2() {
	var main = $CN('gtrisParameter-charSelectList')
	var charDetailPrepare = gtris_character_details(settingsList.NonIterable.Character[selectedSettings.AI.Character])
	if (selectedSettings.AI.Character == 0) {
		docId('characterImage').style.opacity = 0;
		$iH('characterFurtherDetail', '')
	} else {
		docId('characterImage').style.opacity = 1
		$iH('characterFurtherDetail', gtris_transText('characterdetail', [
      charDetailPrepare.gender,
      charDetailPrepare.author,
      charDetailPrepare.date_existed,
      charDetailPrepare.date_version,
      charDetailPrepare.description
      ]))
	}
	for (let t = 0; t < main.length; t++)
		try {
			main[t].classList.remove('aichar-ACTIVE')
		} catch (e) {}
	main[selectedSettings.AI.Character].classList.add('aichar-ACTIVE')
	docId("characterImage").src = `assets/characters/${settingsList.NonIterable.Character[selectedSettings.AI.Character]}/icon.png`
	$iH('characterName', selectedSettings.AI.Character == 0 ? '---' : charDetailPrepare.name)
}
