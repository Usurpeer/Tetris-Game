import script_cookie from "./get_cookies.js";

const loginMenu = document.getElementById("login");
const ratingScore = document.getElementById("rationgScore");
const ratingTime = document.getElementById("rationgTime");

loginMenu.textContent = "Логин: " + script_cookie("login");

ratingScore.textContent = "Очков: " + script_cookie("ratingScore");

ratingTime.textContent = "Очков: " + script_cookie("ratingTime");
