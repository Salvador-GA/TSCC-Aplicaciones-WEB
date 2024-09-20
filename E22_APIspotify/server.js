// Importamos las bibliotecas necesarias
import express from 'express';  // Express es un framework para crear servidores en Node.js
import cors from 'cors';        // CORS es un middleware para permitir solicitudes entre dominios
import fetch from 'node-fetch'; // Fetch permite hacer solicitudes HTTP desde Node.js
import btoa from 'btoa';        // btoa convierte cadenas de texto en base64

// Inicializamos la aplicación de Express
const app = express();

// Habilitamos CORS para todas las rutas, permitiendo solicitudes desde otros orígenes
app.use(cors());

// Middleware para servir archivos estáticos (HTML, CSS, JS) desde la carpeta "public"
app.use(express.static('public'));

// Ruta para obtener el token de acceso de Spotify
app.get('/api/token', async (req, res) => {
    // Declaramos el client_id y el client_secret de la cuenta de Spotify para autenticar las solicitudes
    const client_id = 'client_id';  // Reemplaza con tu client_id de Spotify
    const client_secret = 'client_secret';  // Reemplaza con tu client_secret de Spotify

    // Realizamos una solicitud POST a la API de Spotify para obtener el token de acceso
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',  // Usamos el método POST para enviar datos en el cuerpo de la solicitud
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',  // Especificamos que los datos se envían en formato URL
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),  // Autenticamos usando base64
        },
        body: 'grant_type=client_credentials',  // Enviamos el tipo de autorización que necesitamos (client_credentials)
    });

    // Convertimos la respuesta en formato JSON
    const data = await response.json();
    
    // Enviamos el token de acceso de vuelta al cliente
    res.json({ access_token: data.access_token });
});

// Ruta para buscar pistas en Spotify
app.get('/api/search', async (req, res) => {
    // Recuperamos el token de acceso y la consulta de búsqueda desde la URL
    const token = req.query.token;
    const query = req.query.query;

    // Hacemos una solicitud GET a la API de Spotify para buscar pistas con el query proporcionado
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
        headers: {
            'Authorization': `Bearer ${token}`  // Usamos el token de acceso en el encabezado de la solicitud
        }
    });

    // Convertimos la respuesta en formato JSON
    const data = await response.json();

    // Enviamos los primeros 10 resultados de las pistas encontradas al cliente
    res.json(data.tracks.items);
});

// Iniciamos el servidor en el puerto 3000
app.listen(3000, () => {
    // Imprimimos un mensaje en la consola cuando el servidor está corriendo
    console.log('Servidor escuchando en http://localhost:3000');
});
