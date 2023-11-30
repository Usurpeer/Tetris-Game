// работа с конструктором

let currentLvl = 1,
  allFigures = [], // [i][0] - строка фигуры, [i][1] - ID
  indexAllFigures = 0, // индекс отображаемой фигуры всех фигур, чтобы знать какая сейчас на экране
  figuresOnLvl = [], // [i][0] - строка фигуры, [i][1] - ID, фигуры на уровнь
  indexFiguresOnLvl = 0, // индекс отображаемой фигуры фигур на уровень, чтобы знать какая сейчас на экране
  width,
  heigth,
  speed,
  countLines,
  score;

window.onload = go();

async function go() {
  console.log("go");
  // проинициализировать текущий уровень тут, из куки

  // инициализация всех данных из бд
  await getDataFigures(); // инициализация массивов фигур
  await getDataValues(); // инициализация значений размерности и тп
  console.log(allFigures);
  console.log(figuresOnLvl);
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
      allFigures[i] = [,];
      allFigures[i][0] = data[iterator];
      iterator++; // четный
      // нечетный, значит уровень

      allFigures[i][1] = data[iterator];
      iterator++; // нечетный
    }

    // второй массив фигур на уровень
    let countFigureOnLvl = data[iterator++];

    for (let i = 0; i < countFigureOnLvl; i++) {
      // четный индекс, значит фигура
      figuresOnLvl[i] = [,];
      figuresOnLvl[i][0] = data[iterator];
      iterator++; // четный
      // нечетный, значит уровень

      figuresOnLvl[i][1] = data[iterator];
      iterator++; // нечетный
    }
  } catch (error) {
    console.warn(error);
  }
}

// функционал кнопки добавить
async function clickOnAdd() {
  // эта фигура, которую нужно добавить
  let idAddedFigure = allFigures[indexAllFigures][1];
  // проверить, что она уникальна
  if (isUnique(idAddedFigure)) {
    // запрос в бд, где по id фигуры меняется ее уровень на текущий
    await setLvlFigure(idAddedFigure);
    await getDataFigures();
  }
  //если она неуникальна, то ничего не делать
  //
}
// метод, который проверяет уникальность фигуры по id в массиве фигур уровня
function isUnique(id) {
  for (let i = 0; i < figuresOnLvl.length; i++) {
    if (figuresOnLvl[i][1] == id) {
      console.log("фигура неуникальна");
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

// метод по кнопке удалить
async function clickOnDelete() {
  // эта фигура, которую нужно удалитть
  let idDeletedFigure = figuresOnLvl[indexFiguresOnLvl][1];

  await deleteLvlFigure(idDeletedFigure);
  await getDataFigures();
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

    console.log("Инициализация полей");
    console.log(data);
    heigth = data[0];
    width = data[1];

    speed = data[2];
    countLines = data[3];
    score = data[4];
  } catch (error) {
    console.warn(error);
  }
}

// метод, который по нажатию на завершить проверяет и отправляет всё в бд
async function clickOnEnd(heigth, width, speed, countLines, score) {
  if (checkInputData(heigth, width, speed, countLines, score)) {
    if (currentLvl == 3) {
      countLines = 0;
    }
    await updateLevelSettings(heigth, width, speed, countLines, score);

    // и только потом тут переход на другую страницу
  } else {
    console.log("Введенные данные некорректны");
  }
}
function checkInputData(heigth, width, speed, countLines, score) {
  if (currentLvl < 3 && countLines < 1) {
    console.warn("error");
    return false;
  }
  if (score < 100 || score > 10000) {
    console.warn("error");
    return false;
  }
  if (heigth < 10 || heigth > 20) {
    console.warn("error");
    return false;
  }
  if (width < 7 || width > 14) {
    console.warn("error");
    return false;
  }
  if (speed < 2 || speed > 8) {
    console.warn("error");
    return false;
  }
  return true;
}
async function updateLevelSettings(heigth, width, speed, countLines, score) {
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
