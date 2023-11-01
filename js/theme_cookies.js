/*const theme = document.querySelector("#theme");
const element = document.querySelector('.blue');

theme.addEventListener("click", () => {
    const a = element.documentElement.className;
    console.log(a);
    
    element.documentElement.classList.remove('pink', 'blue');
    if(a === 'pink'){
        element.documentElement.classList.add('blue');
    }else{
        element.documentElement.classList.add('pink');
    }
    
  });


  if(document.getElementById("bodyId").classList.contains("pink")){
    document.cookie = "theme=pink";
  }else if(document.getElementById("bodyId").classList.contains("blue")){
    document.cookie = "theme=blue";
  }
  let a = document.cookie;
  console.log(a);
  document.getElementById("theme").addEventListener("click", function() {
    if(document.cookie === "pink"){
        document.getElementById("bodyId").classList.remove("pink");
        document.getElementById("bodyId").classList.add("blue");
        document.cookie = "theme=blue";
    }else{
        document.getElementById("bodyId").classList.remove("blue");
        document.getElementById("bodyId").classList.add("pink");
        document.cookie = "theme=pink";
    }
    console.log(a);
    console.log(document.getElementById("bodyId").classList);
  });*/

  const theme = document.getElementById("theme");

  document.body.classList.add(localStorage.getItem("themes"));
  theme.addEventListener("click", function(){
    document.body.classList.toggle("blue");
    const themes = localStorage.getItem("themes");
    if(themes === "blue"){
        localStorage.clear();
        localStorage.setItem("themes", "pink");
    }else{
        localStorage.setItem("themes", "");
        localStorage.setItem("themes", "blue");
    }
  });

const butBack = document.querySelector(".back");

butBack.addEventListener("click", () => {
  window.location.href = "player_menu.html";
});
  