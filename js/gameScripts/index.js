import Game from "./game.js";

const countFigureOnLvls = [3, 1, 1],
  speedOnLvls = [1, 2, 3],
  scoresForLvls = [1000, 3000, 4000];
let stringAllFigures = "";
const sizesPlayfield1 = [
  [10, 5],
  [10, 6],
  [10, 7],
];
let countFig = 0;
for (let k = 0; k < countFigureOnLvls.length; k++) {
  for (let i = 0; i < countFigureOnLvls[k]; i++) {
    for (let j = 0; j < 16; j++) {
      stringAllFigures += "1";
    }
  }
}

const game = new Game(
  countFigureOnLvls,
  stringAllFigures,
  sizesPlayfield1,
  speedOnLvls,
  scoresForLvls
);

let playfield = game.get_set_PlayField();
//console.log(playfield);

window.game = game;

