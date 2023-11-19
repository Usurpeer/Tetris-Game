export default class ConstructorGame {
  constructor(allfiguresString, newFigure) {
    this.allfiguresString = allfiguresString;
    this.newFig = this.getArrayFigure(newFigure);
    this.countFigures = allfiguresString.length;

    //this.checkUnique();
  }

  newFig = [];
  allfiguresString;
  countFigures = 0;

  // инициализация массива новой фигуры в
  getArrayFigure(stringFig) {
    // преобразование строки в двумерный массив 4*4
    let arrayFig = [];
    for (let i = 0; i < 4; i++) {
      arrayFig[i] = [];
      for (let j = 0; j < 4; j++) {
        arrayFig[i][j] = stringFig[i * 3 + j + i];
      }
    }
    return arrayFig;
  }

  // итоговый метод, который вызывается и возвращает True/False - результат общей проверки
  allChecks() {}
  // проверка уникальности сдвиг и повороты и сравнение
  checkUnique() {
    let check = 0; // если будет единица, значит фигура не уникальна

    for (let i = 0; i < this.countFigures; i++) {
      // получили фигуру, её надо сравнить с newFig поворотами, сдвигами
      let figure = this.getArrayFigure(this.allfiguresString[i] + "");
      console.log(figure);
      // сдвинули фигуры в левых вернхий угол
      figure = this.moveInEmpty(figure);
      this.newFig = this.moveInEmpty(this.newFig);

      // надо сравнить в текущем положении
      check = this.compareFig(figure, this.newFig);
      if (check == 1) {
        return 1;
      }

      // надо повернуть одну из фигур, например newFig и сравнить
      this.newFig = this.rotateFig(this.newFig);
      check = this.compareFig(figure, this.newFig);
      if (check == 1) {
        return 1;
      }

      // надо повернуть одну из фигур, например newFig и сравнить
      this.newFig = this.rotateFig(this.newFig);
      check = this.compareFig(figure, this.newFig);
      if (check == 1) {
        return 1;
      }

      // надо повернуть одну из фигур, например newFig и сравнить
      this.newFig = this.rotateFig(this.newFig);
      check = this.compareFig(figure, this.newFig);
      if (check == 1) {
        return 1;
      }
    }
    return check;
  }

  // сравнивает два массива, в случае совпадения возвращает 1
  compareFig(fig1, fig2) {
    let check = 1;
    for (let i = 0; i < fig1.length; i++) {
      for (let j = 0; j < fig1[i].length; j++) {
        if (fig1[i][j] != fig2[i][j]) {
          check = 0;
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

  // проверка целостности флаг что рядом есть вполтную часть фигуры
  checkwholeness() {
    let arrayPassedCells = []; // здесь будут сохраняться клетки, которые были пройдены
  }

  // проверка на пустоту внутри, герметичность ????
  checkIntegrity() {}
}
