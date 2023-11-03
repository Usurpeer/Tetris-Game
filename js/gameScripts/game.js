export default class Game {
  constructor(
    countFigureOnLvls,
    stringAllFigures,
    sizesPlayfield,
    speedOnLvls,
    scoresForLvls
  ) {
    this._countFiguresLvl1 = 3;
    this._countFiguresLvl2 = 1;
    this._countFiguresLvl3 = 1;
    this.setFiguresOnLvl(stringAllFigures);
    this.setSizesPlayfield(sizesPlayfield);

    //тк она не инициализирована
    this.activeFigure.form = this.getActiveFigure();
  }
  //количество очков
  _score = 0;
  _time = 0;
  //количество линий за игру
  _lines = 0;
  //текущий уровень
  _currentLvl = 1;
  //количество фигур на уровне 1
  _countFiguresLvl1 = 3;
  //количество фигур на уровне 2
  _countFiguresLvl2 = 1;
  //количество фигур на уровне 3
  _countFiguresLvl3 = 1;

  //массив всех фигур, то есть для третьего уровня
  figuresOnLvl = [];
  //метод заполняет массив всех фигур из строки на входе, срока должна быть отранжирована в виде фигуры первого уровня, потом добавленные на второй, потом добавленные на третий
  setFiguresOnLvl(stringAllFigures) {
    let _countFigures =
      this._countFiguresLvl1 + this._countFiguresLvl2 + this._countFiguresLvl3;
    for (let i = 0; i < _countFigures; i++) {
      this.figuresOnLvl[i] = [];
      for (let j = 0; j < 16; j++) {
        this.figuresOnLvl[i][j] = stringAllFigures[i * 16 + j]; //так будут посимвольно считываться фигуры
      }
    }
  }

  //фигура на поле
  activeFigure = {
    //координата фигуры в стакане
    x: 0,
    y: 0,
    form: this.getActiveFigure(),
  };

  //Если фигуры абсолютно случайно возвращает фигуру по случайному индексу
  //Задумка такая: на первом уровне фигуры [0]-[_countFiguresLvl - 1], на втором [0]-[_countFiguresLv2 - 1], на третьем [0]-[_countFiguresLv3 - 1]
  getActiveFigure() {
    let randomIndex = 0;
    let maxIndex = this._countFiguresLvl1 - 1;
    //смещает диапазон фигур [0] - [_countFiguresLvl2 - 1]
    if (this._currentLvl == 2) {
      maxIndex += this._countFiguresLvl2;
    } else if (this._currentLvl == 3) {
      maxIndex += this._countFiguresLvl3;
    }
    //ранмдомное число от 0 до maxIndex
    randomIndex = Math.floor(Math.random() * (maxIndex + 1) + 0);
    return this.figuresOnLvl[randomIndex];
  }

  //поле
  //массив размеров поля по сложностям, эти значения надо заполнить или просто держать 6 значений
  _sizesPlayfield = [];
  setSizesPlayfield(sizesPlayfield) {
    this._sizesPlayfield = sizesPlayfield;
    /*for(let i = 0; i < 3; i++){
      this._sizesPlayfield[i] = [];
      for(let j = 0; j < 2; j++){
        this._sizesPlayfield[i][j] = sizesPlayfield[i][j];
      }
    }*/
  }
  //метод заполняет нулями поле размерностью по сложности, пока хз надо ли такое. Может пригодиться, когда фигура упирается и останавливается и для подсчета очков.
  _playfield = [];
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
      this._playfield[i] = [];
      for (let j = 0; j < weidth; j++) {
        this._playfield[i][j] = 0;
      }
    }
    return this._playfield;
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

  //проверка на выход за границы стакана. Этот вариант проверяет только [0][0] элемент на выход.
  /*isOutOfBounds() {
    const { y, x } = this.activeFigure;

    return (
      this._playfield[y] === undefined || this._playfield[y][x] === undefined
    );
  }*/
  hasCollision() {
    const { y, x, form } = this.activeFigure;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          form[i * 3 + j + i] && //проверка на нулевые значение в фигуре
          (this._playfield[y + i] === undefined ||
            this._playfield[y + i][x + j] === undefined ||
            this._playfield[y + i][x + j]) //свободно ли место в поле
        ) {
          return true;
        }
      }
    }
    return false;
  }
  //метод, который сохраняет положение фигуры в стакане, когда она уперлась
  //перенести форму фигуры в стакан, по координатам x, y
  lockFigure() {
    const { y, x, form } = this.activeFigure;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (form[i * 3 + j + i]) {
          //проверка чтобы фигура лочилась только когда значение есть
          this._playfield[y + i][x + j] = form[i * 3 + j + i];
        }
      }
    }
  }
}
