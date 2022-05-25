function MusicPlayer() {
  this.current = null
  this.mfx = {}
  this.VOL = 100

  this.loadMfx = function(string) {
    if(typeof this.mfx[string] == "undefined"){
    this.mfx[string] = {
      start: new Howl({
        src: `assets/mfx/${string}/start.ogg`,
        volume: (selectedSettings.Volume.Music / 100) * (this.VOL / 100),
        onend: () => {
          this.mfx[string].loop.play()
        },
        preload: false
      }),
      loop: new Howl({
        src: `assets/mfx/${string}/loop.ogg`,
        volume: (selectedSettings.Volume.Music / 100) * (this.VOL / 100),
        loop: true,
        preload: false
      })
    }
    
    for(let a in this.mfx[string]){
      this.mfx[string][a].load()
    }
    }
  }

  this.playMfx = function(string) {
    var selection = string || this.current
    if (selection !== this.current) {
      this.current = selection
    }
    this.killAllMfx()
    this.mfx[selection].start.play()
  }

  this.killMfx = function(string) {
    var selection = string || this.current
    for (let e of ['start', 'loop']) {
      this.mfx[selection][e].stop()
    }
  }
  this.killAllMfx = function() {
    for (let name in this.mfx) {
      for (let e of ['start', 'loop']) {
        this.mfx[name][e].stop()
      }
    }
  }
  this.switchCurrent = function(name){
    if(typeof this.mfx[name] == 'object')
    this.current = name
  }
  this.changeVol = function(int){
    var volumeInt = int || this.VOL
    this.VOL = Math.min(100, Math.max(volumeInt, 0))
    for (let name in this.mfx) {
      for (let e of ['start', 'loop']) {
        this.mfx[name][e].volume((this.VOL/100)*(selectedSettings.Volume.Music/100))
      }
    }
  }
  this.muteAllMfx = function(bool){
    for (let name in this.mfx) {
      for (let e of ['start', 'loop']) {
        this.mfx[name][e].mute(typeof bool !== "undefined" ? bool : false)
      }
    }
  }
  }

  var musicPlayer = new MusicPlayer()
