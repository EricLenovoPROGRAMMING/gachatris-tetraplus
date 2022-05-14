function SoundLoader(){
 this.se = {}
 this.ren = {}
 this.selected={
  se:0
 }
 this.current={
  se:'UNUSE'
 }
 
 this.soundNamesArrayNoLoop = [
  'harddrop','move','rotate','land','lock','firsthold','hold',
  'b2b','game-3','game-2','game-1','game-start','bravo',
  'prespin','prespinmini','game-lose','game-win',`ko`, 'step'
  ]
 this.load=function(){
  if(this.selected.se!=this.current.se){
  this.current.se=this.selected.se
  for(let LOAD of this.soundNamesArrayNoLoop){
  this.se[LOAD]=new Howl({src:`assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/${LOAD}.ogg`, preload:false })
  this.se[LOAD].load()
  }
  for(var i=1;i<21;i++){
   this.se[`ren${i}`]=new Howl({src:`assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/ren/ren${i}.ogg`, preload:false})
  }
  for (var i = 1; i < 5; i++) {
   this.se[`line${i}`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/line${i}.ogg`, preload: false })
  }
  for (var i = 0; i < 4; i++) {
   this.se[`tspin${i}`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/tspin${i}.ogg`, preload: false })
  }
  for (var i = 0; i < 3; i++) {
   this.se[`mini${i}`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/mini${i}.ogg`, preload: false })
  }
  
  this.se[`alarm`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/alarm.ogg`, preload: false , loop:true})
  
  this.se[`topoutwarning`] = new Howl({ src: `assets/se/game/${settingsList.Sound.SoundBank[this.current.se]}/topoutwarning.ogg`, preload: false , loop:true})
  
  for(var load in this.se){
   this.se[load].load()
  }
  }
 }
 this.playse=function(name){
  if(selectedSettings.Volume.SFX>0){
  this.se[name].volume(selectedSettings.Volume.SFX/100)
  this.se[name].play()
  }
 }
 this.stopse = function(name) {
  this.se[name].stop()
 }
 this.fadese=function(name,a,b,c){
  this.se[name].fade(a,b,c)
 }
}

var soundPlayer = new SoundLoader()
