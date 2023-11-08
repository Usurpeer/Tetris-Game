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

    this.activeFigure.form = this.getActiveFigure(); // тк она не инициализирована
    this.get_set_PlayField();
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

  // фигура на поле
  activeFigure = {
    x: 0, // координата фигуры в стакане
    y: 0,
    form: this.getActiveFigure(),
  };

  // Метод - Если фигуры абсолютно случайны - возвращает фигуру по случайному индексу из массива всех фигур с учетом уровня сложности
  // Задумка такая: на первом уровне фигуры [0]-[_countFiguresLvl - 1], на втором [0]-[_countFiguresLv2 - 1], на третьем [0]-[_countFiguresLv3 - 1]
  getActiveFigure() {
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
      randomIndex = Math.floor(Math.random() * (maxIndex + 1) + 0); // ранмдомное число от 0 до maxIndex

      let stringFig = this._figuresOnLvls[randomIndex] + ""; // получение строки фигуры по случайному индексу из списка всех фигур

      // преобразование строки в двумерный массив 4*4
      let figure = [];
      for (let i = 0; i < 4; i++) {
        figure[i] = [];
        for (let j = 0; j < 4; j++) {
          figure[i][j] = stringFig[i * 3 + j + i];
        }
      }
      return figure;
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

    for (let i = 0; i < height; i++) {
      this._playField[i] = [];
      for (let j = 0; j < weidth; j++) {
        this._playField[i][j] = 0; // то, что заполняет нулями надо будет переделать, тк будут стираться значения
      }
    }
    return this._playField;
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
    }
  }

  hasCollision() {
    const { y, x, form } = this.activeFigure;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          form[i][j] == 1 && // проверка на нулевые значение в фигуре
          (this._playField[y + i] === undefined ||
            this._playField[y + i][x + j] === undefined ||
            this._playField[y + i][x + j] == 1) // свободно ли место в поле
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
        if (form[i][j] == 1) {
          this._playField[y + i][x + j] = form[i][j];
        }
      }
    }
  }

  // повороты фигуры
  rotateFigure() {
    // поворот по часовой на 90 градусов
    //что если обрезать массив где есть нулевые значения, его повернуть и засунуть в угол 4*4
    //чтобы обрезатать надо еще и сдвинуть
  }
}
