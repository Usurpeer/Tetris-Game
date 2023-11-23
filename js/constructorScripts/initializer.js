// работа с конструктором
import ConstructorGame from "./constructorGame.js";

let allFigures = [], // [i][0] - строка фигуры, [i][1] - ID
  currentIndex = 0; // индекс отображаемой фигуры, чтобы знать какая сейчас на экране и удалить изменить ее легко

window.onload = go();

// запускающий метод, писать всё в нем. Инициализация сверху
async function go() {
  console.log("go");

  // инициализация всех данных из бд
  await getDataFigures();
  console.log(allFigures);
  await updateFigure();
  // метод, который должен вызываться по клику кнопки добавить.
  // await checkFigure();

  // метод вызывается по кнопке удалить
  // await deleteFigureByID(36);

  // здесь вызов функции, которая отображает фигуры
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
  } catch (error) {
    console.warn(error);
  }
}

// заменить фигуру при нажатии на кнопку добавить
async function updateFigure() {
  // сохранение id фигуры
  const idFig = allFigures[currentIndex][1];
  console.log("idFig: " + idFig);
  // формирование массива новой фигуры
  const newFig = "1111111111111001"; // = getNewFigure();

  let filteredArray = arrayCopy();

  filteredArray.splice(0, 1); // в первый параметр надо index удаляемого

  const constructorGame = new ConstructorGame(filteredArray, newFig);
  // если корректно, то изменяет в бд, перезаписывает данные

  if (constructorGame.isCorrect()) {
    // добавление в бд
    await updateFigureInBD(idFig, newFig);
    await getDataFigures(); // тк нужно заново обновить массив всех фигур, по хорошему это как раз через связь с бд делать
    // currentIndex--;
  } else {
    console.warn("Фигура неуникальная или нецелостна.");
  }
}
async function updateFigureInBD(ID, newFig){
    try {
        let sendArray = {
          id: ID,
          figure: newFig
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
    await getDataFigures();
    // данные от ответа сервера
    console.log(await res.json());
  } catch (error) {
    console.warn(error);
  }
}

// метод, который вызывается по нажатию кнопки "добавить"
async function checkFigure() {
  // формирование массива новой фигуры
  const newFig = "1111111111111000"; // = getNewFigure();

  const arrayStringFigures = getArrayStringFigures(); // создает массив строк всех фигур
  const constructorGame = new ConstructorGame(arrayStringFigures, newFig);

  // если корректно, то изменяет в бд, перезаписывает данные
  if (constructorGame.isCorrect()) {
    // добавление в бд
    await addFigureInBD(newFig);
    await getDataFigures(); // тк нужно заново обновить массив всех фигур, по хорошему это как раз через связь с бд делать
  } else {
    console.warn("Фигура неуникальная или нецелостна.");
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
