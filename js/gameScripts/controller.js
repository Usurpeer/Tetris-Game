export default class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;

    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.view.render(this.game.getState());

    //this.startTimer(); // чтобы фигуры сразу падали
  }

  startTimer() {
    const currentSpeed = this.game.getSpeed();
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.game.moveDown();
        this.view.render(this.game.getState());
      }, currentSpeed);
    }
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getStateAndCheckGameover() {
    const gameState = this.game.getState();
    if (gameState.topOut == true) {
    }
  }
  handleKeyDown(event) {
    switch (event.key) {
      case "ArrowUp":
        this.game.rotateFigure();
        this.view.render(this.game.getState());
        break;
      case "ArrowDown":
        this.stopTimer();
        this.game.moveDown();
        this.view.render(this.game.getState());
        this.startTimer();
        break;
      case "ArrowRight":
        this.game.moveRight();
        this.view.render(this.game.getState());
        break;
      case "ArrowLeft":
        this.game.moveLeft();
        this.view.render(this.game.getState());
        break;
      case " ":
        this.stopTimer();
        this.game.dropFigure();
        this.view.render(this.game.getState());
        this.startTimer();
        break;
    }
  }
}
