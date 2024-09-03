var escena, camara, renderizador, modelo;

/**
 * @brief Configura e inicializa la escena 3D, la cámara, el renderizador, y carga un modelo COLLADA.
 * 
 * Esta función configura la escena 3D y establece el fondo, la cámara en perspectiva, y el renderizador. 
 * También añade una luz direccional a la escena para iluminar el modelo, y utiliza `ColladaLoader` para 
 * cargar un modelo 3D en formato COLLADA (.dae). Además, se añaden event listeners para mover la nave 
 * con las flechas del teclado y para rotarla con el movimiento del mouse.
 * 
 * @details
 * - Crea una nueva escena con un fondo gris claro.
 * - Inicializa una cámara en perspectiva con un campo de visión de 75 grados.
 * - Configura el renderizador para que se ajuste al tamaño de un canvas HTML.
 * - Añade una luz direccional para iluminar el modelo 3D.
 * - Carga un modelo 3D en formato COLLADA y lo añade a la escena.
 * - Añade event listeners para mover la nave con las flechas del teclado y rotarla con el mouse.
 */
function iniciar() {
    // Crear la escena
    escena = new THREE.Scene();
    escena.background = new THREE.Color(0xe1e1e1);  // Fondo gris claro

    /**
     * @brief Configuración de la cámara.
     * 
     * La cámara se coloca en la posición (0, 2, 8) en el espacio 3D, lo que significa que la cámara se 
     * encuentra a 0 unidades en el eje X, 2 unidades en el eje Y, y 8 unidades en el eje Z. Desde esta 
     * posición, la cámara tiene una vista diagonal hacia el origen (0, 0, 0), lo que permite visualizar 
     * el modelo 3D correctamente.
     */
    camara = new THREE.PerspectiveCamera(75, 500 / 400, 0.01, 1000);
    camara.position.set(0, 2, 8);  // Colocamos la cámara cerca al modelo
    camara.lookAt(0, 0, 0);  // La cámara mira al centro de la escena

    /**
     * @brief Configuración del renderizador.
     * 
     * Se crea un renderizador WebGL que permite dibujar gráficos 3D en un canvas HTML. El tamaño del 
     * renderizador se ajusta al tamaño del canvas para asegurar que la escena se renderice correctamente.
     */
    const canvas = document.getElementById('canvas');
    renderizador = new THREE.WebGLRenderer({ canvas: canvas });
    renderizador.setSize(500, 400);  // Ajusta el renderizador al tamaño del canvas

    /**
     * @brief Añadir una luz direccional a la escena.
     * 
     * La luz direccional simula una fuente de luz que emite rayos paralelos en una dirección específica, 
     * como la luz del sol. Aquí, la luz se posiciona en (10, 10, 10) y se añade a la escena para iluminar 
     * el modelo 3D.
     */
    const luz = new THREE.DirectionalLight(0xffffc0, 1);
    luz.position.set(10, 10, 10);
    escena.add(luz);

    /**
     * @brief Carga y añade un modelo COLLADA a la escena.
     * 
     * Se utiliza `ColladaLoader` para cargar un modelo en formato COLLADA (.dae). Después de cargar el 
     * modelo, se escala y se posiciona en el centro de la escena. Si ocurre un error durante la carga, 
     * se muestra un mensaje de error en la consola.
     * 
     * @param {string} 'recursos/Intergalactic_Spaceship-(COLLADA_3).dae' - Ruta al archivo COLLADA a cargar.
     * @param {function} callback - Función que se ejecuta después de que el modelo se ha cargado con éxito.
     * @param {function} onError - Función que se ejecuta si ocurre un error durante la carga del modelo.
     */
    const loader = new THREE.ColladaLoader();
    loader.load('recursos/Intergalactic_Spaceship-(COLLADA_3).dae', function (collada) {
        modelo = collada.scene;  // Obtener la escena del modelo cargado
        modelo.scale.set(1, 1, 1);  // Escalar el modelo
        modelo.position.set(0, 0, 0);  // Centrar el modelo en la escena
        escena.add(modelo);  // Añadir el modelo a la escena

        render();  // Renderizar la escena
    }, undefined, function (error) {
        console.error('Error al cargar el modelo COLLADA', error);
    });

    // Agregar un event listener para el teclado
    window.addEventListener("keydown", moverNave);

    // Renderizar la escena inicialmente
    render();
    canvas.addEventListener("mousemove", mover);
}

/**
 * @brief Función para mover la nave con las flechas del teclado.
 * 
 * Esta función detecta las flechas del teclado presionadas y mueve la nave en la dirección correspondiente.
 * 
 * @param {Object} evento - El objeto del evento de teclado que contiene información sobre la tecla presionada.
 */
function moverNave(evento) {
    const velocidad = 0.1;  // Velocidad de movimiento

    if (!modelo) return;

    switch (evento.key) {
        case 'ArrowUp':    // Mover hacia arriba (eje Y)
            modelo.position.y += velocidad;
            break;
        case 'ArrowDown':  // Mover hacia abajo (eje Y)
            modelo.position.y -= velocidad;
            break;
        case 'ArrowLeft':  // Mover hacia la izquierda (eje X)
            modelo.position.x -= velocidad;
            break;
        case 'ArrowRight': // Mover hacia la derecha (eje X)
            modelo.position.x += velocidad;
            break;
    }

    // Renderizar la escena después de mover la nave
    renderizador.render(escena, camara);
}

/**
 * @brief Renderiza la escena y actualiza la cámara si es necesario.
 * 
 * Esta función se ejecuta en cada cuadro de animación para actualizar y renderizar la escena 3D.
 */
function render() {
    requestAnimationFrame(render);
    renderizador.render(escena, camara);
}

/**
 * @brief Función para rotar el modelo en función del movimiento del mouse.
 * 
 * Detecta el movimiento del mouse sobre el canvas y rota el modelo en el eje Z en función de la 
 * posición X del mouse.
 * 
 * @param {Object} evento - El objeto del evento de mouse que contiene información sobre la posición del mouse.
 */
function mover(evento) {
    if (modelo) {
        modelo.rotation.z = -evento.pageX * 0.01;
    }
    renderizador.render(escena, camara);
}

// Iniciar la escena al cargar la página
window.addEventListener('load', iniciar);
