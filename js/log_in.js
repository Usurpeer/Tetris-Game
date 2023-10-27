"use strict"; //сертификат для проверки ошибок
//кнопка войти
const but_logIn = document.querySelector("#log_in_but");
//поле логина
const log_inp = document.querySelector("#log_inp");
//поле пароля
const pass_inp = document.querySelector("#pass_inp");

function checkData() {
  let userLogin = log_inp.value;
  let userPassword = pass_inp.value;
  if (
    userLogin <= 16 &&
    userLogin >= 4 &&
    userPassword <= 16 &&
    userPassword >= 4
  ) {
    return true;
  }
  return false;
}

but_logIn.addEventListener("click", () => checkData());
