/** 
 * @file
 * @brief Funcionalidad principal para manejar una base de datos IndexedDB con almacenamiento de películas.
 * 
 * Este script permite agregar, mostrar, buscar y eliminar objetos almacenados en una base de datos
 * IndexedDB bajo el almacén de objetos 'peliculas'.
 */

var cajadatos, bd;

/**
 * @brief Inicializa los elementos principales de la página y configura los eventos.
 * 
 * Esta función se ejecuta al cargar la página. Establece los eventos para los botones
 * de agregar y buscar, y maneja la creación y apertura de la base de datos IndexedDB.
 */
function iniciar() {
    cajadatos = document.getElementById("cajadatos");

    // Asigna el evento de clic al botón de guardar
    var boton = document.getElementById("guardar");
    boton.addEventListener("click", agregarobjeto);

    // Asigna el evento de clic al botón de buscar
    var botonB = document.getElementById("buscar");
    botonB.addEventListener("click", buscarobjetos);

    // Intenta abrir la base de datos IndexedDB
    var solicitud = indexedDB.open("basededatos");

    // Maneja los posibles errores al abrir la base de datos
    solicitud.addEventListener("error", mostrarerror);

    // Si la base de datos se abre con éxito, continúa con el programa
    solicitud.addEventListener("success", comenzar);

    // Si la base de datos necesita ser creada o actualizada
    solicitud.addEventListener("upgradeneeded", crearbd);
}

/**
 * @brief Muestra un error en caso de que ocurra al abrir la base de datos.
 * 
 * @param evento El evento que contiene el error.
 */
function mostrarerror(evento) {
    alert("Error: " + evento.code + " " + evento.message);
}

/**
 * @brief Inicia la base de datos una vez que ha sido abierta con éxito.
 * 
 * @param evento El evento que contiene el objeto resultante de la base de datos abierta.
 */
function comenzar(evento) {
    bd = evento.target.result;
    mostrar();
}

/**
 * @brief Crea la base de datos si no existe, incluyendo el almacén de objetos y un índice.
 * 
 * @param evento El evento que contiene la base de datos creada.
 */
function crearbd(evento) {
    var basededatos = evento.target.result;
    var almacen = basededatos.createObjectStore("peliculas", {
        keyPath: "id"
    });
    almacen.createIndex("BuscarFecha", "fecha", { unique: false });
}

/**
 * @brief Agrega un nuevo objeto (película) a la base de datos.
 * 
 * Obtiene los valores de los campos de entrada (id, título, fecha) y los guarda en el almacén 'peliculas'.
 */
function agregarobjeto() {
    var clave = document.getElementById("clave").value;
    var titulo = document.getElementById("texto").value;
    var fecha = document.getElementById("fecha").value;

    // Inicia una transacción de escritura en la base de datos
    var transaccion = bd.transaction(["peliculas"], "readwrite");

    // Obtiene el almacén de objetos 'peliculas' de la base de datos
    var almacen = transaccion.objectStore("peliculas");

    // Escucha cuando la transacción se complete para mostrar la lista de películas
    transaccion.addEventListener("complete", mostrar);

    // Agrega el nuevo objeto al almacén
    almacen.add({ id: clave, nombre: titulo, fecha: fecha });

    // Limpia los campos del formulario
    document.getElementById("clave").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("fecha").value = "";
}

/**
 * @brief Muestra un objeto almacenado en la base de datos basado en su clave.
 * 
 * @param clave La clave del objeto a buscar en la base de datos.
 */
function mostrarCave(clave) {
    var transaccion = bd.transaction(["peliculas"]);
    var almacen = transaccion.objectStore("peliculas");
    var solicitud = almacen.get(clave);

    // Una vez que se obtenga el objeto, se mostrará la clave
    solicitud.addEventListener("success", mostrarlaclave);
}

/**
 * @brief Muestra los detalles de una película específica en la página.
 * 
 * @param evento El evento que contiene los resultados de la película obtenida.
 */
function mostrarlaclave(evento) {
    var resultado = evento.target.result;
    cajadatos.innerHTML = "<div>" + resultado.id + " - " +
        resultado.nombre + " - " + resultado.fecha + "</div>";
}

/**
 * @brief Muestra todos los objetos almacenados en la base de datos.
 * 
 * Inicia una transacción de lectura en el almacén 'peliculas' y utiliza un cursor para recorrer 
 * los elementos en orden inverso de fecha.
 */
function mostrar() {
    cajadatos.innerHTML = "";

    // Inicia una transacción de solo lectura en el almacén 'peliculas'
    var transaccion = bd.transaction(["peliculas"]);

    // Obtiene el almacén de objetos 'peliculas' de la base de datos
    var almacen = transaccion.objectStore("peliculas");

    // Accede al índice 'BuscarFecha' del almacén, que está basado en la propiedad 'fecha' de los objetos almacenados
    var indice = almacen.index("BuscarFecha");

    /**
     * Abre un cursor que recorrerá los objetos del índice en orden inverso (de más reciente a más antiguo),
     * pasando 'null' como clave de rango para obtener todos los objetos.
     * El cursor se mueve en la dirección 'prev' (descendente).
     */
    var puntero = indice.openCursor(null, "prev");

    /**
     * Cada vez que el cursor obtiene un resultado, se activa el evento 'success' y se llama a la función 'mostrarlista',
     * la cual se encarga de añadir cada película al contenido HTML en 'cajadatos'.
     */
    puntero.addEventListener("success", mostrarlista);
}

/**
 * @brief Muestra una lista de películas obtenidas del cursor.
 * 
 * @param evento El evento que contiene el puntero del cursor.
 */
function mostrarlista(evento) {
    var puntero = evento.target.result;
    if (puntero) {
        cajadatos.innerHTML += "<div>" + puntero.value.id + " - " +
            puntero.value.nombre + " - " + puntero.value.fecha +
            ' <input type="button" onclick = "removerobjeto(\'' + puntero.value.id +
            '\')" value = "X" ></div > ';
        puntero.continue();
    }
}

/**
 * @brief Elimina un objeto de la base de datos basado en su clave.
 * 
 * @param clave La clave del objeto a eliminar.
 */
function removerobjeto(clave) {
    if (confirm("Está seguro de eliminar la pelicula?")) {
        var transaccion = bd.transaction(["peliculas"], "readwrite");
        var almacen = transaccion.objectStore("peliculas");
        transaccion.addEventListener("complete", mostrar);
        almacen.delete(clave);
    }
}

/**
 * @brief Busca objetos almacenados en la base de datos filtrando por la fecha.
 */
function buscarobjetos() {
    cajadatos.innerHTML = "";

    // Obtiene el valor de la fecha introducida por el usuario en el campo de búsqueda 'fechaB'
    var buscar = document.getElementById("fechaB").value;

    // Inicia una transacción de solo lectura en el almacén 'peliculas' de la base de datos
    var transaccion = bd.transaction(["peliculas"]);

    // Obtiene el almacén de objetos 'peliculas' dentro de la transacción
    var almacen = transaccion.objectStore("peliculas");

    // Accede al índice 'BuscarFecha', basado en la propiedad 'fecha' de las películas
    var indice = almacen.index("BuscarFecha");

    /**
     * Crea un rango de búsqueda que filtra los registros que coincidan exactamente con el valor 'buscar'.
     * `IDBKeyRange.only(buscar)` crea un rango que busca coincidencias exactas con el valor proporcionado.
     */
    var rango = IDBKeyRange.only(buscar);

    /**
     * Abre un cursor limitado al rango especificado (en este caso, solo películas que coincidan con la fecha).
     * El cursor recorrerá los objetos en el índice 'BuscarFecha' que coincidan con el valor del rango.
     */
    var puntero = indice.openCursor(rango);

    /**
     * Cada vez que el cursor encuentra un resultado, se activa el evento 'success', lo que dispara la función 'mostrarlista'.
     * La función 'mostrarlista' se encarga de añadir los resultados filtrados al contenido HTML del div 'cajadatos'.
     */
    puntero.addEventListener("success", mostrarlista);
}

// Inicia la ejecución al cargar la página
window.addEventListener("load", iniciar);
