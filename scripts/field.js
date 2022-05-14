function Field(NEW) {
 this.valid = false
 this.varren = 0;
 this.neutralline = 0
 this.garbagenumber = []
 this.voicegarbage = false
 this.voicestrength = 0;
 this.varpiecedelayadd = 100
 this.varpiecedelay = 0
 this.clearrows = []
 this.b2b = 0;
 this.linevoice = 0;
 this.isSpin = false;
 this.isMini = false;
 this.spinCheckCount = 0
 this.miniSpinCount = 0
 this.mini2SpinCount = 0
 this.mini3SpinCount = 0
 this.mini3REVSpinCount = 0
 this.enablespin = false;
 this.spinrecog = false;
 this.spinrecogmini = false;
 this.linespinrecog = false;
 this.minispinrecog = false;
 this.once = false
 this.sensespin
 this.perfectboolvoice = false
 this.gtrisinput = false
 this.gtrisenable = false
 this.gtrisenableplus = false
 this.renstrengthinit = 0
 this.countervoice = false
 this.varseqvoice
 this.garbvoice = 0
 this.linesend = 0
 this.renenable = false;
 this.warning=false
 this.pieces=0
 this.lineTotal=9
 this.timers = {
  tSpin: '',
  regular: '',
  b2b: '',
  combo: '',
 }
 this.character = {
  current: 0,
  voices: {
   init1: '',
   init2: '',
   spell1: '',
   spell2: '',
   spell3: '',
   spell4: '',
   spell5: '',
   gtris: '',
   gtrisplus: '',
  },
  fields: {
   normal: '',
   danger: '',
  },
  load:{
     normal: '',
     danger: '',
  }
 }
}

Field.prototype = {
 
 loadCharacter: function(number){
  var selection = number || selectedSettings.NonIterable.Character
  if(selection!==this.character.current){
   this.character.current=selection
   this.gtrisenable=false
   this.gtrisenableplus=false
   this.isFieldEnable=true
   docId('characterBackground').style.display='block'
   for(let load in this.character.voices){
   this.character.voices[load] = new Howl({src:`assets/characters/${settingsList.NonIterable.Character[this.character.current]}/voices/${load}.ogg`, preload:false})
  }
   this.character.voices.gtris.once('load',function(){
    this.gtrisenable=true
   })
   this.character.voices.gtrisplus.once('load', function() {
    this.gtrisenableplus = true
   })
   for (let load in this.character.voices) {
    this.character.voices[load].load()
   }
   
   for(let load in this.character.load){
    this.character.load[load]=new Image()
    this.character.load[load].src=this.character.fields[load]=`assets/characters/${settingsList.NonIterable.Character[this.character.current]}/${load}.png`
    this.character.load[load].onerror=function(){
    this.isFieldEnable=false
    docId('characterBackground').style.display='none'
    }
   }
  }
 },
 playVoice:function(name){
  var vol = selectedSettings.Volume.Character/100
  if(vol !== 0){
   this.character.voices[name].volume(vol)
   this.character.voices[name].stop()
   this.character.voices[name].play()
  }
 },
 
 makeArrayLength: function(int) {
  var i = []
  i.length = int
  for (var e = 0; e < int - 1; e++)
   i[e] = 0
  return i
 },
 new: function(x, y) {
  var cells = this.makeArrayLength(x)
  for (var i = 0; i < x; i++) {
   cells[i] = this.makeArrayLength(y)
  }
  this.grid = cells
  
  this.width = x
  this.height = y
  
  this.lineTotal = 0
  this.pieces = 0
  
  this.loadCharacter()
  this.varren = -1
  this.b2b = -1
  this.showClearText('hide')
  this.showClearTextREN('hide')
  this.showClearTextTSPIN('hide')
  this.showClearTextB2B('hide')
  hold.piece = void 0
  clear(_CTX.hold)
  this.checkWarning()
  docId('characterBackground').src = this.character.fields.normal
 },

 testSpace: function(x, y) {
  if (this.grid[x] !== undefined && this.grid[x] !== 0) {
   if (y < this.height) {
    if (this.grid[x][y] !== undefined && this.grid[x][y] !== 0) {
     return true;
    } else {
     return false;
    }
   } else {
    return true;
   }
  } else {
   return true;

  }
 },

 spinCheck: function() {
  var booldetect = false
  var boolline = 0
  this.isSpin = false;
  this.isMini = false;

  if (piece.landed == true && piece.moved == false) {
   if (piece.index == 5) {
    var checkPoints = 0
    this.spinCheckCount = 0;
    var spinCount = this.spinCheckCount
    this.miniSpinCount = 0
    this.mini2SpinCount = 0
    this.mini3SpinCount = 0
    this.mini3REVSpinCount = 0
    for (var i = 0; i < pieces[5].spin.highX[0].length; i++) {
     if ((this.testSpace(piece.x + pieces[5].spin.highX[piece.pos][i], piece.y + pieces[5].spin.highY[piece.pos][i])) == true && piece.landed == true) {

      this.miniSpinCount++;
      checkPoints++
     }
    }

    for (var i = 0; i < pieces[5].spin.lowX[0].length * pieces[5].spin.highY[0].length; i++) {
     if ((!this.testSpace(piece.x + pieces[5].spin.lowY[i][piece.pos], piece.y - 1 + pieces[5].spin.highY[i][piece.pos])) && piece.landed == true) {

      this.mini3SpinCount += 0.25 + (this.mini2SpinCount * 0.5) + (this.miniSpinCount * this.spinCheckCount / 0.1);

     }
    }
    for (var i = 0; i < pieces[5].spin.lowX[0].length * pieces[5].spin.highY[0].length; i++) {
     if ((!this.testSpace(piece.x + (pieces[5].spin.lowY[i][piece.pos] * -1), piece.y - 1 + pieces[5].spin.highY[i][piece.pos])) && piece.landed == true) {

      this.mini3REVSpinCount += 0.25 + (this.mini2SpinCount * 0.5) + (this.miniSpinCount * this.spinCheckCount / 0.1);

     }
    }
    for (var i = 0; i < pieces[5].spin.highX[0].length * pieces[5].spin.lowY[0].length; i++) {
     if ((this.testSpace(piece.x + pieces[5].spin.highX[i][piece.pos], piece.y + pieces[5].spin.lowY[i][piece.pos])) == false && piece.landed == true) {

      this.mini2SpinCount += 0.5 + (this.miniSpinCount * .2) * (this.spinCheckCount / 0.2);

     }
    }

    for (var i = 0; i < pieces[5].spin.lowX[0].length; i++) {
     if ((this.testSpace(piece.x + pieces[5].spin.lowX[piece.pos][i], piece.y + pieces[5].spin.lowY[piece.pos][i])) == true && piece.landed == true) {
      this.spinCheckCount += 0.8
      checkPoints++;


     }
    }
    if (piece.stsd.y == -2) {
     if (piece.stsd.x == 1) {
      this.spinCheckCount += 0.6
     }
     if (piece.stsd.x == -1) {
      this.spinCheckCount += 0.6
     }
    }
    if (checkPoints >= 3) {
     if (this.miniSpinCount >= 1 && this.spinCheckCount >= 0.7 && piece.spinX == piece.x && piece.spinY == piece.y) {
      if (this.miniSpinCount == 2) {
       this.isSpin = true;
       this.spinrecog = this.isSpin
       this.isMini = false
       this.spinrecogmini = this.isMini


      }
      if (this.miniSpinCount == 1 && this.spinCheckCount >= 1) {
       this.isSpin = false;
       this.spinrecog = this.isSpin
       this.isMini = true
       this.spinrecogmini = this.isMini


      }
     }
     if (this.miniSpinCount == 1 && this.spinCheckCount >= 1 && this.mini2SpinCount <= 1 && piece.spinX == piece.x && piece.spinY == piece.y) {
      this.isSpin = false;
      this.spinrecog = this.isSpin
      this.isMini = true
      this.spinrecogmini = this.isMini
     }
     if (piece.stsd.y == -2 && this.spinCheckCount >= 0.7 && this.miniSpinCount >= 1) {
      if (piece.stsd.x == 1) {
       this.isSpin = true
       this.isMini = false
      }
      if (piece.stsd.x == -1) {
       this.isSpin = true
       this.isMini = false
      }
     }
    }
   }
   this.spinrecog = this.isSpin;
   this.spinrecogmini = this.isMini;
   /*if (boolline == 0 && this.sensespin == 1) {
    this.isSpin = false;
    this.spinrecog = false;
    this.isMini = false;
   }*/
  } else {
   this.spinCheckCount = -85
   this.isSpin = false
   this.isMini = false
   this.spinrecog = this.isSpin
   this.spinrecogmini = this.isMini
  }
 },
 addPiece: function(tetro) {
  this.enablespin = this.spinrecog
  this.enablemini = this.spinrecogmini
  this.linespinrecog = false
  var once = false;
  var linesDetection = 0
  var perfectClear = true
  var range = [];
  this.valid = false;
  for (var x = 0; x < tetro.length; x++) {
   for (var y = 0; y < tetro[x].length; y++) {
    if (tetro[x][y]) {
     this.grid[x + piece.x][y + piece.y] = tetro[x][y];
     // Get column for finesse
     if (!once || x + piece.x < column) {
      column = x + piece.x;
      once = true;
     }
     if (range.indexOf(y + piece.y) === -1) {
      range.push(y + piece.y);
      // This checks if any cell is in the play field. If there
      //  isn't any this is called a lock out and the game ends.
      if (y + piece.y > 21) this.valid = true;
     }
    }
   }
  }

  // Lock out
  if (!this.valid) {
   endGame('Lock Out!',true,'lose')
   return false;
  }

  // Check modified lines for full lines.
  range = range.sort(function(a, b) {
   return a - b;
  });
  for (var row = range[0], len = row + range.length; row < len; row++) {
   var count = 0;
   for (var x = 0; x < this.width; x++) {
    if (this.grid[x][row]) count++;
   }
   if (count > 9) {
    linesDetection++;
    this.lineTotal++
    for (var y = row; y >= -1; y--) {
     for (var x = 0; x < 10; x++) {
      this.grid[x][y] = this.grid[x][y - 1];
     }
    }
   }
  }
  this.pieces++
  //---
  if (this.isSpin && linesDetection >= 1) {
   while (this.isSpin == true) {
    this.linespinrecog = true;
    this.minispinrecog = false
    this.enablespin = false;
    //console.log('spinenabled');
    this.spinrecog = false;
    this.isSpin = false;
    this.isMini = false
   }
  } else
  if (linesDetection > 0) {
   while (this.isMini == true || this.enablemini == true) {
    this.minispinrecog = true;
    this.enablespin = false
    this.enablemini = false;
    //console.log('spinenabled');
    this.spinrecog = false;
    this.isMini = false;
    this.spinrecogmini = false
    this.spinCheckCount = 0;
    this.miniSpinCount = 0
   }
   this.spinCheckCount = 0;
   this.miniSpinCount = 0
  }

  if (linesDetection == 0) {
   this.varren = -1
   this.showClearTextREN('hide')
   if (this.isMini) {
    this.showClearText('hide')
    this.showClearTextTSPIN('', 'T-Spin Mini')
    soundPlayer.playse('mini0')
   }
   if (this.isSpin) {
    this.showClearText('hide')
    this.showClearTextTSPIN('', 'T-Spin')
    soundPlayer.playse('tspin0')
   }
  }

  //---
  for (var x = 0; x < this.width; x++) {
   for (var y = 0; y < this.height; y++) {
    if (this.grid[x][y] !== 0 && this.testSpace(x, y)) {
     perfectClear = false
    }
   }
  }

  if (linesDetection !== 0) {
   this.showClearText('hide')
   this.showClearTextTSPIN('hide')
   if (perfectClear) {
    soundPlayer.playse('bravo')
    this.showClearTextTSPIN('show', 'All Clear')
   }
   if (this.linespinrecog) {
   }
   if (this.minispinrecog) {
   }

   this.varren++
   if (this.varren > 0) {
    this.showClearTextREN('show', `${this.varren} REN`)
    soundPlayer.playse(`ren${Math.min(20,this.varren)}`)
   }

   this.clearLines(linesDetection, this.linespinrecog, this.minispinrecog, this.b2b, perfectClear)

  }
  this.draw();
  this.checkWarning()
  this.linespinrecog = false
  this.minispinrecog = false
  return true
 },

resetFieldPosition: function() {
 gtrisBody.style.transition = 'transform 0s linear'
 gtrisBody.style.transform = 'translateY(0) rotateZ(0deg)'
},

 
 showClearText: function(compo, text) {
  for (var i = 0; i < 2; i++)
   clearTimeout(this.timers.regular)
  let components = docId('regular')
 
  if (compo == 'hide') {
    components.style.opacity = '0%'
    components.style.letterSpacing = '0.5px'
    components.style.transition = "letter-spacing 0ms ease-out"
  } else {
   components.innerHTML = text
   components.style.letterSpacing = '0.5px'
   components.style.opacity = '100%'
   components.style.transition = 'opacity 0ms linear, letter-spacing 0s linear'
   setTimeout(function() {
    components.style.transition = "letter-spacing 2s ease-out, opacity 200ms linear"

    components.style.letterSpacing = `${cellSize*0.2}px`
     
 
   }, 1)
   if (compo !== 'b2be') {
    {
     this.timers.regular = setTimeout(function() {
      for (var i = 0; i < 1; i++)
       clearTimeout(this)
      components.style.opacity = "0%"
     }, 2000)
    }
   }
  }
 
 },
 showClearTextTSPIN: function(compo, text, nent) {
  for (var i = 0; i < 2; i++)
   clearTimeout(this.timers.tSpin)
  let components = docId('tSpin')
 
  if (compo == 'hide') {
    components.style.opacity = '0%'
    components.style.letterSpacing = '0.5px'
    components.style.transition = "letter-spacing 0ms ease-out"

  } else {
 
   components.innerHTML = text
   components.style.letterSpacing = '0.5px'
   components.style.opacity = '100%'
   components.style.transition = 'opacity 0ms linear, letter-spacing 0s linear'
    setTimeout(function() {
    components.style.letterSpacing = `${cellSize*0.15}px`
    components.style.transition = "letter-spacing 2s ease-out, opacity 200ms linear"
   }, 2)
 
     this.timers.tSpin = setTimeout(function() {
      for (var i = 0; i < 1; i++)
       clearTimeout(this)
      components.style.opacity = "0%"
     }, 2000)
  }
 },
 showClearTextB2B: function(compo, text) {
  let components = docId('B2B')
  
 
  if (compo == 'hide') {
    components.style.opacity = '0%'
    components.style.letterSpacing = '0.5px'
    components.style.transition = "letter-spacing 200ms ease-out"
    components.style.transition = "opacity 200ms linear"
  } else {
 
   components.style.opacity = '100%'
 
 
   components.innerHTML = text
   components.style.transition = 'opacity 100ms linear'
   components.style.transition = 'letter-spacing 0s linear'
   components.style.letterSpacing = '0.5px'
   components.style.opacity = '100%'
   setTimeout(function() {
    components.style.letterSpacing = `${cellSize*0.2}px`
    components.style.transition = "letter-spacing 2s ease-out"
   },2)
  }
 },
 showClearTextREN: function(showhide, text) {

  let components = docId('REN')
  if (text !== void 0)
   components.innerHTML = text
  if (showhide == 'hide') {
   components.style.transition = 'opacity 200ms linear, letter-spacing 400ms easeOunt'
   components.style.letterSpacing = '0.5px'
   components.style.opacity = '0%'
  }
  if (showhide == 'show') {
   components.style.transition = "letter-spacing 200ms ease-out, opacity 200ms linear"
   components.style.letterSpacing = `${cellSize*0.2}px`
   components.style.opacity = "100%"
  }
 },
 clearLines: function(line, spin, mini, b2b, pc) {
/*  this.showClearText('show', '')
  this.showClearTextTSPIN('show','')*/
  if (this.linespinrecog) {
   this.showClearTextTSPIN('tSpin', 'T-Spin')
   this.b2b++
  }
  if (this.minispinrecog) {
   this.showClearTextTSPIN('tSpin', 'T-Spin Mini')
   this.b2b++
  }
  if (line > 3) {
   this.b2b++
  }
  if (!this.linespinrecog && !this.minispinrecog && line < 4) {
   this.b2b = -1
  }
  if (line == 1) {
   this.showClearText('', 'Single')
  }
  if (line == 2) {
   this.showClearText('', 'Double')
  }
  if (line == 3) {
   this.showClearText('', 'Triple')
  }
  if (line == 4) {
   this.showClearTextTSPIN('tSpin', '')
   this.showClearText('','Gachatris')
  }
  if (line >= 5) {
   this.showClearText('','Gachatris Plus')
   soundPlayer.playse('line4')
  }
  
  if(mini){
   switch(line){
    case 1: {
     soundPlayer.playse('mini1')
     break
    }
    case 2: {
     soundPlayer.playse('mini2')
     break
    }
   }
  }
  if (spin) {
   switch (line) {
    case 1: {
     soundPlayer.playse('tspin1')
     break
    }
    case 2: {
     soundPlayer.playse('tspin2')
     break
    }
    case 3: {
     soundPlayer.playse('tspin3')
     break
    }
   }
  }
  if (!mini&&!spin) {
   switch (Math.min(4,line)) {
    case 1: {
     soundPlayer.playse('line1')
     break
    }
    case 2: {
     soundPlayer.playse('line2')
     break
    }
    case 3: {
     soundPlayer.playse('line3')
     break
    }
    case 4: {
     soundPlayer.playse('line4')
     break
    }
   }
  }

  if (this.b2b > 0) {
   this.showClearTextB2B('show', `B2B x${this.b2b}`)
   soundPlayer.playse('b2b')
  }else{
   this.showClearTextB2B('hide')

  }
 },
 
 checkWarning:function(stop){
  var checked=false
  for (var i=0;i<this.width;i++){
   for(var y=0;y<this.height-15;y++){
    if(this.testSpace(i,y))
    checked=true
   }
  }
  if(checked&&stop!=='stop'){
   if(!this.warning){
    soundPlayer.stopse('alarm')
    soundPlayer.playse('alarm')
    docId('holdTextPlaceholder').style.backgroundColor="#f00"
    docId('nextTextPlaceholder').style.backgroundColor="#f00"
    docId('playField').style.borderColor="#f00"
    docId('meterBars').style.borderColor="#f00"
    if(this.isFieldEnable&&stop!=='stop'){
     docId('characterBackground').src=this.character.fields.danger
    }
    this.warning=true
   }
  }else{
   if(this.warning){
    this.warning=false
    docId('holdTextPlaceholder').style.backgroundColor = "#fff"
    docId('nextTextPlaceholder').style.backgroundColor = "#fff"
    docId('playField').style.borderColor = "#fff"
    docId('meterBars').style.borderColor = "#fff"
    soundPlayer.fadese('alarm',100,0,0)
    if (this.isFieldEnable&&stop!=='stop') {
     docId('characterBackground').src = this.character.fields.normal
    }
   }
  }
},
 
 draw: function() {
  clear(_CTX.field);
  draw(this.grid, 0, -19.6, 'field', void 0, 0);

  _CTX.field.globalCompositeOperation = 'source-atop';
  _CTX.field.fillStyle = 'rgba(0,0,0,0.0)';
  _CTX.field.fillRect(0, 0, _canvasses.field.width, _canvasses.field.height);
  _CTX.field.globalCompositeOperation = 'source-over';
 }
}

var field = new Field()
