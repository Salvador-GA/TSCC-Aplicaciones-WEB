var escena, camara, renderizador, cubo;

/**
 * @brief Configura e inicializa la escena 3D, la cámara, el renderizador, y los objetos básicos.
 *
 * Esta función configura la escena 3D con un fondo, una cámara en perspectiva, y un renderizador que
 * se ajusta al tamaño de la ventana. También crea un cubo geométrico con un material básico, lo añade
 * a la escena, y posiciona la cámara para visualizar el cubo correctamente. Finalmente, inicia la
 * animación llamando a la función animar.
 *
 * @details
 * - Se crea una nueva escena y se establece un color de fondo y niebla.
 * - Se inicializa una cámara en perspectiva con un campo de visión de 75 grados.
 * - Se configura el renderizador y se añade al contenedor HTML.
 * - Se crea un cubo con geometría y material básicos, y se añade a la escena.
 * - La cámara se posiciona 5 unidades hacia atrás en el eje Z para una mejor visualización.
 * - Se inicia el bucle de animación llamando a `animar()`.
 */
function iniciar() {
    /**
     * Una escena es un contenedor que mantiene todos los objetos, luces, y cámaras que componen el entorno 3D
     */
    escena = new THREE.Scene();
    escena.background = new THREE.Color(0xe1e1e1);  // Establece el fondo gris claro
    escena.fog = new THREE.Fog(0x000000, 1, 10);  // Añade niebla a la escena

    /**
     * THREE.PerspectiveCamera(fov, aspect, near, far);
     * Se utiliza para crear una cámara en perspectiva, que es una de las formas más comunes de visualizar 
     * escenas 3D en gráficos por computadora.
     * 
     * fov: Define el campo de visión vertical de la cámara en grados (en este caso, 75 grados).
     * aspect: Establece la relación de aspecto entre el ancho y la altura de la vista (ajustado al tamaño 
     *         del canvas).
     * near: Determina la distancia mínima a la que los objetos serán visibles (0.1 unidades).
     * far: Determina la distancia máxima a la que los objetos serán visibles (1000 unidades).
     */
    camara = new THREE.PerspectiveCamera(75, 500 / 400, 0.1, 1000);

    /**
     * El renderizador utiliza la cámara que se ha definido para "ver" la escena desde un punto de vista 
     * específico. Aquí, obtenemos el canvas existente de la página.
     */
    const canvas = document.getElementById('canvas');
    renderizador = new THREE.WebGLRenderer({ canvas: canvas });
    renderizador.setSize(500, 400); // Ajusta el renderizador al tamaño del canvas

    /**
     * Crea una nueva instancia de THREE.BoxGeometry, que es una geometría 3D que define la forma de un cubo.
     * Acepta hasta 6 parámetros: width, height, depth, widthSegments, heightSegments, y depthSegments. 
     * Pero si no se pasan parámetros (como en este caso), se utilizan los valores por defecto y se crea un 
     * cubo con width, height, y depth de 1 unidad.
     */
    let geometry = new THREE.BoxGeometry();

    /**
     * Crea un nuevo material básico para mallas (MeshBasicMaterial). 
     * El objeto de configuración { color: 0xbf8bde } especifica las propiedades del material:
     * color: El color del material, definido en formato hexadecimal. En este caso, 0xbf8bde es morado.
     */
    let material = new THREE.MeshBasicMaterial({ color: 0xbf8bde });

    /**
     * Crea una nueva malla (Mesh), que es la combinación de geometría y material que define un objeto 3D 
     * en la escena.
     */
    cubo = new THREE.Mesh(geometry, material);

    /**
     * Añade el cubo a la escena, haciéndolo parte del mundo 3D que será renderizado.
     */
    escena.add(cubo);

    /**
     * Posiciona la cámara 5 unidades hacia atrás a lo largo del eje Z en el espacio 3D. Esto permite que los 
     * objetos en la escena se visualicen correctamente desde la cámara, dándoles una apariencia de profundidad 
     * y perspectiva en la escena renderizada.
     */
    camara.position.z = 5;

    // Inicia la animación
    animar();
}

/**
 * @brief Función de animación que rota el cubo y renderiza la escena.
 *
 * Esta función crea un bucle de animación que se ejecuta a la velocidad de fotogramas soportada por el 
 * navegador utilizando requestAnimationFrame. En cada cuadro, el cubo se rota ligeramente en los ejes 
 * X e Y, y luego se renderiza la escena desde la perspectiva de la cámara. Esta animación continúa 
 * indefinidamente hasta que se detenga.
 */
function animar() {
    /**
     * requestAnimationFrame es un método que le dice al navegador que queremos realizar una animación. Este 
     * método solicita que el navegador programe una repintura del contenido visual en la próxima oportunidad 
     * disponible. El argumento que se le pasa es la función animar, lo que crea un bucle de animación. Esto 
     * significa que animar() se llamará de nuevo cada vez que el navegador esté listo para renderizar el 
     * siguiente cuadro, generalmente a 60 cuadros por segundo. Esto permite crear animaciones suaves y 
     * eficientes, ya que la tasa de fotogramas se sincroniza con la frecuencia de actualización del monitor 
     * y el rendimiento del navegador.
     */
    requestAnimationFrame(animar);

    /**
     * cubo.rotation es una propiedad de tipo THREE.Vector3 que representa la rotación del objeto cubo 
     * alrededor de los ejes X, Y y Z. Cada linea incrementa el ángulo de rotación del cubo alrededor del 
     * eje correspondiente en 0.01 radianes en cada cuadro.
     */
    cubo.rotation.x += 0.01;
    cubo.rotation.y += 0.01;

    /**
     * Renderiza la escena desde la perspectiva de la cámara, actualizando lo que se muestra en la pantalla 
     * con cada nuevo cuadro de animación.
     */
    renderizador.render(escena, camara);
}

// Iniciar escena al cargar la página
window.addEventListener('load',iniciar);