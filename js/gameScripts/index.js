import Game from "./game.js";
import View from "./view.js";

const countFigureOnLvls = [3, 1, 1],
  speedOnLvls = [1, 2, 3],
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
  quantityLinesForNextLvl = [1, 3];

const game = new Game(
  countFigureOnLvls,
  allFigures,
  sizesPlayfield1,
  speedOnLvls,
  scoresForLvls,
  quantityLinesForNextLvl
);

window.game = game; // вроде надо, чтобы отображалось в консоли

game.updateScrore();

// view
const root = document.querySelector("#root");
const width = 400, // соотношение этих сторон необходимо считать относительно количества фигур
  height = 800,
  widthPlayField = 10, // размер  стакана
  heightPlayField = 20; // размер стакана надо соотношение пикселей такое же, как и соотношение длины/ширины, чтобы фигуры были не вытянутые

const view = new View(
  root,
  width,
  height,
  allFigures.length,
  1
);

view.render(game.getState());

window.view = view;

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      game.rotateFigure();
      view.render(game.getState());
      break;
    case "ArrowDown":
      game.moveDown();
      view.render(game.getState());
      break;
    case "ArrowRight":
      game.moveRight();
      view.render(game.getState());
      break;
    case "ArrowLeft":
      game.moveLeft();
      view.render(game.getState());
      break;
    case " ":
      console.log("Space");
      break;
  }
});
