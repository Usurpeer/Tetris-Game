// работа с конструктором, здесь всё будет в нем
// вопрос в том, что делать с кнопкой изменить

import ConstructorGame from "./constructorGame.js";

let allFigures = [], // [i][0] - строка фигуры, [i][1] - ID
  countFigures = 0;

window.onload = go();

// запускающий метод, писать всё в нем. Инициализация сверху
async function go() {
  console.log("go");

  await getDataFigures();

  console.log("Инициализировал все поля из бд.");
  console.log(allFigures);

  await checkFigure();

  console.log("Добавил фигуру. ");
  console.log(allFigures);
  // здесь вызов функции, которая отображает фигуры
}

// функция получает из БД список фигур, количество фигур
async function getDataFigures() {
  try {
    console.log("Зашел в метод получения данных из бд.");
    const res = await fetch(`../../php/constructor/getData.php`);
    const data = await res.json();

    countFigures = data[0];

    console.log("Данные.");
    console.log(data);

    console.log("Все фигуры до изменения.");
    console.log(allFigures);
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
    console.log("Все фигуры после изменения.");
    console.log(allFigures);
  } catch (error) {
    console.warn(error);
  }
}

// функция отправляет id фигуры на удаление, после заново формируется весь массив
async function deleteFigureByID(ID) {
  // отправка
  await getDataFigures();
}

// метод, который вызывается по нажатию кнопки "добавить"
async function checkFigure() {
  // формирование массива новой фигуры
  const newFig = "1111111111111000"; // = getNewFigure();

  const arrayStringFigures = getArrayStringFigures();
  const constructorGame = new ConstructorGame(arrayStringFigures, newFig);

  if (constructorGame.isCorrect()) {
    // добавление в бд
    await addFigureInBD(newFig);
    await getDataFigures(); // тк нужно заново обновить массив всех фигур, по хорошему это как раз через связь с бд делать
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
