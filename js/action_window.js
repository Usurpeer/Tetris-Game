function myFunction() {
  var window = document.getElementById("window");
  if (window.style.display === "none") {
    window.style.display = "flex";
  } else {
    window.style.display = "none";
  }
}

const exit = document.getElementById("exit");
exit.addEventListener("click", () => {
  window.location.href = "main_log_in_2.html";
});
