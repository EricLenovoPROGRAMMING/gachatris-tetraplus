

const hold = new function(){
  this.piece;
	this.draw = function() {
		clear(_CTX[field.mainAssets.hold]);
		if (gachamino.held) {
			if (this.piece === 0) {
				draw(
					pieces[this.piece].tetro,
					pieces[this.piece].x - 2.5,
					2 + pieces[this.piece].y,
					field.mainAssets.hold,
					8,
					0
				);
			} else if (this.piece === 3) {
				draw(
					pieces[this.piece].tetro,
					pieces[this.piece].x - 2.5,
					2.5 + pieces[this.piece].y,
					field.mainAssets.hold,
					8,
					0
				);
			} else {
				draw(
					pieces[this.piece].tetro,
					pieces[this.piece].x - 2,
					2.5 + pieces[this.piece].y,
					field.mainAssets.hold,
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
				field.mainAssets.hold,
				void 0,
				0
			);
		} else if (this.piece === 3) {
			draw(
				pieces[this.piece].tetro,
				pieces[this.piece].x - 2.5,
				2.5 + pieces[this.piece].y,
				field.mainAssets.hold,
				void 0,
				0
			);
		} else {
			draw(
				pieces[this.piece].tetro,
				pieces[this.piece].x - 2,
				2.5 + pieces[this.piece].y,
				field.mainAssets.hold,
				void 0,
				0
	
			);
		}
	};
}()
