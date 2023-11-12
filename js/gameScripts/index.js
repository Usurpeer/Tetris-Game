import Game from "./game.js";
import View from "./view.js";
import Controller from "./controller.js";

const countFigureOnLvls = [3, 1, 1],
  speedOnLvls = [1000, 500, 300],
  scoresForLvls = [1000, 3000, 4000],
  sizesPlayfield1 = [
    [20, 10],
    [20, 14],
    [20, 14],
  ],
  allFigures = [
    ["A000A000A000A000"], // линия
    ["BB00BB0000000000"], // квадрат
    ["C000CC00C0000000"], // T образная
    ["0DD0DD0000000000"], // L
    ["E000EEE000000000"], // другая L
  ],
  quantityLinesForNextLvl = [3, 3];

const game = new Game(
  countFigureOnLvls,
  allFigures,
  sizesPlayfield1,
  speedOnLvls,
  scoresForLvls,
  quantityLinesForNextLvl
);

window.game = game; // вроде надо, чтобы отображалось в консоли

/////////////////////////////////////////// view
const root = document.querySelector("#root");
const width = 400, // соотношение этих сторон необходимо считать относительно количества фигур
  height = 800,
  widthPlayField = 10, // размер  стакана
  heightPlayField = 20; // размер стакана надо соотношение пикселей такое же, как и соотношение длины/ширины, чтобы фигуры были не вытянутые

const view = new View(root, width, height, allFigures.length, 1);

window.view = view;
////////////////////////////////////////////
const controller = new Controller(game, view, 1000);

window.controller = controller;
