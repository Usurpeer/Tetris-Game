"use strict"; //сертификат для проверки ошибок

import get_cookies from "./get_cookies.js";

window.onload = () => {
  let user_role = get_cookies("role");
  if (user_role != "0") {
    window.location.href = "main_log_in_2.html";
  }
};

const butPlay = document.querySelector("#play");
const butRating = document.querySelector("#rating");
const butSettings = document.querySelector("#settings");
const butAbout = document.querySelector("#about");
const butFaq = document.querySelector("#faq");

butFaq.addEventListener("click", () => {
  window.location.href = "player_faq.html";
});

let radio = document.querySelectorAll(".rad");

butPlay.addEventListener("click", () => {
  //создать куки, в котором выбранный уровень
  document.cookie =
    "lvl=" + document.querySelector('input[name="lvl"]:checked').value;
  //console.log(document.querySelector('input[name="lvl"]:checked').value);
  window.location.href = "player_game.html";
});

butRating.addEventListener("click", () => {
  window.location.href = "player_rating.html";
});
butSettings.addEventListener("click", () => {
  window.location.href = "player_settings.html";
});
butAbout.addEventListener("click", () => {
  alert(
    '\nИнформация о разработчиках.\n\nЛабораторный практикум по дисциплине: "Технологии программирования"\nТема: «Веб-приложение «Игра «Тетрис» с функциями администратора»\n\nРазработчики:\n    Обучающиеся группы 6402-090301D\n    Белоусов Антон Максимаович\n    Христич Светлана Витальевна\n\nРуководитель:\n    Зеленко Лариса Сергеевна\n         Самарский универсистет 2023'
  );
});
//////////////////////////////////////////////
//работа чекбокс и кнопок
//////////////////////////////////////////////
/////////////////////////////////////////////////
const stBut1 = document.getElementById("lvl1bt");
const stBut2 = document.getElementById("lvl2bt");
const stBut3 = document.getElementById("lvl3bt");

const themes = localStorage.getItem("themes");
if (themes === "blue") {
  stBut1.style.color = "#ffff";
  stBut1.onclick = function () {
    radio[0].checked = true;
    this.style.color = "#ffff";
    stBut2.style.color = "#5B3B3B";
    stBut3.style.color = "#5B3B3B";
  };
  stBut2.onclick = function () {
    radio[1].checked = true;
    this.style.color = "#ffff";
    stBut1.style.color = "#5B3B3B";
    stBut3.style.color = "#5B3B3B";
  };
  stBut3.onclick = function () {
    radio[2].checked = true;
    this.style.color = "#ffff";
    stBut1.style.color = "#5B3B3B";
    stBut2.style.color = "#5B3B3B";
  };
} else {
  stBut1.style.boxShadow = "0px 0px 15px #ff00f5, 0px 0px 15px #ffff inset";
  stBut1.onclick = function () {
    radio[0].checked = true;
    this.style.boxShadow = "0px 0px 15px #ff00f5, 0px 0px 15px #ffff inset";
    stBut2.style.color = "#ffff"; //#
    stBut2.style.boxShadow = "0px 0px 15px #ff00f5";
    stBut3.style.color = "#ffff";
    stBut3.style.boxShadow = "0px 0px 15px #ff00f5";
  };
  stBut2.onclick = function () {
    radio[1].checked = true;
    this.style.boxShadow = "0px 0px 15px #ff00f5, 0px 0px 15px #ffff inset";
    stBut1.style.color = "#ffff"; //#
    stBut1.style.boxShadow = "0px 0px 15px #ff00f5";
    stBut3.style.color = "#ffff";
    stBut3.style.boxShadow = "0px 0px 15px #ff00f5";
  };
  stBut3.onclick = function () {
    radio[2].checked = true;
    this.style.boxShadow = "0px 0px 15px #ff00f5, 0px 0px 15px #ffff inset";
    stBut1.style.color = "#ffff"; //#
    stBut1.style.boxShadow = "0px 0px 15px #ff00f5";
    stBut2.style.color = "#ffff";
    stBut2.style.boxShadow = "0px 0px 15px #ff00f5";
  };
}
