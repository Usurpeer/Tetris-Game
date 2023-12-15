export default class View {
  constructor(
    element,
    width,
    height,
    countFigures,
    theme,
    gridOn,
    time,
    rating
  ) {
    this.rating = rating;
    this._element = element;
    this._width = width + 180;
    this._height = height;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this._width;
    this.canvas.height = this._height;
    this.context = this.canvas.getContext("2d");

    ///////////////////////////////////////////////////
    this.playfieldBorderWidth = 4; // ширина границы
    this.playfieldX = this.playfieldBorderWidth; // начало игрового поля
    this.playfieldY = this.playfieldBorderWidth;
    this.playfieldHeight = this._height;

    this.playfieldInnerheight =
      this.playfieldHeight - this.playfieldBorderWidth * 2;
    ///////////////////////////////////////////////////
    this.panelY = 0;

    this._theme = theme;
    this.gridOn = gridOn;
    this._time = time;

    this._element.appendChild(this.canvas);
    this.getColorsByTheme();
    this.arrayColorsFigures = this.getAllColors(countFigures);
  }

  // если = 1, то по времени
  _time;
  // поле темы
  _theme;

  // метод очищает экран
  clearScreen() {
    this.context.clearRect(0, 0, this._width, this._height);
  }

  // метод получает случайный цвет из заполненного набора по указанной теме
  colors = [];
  // условие, что цветов должно быть не <18
  getColorsByTheme() {
    if (this._theme == "pink") {
      this.colors = [
        "red",
        "crimson",
        "darkred",
        "DarkCyan",
        "DarkKhaki",
        "DarkSeaGreen",
        "SeaGreen",
        "darkorange",
        "orange",
        "blue",
        "SlateBlue",
        "MidnightBlue",
        "purple",
        "SlateBlue",
        "RosyBrown",
        "Teal",
        "CadetBlue",
        "RosyBrown",
      ];
    } else if (this._theme == "blue") {
      this.colors = [
        "Cornsilk",
        "RosyBrown",
        "Sienna",
        "Teal",
        "CadetBlue",
        "LightCoral",
        "Brown",
        "Coral",
        "Chocolate",
        "DarkCyan",
        "DarkKhaki",
        "DarkSeaGreen",
        "IndianRed",
        "MediumSlateBlue",
        "Orange",
        "Peru",
        "RosyBrown",
        "SandyBrown",
        "Salmon",
      ];
    }
  }
  getRandomColor() {
    let index = Math.floor(Math.random() * (this.colors.length + 0) + 0);

    let color = this.colors[index];

    this.colors.splice(index, 1);

    return color;
  }

  // метод визуализации
  render(gameInfo) {
    // очистка прямоугольника
    this.clearScreen();
    // визуализация поля
    this.renderPlayField(gameInfo.playField);
    // визуализация боковой панели
    this.renderPanel(gameInfo);
  }
  getScoringMethod() {
    return this._time;
  }
  // отрисовка игрового поля
  renderPlayField(playField) {
    // необходимо вычислить ширину и высоту "клетки"
    this.blockHeight = this.playfieldInnerheight / playField.length;
    this.blockWidth = this.blockHeight;
    this.playfieldInnerWidth = this.blockWidth * playField[0].length;
    this.panelX = this.playfieldInnerWidth + 30;

    this.canvas.width = this.playfieldInnerWidth + 500;
    this.context = this.canvas.getContext("2d");
    // сюда свойство
    //console.log();
    document.getElementById("root").style =
      "width: " + (this.panelX + 280) + "px;";
    if (this.gridOn == 0) {
      this.renderBorder();
    }
    for (let i = 0; i < playField.length; i++) {
      for (let j = 0; j < playField[i].length; j++) {
        const block = playField[i][j];
        if (this.gridOn == 1) {
          this.renderBlockGrid(
            this.playfieldX + j * this.blockWidth,
            this.playfieldY + i * this.blockHeight,
            this.blockWidth,
            this.blockHeight
          );
        }

        if (block != "0" && block != undefined) {
          this.renderBlock(
            block,
            this.playfieldX + (j - 0) * this.blockWidth, // можно дописать -1 чтобы она была посередине, но так выглядит странно
            this.playfieldY + i * this.blockHeight,
            this.blockWidth,
            this.blockHeight
          );
        }
      }
    }

    // отрисовка границы
    if (this._theme == "pink") {
      this.context.strokeStyle = "white";
    } else {
      this.context.strokeStyle = "#5B3B3B";
    }

    this.context.lineWidth = this.playfieldBorderWidth;
    this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
  }

  // отрисвка квадрата в поле
  renderBlock(symbol, x, y, weidth, height) {
    const color = this.getColorBySymbol(symbol);
    this.context.fillStyle = color; // цвет заливки
    if (this._theme == "pink") {
      // цвет обводки
      this.context.strokeStyle = "white";
    } else {
      this.context.strokeStyle = "#5B3B3B";
    }
    this.context.lineWidth = 2; // ширина обводки

    this.context.fillRect(x, y, weidth, height);
    this.context.strokeRect(x, y, weidth, height); // создание обводки вокруг фигуры
  }

  getAllColors(countFigures) {
    // каждая фигура кодируется разным символом латинским алфавитом, чтобы цвета отличались
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, countFigures);

    let arrayColors = [];
    for (let i = 0; i < alphabet.length; i++) {
      arrayColors[i] = [];
      arrayColors[i][0] = alphabet[i];
      arrayColors[i][1] = this.getRandomColor(this._theme);
    }

    return arrayColors;
  }
  getColorBySymbol(symbol) {
    for (let i = 0; i < this.arrayColorsFigures.length; i++) {
      if (this.arrayColorsFigures[i][0] == symbol) {
        return this.arrayColorsFigures[i][1];
      }
    }
    return "black";
  }

  // метод отображает боковую панель
  renderPanel({ time, score, currentLvl, lines, nextFigure }) {
    this.context.textAlign = "start"; // текст по левому краю
    this.context.textBaseline = "top"; // текст по верхнему краю
    if (this._theme == "pink") {
      // цвет текста
      this.context.fillStyle = "white";
    } else {
      this.context.fillStyle = "#5B3B3B";
    }
    this.context.font = '26px "BellotaText"'; // Шрифт

    this.context.fillText(
      `Текущий уровень: ${currentLvl}`,
      this.panelX,
      this.panelY + 50
    );
    if (this._time == 1) {
      this.context.fillText(`Время: ${time}`, this.panelX, this.panelY + 80);
    } else {
      this.context.fillText(`Очки: ${score}`, this.panelX, this.panelY + 80);
    }
    this.context.fillText(
      `Осталось линий: ${lines}`,
      this.panelX,
      this.panelY + 110
    );
    this.context.fillText(
      `Рекорд: ${this.rating}`,
      this.panelX,
      this.panelY + 140
    );
    this.context.fillText("Следующая", this.panelX, this.panelY + 170);

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const block = nextFigure[i][j];

        if (block != "0") {
          this.renderBlock(
            block,
            this.panelX + 60 + j * this.blockWidth * 0.9,
            this.panelY + 210 + i * this.blockHeight * 0.9,
            this.blockWidth * 0.9,
            this.blockHeight * 0.9
          );
        }
      }
    }
  }

  renderBlockGrid(x, y, weidth, height) {
    this.context.fillStyle = "rgba(255, 255, 255, 0.17)"; // !!!!!!!!!!!!!!!нужно цвет фона
    if (this._theme == "pink") {
      // цвет обводки
      this.context.strokeStyle = "white";
    } else {
      this.context.strokeStyle = "#5B3B3B";
    }
    this.context.lineWidth = 3; // ширина обводки

    this.context.fillRect(x, y, weidth, height);
    this.context.strokeRect(x, y, weidth, height); // создание обводки вокруг фигуры
  }
  renderBorder() {
    this.context.fillStyle = "rgba(255, 255, 255, 0.17)"; // !!!!!!!!!!!!!!!нужно цвет фона
    if (this._theme == "pink") {
      // цвет обводки
      //this.context.strokeStyle = "white";
    } else {
      this.context.strokeStyle = "#5B3B3B";
    }
    this.context.lineWidth = 3; // ширина обводки

    this.context.fillRect(0, 0, this.panelX + 2, this.panelY + 2);
    this.context.strokeRect(
      3,
      3,
      this.playfieldInnerWidth + 2,
      this.playfieldInnerheight + 2
    ); // создание обводки вокруг фигуры
  }
}
