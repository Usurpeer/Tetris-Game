import script_cookie from "./get_cookies.js";

const loginMenu = document.getElementById("login");
const ratingScore = document.getElementById("ratingScore");
const ratingTime = document.getElementById("ratingTime");

loginMenu.textContent = "Логин: " + script_cookie("login");

ratingScore.textContent = "Рейтинг по очкам: \n" + script_cookie("ratingScore");

ratingTime.textContent = "Рейтинг по времени: \n" + script_cookie("ratingTime");
