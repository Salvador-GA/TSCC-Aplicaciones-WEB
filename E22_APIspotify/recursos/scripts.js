var inputPregunta, mensajesDiv, formularioChat, socket;

/**
 * @brief Inicia el proceso de búsqueda en la API de Spotify a través de Node.js cuando el usuario
 *        hace clic en el botón de búsqueda.
 * 
 * Esta función agrega un listener al botón "search-button". Al hacer clic, verifica si se ha 
 * ingresado un término de búsqueda y, si es así, solicita un token de acceso de Spotify y realiza 
 * la búsqueda de pistas.
 */
function iniciar() {
    document.getElementById("search-button").addEventListener("click", async () => {
        const query = document.getElementById("search-input").value; // Obtener el término de búsqueda del input
        if (query) {  // Si hay un término de búsqueda, realizar las solicitudes
            const token = await getSpotifyToken();  // Obtener el token de Spotify desde el servidor
            searchTracks(query, token);  // Realizar la búsqueda de pistas en Spotify
        }
    });
}

/**
 * @brief Realiza una solicitud al servidor Node.js para obtener el token de acceso de Spotify.
 * 
 * Esta función realiza una petición HTTP al servidor Node.js en la ruta /api/token. El servidor 
 * gestiona la autenticación con Spotify y devuelve un token de acceso que será usado para realizar 
 * búsquedas en la API de Spotify.
 * 
 * @returns {Promise<string>} Devuelve una promesa que se resuelve en el token de acceso de Spotify.
 */
async function getSpotifyToken() {
    try {
        const response = await fetch('http://localhost:3000/api/token');  // Solicitar el token desde el servidor
        if (!response.ok) {  // Comprobar si la respuesta HTTP es exitosa
            throw new Error('Network response was not ok');
        }
        const data = await response.json();  // Convertir la respuesta a JSON
        return data.access_token;  // Devolver el token de acceso
    } catch (error) {
        console.error('Hubo un problema con la solicitud Fetch:', error);  // Capturar y mostrar errores
    }
}

/**
 * @brief Realiza la búsqueda de pistas en Spotify a través del servidor Node.js.
 * 
 * Esta función envía una solicitud HTTP al servidor Node.js en la ruta /api/search, que realiza 
 * la búsqueda en la API de Spotify. El token de acceso obtenido previamente es necesario para 
 * autenticar la búsqueda. El resultado son las pistas coincidentes con el término de búsqueda.
 * 
 * @param {string} query - El término de búsqueda ingresado por el usuario.
 * @param {string} token - El token de acceso de Spotify obtenido del servidor.
 */
async function searchTracks(query, token) {
    // Realiza una solicitud GET al servidor para buscar pistas con el término de búsqueda y el token de acceso
    const response = await fetch(`http://localhost:3000/api/search?token=${token}&query=${encodeURIComponent(query)}`);
    const tracks = await response.json();  // Convertir la respuesta a JSON
    displayTracks(tracks);  // Mostrar los resultados de las pistas
}

/**
 * @brief Muestra los resultados de las pistas en el contenedor del DOM.
 * 
 * Esta función toma los resultados obtenidos de la API de Spotify (pistas) y las muestra en la página 
 * web. Cada pista incluye una imagen del álbum, el nombre de la pista y el artista. 
 * 
 * @param {Array} tracks - Lista de pistas obtenidas desde la API de Spotify.
 */
function displayTracks(tracks) {
    const container = document.getElementById("tracks-container");  // Obtener el contenedor donde se mostrarán las pistas
    container.innerHTML = '';  // Limpiar el contenido anterior

    // Iterar sobre las pistas obtenidas y crear un elemento para cada una
    tracks.forEach(track => {
        const trackElement = document.createElement("div");  // Crear un nuevo div para cada pista
        trackElement.classList.add("track");  // Añadir una clase para estilos

        // Obtener la imagen del álbum de la pista, si está disponible
        const image = track.album.images.length ? track.album.images[0].url : '';
        
        // Agregar el contenido HTML al div de la pista (imagen, nombre de la pista y artista)
        trackElement.innerHTML = `
            <img src="${image}" alt="${track.name}">
            <h3>${track.name}</h3>
            <p>${track.artists[0].name}</p>
        `;
        
        container.appendChild(trackElement);  // Añadir el elemento de la pista al contenedor
    });
}

// Inicializa el sistema cuando se carga la página
window.addEventListener("load", iniciar);
