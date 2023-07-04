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








////// -------- MOBILE BUTTONS ------------ //////////
class MobileButton {
 constructor(event, img, type, func, px, py, lx, ly, len, height, dragTap) {
  this.portraitX = px;
  this.portraitY = py;
  this.landscapeX = lx;
  this.landscapeY = ly;
  this.sizeX = len;
  this.sizeY = height;
  this.image = new Image();
  this.src = img;
  this.image.src = img;
  this.type = type;
  this.func = func;
  this.id = `CONTROL-${event.toUpperCase()}`;
  this.active = true;
  this.isControllerActive = true;
  this.isWholeActive = true;
  this.isNotReplayToShow = true;
  this.dragTap = dragTap ? dragTap : false;
 };
 fire() {
  this.func();
 }
}

class MobileButtonSystem {
 constructor() {
  this.buttons = {};
  this.isActive = false;
  this.cellSize = 0;
  this.cellSizeX = 0;
  this.cellSizeY = 0;
  this.ratio = {
   width: 0,
   height: 0
  }

  /* this.ratio.width = SCREEN_WIDTH;
  this.ratio.height = SCREEN_HEIGHT;
  var aspectRatio = 16 / 9;
  if (SCREEN_WIDTH < SCREEN_HEIGHT) {
   this.ratio.height = Math.round(SCREEN_WIDTH * aspectRatio);
  } else {
   this.ratio.width = Math.round(SCREEN_HEIGHT * aspectRatio);
  }
  var aspectRatioResolution = Math.max(this.ratio.width, this.ratio.height);
  this.cellSize = Math.round(aspectRatioResolution / 50);
  this.cellSizeX = Math.round((Math.round(SCREEN_WIDTH * aspectRatio)) / 50);
  this.cellSizeY = Math.round((Math.round(SCREEN_HEIGHT * aspectRatio)) / 50);
*/
 }
 toggleControllers() {
  for (let buttons in this.buttons) {
   let btn = this.buttons[buttons];
   if (btn.type == "controller") btn.active = !btn.active;
  }
  this.checkButtons();
 }
 replayToggleControllers(bool) {
  for (let buttons in this.buttons) {
   let btn = this.buttons[buttons];
   if (btn.type == "controller") btn.isNotReplayToShow = bool;
  }
  this.checkButtons();
 }
 enableControllers(bool) {
  for (let buttons in this.buttons) {
   let btn = this.buttons[buttons];
   if (btn.type == "controller") btn.isControllerActive = bool;
  }
  this.checkButtons();
 }
 enableButtons(bool) {
  for (let buttons in this.buttons) {
   let btn = this.buttons[buttons];
   btn.isWholeActive = bool;
  }
  this.checkButtons();
 }
 checkButtons() {
  //var a = e => $IH("mobileButtonScreen", e),

  for (var e in this.buttons) {
   var o = this.buttons[e];
   var x = ((class_game.orientation == "landscape" ? o.landscapeX : o.portraitX) / 100) * class_game.viewW;
   var y = ((class_game.orientation == "landscape" ? o.landscapeY : o.portraitY) / 100) * class_game.viewH;
   var screen = Math.max(class_game.viewW, class_game.viewH) + Math.max(class_game.paddingX, class_game.paddingY);
   var padX = class_game.orientation === "portrait" ? Math.max((((SCREEN_WIDTH * (16 / 9)) - SCREEN_HEIGHT) / 2) / 5148, 0) : 0,
    padY = class_game.orientation === "portrait" ? (SCREEN_HEIGHT - class_game.viewH) / 2 : 0;
   var id = docId(o.id);
   id.style = `display:${o.active&&o.isWholeActive&&o.isControllerActive&&o.isNotReplayToShow?"block":"none"};opacity:${75}%;background:#938;top:${padY + y - (o.sizeY / 2)}px;left:${padX + x - (o.sizeX / 2)}px;width:${(o.sizeX / 100) * screen}px;height:${(o.sizeY / 100) * screen}px;position:absolute;pointer-events:none`;
  }
  //a(iH);
 };
 createButton(event, img, type, func, px, py, lx, ly, len, height) {
  if ((event in this.buttons)) return;
  this.buttons[event] = new MobileButton(event, img, type, func, px, py, lx, ly, len, height);
  $ELEM("gtris-mobile-button", button => {
   button.id = this.buttons[event].id;
    cacheManager.loadCache(img, (fname) => {
     let s = new Image();
     s.src = fname;
     return s;
    }, "images", _img => {
     button.append(_img.value);
     $STYLEELEM(_img.value, "pointer-events", "none");
     $STYLEELEM(_img.value, "height", "100%");
     $STYLEELEM(_img.value, "width", "100%");
    });
   docId("mobileButtonScreen").appendChild(button);
  })
  this.checkButtons();
 };
 showHide(bool) {
  this.isActive = bool;
  $STYLE("mobileButtonScreen", "display", bool ? "flex" : "none");
 }
 initiateButtons() {

  var NX = -90,
   NY = -90,
   AY = 6;
  this.createButton("harddrop", "assets/menu/control_mobile/harddrop.png", "controller", function() {
   if (gameRunning && !isPaused) class_game.touchesPressed |= flags.HDROP;
  }, 19, 67 + AY, 11, 47, 8.3, 8.3, true);
  this.createButton("softdrop", "assets/menu/control_mobile/softdrop.png", "controller", function() {
   if (gameRunning && !isPaused) class_game.touchesPressed |= flags.SDROP;
  }, 19, 83 + AY, 11, 74, 8.3, 8.3, true);
  this.createButton("left", "assets/menu/control_mobile/left.png", "controller", function() {
   if (gameRunning && !isPaused) class_game.touchesPressed |= flags.LEFT;
  }, 4, 75 + AY, NX, NY, 8.3, 8.3, true);
  this.createButton("right", "assets/menu/control_mobile/right.png", "controller", function() {
   if (gameRunning && !isPaused) class_game.touchesPressed |= flags.RIGHT;
  }, 34, 75 + AY, NX, NY, 8.3, 8.3, true);

  this.createButton("hold", "assets/menu/control_mobile/hold.png", "controller", function() {
   if (gameRunning && !isPaused) class_game.touchesPressed |= flags.HOLD;
  }, 19 + 50, 67 + AY, NX, NY, 8.3, 8.3, true);
  this.createButton("ccw", "assets/menu/control_mobile/ccw.png", "controller", function() {
   if (gameRunning && !isPaused) class_game.touchesPressed |= flags.CCW;
  }, 19 + 50, 83 + AY, NX, NY, 8.3, 8.3, true);
  this.createButton("c180w", "assets/menu/control_mobile/c180w.png", "controller", function() {
   if (gameRunning && !isPaused) class_game.touchesPressed |= flags["180DEG"];
  }, 4 + 50, 75 + AY, NX, NY, 8.3, 8.3, true);
  this.createButton("cw", "assets/menu/control_mobile/cw.png", "controller", function() {
   if (gameRunning && !isPaused) class_game.touchesPressed |= flags.CW;
  }, 34 + 50, 75 + AY, NX, NY, 8.3, 8.3, true);

  this.createButton("restart", "assets/menu/control_mobile/restart.png", "button", function() {
			gameStart(gameMode);
  }, 9, 1, -10, 6, 5, 5);
  this.createButton("controls", "assets/menu/control_mobile/ctrls.png", "button", function() {
   this.toggleControllers();
  }.bind(this), 25, 1, -10, 34, 5, 5);
  this.createButton("pause", "assets/menu/control_mobile/pause.png", "button", function() {
   pause(!isPaused);
  }.bind(this), 40, 1, -10, 68.3, 5, 5);

  this.checkButtons()
  this.initialize();
  if (/*!window.mobileAndTabletCheck()*/true) {
   this.toggleControllers();

  }
 }

 initialize() {
  var event = (e) => {
   //e.preventDefault();
   //e.stopPropagation() ; 
   if ((e.type == "touchstart" || (e.type == "touchmove") || e.type == "touchend") && (this.isActive)) {
    if (!class_game.isReplay) class_game.touchesPressed = 0;
    for (var touches = 0; touches < e.touches.length; touches++) {
     var tX = e.touches[touches].pageX;
     var tY = e.touches[touches].pageY;
     for (var i in this.buttons) {
      var button = docId(this.buttons[i].id),
       buttonClass = this.buttons[i];
      var buttonOffsetTop = getElemPos(this.buttons[i].id, "y");
      var buttonOffsetLeft = getElemPos(this.buttons[i].id, "x");
      var buttonOffsetHeight = getElemPos(this.buttons[i].id, "height");
      var buttonOffsetWidth = getElemPos(this.buttons[i].id, "width");
      if (
       tX >= buttonOffsetLeft && tX < buttonOffsetWidth + buttonOffsetLeft &&
       tY >= buttonOffsetTop && tY < buttonOffsetHeight + buttonOffsetTop &&
       buttonClass.active && buttonClass.isWholeActive && buttonClass.isControllerActive &&
       buttonClass.isNotReplayToShow
      ) {
       if (e.type == "touchstart") $STYLE(buttonClass.id, "opacity", "100%");
       if (e.type == "touchend") $STYLE(buttonClass.id, "opacity", "75%");
       if ((e.type == "touchstart" || e.type == "touchend") || (buttonClass.dragTap && e.type == "touchmove")) buttonClass.func(e);
      } else {
       $STYLE(buttonClass.id, "opacity", "75%");
      }
     }
    }
   }
  }
  for (let p of ["start", "end"]) document.addEventListener(`touch${p}`, e => event(e), false);

 }
};

const mobileButtons = new MobileButtonSystem();