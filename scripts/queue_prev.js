function Preview() {
 
}



Preview.prototype.init = function() {

 this.grabBag = this.gen();
 this.grabBag.push.apply(this.grabBag, this.gen());
 this.draw();
};
Preview.prototype.next = function() {
 var next;
 next = this.grabBag.shift();
 this.grabBag.push.apply(this.grabBag, this.gen())
 this.draw()
 return next
};
Preview.prototype.gen = function() {
 var pieceList = void 0;
 pieceList = [0, 1, 2, 3, 4, 5, 6];
 for (var i = 0; i < pieceList.length - 1; i++)
 {
  var temp = pieceList[i];
  var rand = ~~((pieceList.length - i) * piece.rng.next()) + i;
  pieceList[i] = pieceList[rand];
  pieceList[rand] = temp;
 }
 return pieceList;
}

Preview.prototype.draw = function() {
 clear(_CTX.next);
 clear(_CTX.queue)
 for (var i = 0; i < Math.min(pieceSettings.PREV, this.grabBag.length); i++) {
  if (i == 0) {
   if (this.grabBag[i] === 0) {
    draw(
     pieces[this.grabBag[i]].tetro,
     pieces[this.grabBag[i]].x - 2.5,
     pieces[this.grabBag[i]].y + 2,
     'next',
     void 0,
     0
    );
   } else if (this.grabBag[i] === 3) {
    draw(
     pieces[this.grabBag[i]].tetro,
     pieces[this.grabBag[i]].x - 2.5,
     pieces[this.grabBag[i]].y + 2.5,
     'next',
     void 0,
     0
    );
   } else {
    draw(
     pieces[this.grabBag[i]].tetro,
     pieces[this.grabBag[i]].x - 2,
     pieces[this.grabBag[i]].y + 2.5,
     'next',
     void 0,
     0
    );
   }
  }
  else
  if (this.grabBag[i] === 0) {
   draw(
    pieces[this.grabBag[i]].tetro,
    pieces[this.grabBag[i]].x - 2,
    pieces[this.grabBag[i]].y + 2 + (i - 1) * 3,
    'queue',
    void 0,
    0
   );
  } else if (this.grabBag[i] === 3) {
   draw(
    pieces[this.grabBag[i]].tetro,
    pieces[this.grabBag[i]].x - 3,
    pieces[this.grabBag[i]].y + 2 + (i - 1) * 3,
    'queue',
    void 0,
    0
   );
  } else {
   draw(
    pieces[this.grabBag[i]].tetro,
    pieces[this.grabBag[i]].x - 2,
    pieces[this.grabBag[i]].y + 2 + (i - 1) * 3,
    'queue',
    void 0,
    0
   );
  }
 }
};
var preview = new Preview();
