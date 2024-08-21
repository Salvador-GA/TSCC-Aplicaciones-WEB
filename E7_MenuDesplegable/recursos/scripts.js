// variable para determinar si el menu es visible y hacerlo invisible, o viceversa 
var visible = false;

// función para que se ejecuta al cargar el documento para agregar un listener a la imagen
function iniciar() {
    var elemento = document.getElementById("menu-img");
    elemento.addEventListener("click", mostrarMenu);
}

// función que hace visible o no el menú
function mostrarMenu() {
    var elemento = document.getElementById("menuprincipal");
    if (!visible) {
        elemento.style.display = "flex";
        visible = true;
    } else {
        elemento.style.display = "none";
        visible = false;
    }
}

//Se agrega un listener para ejecutar la función iniciar cuandos e cargue el documento
window.addEventListener("load", iniciar);