function SoundLoader() {
	this.se = {}
	this.seUsed = {}
	this.ren = {}
	this.selected = {
		se: 0
	}
	this.current = {
		se: 'UNUSE'
	}
	this.loadedSE = {};
	this.soundNamesArrayNoLoop = [
  'harddrop', 'move', 'rotate', 'land', 'lock', 'firsthold', 'hold',
  'b2b', 'game-3', 'game-2', 'game-1', 'game-start', 'bravo',
  'prespin', 'prespinmini', 'game-lose', 'game-win', `ko`, 'step',
  'collapse', 'lineup', 'ihs', 'irs', 'pause', 'softdrop', 'ren-end',
  'hurry', 'timeup', 'hurry2', 'frenzy', 'levelup'
  ]
	this.load = function() {
		try {
			if (this.selected.se != this.current.se) {
				this.current.se = this.selected.se
				this.ALL_LOADED = false;
				/*
				for (let LOAD of this.soundNamesArrayNoLoop) {
					this.se[LOAD] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/${LOAD}.ogg`, preload: false })
				}
				for (var i = 1; i < 21; i++) {
					this.se[`ren${i}`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/ren/ren${i}.ogg`, preload: false })
				}
				for (var i = 2; i < 21; i++) {
					this.se[`ren${i}_power`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/ren_power/ren${i}_power.ogg`, preload: false })
				}
				for (let i = 1; i < 6; i++) {
					this.se[`line${i}`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/line${i}.ogg`, preload: false })
					if (i > 3) {
						this.se[`line${i}E`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/line${i}b2b.ogg`, preload: false })

						this.se[`line${i}E`].once("loaderror", () => {
							this.se[`line${i}E`] = this.se[`line${i}`]
						})
					}
					this.se[`line${i}`].once('loaderror', () => {
						this.se[`line${i}`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/line.ogg`, preload: true })
					})
				}
				for (let i = 0; i < 4; i++) {
					this.se[`tspin${i}`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/tspin${i}.ogg`, preload: false })
					this.se[`tspin${i}E`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/tspin${i}b2b.ogg`, preload: false })
					if (i > 0)
						this.se[`tspin${i}`].once("loaderror", () => {
							this.se[`tspin${i}`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/tspin.ogg`, preload: true })
						})
					this.se[`tspin${i}E`].once("loaderror", () => {
						this.se[`tspin${i}E`] = this.se[`tspin${i}`]
						this.se[`tspin${i}E`].load()
					})
				}
				for (let i = 0; i < 3; i++) {
					this.se[`mini${i}`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/mini${i}.ogg`, preload: false })
					this.se[`mini${i}E`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/mini${i}b2b.ogg`, preload: false })

					this.se[`mini${i}E`].once("loaderror", () => {
						this.se[`mini${i}E`] = this.se[`mini${i}`]
						this.se[`mini${i}E`].load()
					})
					if (i > 0)
						this.se[`mini${i}`].once("loaderror", () => {
							this.se[`mini${i}`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/tspin.ogg`, preload: false })
							this.se[`mini${i}`].load()
							this.se[`mini${i}`].once("load", () => {
							this.se[`mini${i}`] = this.se[`mini${i}`];
						})
						})
				}

				this.se.firsthold.once('loaderror', () => {
					this.se.firsthold = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/hold.ogg`, preload: true })
				})

				this.se[`prespinmini`].once("loaderror", () => {
					this.se[`prespinmini`] = this.se[`prespin`]
				})

				this.se[`alarm`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/alarm.ogg`, preload: false, loop: true })

				this.se[`topoutwarning`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/topoutwarning.ogg`, preload: false, loop: true })

				this.se.hurry2.once('loaderror', () => {
					this.se.hurry2 = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/hurry.ogg`, preload: true })
				})
				this.SFX_LENGTH = Object.keys(this.se).length
				for (let load in this.se) {
					this.se[load].load()
					this.seUsed[load] = 0
					for (let Y of ['load', 'loaderror']) {
						this.se[load].once(Y, () => {
							this.SFX_LOADED++
							 this.loadedSE[load] = this.se[load];
							this.checkLoaded();
						})
					}
				}/**/
				
				//2024 revamp
				
				let directory = `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}`;
				let storage = {};
				fetch(`${directory}/init.json`).then(ut => ut.text()).then( ut => {
					let json = JSON.parse(ut);
					//console.log(json);
					let count = 0;
					let length = 0;
					//let gh = Object.keys(json.init).length;
					for (let j in json.init) {
						let n = json.init[j];
						if ((n.src in storage)) {
							this.se[j] = storage[n.src];
							this.seUsed[j] = 0;
							//console.log(`${j} has ${n.src}`, storage[n.src]._src)
							continue;
						}
						if (!(n.src in json.sources)) console.log(n.src)
						//storage[n.src] = {};
						let jc = new Howl({
							src: `${directory}/${json.sources[n.src]}`,
							preload: false,
							loop: n.loop
						});
						storage[n.src] = jc;
						this.se[j] = storage[n.src];
						this.seUsed[j] = 0;
						length++;
						jc.load();
						//console.log(jc, j)
						for (let y of ["load", "loaderror"]) {
							jc.once(y, () => {
								//console.log(n.src, y);
								count++;
								if (count >= length) {
									this.ALL_LOADED = true;
									
								}
							});
						}
					}
					
				});
				

			}
		} catch (e) {
			console.error(e.stack)
		}
	}
	this.SFX_LOADED = 0
	this.SFX_LENGTH = 0
	this.ALL_LOADED = false
	this.checkLoaded = function() {
		if (this.SFX_LOADED >= this.SFX_LENGTH) {
			this.ALL_LOADED = true;
			let keys = Object.keys(this.loadedSE);
			let values = Object.values(this.loadedSE).map(u => u._src.replace(`assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/`, ""));
			let g = {
				sources: {},
				init: {},
			};
			
			for (let k = 0; k < keys.length; k++) {
				g.sources[keys[k]] = values[k];
				let value = this.loadedSE[keys[k]];
				g.init[keys[k]] ={
					src: keys[k],
					loop: value._loop,
				} 
			}
			//document.write(JSON.stringify(g.init).replace(/,/gmi, ",<br>"));
		} else {
			this.ALL_LOADED = false
		}
	}
	this.resetUsed = function() {
		for (var e in this.seUsed) {
			if (this.seUsed[e] > 0)
				this.seUsed[e] = 0
		}
	}
	this.playse = function(name) {
		if (selectedSettings.Volume.SFX > 0 && this.seUsed[name] == 0) {
			//this.se[name].stop()
			this.se[name].volume(selectedSettings.Volume.SFX / 100)
			this.se[name].play()
			this.seUsed[name] = 1
		}
	}
	this.stopse = function(name) {
		try {
			this.se[name].stop()
		} catch (e) {}
	}
	this.pausese = function(name) {
		try {
			this.se[name].pause()
		} catch (e) {}
	}
	this.fadese = function(name, a, b, c) {
		try {
			this.se[name].fade(a, b, c)
		} catch (e) {}
	}
	this.muteallse = function(bool) {
		for (var e in this.se) {
			this.se[e].mute(typeof bool !== "undefined" ? bool : false)
		}
	}
	this.custom = new class {
		constructor() {
			this.sfx = {}
			this.loadLength = 0
		}
		load(arr) {
			for (var s of arr.files) {
				var directory = `assets/se/custom/${arr.dir}/${s}.ogg`
				if (typeof this.sfx[`${arr.dir}/${s}`] == "undefined") {
					this.sfx[`${arr.dir}/${s}`] = new Howl({
						src: `assets/se/custom/${arr.dir}/${s}.ogg`,
						volume: (selectedSettings.Volume.SFX / 100),
						preload: false
					});
					this.sfx[`${arr.dir}/${s}`].load()

				} else if (this.sfx[`${arr.dir}/${s}`]._src !== directory) {
					this.sfx[`${arr.dir}/${s}`].unload()
					this.sfx[`${arr.dir}/${s}`] = new Howl({
						src: `assets/se/custom/${arr.dir}/${s}.ogg`,
						volume: (selectedSettings.Volume.SFX / 100),
						preload: false
					});
					this.sfx[`${arr.dir}/${s}`].load()
				}
			}
		}
		playse(name) {
			if (selectedSettings.Volume.SFX > 0) {
				try {
					//this.sfx[name].stop()
					this.sfx[name].volume(selectedSettings.Volume.SFX / 100)
					this.sfx[name].play()
				} catch (e) {}
			}
		}
		stopse(name) {
			try {
				this.sfx[name].stop()
			} catch (e) {}
		}
	}()
}

const soundPlayer = new SoundLoader()