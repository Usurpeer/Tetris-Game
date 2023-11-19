import Game from "./game.js";
import View from "./view.js";
import Controller from "./controller.js";
import ConvertAlphabet from "../convertToAlpgabet.js";

const speedOnLvls = [1000, 500, 250],
  scoresForLvls = [1000, 2000, 5000],
  sizesPlayfield1 = [
    [20, 10],
    [20, 14],
    [20, 8],
  ],
  allFigures = [
    ["1000100010001000"], // линия
    ["1100110000000000"], // квадрат
    ["0100111000000000"], // T образная
    ["0110110000000000"], // S
    ["1100011000000000"], // Z
    ["1000100011000000"], // L
    ["0100010011000000"], // Other L
    // отсуда свои фигуры
    ["0110110001000000"], // H 1
    ["1100110010000000"], // I 2
    ["1100100010001000"], // J 3
    ["0100010011001000"], // K 4
    ["0100010011100000"], // L 5
    ["1110101000000000"], // M 6
    ["1110100010000000"], // N 7
    ["0010011011000000"], // O 8
    ["0100111001000000"], // P 9
    ["1000110010001000"], // Q 10
    ["0110010011000000"], // R 11
  ],
  countFigureOnLvls = [allFigures.length - 11, 1, 1],
  quantityLinesForNextLvl = [1, 1];

const convertAlp = new ConvertAlphabet();

const arraySymbol = convertAlp.convertNumbInAplphabet(allFigures);
console.log(arraySymbol);

const game = new Game(
  countFigureOnLvls,
  arraySymbol,
  sizesPlayfield1,
  speedOnLvls,
  scoresForLvls,
  quantityLinesForNextLvl
);

window.game = game; // вроде надо, чтобы отображалось в консоли

/////////////////////////////////////////// view
const root = document.querySelector("#root");
const width = 600, // соотношение этих сторон необходимо считать относительно количества фигур
  height = 800;

const view = new View(root, width, height, allFigures.length, 1, 1);

window.view = view;
////////////////////////////////////////////
const controller = new Controller(game, view);

window.controller = controller;
