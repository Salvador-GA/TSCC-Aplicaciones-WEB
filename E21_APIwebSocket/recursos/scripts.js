var inputPregunta, mensajesDiv, formularioChat, socket;

/**
 * @brief Inicia la conexión WebSocket y maneja la interacción del chat.
 *
 * Este script se encarga de manejar el envío de preguntas del usuario al chatbot y
 * recibir las respuestas. Las preguntas y respuestas se muestran en el área de mensajes.
 */
function iniciar() {
    mensajesDiv = document.getElementById('mensajes');
    formularioChat = document.getElementById('formulario-chat');
    inputPregunta = document.getElementById('input-pregunta');

    // Crear una nueva conexión WebSocket
    socket = new WebSocket('ws://localhost:8080');

    formularioChat.addEventListener('submit', enviarMensaje);
    socket.addEventListener('message', recibirMensaje);
}

/**
 * @brief Envía la pregunta del usuario al servidor WebSocket.
 * 
 * @param {Event} evento El evento de submit del formulario.
 */
function enviarMensaje (evento) {
    evento.preventDefault(); // Prevenir que se recargue la página

    const mensaje = inputPregunta.value.trim();
    if (mensaje) {
        agregarMensaje(mensaje, 'usuario'); // Mostrar pregunta del usuario
        socket.send(mensaje); // Enviar la pregunta al servidor WebSocket
        inputPregunta.value = ''; // Limpiar el input
    }
}

/**
 * @brief Maneja la recepción de respuestas del servidor WebSocket.
 *
 * @param {MessageEvent} evento El evento que contiene el mensaje del servidor.
 */
function recibirMensaje(evento) {
    const respuesta = evento.data;
    agregarMensaje(respuesta, 'chatbot'); // Mostrar la respuesta del chatbot
}

/**
 * @brief Agrega un mensaje al área de mensajes.
 *
 * @param {string} texto El mensaje a mostrar.
 * @param {string} clase La clase CSS para el mensaje (usuario/chatbot).
 */
function agregarMensaje(texto, clase) {
    const parrafo = document.createElement('p');
    parrafo.textContent = texto;
    parrafo.classList.add(clase);
    mensajesDiv.appendChild(parrafo);
    mensajesDiv.scrollTop = mensajesDiv.scrollHeight; // Desplazar hacia abajo
}

// Inicializa el sistema cuando se carga la página
window.addEventListener("load", iniciar);