"use strict"; //сертификат для проверки ошибок

const stBut1 = document.getElementById("ball");
const stBut2 = document.getElementById("time");
console.log(stBut1);
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

