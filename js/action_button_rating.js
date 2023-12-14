"use strict"; //сертификат для проверки ошибок
import script_cookie from "./get_cookies.js";
let ratingScore = [,],
  ratingTime = [,];
let buttons = document.querySelectorAll("button"); //предотвращение обновления страниц по кнопкам
buttons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
  });
});
window.onload = () => {
  let user_role = script_cookie("role");
  if (user_role != "0") {
    window.location.href = "main_log_in_2.html";
  }
  go();
};
const stBut1 = document.getElementById("score");
const stBut2 = document.getElementById("time");
//const back = document.querySelector("#back");
const butBack = document.querySelector("#back");

butBack.addEventListener("click", () => {
  window.location.href = "player_menu.html";
});
stBut1.addEventListener("click", () => {
  createTableScore();
});
stBut2.addEventListener("click", () => {
  createTableTime();
});
async function go() {
  await getData();
  console.log(ratingScore);
  createTableScore();
}
async function getData() {
  try {
    const res = await fetch(`../../php/getRating.php`);
    const data = await res.json();

    const length = data[0];

    let iterator = 1; // итератор по data
    let iterator2 = 0;
    for (let i = 0; i < length; i++) {
      // четный индекс, значит фигура
      ratingScore[iterator2] = [,];
      // login
      ratingScore[iterator2][0] = data[iterator];
      iterator++; // четный

      // score
      ratingScore[iterator2][1] = data[iterator];
      iterator++; // нечетный
      iterator2++;
    }

    const len2 = data[iterator++];
    iterator2 = 0;
    for (let i = 0; i < len2; i++) {
      // четный индекс, значит фигура
      ratingTime[i] = [,];
      // login
      ratingTime[iterator2][0] = data[iterator];
      iterator++; // четный

      // score
      ratingTime[iterator2][1] = data[iterator];
      iterator++; // нечетный
      iterator2++;
    }
  } catch (error) {
    console.warn(error);
  }
}

function createTableScore() {
  document.querySelector(".rating").innerHTML = "";
  let row = document.createElement("tr");
  row.innerHTML = `<th>Логин</th><th>Очки</th>`;
  document.querySelector(".rating").appendChild(row);
  for (let i = 0; i < ratingScore.length; i++) {
    let row = document.createElement("tr");
    row.innerHTML = `<th>${ratingScore[i][0]}</th><th>${ratingScore[i][1]}</th>`;
    document.querySelector(".rating").appendChild(row);
  }
}
function createTableTime() {
  document.querySelector(".rating").innerHTML = "";

  let row = document.createElement("tr");
  row.innerHTML = `<th>Логин</th><th>Время (секунды)</th>`;
  document.querySelector(".rating").appendChild(row);

  for (let i = 0; i < ratingScore.length; i++) {
    let row = document.createElement("tr");
    row.innerHTML = `<th>${ratingTime[i][0]}</th><th>${ratingTime[i][1]}</th>`;
    document.querySelector(".rating").appendChild(row);
  }
}
