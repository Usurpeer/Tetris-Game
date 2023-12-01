// удаляет все куки на странице в логине
window.onload = () => {
  document.cookie = "login=; Max-Age=0; path=/; domain=" + location.host;
  document.cookie = "role=; Max-Age=0; path=/; domain=" + location.host;
  document.cookie = "id=; Max-Age=0; path=/; domain=" + location.host;
  document.cookie = "gridOn=; Max-Age=0; path=/; domain=" + location.host;
  document.cookie = "musicOn=; Max-Age=0; path=/; domain=" + location.host;
  document.cookie = "countScore=; Max-Age=0; path=/; domain=" + location.host;
  document.cookie = "lvl=; Max-Age=0; path=/; domain=" + location.host;
  document.cookie = "ratingScore=; Max-Age=0; path=/; domain=" + location.host;
  document.cookie = "ratingTime=; Max-Age=0; path=/; domain=" + location.host;
};
