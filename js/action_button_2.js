"use strict"; //сертификат для проверки ошибок
const butRating = document.querySelector("#contruct");
const butSettings = document.querySelector("#settings");
const butAbout = document.querySelector("#about");
const butFaq = document.querySelector("#faq");

butRating.addEventListener("click", () => {
  window.location.href = "admin_contructor.html";
});
butSettings.addEventListener("click", () => {
  window.location.href = "admin_lvl_settings.html";
});
butAbout.addEventListener("click", () => {
  alert(
    "Веб-приложение игра 'Тетрис' с функциями администратора\nО разработчиках.\nВыполнили: 6402 Белоусов Христич\nКурс: \"Технологии программирования\"\nПреподватель: Зеленко Лариса Сергеевна"
  );
});
//////////////////////////////////////////////
//работа чекбокс и кнопок
//////////////////////////////////////////////
/////////////////////////////////////////////////
const stBut1 = document.getElementById("lvl1bt");
const stBut2 = document.getElementById("lvl2bt");
const stBut3 = document.getElementById("lvl3bt");
console.log(stBut1);
stBut1.style.color = "#ffff";
stBut1.onclick = function () {
  let radio = document.querySelectorAll(".rad");
  radio[0].checked = true;
  this.style.color = "#ffff";
  stBut2.style.color = "#5B3B3B";
  stBut3.style.color = "#5B3B3B";
};
stBut2.onclick = function () {
  let radio = document.querySelectorAll(".rad");
  radio[1].checked = true;
  this.style.color = "#ffff";
  stBut1.style.color = "#5B3B3B";
  stBut3.style.color = "#5B3B3B";
};
stBut3.onclick = function () {
  let radio = document.querySelectorAll(".rad");
  radio[2].checked = true;
  this.style.color = "#ffff";
  stBut1.style.color = "#5B3B3B";
  stBut2.style.color = "#5B3B3B";
};
