/** 
 * @file scripts.js
 * @brief Controla la transmisión de video y audio, incluyendo la interacción del usuario para
 *        detener, pausar y reanudar.
 */

/**
 * @var video
 * @brief Elemento HTMLVideoElement que mostrará la transmisión de video.
 */
var video;

/**
 * @var apagar
 * @brief Botón para detener la transmisión de video y audio.
 */
var apagar;

/**
 * @var pausareanudar
 * @brief Botón para pausar y reanudar la transmisión de video.
 */
var pausareanudar;

/**
 * @var promesa
 * @brief Promesa que maneja la solicitud de acceso a la cámara y el micrófono.
 */
var promesa;

/**
 * @brief Inicia la captura de video y audio al cargar la página.
 *
 * Esta función solicita acceso a la cámara y micrófono del usuario.
 * Si se concede, llama a la función `exito` para manejar la transmisión.
 * Si falla, llama a la función `mostrarerror` para manejar el error.
 */
function iniciar() {
    promesa = navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    // el motor de JavaScript se encarga de pasar los argumentos correctos a las funciones callback 
    // según el resultado de la promesa o el evento que se esté manejando.
    promesa.then(exito);
    promesa.catch(mostrarerror);
}

/**
 * @brief Maneja la transmisión exitosa de video y audio.
 *
 * Esta función configura la transmisión en el elemento de video,
 * muestra información sobre las pistas de video y audio,
 * y establece los listeners para los botones de control.
 *
 * @param {MediaStream} transmision - La transmisión de video y audio capturada.
 */
function exito(transmision) {
    video = document.getElementById("medio");
    video.srcObject = transmision;
    video.play();

    var cajadatos = document.getElementById("cajadatos");

    // Información de la pista de video
    var pistasvideo = transmision.getVideoTracks();
    var pista = pistasvideo[0];
    var datos = "Video";
    datos += "<br> Dispositivo: " + pista.label;

    // Información de la pista de audio
    var pistasAudio = transmision.getAudioTracks();
    var pistaAudio = pistasAudio[0];
    datos += "<br><br> Audio";
    datos += "<br> Dispositivo: " + pistaAudio.label;

    cajadatos.innerHTML = datos;

    // Configurar el botón de apagado
    // Note que para hacer un llamado a función con parámetro se debe envolver la función
    // en una función anonima, para que efectivamente se ejecute solo al hacer click, de otro 
    // modo si escribieramos apagar.addEventListener("click", deteneriniciartransmision(transmision));
    // La función se ejecutaría inmediatamente y al listener se le pasaría el valor devuelto
    // por la función
    apagar = document.getElementById("apagar");
    apagar.addEventListener("click", function() {
        deteneriniciartransmision(transmision);
    });

    // Configurar el botón de pausa/reanudación
    pausareanudar = document.getElementById("pausareanudar");
    pausareanudar.addEventListener("click", presionar);
}

/**
 * @brief Maneja y muestra los errores ocurridos durante la captura de medios.
 *
 * @param {Error} error - Objeto de error que contiene información sobre el problema.
 */
function mostrarerror(error) {
    console.log("Error: " + error.name);
}

/**
 * @brief Detiene la transmisión de video y audio.
 *
 * Esta función detiene las pistas de video y audio activas en la transmisión.
 *
 * @param {MediaStream} transmision - La transmisión de video y audio a detener.
 */
function deteneriniciartransmision(transmision) {
    // Detener la pista de video
    var pistasvideo = transmision.getVideoTracks();
    if (pistasvideo.length > 0) {
        var pistaVideo = pistasvideo[0];
        pistaVideo.stop();
    }

    // Detener la pista de audio
    var pistasaudio = transmision.getAudioTracks();
    if (pistasaudio.length > 0) {
        var pistaAudio = pistasaudio[0];
        pistaAudio.stop();
    }

    alert("Transmisión Cancelada");
}

/**
 * @brief Pausa o reanuda la transmisión de video.
 *
 * Esta función alterna entre pausar y reanudar el video, y cambia la imagen del botón de control.
 */
function presionar() {
    if (!video.paused && !video.ended) {
        video.pause();
        pausareanudar.style.backgroundImage = "url('imagenes/jugar.png')";
    } else {
        video.play();
        pausareanudar.style.backgroundImage = "url('imagenes/pausa.png')";
    }
}

/**
 * @brief Inicia la captura de medios cuando la página se carga.
 *
 * Esta función está vinculada al evento `load` de la ventana.
 */
window.addEventListener("load", iniciar);
