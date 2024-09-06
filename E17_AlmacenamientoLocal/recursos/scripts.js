/**
 * @brief Función principal que se ejecuta al cargar la página.
 *
 * Asocia el evento click al botón de "guardar" para añadir un nuevo elemento al localStorage.
 * También agrega un listener para detectar cualquier cambio en el localStorage.
 */
function iniciar() {
    var boton = document.getElementById("guardar");
    /**
     * @brief Asocia el evento click del botón "guardar" a la función nuevoitem.
     */
    boton.addEventListener("click", nuevoitem);

    /**
     * @brief Escucha cambios en localStorage y ejecuta la función modificado cuando se detecta un cambio.
     */
    window.addEventListener("storage", modificado);

    /**
     * @brief Muestra los elementos actuales almacenados en localStorage.
     */
    mostrar();
}

/**
 * @brief Función para añadir un nuevo elemento al localStorage.
 *
 * Obtiene los valores de los campos "clave" y "texto" del formulario y los almacena en localStorage.
 * Luego actualiza la visualización de los elementos almacenados.
 */
function nuevoitem() {
    var clave = document.getElementById("clave").value;
    var valor = document.getElementById("texto").value;

    /**
     * @brief Almacena el nuevo par clave-valor en localStorage.
     * @param clave Identificador que será la clave en localStorage.
     * @param valor Valor asociado a la clave en localStorage.
     */
    localStorage.setItem(clave, valor);

    /**
     * @brief Muestra los elementos actuales almacenados en localStorage después de añadir el nuevo.
     */
    mostrar();

    /**
     * @brief Limpia los campos del formulario una vez que se guarda el nuevo elemento.
     */
    document.getElementById('clave').value = "";
    document.getElementById('texto').value = "";
}

/**
 * @brief Función que se ejecuta cuando se detecta un cambio en localStorage.
 *
 * Muestra en consola detalles del evento, como la clave modificada, el valor anterior, el valor nuevo, 
 * la URL que hizo el cambio y el área de almacenamiento.
 *
 * @param evento El evento de cambio en localStorage.
 */
function modificado(evento) {
    console.log(evento.key);          ///< Clave que ha sido modificada.
    console.log(evento.oldValue);     ///< Valor anterior asociado a la clave.
    console.log(evento.newValue);     ///< Nuevo valor asociado a la clave.
    console.log(evento.url);          ///< URL de la página donde ocurrió el cambio.
    console.log(evento.storageArea);  ///< Área de almacenamiento afectada (localStorage o sessionStorage).

    /**
     * @brief Actualiza la visualización de los elementos almacenados en localStorage después de un cambio.
     */
    mostrar();
}

/**
 * @brief Función para mostrar todos los elementos almacenados en localStorage.
 *
 * Recorre el localStorage y muestra cada par clave-valor en el elemento "cajadatos".
 */
function mostrar() {
    var cajadatos = document.getElementById("cajadatos");
    cajadatos.innerHTML = "";

    /**
     * @brief Recorre todos los elementos en localStorage y los muestra en la página.
     */
    for (var f = 0; f < localStorage.length; f++) {
        var clave = localStorage.key(f);
        var valor = localStorage.getItem(clave);
        cajadatos.innerHTML += "<div>" + clave + " - " + valor + "</div>";
    }
}

/**
 * @brief Asocia la función iniciar al evento de carga de la página.
 */
window.addEventListener("load", iniciar);
