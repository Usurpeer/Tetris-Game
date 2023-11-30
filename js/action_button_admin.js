"use strict"; //сертификат для проверки ошибок

/*import script_cookie from "./get_cookies.js";

window.onload = () => {
  let user_role = script_cookie("role");
  if (user_role != "1") {
    window.location.href = "main_log_in_2.html";
  }
};*/
let radio = document.querySelectorAll(".rad");

const butConstructor = document.querySelector("#contruct");
const butSettings = document.querySelector("#settings");
const butAbout = document.querySelector("#about");
const butFaq = document.querySelector("#faq");

butConstructor.addEventListener("click", () => {
  window.location.href = "admin_constructor.html";
});
butSettings.addEventListener("click", () => {
  window.location.href = "admin_lvl_constructor.html";
});
butAbout.addEventListener("click", () => {
  alert(
    "Веб-приложение игра 'Тетрис' с функциями администратора\nО разработчиках.\nВыполнили: 6402 Белоусов Христич\nКурс: \"Технологии программирования\"\nПреподватель: Зеленко Лариса Сергеевна"
  );
});

function myFunction() {
  var window = document.getElementById("window");
  if (window.style.display === "none") {
    window.style.display = "flex";
  } else {
    window.style.display = "none";
  }
}
//////////////////////////////////////////////
//работа чекбокс и кнопок
//////////////////////////////////////////////
/////////////////////////////////////////////////
const stBut1 = document.getElementById("lvl1bt");
const stBut2 = document.getElementById("lvl2bt");
const stBut3 = document.getElementById("lvl3bt");

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
