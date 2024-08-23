/** Variables globales para el reproductor */
var maximo, medio, reproducir, barra, progreso, silenciar, volumen,
    bucle, tiempoActual, tracks, select;

/** 
 * Función que inicializa el reproductor, establece una referencia con cada elemento
 * y agrega los listeners necesarios para las interacciones del usuario 
 */
function iniciar() {
    maximo = 365;
    medio = document.getElementById("medio");
    reproducir = document.getElementById("reproducir");
    barra = document.getElementById("barra");
    progreso = document.getElementById("progreso");
    silenciar = document.getElementById("silenciar");
    volumen = document.getElementById("volumen");
    tiempoActual = document.getElementById("tiempoAct");
    tracks = medio.textTracks;
    select = document.getElementById('seleccionSubtitulos');
    // Inicialmente desactivar todos los subtítulos
    for (let i = 0; i < tracks.length; i++) {
        tracks[i].mode = 'disabled';
    }
    reproducir.addEventListener("click", presionar);
    silenciar.addEventListener("click", sonido);
    barra.addEventListener("click", mover);
    volumen.addEventListener("change", nivel);
    select.addEventListener('change', cambiosub);
}

/**
 * Función para reproducir o pausar el video, si el video no se está reproduciendo entonces
 * se reproduce, sacambia el valor del boton de > a || y se establce la ejecución de la función
 * estado para que se ejecute cada segundo. Si el video no esta pausado y no se ha terminado 
 * de reproducir, entonces el video se pausa, se cambia el valor del voton de || a > y se detiene
 * la ejecución de la función estado
 */
function presionar() {
    if (!medio.paused && !medio.ended) {
        medio.pause();
        reproducir.value = ">";
        clearInterval(bucle);
    } else {
        medio.play();
        reproducir.value = "||";
        bucle = setInterval(estado, 1000);
    }
}

/**
 * Esta función actualiza la barra de progreso, determina el nuevo valor (ancho) de la barra
 * con respecto a el tamaño máximo, la duración total del video y el tiempo de reproducción
 * actual. Si el video ya termino de reproducirse, entonces pone la barra de progreso a 0px
 * y cambia el valor del boton de reproducción a > para indicar que se puede volver a reproducir
 */
function estado() {
    if (!medio.ended) {
        var largo = parseInt(medio.currentTime * maximo / medio.duration);
        progreso.style.width = largo + "px";
        tiempoActual.textContent = "" + parseFloat(medio.currentTime.toFixed(2));
    } else {
        progreso.style.width = "0px";
        reproducir.value = ">";
        clearInterval(bucle);
        tiempoActual.textContent = "0";
    }
}

/**
 * Esta función utiliza el valor actual (el que se acaba de asignar al dar click en alguna
 * posción de la barra de prograso) para actualizar el ancho de la barra de progreso y 
 * ajustar el video para que comience a verse a partir de este nuevo valor.
 * @param {MouseEvent} evento 
 */
function mover(evento) {
    if (!medio.paused && !medio.ended) {
        // offsetX captura la posición horizontal relativa a la barra de progreso 
        // se resta 2 al offsetX para ajustar la posición con el margen (2px) de la barra
        var ratonX = evento.offsetX - 2;
        if (ratonX < 0) {
            ratonX = 0;
        } else if (ratonX > maximo) {
            ratonX = maximo;
        }
        var tiempo = ratonX * medio.duration / maximo;
        medio.currentTime = tiempo;
        progreso.style.width = ratonX + "px";
    }
}

/**
 * Esta función pone mute al video o quita el mute, también cambia el 
 * texto del boton para indicar lo que pasará cuando se precone
 */
function sonido() {
    if (silenciar.value == "Silencio") {
        medio.muted = true;
        silenciar.value = "Sonido";
    } else {
        medio.muted = false;
        silenciar.value = "Silencio";
    }
}

/**
 * Esta función cambia el volumen del video con el valor del input range
 */
function nivel() {
    medio.volume = volumen.value;
}

/**
 * Esta función activa los subtitulos correspondiente al valor seleccionado en 
 * el select, asegurandose de desactivar el resto
 */
function cambiosub() {
    // Desactivar todos los subtítulos
    for (let i = 0; i < tracks.length; i++) {
        tracks[i].mode = 'disabled';
    }
    // Activar el subtítulo seleccionado
    const selectedTrack = select.value;
    if (selectedTrack !== 'none') {
        const trackElement = document.getElementById(selectedTrack);
        const trackIndex = Array.from(medio.children).indexOf(trackElement) - 1;
        tracks[trackIndex].mode = 'showing';
    }
}

// Se agrega el listener para ejecutar la función iniciar al cargar la página
window.addEventListener("load", iniciar);