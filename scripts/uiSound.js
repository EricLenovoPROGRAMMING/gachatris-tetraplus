const uiSound = new class {
  constructor() {
    this.s = {}
    this.arr = ["click", "hover", "back", "slide", "error"]
  }

  init() {
    for (let e of this.arr) {
      this.s[e] = new Howl({
        src: `assets/se/menu/${e}.ogg`,
        volume: selectedSettings.Volume.UI / 100,
        preload: false
      })
      this.s[e].load()
    }
  }

  vol() {
    for (let e of this.arr) {
    	try{
      this.s[e].volume(selectedSettings.Volume.UI / 100)
    	}catch(e){}
    }
  }

  playse(e) {
  	try{
    this.s[e].stop()
    this.s[e].play()
  	}catch(e){}
  }
}()

!function(){
uiSound.init()
document.addEventListener("mouseover", function(e) {
  var el = e.target.tagName
  if (el == 'GTRIS-BUTTON')
    uiSound.playse("hover")
})
document.addEventListener("click", function(e) {
  var el = e.target
  if (el.tagName == 'GTRIS-BUTTON' || el.tagName == 'GTRIS-BUTTON-LIST')
    uiSound.playse("click")
  if (el.id == 'headerBackButton')
    uiSound.playse("back")
})
document.addEventListener("input", function(e) {
  var el = e.target
  if (el.type == 'range'){
    uiSound.playse("slide")
    uiSound.vol()
  }
})
}()
