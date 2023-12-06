// работа с конструктором
import ConstructorGame from "./constructorGame.js";
import script_cookie from "../get_cookies.js";

let allFigures = [], // [i][0] - строка фигуры, [i][1] - ID
  currentIndex = 0, // индекс отображаемой фигуры, чтобы знать какая сейчас на экране и удалить изменить ее легко
  newFigure = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let buttons = document.querySelectorAll("button"); //предотвращение обновления страниц по кнопкам
buttons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
  });
});

const btnAdd = document.querySelector("#add_fig"); //кнопка добавить фигуру
const btnClean = document.querySelector("#clean_fig"); //кнопка сбросить фигуру
const inputCount = document.querySelector(".input_count");
const btnLeft = document.querySelector(".btn_left"); //кнопка навигации
const btnRigth = document.querySelector(".btn_right"); //кнопка навигации
const btnDelete = document.querySelector("#btn_delete");
const btnUpdate = document.querySelector("#btn_update");
const btnEnd = document.querySelector("#btn_end");
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

canvas.onclick = (e) => {
  //отриовка фигур и заполнение массива фигуры
  squares.forEach((f) => {
    if (context.isPointInPath(f, e.offsetX, e.offsetY)) {
      if (newFigure[f.id - 1] == 0) {
        newFigure[f.id - 1] = 1;
        context.fillStyle = "#5B3B3B";
        context.fill(f);
      } else {
        newFigure[f.id - 1] = 0;
        context.clearRect(
          coord[(f.id - 1) % 4],
          coord[Math.floor((f.id - 1) / 4)],
          62.5,
          62.5
        );
      }
    }
  });
};
/////////////////////////////////////////////////////////////////
window.onload = () => {
  let user_role = script_cookie("role");
  if (user_role != "1") {
    window.location.href = "main_log_in_2.html";
  }
  go();
};

// запускающий метод, писать всё в нем. Инициализация сверху
async function go() {
  console.log("go");
  checkRole();
  // инициализация всех данных из бд
  await getDataFigures();

  let figureLeft = getArrayFromString(allFigures[currentIndex][0]);
  initSquare(); // инициализация квадратов
  renderFigure(figureLeft); // отрисовка фигуры слева
}

// функция получает из БД список фигур, количество фигур
async function getDataFigures() {
  try {
    const res = await fetch(`../../php/constructor/getData.php`);
    const data = await res.json();

    let countFigures = data[0];

    let iterator = 1; // итератор по data
    for (let i = 0; i < countFigures; i++) {
      // четный индекс, значит фигура
      allFigures[i] = [,];
      allFigures[i][0] = data[iterator];
      iterator++; // четный
      // нечетный, значит уровень

      allFigures[i][1] = data[iterator];
      iterator++; // нечетный
    }

    inputCount.value = allFigures.length;
  } catch (error) {
    console.warn(error);
  }
}

// функция отправляет на добавление строку фигуры, текущий уровень будет 0
async function addFigureInBD(newFig) {
  try {
    let sendArray = {
      figure: newFig,
    };

    const res = await fetch("../../php/constructor/addFigure.php", {
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
// метод, возвращает одномерный массив строк фигур (без id, а то класс конструктор не учитывает это)
function getArrayStringFigures() {
  let arrayStringFigures = [];
  for (let i = 0; i < allFigures.length; i++) {
    arrayStringFigures[i] = allFigures[i][0];
  }

  return arrayStringFigures;
}

function arrayCopy() {
  let newArray = [];
  for (let i = 0; i < allFigures.length; i++) {
    newArray[i] = allFigures[i];
  }
  return newArray;
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
// перевод одномерного массива в строку
function getStringFigure(arrayFig) {
  let strFig = "";
  for (let i = 0; i < arrayFig.length; i++) {
    if (arrayFig[i] == 1) {
      strFig += "1";
    } else {
      strFig += "0";
    }
  }

  return strFig;
}
function renderFigure(fig) {
  for (let i = 0; i < 16; i++) {
    if (fig[i] == 1) {
      context2.fillStyle = "#5B3B3B";
      context2.fill(squares[i]);
    }
  }
}
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
function myFunction() {
  var window = document.getElementById("window");
  if (window.style.display === "none") {
    window.style.display = "flex";
  } else {
    window.style.display = "none";
  }
}
btnRigth.addEventListener("click", () => {
  //навигация по фигурам
  if (currentIndex < parseInt(allFigures.length) - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  context2.clearRect(0, 0, 250, 250);
  let figureLeft = getArrayFromString(allFigures[currentIndex][0]);
  renderFigure(figureLeft); // отрисовка фигуры слева
});
btnLeft.addEventListener("click", () => {
  //навигация по фигурам
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = allFigures.length - 1;
  }
  context2.clearRect(0, 0, 250, 250);
  let figureLeft = getArrayFromString(allFigures[currentIndex][0]);
  renderFigure(figureLeft); // отрисовка фигуры слева
});
btnClean.addEventListener("click", () => {
  cleanRightField();
});

function cleanRightField() {
  //сброс фигуры
  for (let i = 0; i < 16; i++) {
    if (newFigure[i] == 1) {
      newFigure[i] = 0;
    }
    context.clearRect(0, 0, 250, 250);
    newFigure = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
}
// метод, который вызывается по нажатию кнопки "добавить"
async function checkFigure() {
  // формирование массива новой фигуры
  const newFig = getStringFigure(newFigure);

  const arrayStringFigures = getArrayStringFigures(); // создает массив строк всех фигур
  const constructorGame = new ConstructorGame(arrayStringFigures, newFig);

  // если корректно, то изменяет в бд, перезаписывает данные
  if (constructorGame.isCorrect()) {
    // добавление в бд
    await addFigureInBD(newFig);
    await getDataFigures(); // тк нужно заново обновить массив всех фигур, по хорошему это как раз через связь с бд делать
    context2.clearRect(0, 0, 250, 250);
    cleanRightField();
    let figureLeft = getArrayFromString(allFigures[currentIndex][0]);
    renderFigure(figureLeft); // отрисовка фигуры слева
  } else {
    console.warn("Фигура неуникальная или нецелостна.");
  }
}
btnAdd.addEventListener("click", () => {
  //добавление фигуры (отрисовка слева)
  if (allFigures.length == 18) {
    alert("Максимальное количество фигур.");
  } else {
    checkFigure();
  }
});

// заменить фигуру при нажатии на кнопку добавить
async function updateFigure() {
  // сохранение id фигуры
  const idFig = allFigures[currentIndex][1];
  console.log("idFig: " + idFig);
  // формирование массива новой фигуры
  const newFig = getStringFigure(newFigure);

  let filteredArray = arrayCopy();

  //filteredArray.splice(currentIndex, 1); // в первый параметр надо index удаляемого

  const constructorGame = new ConstructorGame(filteredArray, newFig);
  // если корректно, то изменяет в бд, перезаписывает данные

  if (constructorGame.isCorrect()) {
    // добавление в бд
    await updateFigureInBD(idFig, newFig);
    await getDataFigures(); // тк нужно заново обновить массив всех фигур, по хорошему это как раз через связь с бд делать
    context2.clearRect(0, 0, 250, 250);
    cleanRightField();
    let figureLeft = getArrayFromString(allFigures[currentIndex][0]);
    renderFigure(figureLeft); // отрисовка фигуры слева
  } else {
    console.warn("Фигура неуникальная или нецелостна.");
  }
}
async function updateFigureInBD(ID, newFig) {
  try {
    let sendArray = {
      id: ID,
      figure: newFig,
    };

    const res = await fetch("../../php/constructor/updateFigure.php", {
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
btnUpdate.addEventListener("click", () => {
  // замена фигуры слева, на правую с проверками
  if (isEmpty(newFigure)) {
    alert("Заполните фигуру.");
  } else {
    updateFigure();
  }
});
function isEmpty(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == 1) {
      return false;
    }
  }
  return true;
}
async function btnDeleteFunc(ind) {
  await deleteFigureByID(ind);
  await getDataFigures(); // тк нужно заново обновить массив всех фигур, по хорошему это как раз через связь с бд делать
  context2.clearRect(0, 0, 250, 250);
  cleanRightField();
  let figureLeft = getArrayFromString(allFigures[currentIndex][0]);
  renderFigure(figureLeft); // отрисовка фигуры слева
  // данные от ответа сервера
  location.reload();
}
// функция отправляет id фигуры на удаление, после заново формируется весь массив
async function deleteFigureByID(ID) {
  try {
    let sendArray = {
      id: ID,
    };

    const res = await fetch("../../php/constructor/deleteFigure.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendArray),
    });

    console.log(await res.json());
  } catch (error) {
    console.warn(error);
  }
}
btnDelete.addEventListener("click", () => {
  if (allFigures.length == 3) {
    alert("Невозможно удалить.\nМинимальное количество фигур.");
  } else {
    btnDeleteFunc(allFigures[currentIndex][1]);
  }
});
btnEnd.addEventListener("click", () => {
  window.location.replace("admin_menu.html");
});
function checkRole() {
  // по загрузке на страницу установить все чекбоксы в соответсвии с куки
  let user_role = script_cookie("role");
  if (user_role != "1") {
    window.location.href = "main_log_in_2.html";
  }
}
btnback.addEventListener("click", () => {
  window.location.replace("admin_menu.html");
});
