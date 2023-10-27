"use strict"; //сертификат для проверки ошибок
const butRating = document.querySelector("#rating");
const butSettings = document.querySelector("#settings");
const butAbout = document.querySelector("#about");
const butFaq = document.querySelector("#faq");

butRating.addEventListener("click", () => {
  window.location.href = "player_rating.html";
});

butSettings.addEventListener("click", () => {
  window.location.href = "player_settings.html";
});

butAbout.addEventListener("click", () => {
  alert(
    "Веб-приложение игра 'Тетрис' с функциями администратора\nО разработчиках.\nВыполнили: 6402 Белоусов Христич\nКурс: \"Технологии программирования\"\nПреподватель: Зеленко Лариса Сергеевна"
  );
});
/*
butLvls[0].addEventListener("click", () => {
  butLvls[0].style.color = "white";
});

const butLvls1 = document.getElementById("#lvl1");
console.log(butLvls1);

butLvls1.addEventListener("click", () => {
  butLvls1.style.backgroundColor = "white";
});
*/