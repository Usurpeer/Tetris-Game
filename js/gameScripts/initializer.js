import Game from "./game.js";
import View from "./view.js";
import Controller from "./controller.js";
import ConvertAlphabet from "../convertToAlpgabet.js";

// обьявление всего что надо
let allFigures = [], // массив всех фигур
  countFigureOnLvls = [0, 0, 0], // количество фигур на уровень
  speedOnLvls = [0, 0, 0], // массив скоростей падения фигур
  scoresForLvls = [0, 0, 0], // массив очков за линию
  sizesPlayfield1 = [
    [0, 0],
    [0, 0],
    [0, 0],
  ], // высота, ширина поля 3*2
  quantityLinesForNextLvl = [0, 0], // количество линий для перехода на следующий уровень
  rating = 0, // рейтинг
  theme = 1, // тема 0/1
  gridOn = 1, // включен ли показ сетки
  time = 1; // время из куки 1 значит по времени

window.onload = go();

async function go() {
  await getData(); // инициализация всего

  // нужно преобразовать массив в буквенный вид
  // итоговый массив фигур, который нужно в класс Game
  const arraySymbol = ConvertAlphabet.convertNumbInAplphabet(allFigures);

  const game = new Game(
    1, // уровень, сюда куки
    countFigureOnLvls,
    arraySymbol,
    sizesPlayfield1,
    speedOnLvls,
    scoresForLvls,
    quantityLinesForNextLvl
  );
  console.log(quantityLinesForNextLvl);
  /////////////////////////////////////////// view
  const root = document.querySelector("#root");
  const width = 1000, // соотношение этих сторон необходимо считать относительно количества фигур
    height = 800;

  const view = new View(
    root, // имя класса div*а
    width,
    height,
    arraySymbol.length,
    document.body.className,
    gridOn,
    time,
    rating
  );

  // сюда нужен ID из куки
  let idUser = 2;
  const controller = new Controller(idUser, game, view);
  window.controller = controller;
  console.log("Низ метода");
}

// получение всех данных для игры с сервера
async function getData() {
  try {
    const res = await fetch(`../../php/gameplay.php`);
    const data = await res.json();

    const length = data[0];

    console.log(data);

    let iterator = 1; // итератор по data
    for (let i = 0; i < length; i++) {
      // четный индекс, значит фигура

      allFigures[i] = data[iterator];
      iterator++; // четный
      // нечетный, значит уровень

      countFigureOnLvls[data[iterator] - 1]++;
      iterator++; // нечетный
    }
    // получение оставшихся данных
    // первый уровень
    sizesPlayfield1[0][0] = data[iterator++];
    sizesPlayfield1[0][1] = data[iterator++];

    speedOnLvls[0] = 1000 / data[iterator++];

    quantityLinesForNextLvl[0] = data[iterator++];

    scoresForLvls[0] = data[iterator++];

    // второй уровень
    sizesPlayfield1[1][0] = data[iterator++];
    sizesPlayfield1[1][1] = data[iterator++];

    speedOnLvls[1] = 1000 / data[iterator++];

    quantityLinesForNextLvl[1] = data[iterator++];

    scoresForLvls[1] = data[iterator++];

    // третий уровень
    sizesPlayfield1[2][0] = data[iterator++];
    sizesPlayfield1[2][1] = data[iterator++];

    speedOnLvls[2] = 1000 / data[iterator++];

    iterator++;
    scoresForLvls[2] = data[iterator++];
  } catch (error) {
    console.warn(error);
  }
}
