export default class View {
  constructor(element, width, height, countFigures, theme, gridOn, rating) {
    this.rating = rating;
    this._element = element;
    this._width = width;
    this._height = height;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this._width;
    this.canvas.height = this._height;
    this.context = this.canvas.getContext("2d");

    ///////////////////////////////////////////////////
    this.playfieldBorderWidth = 4; // ширина границы
    this.playfieldX = this.playfieldBorderWidth; // начало игрового поля
    this.playfieldY = this.playfieldBorderWidth;
    this.playfieldWidth = (this._width * 2) / 3; // ширина игрового поля
    this.playfieldHeight = this._height;
    this.playfieldInnerWidth =
      this.playfieldWidth - this.playfieldBorderWidth * 2; // внутренняя ширина игр поля
    this.playfieldInnerheight =
      this.playfieldHeight - this.playfieldBorderWidth * 2;
    ///////////////////////////////////////////////////
    this.panelX = this.playfieldWidth + 10;
    this.panelY = 0;
    this.panelWidth = this._width / 3;
    this.panelHeight = this._height;

    this._theme = theme;
    this.gridOn = gridOn;

    this._element.appendChild(this.canvas);
    this.arrayColorsFigures = this.getAllColors(countFigures);
  }

  // поле темы
  _theme;

  arrayColorsFigures = [];

  // метод очищает экран
  clearScreen() {
    this.context.clearRect(0, 0, this._width, this._height);
  }

  // метод получает случайный цвет из заполненного набора по указанной теме
  getRandomColor() {
    let colors = [];
    if (this._theme == 1) {
      colors = [
        "red",
        "orange",
        "blue",
        "purple",
        "green",
        "yellow",
        "SlateBlue",
        "Cornsilk",
        "RosyBrown",
        "Sienna",
        "Teal",
        "CadetBlue",
        "LightGreen",
        "LightCoral",
      ];
    } else if (this._theme == 2) {
      colors = [
        "Cornsilk",
        "RosyBrown",
        "Sienna",
        "Teal",
        "CadetBlue",
        "LightGreen",
        "LightCoral",
      ];
    }
    let index = Math.floor(Math.random() * (colors.length + 0) + 0);
    let color = colors[index];
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

  // отрисовка игрового поля
  renderPlayField(playField) {
    // необходимо вычислить ширину и высоту "клетки"
    this.blockWidth = this.playfieldInnerWidth / playField[0].length;
    this.blockHeight = this.playfieldInnerheight / playField.length;

    for (let i = 0; i < playField.length; i++) {
      for (let j = 0; j < playField[i].length; j++) {
        const block = playField[i][j];
        
        this.renderBlockGrid(
          this.playfieldX + j * this.blockWidth,
          this.playfieldY + i * this.blockHeight,
          this.blockWidth,
          this.blockHeight
        );
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
    this.context.strokeStyle = "white";
    this.context.lineWidth = this.playfieldBorderWidth;
    this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
  }

  // отрисвка квадрата в поле
  renderBlock(symbol, x, y, weidth, height) {
    const color = this.getColorBySymbol(symbol);
    this.context.fillStyle = color; // цвет заливки
    this.context.strokeStyle = "black"; // цвет обводки
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
  renderPanel({ score, currentLvl, lines, nextFigure }) {
    this.context.textAlign = "start"; // текст по левому краю
    this.context.textBaseline = "top"; // текст по верхнему краю
    this.context.fillStyle = "white"; // цвет текста
    this.context.font = '14px "Press Start 2P"'; // Шрифт

    this.context.fillText(
      `Текущий уровень: ${currentLvl}`,
      this.panelX,
      this.panelY + 0
    );
    this.context.fillText(`Очки: ${score}`, this.panelX, this.panelY + 24);
    this.context.fillText(
      `Осталось линий: ${lines}`,
      this.panelX,
      this.panelY + 48
    );
    this.context.fillText(`Рекорд: ${this.rating}`, this.panelX, this.panelY + 64);
    this.context.fillText("Следующая", this.panelX, this.panelY + 96);

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const block = nextFigure[i][j];

        if (block != "0") {
          this.renderBlock(
            block,
            this.panelX + j * this.blockWidth * 0.5,
            this.panelY + 130 + i * this.blockHeight * 0.5,
            this.blockWidth * 0.5,
            this.blockHeight * 0.5
          );
        }
      }
    }
  }

  renderBlockGrid(x, y, weidth, height) {
    if(this.gridOn == 1){
      this.context.fillStyle = "black"; // !!!!!!!!!!!!!!!нужно цвет фона
      this.context.strokeStyle = "white"; // цвет обводки
      this.context.lineWidth = 3; // ширина обводки
  
      this.context.fillRect(x, y, weidth, height);
      this.context.strokeRect(x, y, weidth, height); // создание обводки вокруг фигуры
    }
  }
}
