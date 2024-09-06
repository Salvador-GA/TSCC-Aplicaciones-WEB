/**
 * @brief Función principal que se ejecuta al cargar la página.
 *
 * Asocia eventos a los botones de "guardar" y "mostrar" para interactuar con el almacenamiento 
 * de sessionStorage.
 */
function iniciar() {
    var btnGuardar = document.getElementById("guardar");
    var btnMostrar = document.getElementById("mostrar");
    /**
     * @brief Asocia el evento click del botón "guardar" a la función nuevoitem.
     */
    btnGuardar.addEventListener("click", nuevoitem);
    /**
     * @brief Asocia el evento click del botón "mostrar" a la función mostrarTodo.
     */
    btnMostrar.addEventListener("click", mostrarTodo);
}

/**
 * @brief Función para añadir un nuevo elemento a sessionStorage.
 *
 * Obtiene los valores de los campos "clave" y "texto" del formulario y los almacena 
 * en sessionStorage.
 */
function nuevoitem() {
    var clave = document.getElementById("clave").value;
    var valor = document.getElementById("texto").value;
    /**
     * @brief Almacena el nuevo par clave-valor en sessionStorage.
     * @param clave Identificador que será la clave en sessionStorage.
     * @param valor Valor asociado a la clave en sessionStorage.
     */
    sessionStorage.setItem(clave, valor);
    /**
     * Alternativamente se puede usar la sintaxis:
     * sessionStorage[clave] = valor;
     */
    mostrar(clave);
}

/**
 * @brief Función para mostrar un elemento específico de sessionStorage.
 *
 * Obtiene y muestra el valor correspondiente a una clave de sessionStorage en el elemento "cajadatos".
 *
 * @param clave Clave cuyo valor asociado se va a mostrar.
 */
function mostrar(clave) {
    var cajadatos = document.getElementById("cajadatos");
    var valor = sessionStorage.getItem(clave);
    /**
     * Alternativamente se puede usar la sintaxis
     * var valor = sessionStorage[clave];
     */
    cajadatos.innerHTML = "<div>" + clave + " - " + valor + "</div>";
}

/**
 * @brief Función para mostrar todos los elementos almacenados en sessionStorage.
 *
 * Itera sobre todos los pares clave-valor en sessionStorage y los muestra en el elemento "cajadatos". 
 * También incluye botones para remover individualmente cada elemento o todos a la vez.
 */
function mostrarTodo() {
    var cajadatos = document.getElementById("cajadatos");
    var contenido = '<div><input type="button" onclick="removerTodo()" value="Eliminar Todos"></div>';
    
    /**
     * @brief Itera sobre sessionStorage para obtener y mostrar cada par clave-valor.
     */
    for (var f = 0; f < sessionStorage.length; f++) {
        var clave = sessionStorage.key(f);
        var valor = sessionStorage.getItem(clave);
        contenido += "<div>" + clave + " - " + valor + "<br>";
        contenido += '<input type="button" onclick="removerItem(\'' + clave + '\')" value="Remover"></div>';
    }

    cajadatos.innerHTML = contenido;
}

/**
 * @brief Función para remover un elemento específico de sessionStorage.
 *
 * Elimina el par clave-valor correspondiente a la clave dada si el usuario confirma la acción.
 *
 * @param clave Clave del elemento que será eliminado de sessionStorage.
 */
function removerItem(clave) {
    if (confirm("Está seguro?")) {
        sessionStorage.removeItem(clave);
        mostrarTodo();
    }
}

/**
 * @brief Función para eliminar todos los elementos de sessionStorage.
 *
 * Borra todos los pares clave-valor almacenados en sessionStorage si el usuario confirma la acción.
 */
function removerTodo() {
    if (confirm("Está seguro?")) {
        sessionStorage.clear();
        mostrarTodo();
    }
}

/**
 * @brief Asocia la función iniciar al evento de carga de la página.
 */
window.addEventListener("load", iniciar);
