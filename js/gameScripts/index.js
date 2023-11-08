import Game from "./game.js";

const countFigureOnLvls = [3, 1, 1],
  speedOnLvls = [1, 2, 3],
  scoresForLvls = [1000, 3000, 4000],
  sizesPlayfield1 = [
    [10, 5],
    [10, 6],
    [10, 7],
  ],
  allFigures = [
    ["1000100010001000"], // линия
    ["1100110000000000"], // квадрат
    ["1000110010000000"], // F без верхней полоски
    ["0011110000000000"], // L
    ["1000111000000000"], // другая L
  ];

const game = new Game(
  countFigureOnLvls,
  allFigures,
  sizesPlayfield1,
  speedOnLvls,
  scoresForLvls
);

let playfield = game.get_set_PlayField();
//console.log(playfield);

window.game = game;
