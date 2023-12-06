"use strict"; //сертификат для проверки ошибок
import script_cookie from "./get_cookies.js";
let ratingScore = [,],
  ratingTime = [,];

window.onload = () => {
  let user_role = script_cookie("role");
  if (user_role != "0") {
    window.location.href = "main_log_in_2.html";
  }
  go();
};
const stBut1 = document.getElementById("ball");
const stBut2 = document.getElementById("time");
//const back = document.querySelector("#back");
const butBack = document.querySelector("#back");

butBack.addEventListener("click", () => {
  window.location.href = "player_menu.html";
});

async function go() {
  await getData();

  // здесь начать заполнять таблицу
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

      // login
      ratingScore[iterator2] = data[iterator];
      iterator++; // четный
      iterator2++;

      // score
      ratingScore[iterator2] = data[iterator];
      iterator++; // нечетный
      iterator2++;
    }

    const len2 = data[iterator++];
    iterator2 = 0;
    for (let i = 0; i < len2; i++) {
      // четный индекс, значит фигура

      // login
      ratingTime[iterator2] = data[iterator];
      iterator++; // четный
      iterator2++;

      // score
      ratingTime[iterator2] = data[iterator];
      iterator++; // нечетный
      iterator2++;
    }
  } catch (error) {
    console.warn(error);
  }
}
