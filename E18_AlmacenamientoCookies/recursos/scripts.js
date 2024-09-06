/**
 * @brief Función principal que se ejecuta al cargar la página.
 *
 * Asocia el evento click al botón de "guardar" para añadir un nuevo elemento a las cookies.
 */
function iniciar() {
    var boton = document.getElementById("guardar");
    /**
     * @brief Asocia el evento click del botón "guardar" a la función nuevoitem.
     */
    boton.addEventListener("click", nuevoitem);

    /**
     * @brief Muestra las cookies actuales almacenadas.
     */
    mostrar();
}

/**
 * @brief Función para añadir un nuevo elemento a las cookies.
 *
 * Obtiene los valores de los campos "clave" y "texto" del formulario y los almacena en cookies.
 * Luego actualiza la visualización de las cookies almacenadas.
 */
function nuevoitem() {
    var clave = document.getElementById("clave").value;
    var valor = document.getElementById("texto").value;

    /**
     * @brief Almacena el nuevo par clave-valor en cookies con una duración de 7 días.
     * @param clave Identificador que será el nombre de la cookie.
     * @param valor Valor asociado a la cookie.
     */
    setCookie(clave, valor, 7);

    /**
     * @brief Muestra las cookies actuales después de añadir la nueva.
     */
    mostrar();

    /**
     * @brief Limpia los campos del formulario una vez que se guarda la nueva cookie.
     */
    document.getElementById('clave').value = "";
    document.getElementById('texto').value = "";
}

/**
 * @brief Función para mostrar todas las cookies almacenadas.
 *
 * Recorre las cookies y muestra cada par clave-valor en el elemento "cajadatos".
 */
function mostrar() {
    var cajadatos = document.getElementById("cajadatos");
    cajadatos.innerHTML = "";

    /**
     * @brief Obtiene y muestra todas las cookies almacenadas.
     */
    var cookies = document.cookie.split("; ");
    cookies.forEach(function(cookie) {
        var partes = cookie.split("=");
        var clave = partes[0];
        var valor = partes[1];
        cajadatos.innerHTML += "<div>" + clave + " - " + valor + "</div>";
    });
}

/**
 * @brief Función para establecer una cookie con una clave, valor y duración en días.
 *
 * Esta función crea una cookie con la clave y valor especificados. La cookie tiene un tiempo
 * de expiración definido por la cantidad de días proporcionada. La cookie será válida en 
 * todo el dominio (`path=/`).
 *
 * @param clave Nombre de la cookie.
 * @param valor Valor de la cookie.
 * @param dias Número de días que la cookie debe durar antes de expirar.
 */
function setCookie(clave, valor, dias) {
    // Crea una nueva instancia del objeto Date para obtener la fecha actual
    var fecha = new Date();
    
    // Establece el tiempo de expiración de la cookie. 
    // El método getTime() devuelve el tiempo en milisegundos desde el 1 de enero de 1970.
    // Luego sumamos los milisegundos correspondientes a la cantidad de días para la expiración.
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));

    // Convierte la fecha en una cadena UTC para ser usada como valor en "expires"
    var expiracion = "expires=" + fecha.toUTCString();
    
    // Crea la cookie concatenando el nombre (clave), valor, la fecha de expiración y el path.
    // El path=/ hace que la cookie sea accesible en todo el sitio web.
    document.cookie = clave + "=" + valor + ";" + expiracion + ";path=/";
}

/**
 * @brief Función para obtener el valor de una cookie por su nombre.
 *
 * Busca entre las cookies almacenadas el nombre especificado (clave). Si la encuentra, 
 * devuelve su valor, de lo contrario retorna una cadena vacía.
 *
 * @param clave Nombre de la cookie que se desea obtener.
 * @return El valor de la cookie si existe, o "" si no existe.
 */
function getCookie(clave) {
    // Prepara la cadena de búsqueda agregando un signo "=" al nombre de la cookie.
    // Esto asegura que se busque exactamente el nombre de la cookie.
    var nombre = clave + "=";

    // Divide el conjunto de cookies en partes individuales usando "; " como delimitador.
    var cookies = document.cookie.split("; ");

    // Itera sobre todas las cookies almacenadas en el navegador.
    for (var i = 0; i < cookies.length; i++) {
        // Toma una cookie y verifica si comienza con el nombre buscado.
        var cookie = cookies[i];
        // Si encuentra una coincidencia, extrae y retorna el valor de la cookie.
        if (cookie.indexOf(nombre) === 0) {
            // El valor de la cookie comienza después del nombre (clave + "=").
            return cookie.substring(nombre.length, cookie.length);
        }
    }

    // Si no encuentra la cookie, retorna una cadena vacía.
    return "";
}

/**
 * @brief Asocia la función iniciar al evento de carga de la página.
 */
window.addEventListener("load", iniciar);
