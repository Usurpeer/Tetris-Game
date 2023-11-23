export default class ConstructorGame {
  constructor(allFiguresString, newFigure) {
    this.allFiguresString = allFiguresString;
    this.newFigure = this.getArrayFromString(newFigure);
    this.countFigures = allFiguresString.length;
  }

  newFigure = [];
  allFiguresString;
  countFigures = 0;

  // инициализация массива новой фигуры в
  getArrayFromString(stringFig) {
    // преобразование строки в двумерный массив 4*4
    let arr = [];
    for (let i = 0; i < 4; i++) {
      arr[i] = [];
      for (let j = 0; j < 4; j++) {
        arr[i][j] = stringFig[i * 3 + j + i];
      }
    }
    return arr;
  }

  // итоговый метод, который вызывается и возвращает True/False - результат общей проверки
  isCorrect() {
    if (this.isUnique() == 1 && this.isWholeness() == true) {
      return true;
    }
    return false;
  }

  // проверка уникальности с массивом имеющихся фигур сдвиг, повороты и сравнение
  isUnique() {
    for (let i = 0; i < this.countFigures; i++) {
      // получили фигуру, её надо сравнить с newFig поворотами, сдвигами
      let arraySavedFigure = this.getArrayFromString(
        this.allFiguresString[i] + ""
      );

      // сдвинули фигуры в левых вернхий угол
      arraySavedFigure = this.moveInEmpty(arraySavedFigure);
      this.newFigure = this.moveInEmpty(this.newFigure);

      // надо сравнить в текущем положении
      if (this.compareArrays(arraySavedFigure, this.newFigure) == 0) {
        return 0;
      }

      this.newFigure = this.rotateFig(this.newFigure);
      if (this.compareArrays(arraySavedFigure, this.newFigure) == 0) {
        return 0;
      }

      this.newFigure = this.rotateFig(this.newFigure);
      if (this.compareArrays(arraySavedFigure, this.newFigure) == 0) {
        return 0;
      }

      this.newFigure = this.rotateFig(this.newFigure);
      if (this.compareArrays(arraySavedFigure, this.newFigure) == 0) {
        return 0;
      }
    }
    return 1;
  }
  // сравнивает два массива, в случае совпадения возвращает 0
  compareArrays(fig1, fig2) {
    let check = 0;
    for (let i = 0; i < fig1.length; i++) {
      for (let j = 0; j < fig1[i].length; j++) {
        if (fig1[i][j] != fig2[i][j]) {
          check = 1;
        }
      }
    }
    return check;
  }
  // метод, который сдвигает фигуру в левый верхний угол, если там свободно
  moveInEmpty(form) {
    let checkEmptyY = [0, 0, 0, 0]; // счетчик пустых клеток, индекс - строка
    let checkEmptyX = [0, 0, 0, 0]; // счетчик пустых клеток, индекс - столбец
    let checkBreakY = 0;
    let checkBreakX = 0;
    // подсчет пустых строк
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (checkBreakY == 0 && form[i][j] == 0) {
          checkEmptyY[i]++;
        } else {
          checkBreakY = 1;
        }
        if (checkBreakX == 0 && form[j][i] == 0) {
          checkEmptyX[i]++;
        } else {
          checkBreakX = 1;
        }
      }
    }

    // сдвиг матрицы наверх, если надо.
    for (let i = 0; i < 4; i++) {
      // сдвиг вверх
      if (checkEmptyY[i] == 4) {
        for (let i = 1; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            form[i - 1][j] = form[i][j];
            form[i][j] = 0;
          }
        }
      }
      // сдвиг влево
      if (checkEmptyX[i] == 4) {
        for (let i = 0; i < 4; i++) {
          for (let j = 1; j < 4; j++) {
            form[i][j - 1] = form[i][j];
            form[i][j] = 0;
          }
        }
      }
    }

    return form;
  }
  // поворот фигуры со сдвигом
  rotateFig(fig) {
    let tempForm = [];
    for (let i = 0; i < 4; i++) {
      tempForm[i] = [];
      for (let j = 0; j < 4; j++) {
        tempForm[i][j] = fig[4 - 1 - j][i];
      }
    }
    return this.moveInEmpty(tempForm);
  }

  // проверка целостности
  isWholeness() {
    let checkedFigure = [];
    let length = [1]; // массив, чтобы длина передавалась ссылкой, начинается с двух
    this.arrayCopy(checkedFigure); // копирование массива, чтобы не изменять исходник.
    for (let i = 0; i < 4; i++) {
      // начало отсчета длины от первой единицы в верхей строке (необходимо, чтобы фигура была сдвинута вверх)
      if (checkedFigure[0][i] == "1") {
        this.getLengthFigure(0, i, checkedFigure, length);
        break;
      }
    }

    // если в получившемся массиве есть несвязные клетки, то есть их значение осталось 1, то минус
    for (let i = 0; i < checkedFigure.length; i++) {
      for (let j = 0; j < checkedFigure[i].length; j++) {
        if (checkedFigure[i][j] == 1) {
          return false;
        }
      }
    }
    console.log("Успешная проверка на целостность.");
    return this.isNoEmpty();
  }
  // составление длины рекурсивным методом
  getLengthFigure(i, j, chekedFigure, currentLength) {
    if (chekedFigure[i][j] != undefined && chekedFigure[i][j] == 1) {
      currentLength[0]++;
      chekedFigure[i][j] = currentLength[0];

      // вправо
      if (chekedFigure[i].length > j + 1 && chekedFigure[i][j + 1] == 1) {
        this.getLengthFigure(i, j + 1, chekedFigure, currentLength);
      }
      // назад
      if (chekedFigure[i].length - (j - 1) > 0 && chekedFigure[i][j - 1] == 1) {
        this.getLengthFigure(i, j - 1, chekedFigure, currentLength);
      }
      // вниз, под текущем положением
      if (chekedFigure.length > i + 1 && chekedFigure[i + 1][j] == 1) {
        this.getLengthFigure(i + 1, j, chekedFigure, currentLength);
      }
      // вверх
      if (i - 1 >= 0 && chekedFigure[i - 1][j] == 1) {
        this.getLengthFigure(i - 1, j, chekedFigure, currentLength);
      }
      // первый столбец
      /*if (chekedFigure.length > i + 1 && chekedFigure[i + 1][j] == 1) {
        this.getLengthFigure(i + 1, 0, chekedFigure, currentLength);
      }*/
    }
  }
  arrayCopy(newArray) {
    for (let i = 0; i < this.newFigure.length; i++) {
      newArray[i] = [];
      for (let j = 0; j < this.newFigure[i].length; j++) {
        newArray[i][j] = this.newFigure[i][j];
      }
    }
  }

  // проверка на пустоту
  isNoEmpty() {
    let checkedFigure = [];
    this.arrayCopy(checkedFigure);

    this.setBorders(checkedFigure);
    // мб нашел ошибку, если фигура будет 1111111111011111, то тк тут нет входа для перебора, то да. Нужно сделать вход не по 1.1, а по перебору - нулю

    // проверить эту реализацию.
    for(let i = 1; i < checkedFigure.length; i++){
      for(let j = 1; j < checkedFigure[i].length; j++){
        if(checkedFigure[i][j] == 0){
          this.getArrayEmptiness(i, j, checkedFigure);
          break;
        }
      }
    }

    // проверка, если осталось хоть 1 нулевое значение, значит оно закрыто от границ, значит false
    for (let i = 0; i < checkedFigure.length; i++) {
      for (let j = 0; j < checkedFigure[i].length; j++) {
        if (checkedFigure[i][j] == 0) {
          console.log("Фигура содержит пустоты.");
          return false;
        }
      }
    }
    console.log("Фигура не содержит пустот.");
    return true;
  }
  //на вход - границы и массив, надо проверить есть ли пососедству -1, если есть, то тоже -1. Тогда если в массиве не содержится нулей, то нет пустот
  getArrayEmptiness(i, j, checkedFigure) {
    if (checkedFigure[i][j] == 0) {
      // проверить сверху
      if (checkedFigure[i - 1][j] == -1) {
        checkedFigure[i][j] = -1;
      }
      // проверить справа
      else if (checkedFigure[i][j + 1] == -1) {
        checkedFigure[i][j] = -1;
      }
      // проверить снизу
      else if (checkedFigure[i + 1][j] == -1) {
        checkedFigure[i][j] = -1;
      }
      // проверить слева
      else if (checkedFigure[i][j - 1] == -1) {
        checkedFigure[i][j] = -1;
      }
    }

    // вправо
    if (checkedFigure[i].length - 1 > j + 1 && checkedFigure[i][j + 1] == 0) {
      this.getArrayEmptiness(i, j + 1, checkedFigure);
    }
    // назад
    if (checkedFigure[i].length - j > 0 && checkedFigure[i][j - 1] == 0) {
      this.getArrayEmptiness(i, j - 1, checkedFigure);
    }
    // вниз, под текущем положением
    if (checkedFigure.length - 1 > i + 1 && checkedFigure[i + 1][j] == 0) {
      this.getArrayEmptiness(i + 1, j, checkedFigure);
    }
    // вверх
    if (i - 1 > 1 && checkedFigure[i - 1][j] == 0) {
      this.getArrayEmptiness(i - 1, j, checkedFigure);
    }
  }
  // задает -1 для значений на границах, для того, чтобы задать связь между внутренними
  setBorders(checkedFigure) {
    for (let i = 0; i < checkedFigure.length; i++) {
      if (checkedFigure[i][0] == 0) {
        checkedFigure[i][0] = -1;
      }
      if (checkedFigure[0][i] == 0) {
        checkedFigure[0][i] = -1;
      }
      if (checkedFigure[checkedFigure.length - 1][i] == 0) {
        checkedFigure[checkedFigure.length - 1][i] = -1;
      }
      if (checkedFigure[i][checkedFigure.length - 1] == 0) {
        checkedFigure[i][checkedFigure.length - 1] = -1;
      }
    }
  }
}
