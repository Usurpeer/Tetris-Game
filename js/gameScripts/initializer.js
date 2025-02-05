import Game from "./game.js";
import View from "./view.js";
import Controller from "./controller.js";
import ConvertAlphabet from "../convertToAlpgabet.js";
import script_cookie from "../get_cookies.js";

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
  rating = getRatingCookie(), // рейтинг
  gridOn = script_cookie("gridOn"), // включен ли показ сетки
  time = script_cookie("countScore"),
  gameLvl = Number(script_cookie("lvl")), // время из куки 1 значит по времени
  idUser = script_cookie("id"),
  musicOn = script_cookie("musicOn");

window.onload = go();
function soundClick() {
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = "../../audio/music_in_game.mp3"; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}
async function go() {
  if (musicOn == 1) {
    soundClick();
  }

  checkRole();
  await getData(); // инициализация всего

  // нужно преобразовать массив в буквенный вид
  // итоговый массив фигур, который нужно в класс Game
  const arraySymbol = ConvertAlphabet.convertNumbInAplphabet(allFigures);

  const game = new Game(
    gameLvl, // уровень, сюда куки
    countFigureOnLvls,
    arraySymbol,
    sizesPlayfield1,
    speedOnLvls,
    scoresForLvls,
    quantityLinesForNextLvl
  );
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

  const controller = new Controller(idUser, game, view);
  window.controller = controller;
}

// получение всех данных для игры с сервера
async function getData() {
  try {
    const res = await fetch(`../../php/gameplay.php`);
    const data = await res.json();

    const length = data[0];

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
function getRatingCookie() {
  let scoringMethod = script_cookie("countScore");
  if (scoringMethod == 1) {
    return script_cookie("ratingTime");
  } else {
    return script_cookie("ratingScore");
  }
}
function checkRole() {
  // по загрузке на страницу установить все чекбоксы в соответсвии с куки
  let user_role = script_cookie("role");
  if (user_role != "0") {
    window.location.href = "main_log_in_2.html";
  }
}
