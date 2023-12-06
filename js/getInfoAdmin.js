import script_cookie from "./get_cookies.js";

const loginMenu = document.getElementById("login");
let user_login = script_cookie("login");
console.log(user_login);
loginMenu.textContent = "Логин: " + user_login;
