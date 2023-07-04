const preview = new function() {
  this.bag = [];

  this.init = function() {
    this.grabBag = this.gen();
    this.grabBag.push.apply(this.grabBag, this.gen());
    this.draw();
  };
  this.next = function() {
    var next;
    next = this.grabBag.shift();
    this.grabBag.push.apply(this.grabBag, this.gen())
    this.draw()
    return next
  };
  this.gen = function() {
    let pieceList = []
    this.bag.forEach(function(a) { pieceList.push(a) })
    for (var i = 0; i < pieceList.length - 1; i++)
    {
      var temp = pieceList[i];
      var rand = ~~((pieceList.length - i) * gachamino.rng.next()) + i;
      pieceList[i] = pieceList[rand];
      pieceList[rand] = temp;
    }
    return pieceList;
  }

  this.draw = function() {
    clear(_CTX[field.mainAssets.next]);
    clear(_CTX[field.mainAssets.queue])
    for (var i = 0; i < Math.min(field.pieceSettings.PREV, this.grabBag.length); i++) {
      if (i == 0) {
        if (this.grabBag[i] === 0) {
          draw(
            pieces[this.grabBag[i]].tetro,
            pieces[this.grabBag[i]].x - 2.5,
            pieces[this.grabBag[i]].y + 2,
            field.mainAssets.next,
            void 0,
            0
          );
        } else if (this.grabBag[i] === 3) {
          draw(
            pieces[this.grabBag[i]].tetro,
            pieces[this.grabBag[i]].x - 2.5,
            pieces[this.grabBag[i]].y + 2.5,
            field.mainAssets.next,
            void 0,
            0
          );
        } else {
          draw(
            pieces[this.grabBag[i]].tetro,
            pieces[this.grabBag[i]].x - 2,
            pieces[this.grabBag[i]].y + 2.5,
            field.mainAssets.next,
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
          field.mainAssets.queue,
          void 0,
          0
        )
      } else if (this.grabBag[i] === 3) {
        draw(
          pieces[this.grabBag[i]].tetro,
          pieces[this.grabBag[i]].x - 3,
          pieces[this.grabBag[i]].y + 2 + (i - 1) * 3,
          field.mainAssets.queue,
          void 0,
          0
        )
      } else {
        draw(
          pieces[this.grabBag[i]].tetro,
          pieces[this.grabBag[i]].x - 2,
          pieces[this.grabBag[i]].y + 2 + (i - 1) * 3,
          field.mainAssets.queue,
          void 0,
          0
        )
      }
    }
  }
  this.modifyBag = function(array, count) {
    if (count == void 0) {
      this.grabBag = array
    } else {
      this.grabBag = []
      for(let e = 0; e < count; e++){
        for(let ee = 0; ee < array.length; ee++){
          this.grabBag.push(array[ee])
        }
      }
    }
    this.draw()
  }
}()
