//Globally handle errors
window.onerror = (event, source, lineno, colno, error) => {
  if (error instanceof SyntaxError) {
    document.body.innerHTML = (`FATAL ERROR!!! At ${source}, ${lineno}:${colno}, ${event.indexOf('strict mode code'.toLowerCase())!==0?'':"there is"} ${['a','e','i','o','u'].indexOf(event.toLowerCase().replace('uncaught syntaxerror: ', '').charAt(0)) !== -1?'an':'a'} ${event.replace('Uncaught SyntaxError: ','').toLowerCase()}. Please contact the Gachatris developer and he will fix a discovered bug to recover the game.`)
    document.body.style = "background:#007;color:#fff"
  } else {
    //alert(`At ${source}, ${lineno}:${colno}, there is ${[`a`,`e`,`i`,`o`,`u`].indexOf(event.toLowerCase().charAt(0)) !== -1?'an':'a'} ${event}. If you see this error mesage, contact the Gachatris developer.`)
  }
}
