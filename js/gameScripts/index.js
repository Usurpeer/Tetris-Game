import Game from "./game.js";
import View from "./view.js";

const countFigureOnLvls = [3, 1, 1],
  speedOnLvls = [1, 2, 3],
  scoresForLvls = [1000, 3000, 4000],
  sizesPlayfield1 = [
    [20, 10],
    [20, 12],
    [20, 14],
  ],
  allFigures = [
    ["1000100010001000"], // линия
    ["1100110000000000"], // квадрат
    ["1000110010000000"], // T образная
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

window.game = game; // вроде надо, чтобы отображалось в консоли

// view
const root = document.querySelector("#root");
const width = 400, // соотношение этих сторон необходимо считать относительно количества фигур
  height = 800,
  widthPlayField = 10, // размер  стакана
  heightPlayField = 20; // размер стакана надо соотношение пикселей такое же, как и соотношение длины/ширины, чтобы фигуры были не вытянутые

const view = new View(root, width, height, heightPlayField, widthPlayField);

view.render(game.getState(), 1);

window.view = view;

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      game.rotateFigure();
      view.render(game.getState(), 1);
      break;
    case "ArrowDown":
      game.moveDown();
      view.render(game.getState(), 1);
      break;
    case "ArrowRight":
      game.moveRight();
      view.render(game.getState(), 1);
      break;
    case "ArrowLeft":
      game.moveLeft();
      view.render(game.getState(), 1);
      break;
    case " ":
      console.log("Space");
      break;
  }
});
