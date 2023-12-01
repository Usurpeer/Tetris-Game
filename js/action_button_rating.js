"use strict"; //сертификат для проверки ошибок
import script_cookie from "./get_cookies.js";

window.onload = () => {
  let user_role = script_cookie("role");
  if (user_role != "0") {
    window.location.href = "main_log_in_2.html";
  }
};
const stBut1 = document.getElementById("ball");
const stBut2 = document.getElementById("time");
//const back = document.querySelector("#back");
const butBack = document.querySelector("#back");

butBack.addEventListener("click", () => {
  window.location.href = "player_menu.html";
});
//console.log(back);

/*back.addEventListener("click", () => {
  console.log("Бек сработал");
  window.location.href = "main_log_in_2.html";
});*/

//тут должна быть проверка кукисов темы
const themes = localStorage.getItem("themes");
if (themes === "blue") {
  stBut1.style.color = "#ffff";
  stBut1.onclick = function () {
    let radio = document.querySelectorAll(".rad");
    radio[0].checked = true;
    this.style.color = "#ffff";
    stBut2.style.color = "#5B3B3B";
  };
  stBut2.onclick = function () {
    let radio = document.querySelectorAll(".rad");
    radio[1].checked = true;
    this.style.color = "#ffff";
    stBut1.style.color = "#5B3B3B";
  };
} else {
  stBut1.style.boxShadow = "0px 0px 15px #ff00f5, 0px 0px 15px #ffff inset";
  stBut1.onclick = function () {
    let radio = document.querySelectorAll(".rad");
    radio[0].checked = true;
    this.style.boxShadow = "0px 0px 15px #ff00f5, 0px 0px 15px #ffff inset";
    stBut2.style.color = "#ffff"; //#
    stBut2.style.boxShadow = "0px 0px 15px #ff00f5";
  };
  stBut2.onclick = function () {
    let radio = document.querySelectorAll(".rad");
    radio[1].checked = true;
    this.style.boxShadow = "0px 0px 15px #ff00f5, 0px 0px 15px #ffff inset";
    stBut1.style.color = "#ffff"; //#
    stBut1.style.boxShadow = "0px 0px 15px #ff00f5";
  };
}
