export default class Game {
  constructor(
    countFigureOnLvls, // массив, в котором хранится количество фигур на уровень по индексам
    AllFigures, // двумерный массив со всеми фигурами. Сначала идут на первый уровень, то есть первые на первый, следующие на второй и далее третий
    sizesPlayfield, // двумерный массив размерностей поля
    speedOnLvls, // массив значений скоростей на уровни
    scoresForLvls // массив количества очков за линию
  ) {
    this._countFiguresOnLvls = countFigureOnLvls;
    this._figuresOnLvls = AllFigures;
    this._sizesPlayfield = sizesPlayfield;
    this._speedOnLvls = speedOnLvls;
    this._scorePerLine = scoresForLvls;

    this.activeFigure = this.getRandomFigure(); // тк она не инициализирована
    this.nextFigure = this.getRandomFigure();
    this._playField = this.get_set_PlayField();
  }
  // поля каркаса
  _countFiguresOnLvls = []; // массив, в котором хранится количество фигур для каждого уровня сложности

  _figuresOnLvls = []; // массив всех фигур, то есть для третьего уровня

  _sizesPlayfield = []; // массив значений скоростей на уровень

  _speedOnLvls = []; // массив, в котором хранится скорость падения фигур для каждого уровня сложности

  _scorePerLine = []; // массив в котором хранится количество очков за одну линию для каждой сложности

  _playField = []; // игровое поле

  // поля игрового процесса
  _score = 0; // текущие очки
  _time = 0; // текущее время

  _lines = 0; // текущее количество собранных линий за игру

  _currentLvl = 1; // текущий уровень

  activeFigure; // фигура на поле

  nextFigure; // следующая фигура
  // Метод - Если фигуры абсолютно случайны - возвращает фигуру по случайному индексу из массива всех фигур с учетом уровня сложности
  // Задумка такая: на первом уровне фигуры [0]-[_countFiguresLvl - 1], на втором [0]-[_countFiguresLv2 - 1], на третьем [0]-[_countFiguresLv3 - 1]
  getRandomFigure() {
    // чтобы не вылетала ошибка при инициализации класса
    if (this._figuresOnLvls[0] != undefined) {
      let maxIndex = this._countFiguresOnLvls[0] - 1;
      // смещает диапазон фигур [0] - [_countFiguresLvl2 - 1]
      if (this._currentLvl == 2) {
        maxIndex = this._countFiguresOnLvls[0] + this._countFiguresOnLvls[1];
      } else if (this._currentLvl == 3) {
        maxIndex +=
          this._countFiguresOnLvls[0] +
          this._countFiguresOnLvls[1] +
          this._countFiguresOnLvls[2];
      }

      let randomIndex = 0;

      randomIndex = Math.floor(Math.random() * (maxIndex + 3) + 0); // ранмдомное число от 0 до maxIndex, но надо максиндекс + 1

      let stringFig = this._figuresOnLvls[randomIndex] + ""; // получение строки фигуры по случайному индексу из списка всех фигур

      // преобразование строки в двумерный массив 4*4
      let figure = [];
      for (let i = 0; i < 4; i++) {
        figure[i] = [];
        for (let j = 0; j < 4; j++) {
          figure[i][j] = stringFig[i * 3 + j + i];
        }
      }

      return {
        x: 0,
        y: 0,
        form: figure,
      };
    }
  }

  // метод заполняет нулями поле размерностью по сложности, пока хз надо ли такое. Может пригодится
  get_set_PlayField() {
    let indexSizes = 0;

    if (this._currentLvl == 2) {
      indexSizes = 1;
    } else if (this._currentLvl == 3) {
      indexSizes = 2;
    }
    let height = this._sizesPlayfield[indexSizes][0];
    let weidth = this._sizesPlayfield[indexSizes][1];

    let playField = [];
    for (let i = 0; i < height; i++) {
      playField[i] = [];
      for (let j = 0; j < weidth; j++) {
        playField[i][j] = 0; // то, что заполняет нулями надо будет переделать, тк будут стираться значения
      }
    }
    return playField;
  }

  //методы движения фигуры
  moveLeft() {
    this.activeFigure.x -= 1;

    if (this.hasCollision()) {
      this.activeFigure.x += 1;
    }
  }
  moveRight() {
    this.activeFigure.x += 1;

    if (this.hasCollision()) {
      this.activeFigure.x -= 1;
    }
  }

  moveDown() {
    this.activeFigure.y += 1;

    if (this.hasCollision()) {
      this.activeFigure.y -= 1;
      this.lockFigure();
      this.updateOnNextFigure();
    }
  }

  hasCollision() {
    const { y, x, form } = this.activeFigure;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          form[i][j] != 0 && // проверка на нулевые значение в фигуре
          (this._playField[y + i] === undefined ||
            this._playField[y + i][x + j] === undefined ||
            this._playField[y + i][x + j] != 0) // свободно ли место в поле
        ) {
          return true;
        }
      }
    }
    return false;
  }
  // метод, который сохраняет положение фигуры в стакане, когда она уперлась
  // перенести форму фигуры в стакан, по координатам x, y
  lockFigure() {
    const { y, x, form } = this.activeFigure;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        // проверка чтобы фигура лочилась только когда значение есть
        if (form[i][j] != 0) {
          this._playField[y + i][x + j] = form[i][j];
        }
      }
    }
  }

  // повороты фигуры по часовой
  rotateFigure() {
    const form = this.activeFigure.form;
    let tempForm = [];
    for (let i = 0; i < 4; i++) {
      tempForm[i] = [];
      for (let j = 0; j < 4; j++) {
        tempForm[i][j] = form[4 - 1 - j][i];
      }
    }
    this.activeFigure.form = this.moveInEmpty(tempForm);

    // если есть столкновения после поворота, то нужно вернуть прошлое положение
    if (this.hasCollision()) {
      this.activeFigure.form = form;
    }
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

  // метод для получения всех данных во время игры
  getState() {
    let playField = this.get_set_PlayField();
    for (let i = 0; i < playField.length; i++) {
      for (let j = 0; j < playField[i].length; j++) {
        playField[i][j] = this._playField[i][j];
      }
    }

    const { x, y, form } = this.activeFigure;

    for (let i = 0; i < form.length; i++) {
      for (let j = 0; j < form[i].length; j++) {
        if (form[i][j] != 0) {
          playField[y + i][x + j] = form[i][j];
        }
      }
    }
    return { playField };
  }

  updateOnNextFigure() {
    this.activeFigure = this.nextFigure;
    this.nextFigure = this.getRandomFigure();
  }
}
