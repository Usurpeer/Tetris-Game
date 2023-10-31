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
    
  });*/
  document.cookie = "blue";
  var a = document.cookie;
  console.log(a);
  document.getElementById("theme").addEventListener("click", function() {
    if(document.cookie === "pink"){
        document.documentElement.classList.remove('pink');
        document.getElementById("bodyId").classList.toggle("blue");
        document.cookie("blue");
    }else{
        document.documentElement.classList.remove('blue');
        document.getElementById("bodyId").classList.toggle("pink");
        document.cookie = "pink";
    }
    console.log(a);
    console.log(document.getElementById("bodyId").classList);
  });
  