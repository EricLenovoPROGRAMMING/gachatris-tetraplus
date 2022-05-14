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
function $create(tag, func){
 let a = document.createElement(tag)
 func(a)
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
setTimeout(
function(){
 let array=['howler-lib','gachatris-data','piece','field','queue_prev','piecehold','soundplayer','main']
 for(let i of array) {
  $create('script', function(a){
   a.src=`scripts/${i}.js`
   a.type='text/javascript'
   document.body.appendChild(a)
  })
 }
 },100)
}()
