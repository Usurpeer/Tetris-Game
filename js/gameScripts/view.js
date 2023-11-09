export default class View {
  constructor(element, width, height, rows, columns) {
    this._element = element;
    this._width = width;
    this._height = height;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this._width;
    this.canvas.height = this._height;
    this.context = this.canvas.getContext("2d");

    // необходимо вычислить ширину и высоту "клетки"
    this.blockWidth = this._width / columns;
    this.blockHeight = this._height / rows;

    this._element.appendChild(this.canvas);
    this.initPlayField(columns, rows);
  }

  _platField = []; // необходимо сохранять поле, для того, чтобы цвет не менялся у старого состояния

  // инициализация стакана визуализации
  initPlayField(columns, rows) {
    for (let i = 0; i < rows; i++) {
      this._platField[i] = [];
      for (let j = 0; j < columns; j++) {
        this._platField[i][j] = 0;
      }
    }
    console.log(this._platField);
  }

  // метод визуализации
  render({ playField }, theme) {
    // очистка прямоугольника
    this.clearScreen();
    let color = this.getRandomColor(theme);
    this.renderPlayField(playField, color);
  }
  clearScreen() {
    this.context.clearRect(0, 0, this._width, this._height);
  }
  renderPlayField(playField, color) {
    for (let i = 0; i < playField.length; i++) {
      for (let j = 0; j < playField[i].length; j++) {
        const block = playField[i][j];
        if (block == 1) {
          this.renderBlock(
            j * this.blockWidth,
            i * this.blockHeight,
            this.blockWidth,
            this.blockHeight,
            color
          );
        }
      }
    }
  }
  renderBlock(x, y, weidth, height, color) {
    this.context.fillStyle = color; // цвет заливки
    this.context.strokeStyle = "black"; // цвет обводки
    this.context.lineWidth = 2; // ширина обводки

    this.context.fillRect(x, y, weidth, height);
    this.context.strokeRect(x, y, weidth, height); // создание обводки вокруг фигуры
  }
  getRandomColor(theme) {
    let colors = [];
    if (theme == 1) {
      colors = [
        "red",
        "orange",
        "blue",
        "purple",
        "green",
        "yellow",
        "SlateBlue",
      ];
    } else if (theme == 2) {
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
    let index = Math.floor(Math.random() * (colors.length + 1) + 0);
    return colors[index];
  }
}
