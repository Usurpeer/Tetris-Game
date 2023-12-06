// работа с конструктором
import script_cookie from "../get_cookies.js";

let buttons = document.querySelectorAll("button"); //предотвращение обновления страниц по кнопкам
buttons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
  });
});
//кнопки, поля
const inputCount = document.querySelector(".input_count");
const widthPlayfield = document.querySelector(".width_cup_input");
const heigthPlayfield = document.querySelector(".heigth_cup_input");
const speedInp = document.querySelector(".speed_fall");
const countLinesInp = document.querySelector(".count_rows");
const scoreInp = document.querySelector(".point_line");

const btnAdd = document.querySelector("#add_fig"); //кнопка добавить фигуру
const btnDelete = document.querySelector("#delete_fig");
const btnRigthLvl = document.querySelector("#btn_right_lvl"); //кнопка навигации
const btnLeftLvl = document.querySelector("#btn_left_lvl"); //кнопка навигации
const btnRigthAll = document.querySelector("#btn_right_all"); //кнопка навигации
const btnLeftLvlAll = document.querySelector("#btn_left_all"); //кнопка навигации
const btnEnd = document.querySelector("#btn_end");

const btnMinW = document.querySelector("#btn_min_w"); //кнопка - ширины
const btnPlusW = document.querySelector("#btn_plus_w"); //кнопка + ширины
const btnMinH = document.querySelector("#btn_min_h"); //кнопка - высоты
const btnPlusH = document.querySelector("#btn_plus_h");

const btnMinSpeed = document.querySelector("#btn_min_sp"); // кнопка - скорость
const btnPlusSpeed = document.querySelector("#btn_plus_sp"); //кнопка + скорость
const btnMinLines = document.querySelector("#btn_min_lin"); //кнопка - количество линий
const btnPlusLines = document.querySelector("#btn_plus_lin");
const btnMinScore = document.querySelector("#btn_min_score"); //кнопка - очков
const btnPlusScore = document.querySelector("#btn_plus_score");

const btnback = document.querySelector("#back");

const canvas = document.querySelector("#construct_fig"); //канвас добавление/изменения
const context = canvas.getContext("2d");
context.width = 250;
context.heigth = 250;

const canvas2 = document.querySelector("#added_fig"); //канвас добавленных фигур
const context2 = canvas2.getContext("2d");

let square1 = new Path2D(); //создание квадратов для отрисовки фигур
let square2 = new Path2D();
let square3 = new Path2D();
let square4 = new Path2D();
let square5 = new Path2D();
let square6 = new Path2D();
let square7 = new Path2D();
let square8 = new Path2D();
let square9 = new Path2D();
let square10 = new Path2D();
let square11 = new Path2D();
let square12 = new Path2D();
let square13 = new Path2D();
let square14 = new Path2D();
let square15 = new Path2D();
let square16 = new Path2D();

let squares = [
  square1,
  square2,
  square3,
  square4, //массив квадратов для отрисовки фигур
  square5,
  square6,
  square7,
  square8,
  square9,
  square10,
  square11,
  square12,
  square13,
  square14,
  square15,
  square16,
];

let coord = [0, 62.5, 125, 187.5, 250];
let id_square = 0;

let currentLvl,
  allFigures = [], // [i][0] - строка фигуры, [i][1] - ID
  indexAllFigures = 0, // индекс отображаемой фигуры всех фигур, чтобы знать какая сейчас на экране
  figuresOnLvl = [], // [i][0] - строка фигуры, [i][1] - ID, фигуры на уровнь
  indexFiguresOnLvl = 0, // индекс отображаемой фигуры фигур на уровень, чтобы знать какая сейчас на экране
  width,
  heigth,
  speed,
  countLines,
  score;

const h1Lvl = document.getElementById("strLvl");

window.onload = () => {
  let user_role = script_cookie("role");
  if (user_role != "1") {
    window.location.href = "main_log_in_2.html";
  }
  // считать сложность
  currentLvl = script_cookie("lvlSetings");
  console.log("Уровень: " + currentLvl);
  h1Lvl.innerText = "Уровень " + currentLvl;
  go();
};

async function go() {
  console.log("go");
  // проинициализировать текущий уровень тут, из куки

  // инициализация всех данных из бд
  await getDataFigures(); // инициализация массивов фигур
  await getDataValues(); // инициализация значений размерности и тп

  let figureRigth = getArrayFromString(allFigures[indexFiguresOnLvl][0]);

  initSquare(); // инициализация квадратов
  renderAllFigure(figureRigth); // отрисовка фигуры слева

  let figureLeft = getArrayFromString(figuresOnLvl[indexAllFigures][0]);
  renderOnLvlFigure(figureLeft); // отрисовка фигуры слева
}

// функция получает из БД список фигур, количество фигур
async function getDataFigures() {
  try {
    let sendArray = {
      lvl: currentLvl,
    };

    const res = await fetch("../../php/lvlSettings/getData.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendArray),
    });

    // данные от ответа сервера
    const data = await res.json();

    // первый массив всех фигур
    let countAllFigures = data[0];

    let iterator = 1; // итератор по data
    for (let i = 0; i < countAllFigures; i++) {
      // четный индекс, значит фигура
      allFigures[i] = [, ,];
      allFigures[i][0] = data[iterator++];
      //iterator++; // четный
      // нечетный, значит уровень

      // id
      allFigures[i][1] = data[iterator++];
      //iterator++; // нечетный

      // уровень
      allFigures[i][2] = data[iterator++];
      // iterator++;
    }

    // второй массив фигур на уровень
    let countFigureOnLvl = data[iterator++];

    for (let i = 0; i < countFigureOnLvl; i++) {
      // четный индекс, значит фигура
      figuresOnLvl[i] = [, ,];
      figuresOnLvl[i][0] = data[iterator++];
      //iterator++; // четный
      // нечетный, значит уровень

      figuresOnLvl[i][1] = data[iterator++];
      //iterator++; // нечетный

      figuresOnLvl[i][2] = data[iterator++];
      //iterator++;
    }

    inputCount.value = figuresOnLvl.length;
  } catch (error) {
    console.warn(error);
  }
}
// инициализация значений размерности и тп
async function getDataValues() {
  try {
    let sendArray = {
      lvl: currentLvl,
    };

    const res = await fetch("../../php/lvlSettings/getDataFields.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendArray),
    });

    // данные от ответа сервера
    const data = await res.json();

    heigth = data[0];
    width = data[1];

    speed = data[2];
    countLines = data[3];
    score = data[4];
    printValues();
  } catch (error) {
    console.warn(error);
  }
}

function checkInputData(heigth, width, speed, countLines, score) {
  if (currentLvl < 3 && (countLines < 1 || countLines > 15)) {
    alert("Недопустимое колиество линий за уровень.");
    return false;
  }
  if (score < 100 || score > 5000) {
    alert("Недопустимое колиество очков за уровень.");
    return false;
  }
  if (heigth < 10 || heigth > 20) {
    alert("Недопустимая высота стакана.");
    return false;
  }
  if (width < 7 || width > 14) {
    alert("Недопустимая ширина стакана.");
    return false;
  }
  if (speed < 1 || speed > 8) {
    alert("Недопустимая скорость падения фигуры.");
    return false;
  }
  return true;
}
async function updateLevelSettings() {
  await updateLevelSettingsBD();
  window.location.replace("admin_menu.html");
}
async function updateLevelSettingsBD() {
  try {
    let sendArray = {
      lvl: currentLvl,
      heigth: heigth,
      width: width,
      speed: speed,
      countLines: countLines,
      score: score,
    };

    const res = await fetch("../../php/lvlSettings/updateLevelSettings.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendArray),
    });
    // данные от ответа сервера
    console.log(await res.json());
  } catch (error) {
    console.warn(error);
  }
}
function printValues() {
  widthPlayfield.value = width;
  heigthPlayfield.value = heigth;

  countLinesInp.value = countLines;
  speedInp.value = speed;
  scoreInp.value = score;
}
btnMinW.addEventListener("click", () => {
  //уменьшение ширины стакана
  if (widthPlayfield.value > 7 && widthPlayfield.value <= 14) {
    widthPlayfield.value = parseInt(widthPlayfield.value) - 1;
  } else {
    alert("Недопустимое значение ширины стакана.");
  }
});
btnPlusW.addEventListener("click", () => {
  //уменьшение ширины стакана
  if (widthPlayfield.value >= 7 && widthPlayfield.value < 14) {
    widthPlayfield.value = parseInt(widthPlayfield.value) + 1;
  } else {
    alert("Недопустимое значение ширины стакана.");
  }
});
btnMinH.addEventListener("click", () => {
  //уменьшение ширины стакана
  if (heigthPlayfield.value > 10 && heigthPlayfield.value <= 20) {
    heigthPlayfield.value = parseInt(heigthPlayfield.value) - 1;
  } else {
    alert("Недопустимое значение высоты стакана.");
  }
});
btnPlusH.addEventListener("click", () => {
  //уменьшение ширины стакана
  if (heigthPlayfield.value >= 10 && heigthPlayfield.value < 20) {
    heigthPlayfield.value = parseInt(heigthPlayfield.value) + 1;
  } else {
    alert("Недопустимое значение высоты стакана.");
  }
});
btnMinSpeed.addEventListener("click", () => {
  //уменьшение ширины стакана
  if (speedInp.value > 1 && speedInp.value <= 8) {
    speedInp.value = parseInt(speedInp.value) - 1;
  } else {
    alert("Недопустимое значение скорости падения фигур.");
  }
});
btnPlusSpeed.addEventListener("click", () => {
  //уменьшение ширины стакана
  if (speedInp.value >= 1 && speedInp.value < 8) {
    speedInp.value = parseInt(speedInp.value) + 1;
  } else {
    alert("Недопустимое значение скорости падения фигур.");
  }
});
btnMinLines.addEventListener("click", () => {
  //уменьшение ширины стакана
  if (countLinesInp.value > 1 && countLinesInp.value <= 15) {
    countLinesInp.value = parseInt(countLinesInp.value) - 1;
  } else {
    alert("Недопустимое количество линий на уровень.");
  }
});
btnPlusLines.addEventListener("click", () => {
  //уменьшение ширины стакана
  if (countLinesInp.value >= 1 && countLinesInp.value < 15) {
    countLinesInp.value = parseInt(countLinesInp.value) + 1;
  } else {
    alert("Недопустимое количество линий на уровень.");
  }
});
btnMinScore.addEventListener("click", () => {
  //уменьшение ширины стакана
  if (scoreInp.value >= 200 && scoreInp.value <= 5000) {
    scoreInp.value = parseInt(scoreInp.value) - 100;
  } else {
    if (scoreInp.value == 100) {
      alert("Недопустимое количество очков.");
    } else {
      scoreInp.value = 100;
    }
  }
});
btnPlusScore.addEventListener("click", () => {
  //уменьшение ширины стакана
  if (scoreInp.value >= 100 && scoreInp.value <= 4900) {
    scoreInp.value = parseInt(scoreInp.value) + 100;
  } else {
    if (scoreInp.value == 5000) {
      alert("Недопустимое количество очков.");
    } else {
      scoreInp.value = 5000;
    }
  }
});
// закрытие окна, занесение в бд с проверкой
btnEnd.addEventListener("click", () => {
  if (
    checkInputData(
      heigthPlayfield.value,
      widthPlayfield.value,
      speedInp.value,
      countLinesInp.value,
      scoreInp.value
    )
  ) {
    // занести в бд
    score = scoreInp.value;
    speed = speedInp.value;
    heigth = heigthPlayfield.value;
    width = widthPlayfield.value;
    countLines = countLinesInp.value;
    updateLevelSettings();
    // перейти на новую страницу
  } else {
    //alert("недопустимые значения.");
  }
});
function initSquare() {
  for (let j = 0; j < 4; j++) {
    // создание квадратов
    for (let i = 1; i <= 4; i++) {
      squares[id_square].rect(coord[(i % 16) - 1], coord[j], 62.5, 62.5);
      squares[id_square].id = id_square + 1;
      id_square += 1;
    }
  }
}
function renderAllFigure(fig) {
  for (let i = 0; i < 16; i++) {
    if (fig[i] == 1) {
      context.fillStyle = "#5B3B3B";
      context.fill(squares[i]);
    }
  }
}
function renderOnLvlFigure(fig) {
  for (let i = 0; i < 16; i++) {
    if (fig[i] == 1) {
      context2.fillStyle = "#5B3B3B";
      context2.fill(squares[i]);
    }
  }
}
// инициализация массива новой фигуры в
function getArrayFromString(stringFig) {
  // преобразование строки в двумерный массив 4*4
  let arr = [];
  for (let i = 0; i < 16; i++) {
    arr[i] = Number(stringFig[i]);
  }
  return arr;
}

btnRigthAll.addEventListener("click", () => {
  //навигация по фигурам
  if (indexAllFigures < parseInt(allFigures.length) - 1) {
    indexAllFigures++;
  } else {
    indexAllFigures = 0;
  }
  context.clearRect(0, 0, 250, 250);
  let figureRight = getArrayFromString(allFigures[indexAllFigures][0]);
  renderAllFigure(figureRight); // отрисовка фигуры слева
});
btnLeftLvlAll.addEventListener("click", () => {
  //навигация по фигурам
  if (indexAllFigures > 0) {
    indexAllFigures--;
  } else {
    indexAllFigures = allFigures.length - 1;
  }
  context.clearRect(0, 0, 250, 250);
  let figureRight = getArrayFromString(allFigures[indexAllFigures][0]);
  renderAllFigure(figureRight); // отрисовка фигуры слева
});

btnRigthLvl.addEventListener("click", () => {
  //навигация по фигурам
  if (indexFiguresOnLvl < parseInt(figuresOnLvl.length) - 1) {
    indexFiguresOnLvl++;
  } else {
    indexFiguresOnLvl = 0;
  }
  context2.clearRect(0, 0, 250, 250);
  let figureLeft = getArrayFromString(figuresOnLvl[indexFiguresOnLvl][0]);
  renderOnLvlFigure(figureLeft); // отрисовка фигуры слева
});
btnLeftLvl.addEventListener("click", () => {
  //навигация по фигурам
  if (indexFiguresOnLvl > 0) {
    indexFiguresOnLvl--;
  } else {
    indexFiguresOnLvl = figuresOnLvl.length - 1;
  }
  context2.clearRect(0, 0, 250, 250);
  let figureLeft = getArrayFromString(figuresOnLvl[indexFiguresOnLvl][0]);
  renderOnLvlFigure(figureLeft); // отрисовка фигуры слева
});
btnDelete.addEventListener("click", () => {
  if (figuresOnLvl.length == 3) {
    alert("Невозможно удалить.\nМинимальное количество фигур.");
  } else {
    if (figuresOnLvl[indexFiguresOnLvl][2] < currentLvl) {
      alert("Невозможно удалить фигуру.");
    } else {
      btnDeleteFunc(figuresOnLvl[indexFiguresOnLvl][1]);
    }
  }
});
async function btnDeleteFunc(ind) {
  await deleteLvlFigure(ind);
  await getDataFigures(); // тк нужно заново обновить массив всех фигур, по хорошему это как раз через связь с бд делать
  await getDataValues();
  context2.clearRect(0, 0, 250, 250);
  let figureLeft = getArrayFromString(figuresOnLvl[indexFiguresOnLvl][0]);
  renderOnLvlFigure(figureLeft); // отрисовка фигуры слева
  // данные от ответа сервера
  location.reload();
}
// метод который удаляет сложность фигуры в бд
async function deleteLvlFigure(idFig) {
  try {
    let sendArray = {
      id: idFig,
    };
    console.log("Отправляю id: " + idFig);
    const res = await fetch("../../php/lvlSettings/deleteLvlFigure.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendArray),
    });
    // данные от ответа сервера
    console.log(await res.json());
  } catch (error) {
    console.warn(error);
  }
}
btnAdd.addEventListener("click", () => {
  //добавление фигуры (отрисовка слева)
  clickOnAdd();
});
// функционал кнопки добавить
async function clickOnAdd() {
  // эта фигура, которую нужно добавить
  let idAddedFigure = allFigures[indexAllFigures][1];
  // проверить, что она уникальна
  if (isUnique(idAddedFigure)) {
    // запрос в бд, где по id фигуры меняется ее уровень на текущий
    await setLvlFigure(idAddedFigure);
    await getDataFigures();
    await getDataValues();

    context2.clearRect(0, 0, 250, 250);
    indexFiguresOnLvl = 0;
    renderOnLvlFigure(figuresOnLvl[indexFiguresOnLvl][0]);
  } else {
    alert("Фигура неуникальна.");
  }
  //если она неуникальна, то ничего не делать
  //
}
// метод, который проверяет уникальность фигуры по id в массиве фигур уровня
function isUnique(id) {
  for (let i = 0; i < figuresOnLvl.length; i++) {
    if (figuresOnLvl[i][1] == id) {
      return false;
    }
  }
  return true;
}
// функция, которая отправляет id фигуры и сложность
async function setLvlFigure(idFig) {
  try {
    let sendArray = {
      id: idFig,
      lvl: currentLvl,
    };
    console.log("Отправляю id: " + idFig);
    console.log("Отправляю lvl: " + currentLvl);
    const res = await fetch("../../php/lvlSettings/addFigure.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendArray),
    });
    // данные от ответа сервера
    console.log(await res.json());
  } catch (error) {
    console.warn(error);
  }
}
btnback.addEventListener("click", () => {
  window.location.replace("admin_menu.html");
});
