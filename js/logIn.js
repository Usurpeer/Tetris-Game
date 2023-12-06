const login = document.getElementById("log_inp");
const password = document.getElementById("pass_inp");

const log = document.querySelector("#log_in_but");

log.addEventListener("click", () => {
  checkLogin();
});
async function checkLogin() {
  await loginFunc();
}

async function loginFunc() {
  let logg = login.value;
  let pass = password.value;

  if (logg.length < 4 || logg.length > 12) {
    alert("Недопустимая длина логина.");
  } else if (pass.length < 4 || pass.length > 12) {
    alert("Недопустимая длина пароля.");
  } else {
    try {
      let sendArray = {
        login: logg,
        password: pass,
      };

      const res = await fetch("../php/loginJs.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendArray),
      });

      const data = await res.json();
      if (data[0] == -1) {
        alert("Неверный логин или пароль");
      } else if (data[0] == 1) {
        window.location.replace("admin_menu.html");
      } else if (data[0] == 0) {
        window.location.replace("player_menu.html");
      }
      console.log();
    } catch (error) {
      console.warn(error);
    }
  }
}
