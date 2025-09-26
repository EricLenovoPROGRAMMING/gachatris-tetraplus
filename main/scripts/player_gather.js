const PLAYERS = {
 0: {
  field: field,
  piece: gachamino,
  hold: hold,
  preview: preview,
  frenzyBg: new FrenzyBackground({
   fieldSize: {
    w: 10,
    vh: 20.4,
    
   },
   cellSize: 0,
   name: "frenzy"
  }),
//  frenzyWar: new FrenzyWar(PLAYERS[0])
 },
  1: {
   field: field2,
   piece: gachamino2,
   hold: hold2,
   preview: preview2,
   frenzyBg: new FrenzyBackground({
    fieldSize: {
     w: 10,
     vh: 20.4,
     
    },
    name: "frenzy2",
    cellSize: 0,
   }),
  // frenzyWar: new FrenzyWar(PLAYERS[1])
  }
}

function playerIterate(func) {
 for (let h in PLAYERS) {
  func(PLAYERS[h]);
 }
}

playerIterate(player => {
 player.frenzyWar = new FrenzyWar(player);
});