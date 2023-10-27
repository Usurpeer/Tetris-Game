//console.log("Я программист");

class user {
  constructor(login, password) {
    this.login = login;
    this.password = password;
  }
}
let user = {
  login: "",
  password: "",
  validateDataOnLen: function () {
    if (
      this.login.length >= 4 &&
      this.login.length <= 12 &&
      this.password.length >= 4 &&
      this.password.length <= 12
    ) {
      return true;
    } else {
      return false;
    }
  },
};
