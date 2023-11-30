//удаляет все куки на странице
window.onload = () => {
  document.cookie = "login=; Max-Age=0; path=/; domain=" + location.host;
  document.cookie = "role=; Max-Age=0; path=/; domain=" + location.host;
  document.cookie = "id=; Max-Age=0; path=/; domain=" + location.host;
};
