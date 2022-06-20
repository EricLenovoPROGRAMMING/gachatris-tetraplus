/**EricLenovo 2022
 * Gachatris Tetraplus Initializer
 * ----------------------------------
 * Started developing on May 5, 2022
 */
/* const eval = () => {
  console.warn('JS Console is not usable in this site.')
} /**/
"use strict"

function docId(id) {
	return document.getElementById(id)
}

function $CN(id, n) {
	if (n !== void 0)
		return document.getElementsByClassName(id)[n]
	else
		return document.getElementsByClassName(id)
}

function $QSA(id, n) {
	if (n !== void 0)
		return document.querySelectorAll(id)[n]
	else
		return document.querySelectorAll(id)
}

function $tag(id, n) {
	if (n !== void 0)
		return document.getElementsByTagName(id)[n]
	else
		return document.getElementsByTagName(id)
}

function $create(tag, func) {
	let a = document.createElement(tag)
	func(a)
}

function $copy(arr) {
	var ARR = []
	for (let a = 0; a < arr.length; a++) {
		if (typeof arr[a] == "object" && arr[a] instanceof Array) {
			ARR.push([])
			for (let b = 0; b < arr[a].length; b++) {
				ARR[a].push(arr[a][b])
			}
		}
		else {
			ARR.push(arr[a])
		}
	}
	return ARR
}

function range(start, end, inc) {
	inc = inc || 1
	var array = []
	for (var i = start; i < end; i += inc) {
		array.push(i)
	}
	return array
}

function $iH(id, innerHTML) {
	if (innerHTML !== void 0) {
		if (docId(id).innerHTML !== innerHTML)
			docId(id).innerHTML = innerHTML
	}
	else return docId(id).innerHTML
}

Number.prototype.mod = function(n) {
	return ((this % n) + n) % n
};

class ParkMillerPRNG {
	constructor() {
		this.seed = 1;
	}
	next() {
		return this.gen() / 2147483647
	}
	gen() {
		return (this.seed = (this.seed * 16807) % 2147483647);
	}
}


(function() {
	let array = ['jQuery', 'howler-lib', 'gachatris-data', 'piece', 'field', 'queue_prev', 'pieceHold', 'enhancementfrenzy', 'soundplayer', 'musicplayer', 'language', 'main', 'character_details', 'uiSound', 'menus', 'replayCenter', 'modeProto', 'modeparameters']
	var i = 0
	var sfx

	function loadScript() {
		$create('script', function(a) {
			a.src = `scripts/${array[i]}.js`
			a.id = `script-${array[i]}`
			a.type = 'text/javascript'
			document.body.appendChild(a)
			a.onload = () => {
				if (i < array.length - 1) {
					i++
					loadScript()
				} else {
					sound()
				}
			}
		})
	}

	function startup() {
		sfx.play()
	}

	function sound() {
		addEventListener("click", startup, false)
		addEventListener("keydown", startup, false)
		sfx = new Howl({ src: "assets/se/menu/gtrisstartup.ogg", preload: false, format: "ogg" })
		sfx.volume(selectedSettings.Volume.SFX / 100)
		sfx.once('load', function() {
			setTimeout(() => {
				sfx.play()
			}, 100)
		})
		sfx.once('play', function() {
			initializeGTris()
			removeEventListener("click", startup, false)
			removeEventListener("keydown", startup, false)
		})
		setTimeout(() => {
			sfx.load()
		}, 100)
		musicPlayer.loadMfx('menu')
	}
	loadScript()

	function skipWithKey() {
		var arr = [$('#gtrisSplashText'), $('#splashLogo')]
		arr.forEach((e) => {
			e.stop(true, true)
			e.css({ 'opacity': 0 })
		})
		skip()
		sfx.fade(selectedSettings.Volume.SFX / 100, 0, 500)
		sfx.on('volume', function() { this.unload() })
	}

	function skip() {
		$('#splash').css('z-index', "-36")
		activeMenu(true, "100%", true)
		switchMenu(0, true, 'Gachatris Tetraplus Alpha', true)
		removeEventListener('keydown', skipWithKey)
		removeEventListener('click', skipWithKey)
		musicPlayer.playMfx('menu')
		addEventListener('keydown', keyUpDown, false)
		addEventListener('keyup', keyUpDown, false)
	}

	function initializeGTris() {
		setTimeout(function() {
			sfx.once('end', function() { sfx.unload() })
			addEventListener('keydown', skipWithKey, false)
			addEventListener('click', skipWithKey, false)
		}, 300)
		$('#gtrisSplashText').animate({ opacity: 0 }, 0, "linear", function() { this.innerHTML = gtris_transText('splash1') })
		$('#gtrisSplashText').animate({ opacity: 1 }, 400, "linear")
		$('#gtrisSplashText').animate({ opacity: 1 }, 2500, "linear")
		$('#gtrisSplashText').animate({ opacity: 0 }, 400, "linear", function() { this.innerHTML = gtris_transText('splash2') })
		$('#gtrisSplashText').animate({ opacity: 1 }, 400, "linear")
		$('#gtrisSplashText').animate({ opacity: 1 }, 2500, "linear")
		$('#gtrisSplashText').animate({ opacity: 0 }, 400, "linear", function() {
			this.innerHTML = gtris_transText('splash3', gtris_version)
			$('#splashLogo').animate({ opacity: 0 }, 0, "linear")
			$('#splashLogo').animate({ opacity: 1 }, 400, "linear")
			$('#splashLogo').animate({ opacity: 1 }, 1000, "linear")
			$('#splashLogo').animate({ opacity: 0 }, 250, "linear")
		})
		$('#gtrisSplashText').animate({ opacity: 1 }, 400, "linear")
		$('#gtrisSplashText').animate({ opacity: 1 }, 1000, "linear")
		$('#gtrisSplashText').animate({ opacity: 0 }, 250, "linear", function() {
			skip()
		})
	}
})()
