function Hold() {
  this.piece;
}

Hold.prototype.draw = function() {
  clear(_CTX.hold);
  if(piece.held){
  if (this.piece === 0) {
    draw(
      pieces[this.piece].tetro,
      pieces[this.piece].x - 2.5,
      2 + pieces[this.piece].y,
      'hold',
      8,
      0
    );
  } else if (this.piece === 3) {
   draw(
    pieces[this.piece].tetro,
    pieces[this.piece].x - 2.5,
    2.5+ pieces[this.piece].y,
    'hold',
    8,
    0
   );
  } else{
    draw(
      pieces[this.piece].tetro,
      pieces[this.piece].x - 2,
      2.5 + pieces[this.piece].y,
      'hold',
      8,
      0
    );
  }
}
  else
  if (this.piece === 0) {
   draw(
    pieces[this.piece].tetro,
    pieces[this.piece].x - 2.5,
    2 + pieces[this.piece].y,
    'hold',
    void 0,
    0
   );
  } else if (this.piece === 3) {
   draw(
    pieces[this.piece].tetro,
    pieces[this.piece].x - 2.5,
    2.5 + pieces[this.piece].y,
    'hold',
    void 0,
    0
   );
  } else{
   draw(
    pieces[this.piece].tetro,
    pieces[this.piece].x - 2,
    2.5 + pieces[this.piece].y,
    'hold',
    void 0,
    0
    
   );
  }
};
var hold = new Hold();

