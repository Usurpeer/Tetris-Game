const butBack = document.querySelector("#back");
import script_cookie from "./get_cookies.js";

window.onload = () => {
  let user_role = script_cookie("role");
  if (user_role != "1") {
    window.location.href = "main_log_in_2.html";
  }
};
butBack.addEventListener("click", () => {
  window.location.href = "admin_menu.html";
});
const btnAdd = document.querySelector("#add_fig"); //кнопка добавить фигуру
const btnClean = document.querySelector("#clean_fig"); //кнопка сбросить фигуру
const inputCount = document.querySelector(".input_count"); //вывод количества фигур
// const inputWidth = document.querySelector(".width_cup_input");    //ввод ширины стакана
// const inputHeigth = document.querySelector(".heigth_cup_input");  //ввод высоты стакана
// const btnMinW = document.querySelector("#btn_min_w");             //кнопка - ширины
// const btnPlusW = document.querySelector("#btn_plus_w");           //кнопка + ширины
// const btnMinH = document.querySelector("#btn_min_h");             //кнопка - высоты
// const btnPlusH = document.querySelector("#btn_plus_h");           //кнопка + высоты
const btnLeft = document.querySelector(".btn_left"); //кнопка навигации
const btnRigth = document.querySelector(".btn_right"); //кнопка навигации
const btnDelete = document.querySelector("#btn_delete"); //кнопка удаления

const canvas = document.querySelector("#construct_fig"); //канвас добавление/изменения
const context = canvas.getContext("2d");
context.width = 250;
context.heigth = 250;

const canvas2 = document.querySelector("#added_fig"); //канвас добавленных фигур
const context2 = canvas2.getContext("2d");

let figura = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //массив для создаваемой фигуры
let countFig = 0; // количество фигур в бд
let currentFig = 0;
let shapes = [];

let buttons = document.querySelectorAll("button"); //предотвращение обновления страниц по кнопкам
buttons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
  });
});

btnAdd.addEventListener("click", () => {
  //добавление фигуры (отрисовка слева)
  context2.clearRect(0, 0, 250, 250);
  shapes.push(figura);
  console.log(shapes);
  for (let i = 0; i < 16; i++) {
    if (shapes[0][i] == 1) {
      context2.fillStyle = "#5B3B3B";
      context2.fill(squares[i]);
    }
  }
  countFig++;
  inputCount.value = countFig;
  context.clearRect(0, 0, 250, 250);
  figura = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
});

btnClean.addEventListener("click", () => {
  //сброс фигуры
  for (let i = 0; i < 16; i++) {
    if (figura[i] == 1) {
      figura[i] = 0;
    }
    context.clearRect(0, 0, 250, 250);
    figura = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
});

// btnPlusW.addEventListener("click", () => {                        //увеличение ширины стакана
//   if(inputWidth.value < 14){
//     inputWidth.value = parseInt(inputWidth.value) + 1;
//   }
// });
// btnMinW.addEventListener("click", () => {                         //уменьшение ширины стакана
//   if(inputWidth.value > 7){
//     inputWidth.value = parseInt(inputWidth.value) - 1;
//   }
// });
// btnPlusH.addEventListener("click", () => {                        //увеличение высоты стакана
//   if(inputHeigth.value < 20){
//     inputHeigth.value = parseInt(inputHeigth.value) + 1;
//   }
// });
// btnMinH.addEventListener("click", () => {                         //уменьшение высоты стакана
//   if(inputHeigth.value > 10){
//     inputHeigth.value = parseInt(inputHeigth.value) - 1;
//   }
// });

btnRigth.addEventListener("click", () => {
  //навигация по фигурам
  if (currentFig < parseInt(inputCount.value) - 1) {
    context2.clearRect(0, 0, 250, 250);
    currentFig++;
    for (let i = 0; i < 16; i++) {
      if (shapes[currentFig][i] == 1) {
        context2.fillStyle = "#5B3B3B";
        context2.fill(squares[i]);
      }
    }
  }
});
btnLeft.addEventListener("click", () => {
  //навигация по фигурам
  if (currentFig > 0) {
    context2.clearRect(0, 0, 250, 250);
    currentFig--;
    for (let i = 0; i < 16; i++) {
      if (shapes[currentFig][i] == 1) {
        context2.fillStyle = "#5B3B3B";
        context2.fill(squares[i]);
      }
    }
  }
});

btnDelete.addEventListener("click", () => {
  //удаление
  shapes.splice(currentFig, 1);
  if (currentFig != 0) {
    currentFig--;
  }
  context2.clearRect(0, 0, 250, 250);
  if (countFig != 0) {
    for (let i = 0; i < 16; i++) {
      if (shapes[currentFig][i] == 1) {
        context2.fillStyle = "#5B3B3B";
        context2.fill(squares[i]);
      }
    }
  }
  countFig--;
  inputCount.value = countFig;
});

let square1 = new Path2D(); //создание квадратов для отрисовки фигур
let square2 = new Path2D();
let square3 = new Path2D();
let square4 = new Path2D();
let square5 = new Path2D();
let square6 = new Path2D();
let square7 = new Path2D();
let square8 = new Path2D();
let square9 = new Path2D();
let square10 = new Path2D();
let square11 = new Path2D();
let square12 = new Path2D();
let square13 = new Path2D();
let square14 = new Path2D();
let square15 = new Path2D();
let square16 = new Path2D();

let squares = [
  square1,
  square2,
  square3,
  square4, //массив квадратов для отрисовки фигур
  square5,
  square6,
  square7,
  square8,
  square9,
  square10,
  square11,
  square12,
  square13,
  square14,
  square15,
  square16,
];

let coord = [0, 62.5, 125, 187.5, 250]; //вспомогательный массив для создания квадратов
let id_square = 0;
for (let j = 0; j < 4; j++) {
  // создание квадратов
  for (let i = 1; i <= 4; i++) {
    squares[id_square].rect(coord[(i % 16) - 1], coord[j], 62.5, 62.5);
    squares[id_square].id = id_square + 1;
    id_square += 1;
  }
}

canvas.onclick = (e) => {
  //отриовка фигур и заполнение массива фигуры
  squares.forEach((f) => {
    if (context.isPointInPath(f, e.offsetX, e.offsetY)) {
      if (figura[f.id - 1] == 0) {
        figura[f.id - 1] = 1;
        context.fillStyle = "#5B3B3B";
        context.fill(f);
      } else {
        figura[f.id - 1] = 0;
        console.log(
          coord[(f.id - 1) % 4],
          coord[Math.floor((f.id - 1) / 4)],
          62.5,
          62.5
        );
        context.clearRect(
          coord[(f.id - 1) % 4],
          coord[Math.floor((f.id - 1) / 4)],
          62.5,
          62.5
        );
      }
      console.log(figura);
    }
  });
};
