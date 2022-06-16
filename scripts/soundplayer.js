function SoundLoader() {
  this.se = {}
  this.ren = {}
  this.selected = {
    se: 0
  }
  this.current = {
    se: 'UNUSE'
  }
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
        for (let LOAD of this.soundNamesArrayNoLoop) {
          this.se[LOAD] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/${LOAD}.ogg`, preload: false })
        }
        for (var i = 1; i < 21; i++) {
          this.se[`ren${i}`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/ren/ren${i}.ogg`, preload: false })
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
              this.se[`mini${i}`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/tspin.ogg`, preload: true })
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

        for (var load in this.se) {
          this.se[load].load()
        }

      }
    } catch (e) {}
  }
  this.playse = function(name) {
    if (selectedSettings.Volume.SFX > 0) {
      this.se[name].stop()
      this.se[name].volume(selectedSettings.Volume.SFX / 100)
      this.se[name].play()
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
}

var soundPlayer = new SoundLoader()
