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
  const themes = localStorage.getItem("themes");
  if(themes === "blue"){
    document.body.className = localStorage.getItem("themes");
  }else{
    document.body.className = "pink";
  }
  theme.addEventListener("click", function(){
    const themes = localStorage.getItem("themes");
    if(themes === "blue"){
        localStorage.clear();
        localStorage.setItem("themes", "pink");
        document.body.className = "pink";
    }else{
        localStorage.clear();
        localStorage.setItem("themes", "blue");
        document.body.className = "blue";
    }
  });

  