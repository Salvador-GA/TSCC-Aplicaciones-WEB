var cajadatos;

/**
 * @brief Inicializa el sistema al cargar la página.
 * 
 * Esta función se ejecuta al cargar la página, asignando el área donde se mostrarán los resultados
 * y añadiendo un listener para cargar los archivos seleccionados por el usuario.
 */
function iniciar() {
    cajadatos = document.getElementById("cajadatos");

    // Evento para seleccionar archivos desde el input
    var archivos = document.getElementById("archivos");
    archivos.addEventListener("change", procesar);

    // Eventos para el área de Drag and Drop
    var dropArea = document.getElementById("dragDropArea");
    dropArea.addEventListener("dragover", procesarDragOver);
    dropArea.addEventListener("dragleave", procesarDragLeave);
    dropArea.addEventListener("drop", procesarFileDrop);
}

/**
 * @brief Maneja la selección de archivos.
 *
 * Esta función procesa el archivo seleccionado y lo pasa a la función adecuada
 * para cargar y mostrar el contenido.
 *
 * @param {Event} evento - El evento de selección de archivos.
 */
function procesar(evento) {
    var archivos = evento.target.files;
    var archivo = archivos[0];
    procesarArchivo(archivo);
}

/**
 * @brief Procesa los archivos arrastrados y soltados en el área de drag and drop.
 *
 * @param {Event} evento - El evento de soltado de archivos.
 */
function procesarFileDrop(evento) {
    // Previene el comportamiento predeterminado del navegador (como abrir un archivo arrastrado).
    evento.preventDefault();
    
    // Evita que el evento se propague a otros elementos padres en el DOM.
    evento.stopPropagation();

    var archivos = evento.dataTransfer.files;
    var archivo = archivos[0];
    procesarArchivo(archivo);
    var dropArea = document.getElementById("dragDropArea");
    dropArea.classList.remove("dragover");
}

/**
 * @brief Maneja el evento "dragover" cuando un archivo es arrastrado sobre el área de drag and drop.
 *
 * @param {Event} evento - El evento de arrastrar sobre el área.
 */
function procesarDragOver(evento) {
    evento.preventDefault();
    evento.stopPropagation();
    var dropArea = document.getElementById("dragDropArea");
    dropArea.classList.add("dragover");
}

/**
 * @brief Maneja el evento "dragleave" cuando el archivo sale del área de drag and drop.
 *
 * @param {Event} evento - El evento de arrastrar fuera del área.
 */
function procesarDragLeave(evento) {
    var dropArea = document.getElementById("dragDropArea");
    dropArea.classList.remove("dragover");
}

/**
 * @brief Procesa el archivo seleccionado o arrastrado y lo muestra en la página.
 *
 * @param {File} archivo - El archivo que se va a procesar.
 */
function procesarArchivo(archivo) {
    var tipo = archivo.type;

    // Identifica el tipo MIME del archivo
    if (tipo === "text/xml" || tipo === "application/xml") {
        cargarXML(archivo);
    } else if (tipo.startsWith("text/")) {
        leerTexto(archivo);
    } else if (tipo.startsWith("image/")) {
        cargarImagen(archivo);
    } else if (tipo.startsWith("video/")) {
        cargarVideo(archivo);
    } else if (tipo === "application/pdf") {
        cargarPDF(archivo);
    } else {
        cajadatos.innerHTML = "Tipo de archivo no soportado";
    }
}

/**
 * @brief Lee un archivo de texto y lo muestra en el área de resultados.
 * 
 * @param {File} archivo Archivo de texto seleccionado por el usuario.
 */
function leerTexto(archivo) {
    var lector = new FileReader();
    lector.addEventListener("load", function(evento) {
        var resultado = evento.target.result;
        cajadatos.innerHTML = "<pre>" + resultado + "</pre>";
    });
    lector.readAsText(archivo);
}

/**
 * @brief Carga una imagen y la muestra en el área de resultados.
 * 
 * @param {File} archivo Archivo de imagen seleccionado por el usuario.
 */
function cargarImagen(archivo) {
    var lector = new FileReader();
    lector.addEventListener("load", function(evento) {
        var img = document.createElement("img");
        img.src = evento.target.result;
        img.style.maxWidth = "100%";
        cajadatos.innerHTML = "";
        cajadatos.appendChild(img);
    });
    lector.readAsDataURL(archivo);
}

/**
 * @brief Carga un archivo de video y lo muestra en el área de resultados.
 * 
 * @param {File} archivo Archivo de video seleccionado por el usuario.
 */
function cargarVideo(archivo) {
    var lector = new FileReader();
    lector.addEventListener("load", function(evento) {
        var video = document.createElement("video");
        video.src = evento.target.result;
        video.controls = true;
        video.style.maxWidth = "100%";
        cajadatos.innerHTML = "";
        cajadatos.appendChild(video);
    });
    lector.readAsDataURL(archivo);
}

/**
 * @brief Carga un archivo PDF y lo muestra en el área de resultados.
 * 
 * @param {File} archivo Archivo PDF seleccionado por el usuario.
 */
function cargarPDF(archivo) {
    var lector = new FileReader();
    lector.addEventListener("load", function(evento) {
        var object = document.createElement("object");
        object.type = "application/pdf";
        object.data = evento.target.result;
        object.style.width = "100%";
        object.style.height = "600px";
        cajadatos.innerHTML = "";
        cajadatos.appendChild(object);
    });
    lector.readAsDataURL(archivo);
}

/**
 * @brief Carga un archivo XML.
 * 
 * @param {File} archivo Archivo XML seleccionado por el usuario.
 */
function cargarXML(archivo) {
    var lector = new FileReader();
    lector.addEventListener("load", mostrarXML);
    lector.readAsText(archivo);
}

/**
 * @brief Muestra el contenido de un archivo XML.
 *
 * @param {Event} evento El evento de carga del archivo.
 */
function mostrarXML(evento) {
    var resultado = evento.target.result;
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(resultado, "text/xml");
    
    var usuarios = xmlDoc.getElementsByTagName("usuario");
    var contenido = "<ul>"; // Listado HTML para los usuarios
    for (var i = 0; i < usuarios.length; i++) {
        var id = usuarios[i].getElementsByTagName("id")[0].textContent;
        var nombre = usuarios[i].getElementsByTagName("nombre")[0].textContent;
        var apellido_paterno = usuarios[i].getElementsByTagName("apellido_paterno")[0].textContent;
        var apellido_materno = usuarios[i].getElementsByTagName("apellido_materno")[0].textContent;
        var fecha_nacimiento = usuarios[i].getElementsByTagName("fecha_nacimiento")[0].textContent;

        // Agregar cada usuario con formato en una nueva línea
        contenido += "<li><strong>ID:</strong> " + id + 
                     " <strong>Nombre:</strong> " + nombre + 
                     " <strong>Apellido Paterno:</strong> " + apellido_paterno + 
                     " <strong>Apellido Materno:</strong> " + apellido_materno + 
                     " <strong>Fecha de Nacimiento:</strong> " + fecha_nacimiento + "</li><br>";
    }
    contenido += "</ul>";
    cajadatos.innerHTML = contenido;
}

// Inicializa el sistema cuando se carga la página
window.addEventListener("load", iniciar);
