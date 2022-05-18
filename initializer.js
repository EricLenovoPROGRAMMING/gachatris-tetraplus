//Shorten document.getElementById
function docId(id) {
 return document.getElementById(id)
}
//Shorten document.getElementsbyClassName
function $CN(id,n) {
 if (n !== void 0)
 return document.getElementsByClassName(id)[n]
 else
 return document.getElementsByClassName(id)
}
//Shorten document.getElementsByTagName
function $tag(id,n){
 if (n !== void 0)
  return document.getElementsByTagName(id)[n]
 else
  return document.getElementsByTagName(id)
}
//Shorten document.createElement
async function $create(tag, func){
 let a = document.createElement(tag)
 await func(a)
}

//Create array of ranges
function range(start, end, inc) {
 inc = inc || 1
 var array = []
 for (var i = start; i < end; i += inc) {
  array.push(i)
 }
 return array
}
//shorten docId().innerHTML
function $iH(id,innerHTML){
 docId(id).innerHTML=innerHTML
}
//Number Modulator for tetrimino clock arithmetics
Number.prototype.mod = function(n) {
 return ((this % n) + n) % n
};

//initialize Gachatris
!function(){
 let array=['jQuery','howler-lib','gachatris-data','piece','field','queue_prev','piecehold','soundplayer','main', 'menus']
 var i=0
 function loadScript(){
  $create('script', function(a){
   a.src=`scripts/${array[i]}.js`
   a.id=`script-${array[i]}`
   a.type='text/javascript'
   document.body.appendChild(a)
   a.onload = ()=>{
    if(i<array.length -1){
    i++
    loadScript()

    } else {
     initializeGTris()
    }
  }
 })
 }
 loadScript()
 
 function initializeGTris(){
  $('#gtrisSplashText').animate({opacity: 0}, 0, "linear",function(){this.innerHTML='EricLenovo presents...'})
  $('#gtrisSplashText').animate({opacity: 1}, 400, "linear")
  $('#gtrisSplashText').animate({opacity: 1}, 1000, "linear")
  $('#gtrisSplashText').animate({opacity: 0}, 400, "linear",function(){this.innerHTML='Developed on May 5, 2022'})
  $('#gtrisSplashText').animate({opacity: 1}, 400, "linear")
  $('#gtrisSplashText').animate({opacity: 1}, 1500, "linear")
  $('#gtrisSplashText').animate({opacity: 0}, 400, "linear",function(){
   this.innerHTML=`Gachatris Tetraplus, v${gtris_version}`
   $('#splashLogo').animate({opacity: 0}, 0, "linear")
   $('#splashLogo').animate({opacity: 1}, 400, "linear")
   $('#splashLogo').animate({opacity: 1}, 1000, "linear")
   $('#splashLogo').animate({opacity: 0}, 250, "linear")
  })
  $('#gtrisSplashText').animate({opacity: 1}, 400, "linear")
  $('#gtrisSplashText').animate({opacity: 1}, 1000, "linear")
  $('#gtrisSplashText').animate({opacity: 0}, 250, "linear", function(){
   $('#splash').css('z-index', "-36")
   activeMenu(true, "100%", true)
   switchMenu(0, true, 'Gachatris Tetraplus Alpha', true)
   addEventListener('keydown', keyUpDown, false);
   addEventListener('keyup', keyUpDown, false);
  })

 //$('#splash').css('display','none')
 }
 
}()

//Globally handle errors
window.onerror = (event,source,lineno,colno,error) =>{
 if(error instanceof SyntaxError)
 document.body.innerHTML = (`FATAL ERROR!!! At ${source}, ${lineno}:${colno}, there is ${['a','e','i','o','u'].indexOf(event.toLowerCase().replace('uncaught syntaxerror: ', '').charAt(0)) !== -1?'an':'a'} ${event.replace('Uncaught SyntaxError: ','').toLowerCase()}. Please contact the Gachatris developer and he will fix a discovered bug to recover the game.`)
 else{
 alert(`At ${source}, ${lineno}:${colno}, there is ${[`a`,`e`,`i`,`o`,`u`].indexOf(event.toLowerCase().charAt(0)) !== -1?'an':'a'} ${event}. If you see this error mesage, contact the Gachatris developer.`)
}
}



