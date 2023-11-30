export default class Controller {
  constructor(id, game, view) {
    this.game = game;
    this.view = view;
    this._id = id;
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.view.render(this.game.getState());

    //this.startTimer(); // чтобы фигуры сразу падали
  }

  startTimer() {
    const currentSpeed = this.game.getSpeed();
    let event = {
      key: "ArrowDown",
    };
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.handleKeyDown(event);
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
      // метод, который выводит, что игра закончилась
      console.log("Игра закончилась");
      // здесь можно вывести окно с результатами, закинуть всё в бд
      if (this.isSending == false) {
        console.log("Игра закончилась данные улелтели в бд.");
        this.isSending = true;

        alertFun(gameState, this.view.getScoringMethod());
        sendData(this._id, gameState, this.view.getScoringMethod());
      }
      return false;
    }
    return true;
  }
  handleKeyDown(event) {
    if (!this.getStateAndCheckGameover()) {
      this.stopTimer();
      return;
    }
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

  isSending = false; // флаг, для единоразовй отправки данных в бд
}
function alertFun(gameState, isScoreTime) {
  let score = "";
  if (isScoreTime == 1) {
    score = "Ваше Время: " + gameState.time + "сек.";
  } else {
    score = "Ваши очки: " + gameState.score;
  }
  alert("Игра завершена.\n" + score);
  window.location.replace("player_menu.html");
}
async function sendData(id, gameState, isScoreTime) {
  try {
    let sendArray = {
      id: id,
      time: isScoreTime,
      scoreTime: gameState.time,
      score: gameState.score,
    };

    const res = await fetch(`../../php/gameOver.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendArray),
    });

    // данные от ответа сервера
    console.log(await res.json());
  } catch (error) {
    console.warn(error);
  }
}
