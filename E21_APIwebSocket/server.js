// Importar el módulo WebSocket
const WebSocket = require('ws');

// Crear un servidor WebSocket en el puerto 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    console.log('Nuevo cliente conectado');

    // Escuchar mensajes del cliente
    ws.on('message', message => {
        console.log('Pregunta recibida: %s', message);

        // Convertir el mensaje a string (en caso de que no lo sea)
        let pregunta = message.toString().toLowerCase();
        let respuesta;

        // Lógica para las respuestas del chatbot
        switch (pregunta) {
            case '¿cual es la hora?':
            case 'cual es la hora?':
            case 'cual es la hora':
                respuesta = `La hora actual es ${new Date().toLocaleTimeString()}`;
                break;
            case '¿que día es hoy?':
                respuesta = `Hoy es ${new Date().toLocaleDateString()}`;
                break;
            case '¿cual es tu nombre?':
                respuesta = 'Me llamo ChatBot';
                break;
            case '¿cuantos años tienes?':
                respuesta = 'No tengo edad, soy solo un programa.';
                break;
            case 'hola':
                respuesta = '¡Hola! ¿En qué puedo ayudarte?';
                break;
            case 'adios':
                respuesta = 'Hasta luego, que tengas un buen día.';
                break;
            default:
                respuesta = 'Lo siento, no entiendo la pregunta.';
        }

        // Enviar la respuesta al cliente
        ws.send(respuesta);
    });

    // Cerrar la conexión cuando el cliente se desconecta
    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

console.log('Servidor WebSocket escuchando en el puerto 8080');
