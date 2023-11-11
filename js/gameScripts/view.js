export default class View {
  constructor(element, width, height, countFigures, theme) {
    this._element = element;
    this._width = width;
    this._height = height;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this._width;
    this.canvas.height = this._height;
    this.context = this.canvas.getContext("2d");

    this._theme = theme;

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
  render({ playField }) {
    // очистка прямоугольника
    this.clearScreen();
    // визуализация поля
    this.renderPlayField(playField);
  }

  // отрисовка игрового поля
  renderPlayField(playField) {
    // необходимо вычислить ширину и высоту "клетки"
    this.blockWidth = this._width / playField[0].length;
    this.blockHeight = this._height / playField.length;

    for (let i = 0; i < playField.length; i++) {
      for (let j = 0; j < playField[i].length; j++) {
        const block = playField[i][j];
        if (block != "0" && block != undefined) {
          this.renderBlock(
            block,
            j * this.blockWidth,
            i * this.blockHeight,
            this.blockWidth,
            this.blockHeight
          );
        }
      }
    }
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
}
