import script_cookie from "./get_cookies.js";

window.onload = () => {
  // по загрузке на страницу установить все чекбоксы в соответсвии с куки
  setCheckbox();
  let user_role = script_cookie("role");
  if (user_role != "0") {
    window.location.href = "main_log_in_2.html";
  }
};

const butBack = document.querySelector("#back");
const radio = document.querySelectorAll(".rad");

// по кнопке назад считать все чекбоксы
butBack.addEventListener("click", () => {
  deleteCookie();
  // gridOn
  if (document.querySelector(".check").checked) {
    document.cookie = "gridOn=1";
  } else {
    document.cookie = "gridOn=0";
  }

  // music
  if (document.querySelector(".musicCheck").checked) {
    document.cookie = "musicOn=1";
  } else {
    document.cookie = "musicOn=0";
  }

  // score
  if (radio[0].checked == true) {
    document.cookie = "countScore=1";
  } else {
    document.cookie = "countScore=0";
  }
  window.location.href = "player_menu.html";
});

function setCheckbox() {
  // взять значения из куки
  let gridOn = script_cookie("gridOn");
  let musicOn = script_cookie("musicOn");
  let scoringMethod = script_cookie("countScore");
  console.log(gridOn + " " + musicOn + " " + scoringMethod);
  if (gridOn == 1) {
    document.querySelector(".check").checked = true;
  }

  if (musicOn == 1) {
    document.querySelector(".musicCheck").checked = true;
  }

  if (scoringMethod == 1) {
    radio[0].checked = true;
  } else {
    radio[1].checked = true;
  }
}
function deleteCookie() {
  document.cookie = "gridOn=; Max-Age=0; path=/; domain=" + location.host;
  document.cookie = "musicOn=; Max-Age=0; path=/; domain=" + location.host;
  document.cookie = "countScore=; Max-Age=0; path=/; domain=" + location.host;
}
