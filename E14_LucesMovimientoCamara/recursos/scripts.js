var escena, camara, renderizador, cubo;
var isMouseDown = false; // Variable para controlar si el botón del mouse está presionado
var lastMouseX = 0, lastMouseY = 0; // Para almacenar la última posición del mouse

/**
 * @brief Configura e inicializa la escena 3D, la cámara, el renderizador, y los objetos básicos.
 *
 * Esta función configura la escena 3D con un fondo, una cámara en perspectiva, y un renderizador.
 * También crea un cubo geométrico con un material Phong, lo añade a la escena, y posiciona la cámara
 * para visualizar el cubo correctamente. Finalmente, agrega listeners para el movimiento del mouse,
 * el clic y la rueda para interactuar con la cámara.
 *
 * @details
 * - Se crea una nueva escena y se establece un color de fondo.
 * - Se inicializa una cámara en perspectiva con un campo de visión de 75 grados.
 * - Se configura el renderizador y se añade al contenedor HTML.
 * - Se crea un cubo con geometría básica y un material Phong, y se añade a la escena.
 * - La cámara se coloca en la posición (1, 1, 5) y se orienta para que mire al origen.
 * - Se añade una luz direccional a la escena.
 * - Se agregan listeners para el movimiento del mouse, el clic y la rueda.
 */
function iniciar() {
    /**
     * Una escena es un contenedor que mantiene todos los objetos, luces, y cámaras que componen el entorno 3D
     */
    escena = new THREE.Scene();
    escena.background = new THREE.Color(0xe1e1e1);  // Establece el fondo gris claro

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

    let loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    /** 
     * La función load para la textira es asincrona, por lo que el renderizado de la imagen puede realizarse
     * antes que la textura termine de cargarse, y solo hasta que movemos la camara y se tiene que volver a 
     * reenderizar la imagen entonces se mostrará la textura correctamente. Este problema no existiría si la 
     * biblioteca estuviera ejecutandose de manera local. Para solucionar este problema con la forma en que
     * lo estamos manejando, con origen cruzado, entonces se debería escribir el resto de la función como en
     * la función iniciarAlt()
     */
    let textura = loader.load('imagenes/textura.jpg');
    textura.needsUpdate = true;
    /**
     * Crea un nuevo material Phong para mallas (MeshPhongMaterial), que responde a la luz.
     * El objeto de configuración especifica las propiedades del material:
     * color: Define el color base del material. Un color gris claro (0xaaaaaa) es una buena base para un 
     * material metálico.
     * specular: Define el color del reflejo especular. Para un efecto metálico, suele ser blanco (0xffffff) 
     * o un tono más brillante.
     * shininess: Controla el brillo del reflejo especular. Un valor alto (por ejemplo, 100) hará que el 
     * material se vea más brillante y metálico.
     * metalness: Aunque MeshPhongMaterial no tiene un parámetro directo llamado metalness, puedes simular un 
     * efecto metálico aumentando el shininess y asegurándote de que el specular sea un color brillante.
     * reflectivity: Controla cuán reflectante es la superficie del material. Para un aspecto metálico, este 
     * valor debería estar cerca de 1.0.
     */
    let material = new THREE.MeshPhongMaterial({
        map: textura,              // Textura del material
        color: 0xbf8bde,           // Color base del material
        specular: 0xffffff,        // Color del reflejo especular (luz)
        shininess: 100,            // Brillo especular (cuanto más brillante más metálico se verá)
        reflectivity: 1.0          // Grado de reflectividad (esto depende más del entorno reflejado)
    });

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
     * Esta línea coloca la cámara en la posición (1, 1, 5) en el espacio 3D. Esto significa que la cámara 
     * se encuentra a 1 unidad en el eje X, 1 unidades en el eje Y, y 5 unidades en el eje Z. Desde esta 
     * posición, la cámara tiene una vista diagonal hacia el origen, lo que permite visualizar todos los 
     * ejes claramente.
     */
    camara.position.set(1, 1, 5);
    /**
     * Orienta la cámara para que mire directamente hacia el origen (0, 0, 0), que es donde los tres ejes 
     * se encuentran. Esto asegura que la cámara esté enfocada en el punto donde los ejes X, Y y Z se cruzan.
     */
    camara.lookAt(0, 0, 0);

    /**
     * Añadimos AxesHelper a la escena para visualizar los ejes, el argumento 5 es el tamaño del helper en 
     * unidades del espacio 3D.
     * 
     * Eje X: Representado en rojo.
     * Eje Y: Representado en verde.
     * Eje Z: Representado en azul.
     */
    const axesHelper = new THREE.AxesHelper(5);
    escena.add(axesHelper);

    /**
     * Añadimos una luz direccional que ilumina la escena desde una dirección específica.
     * color: El color de la luz, definido en formato hexadecimal. En este caso, es blanco.
     * position: Establece la posición de la luz en el espacio 3D.
     */
    const luz = new THREE.DirectionalLight(0xffffff, 1);
    luz.position.set(2, 2, 5);
    escena.add(luz);

    /**
     * Listeners para controlar la interacción con la cámara y el zoom con el mouse.
     */
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("wheel", onMouseWheel);

    // Renderiza la escena inicial
    renderizador.render(escena, camara);
}

function iniciarAlt() {
    // Crear la escena
    escena = new THREE.Scene();
    escena.background = new THREE.Color(0xe1e1e1);

    // Configurar la cámara
    camara = new THREE.PerspectiveCamera(75, 500 / 400, 0.1, 1000);

    // Configurar el renderizador
    const canvas = document.getElementById('canvas');
    renderizador = new THREE.WebGLRenderer({ canvas: canvas });
    renderizador.setSize(500, 400);

    // Crear la geometría del cubo
    let geometry = new THREE.BoxGeometry();

    // Cargar la textura de manera asíncrona
    let loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load('imagenes/textura.jpg', function(textura) {
        // Crear el material con la textura cargada
        let material = new THREE.MeshPhongMaterial({
            map: textura,
            color: 0xbf8bde,
            specular: 0xffffff,
            shininess: 100,
            reflectivity: 1.0
        });

        // Crear el cubo con la geometría y el material
        cubo = new THREE.Mesh(geometry, material);
        escena.add(cubo);  // Añadir el cubo a la escena

        // Posicionar la cámara
        camara.position.set(1, 1, 5);
        camara.lookAt(0, 0, 0);

        // Añadir luz a la escena
        const luz = new THREE.DirectionalLight(0xffffff, 1);
        luz.position.set(2, 2, 5);
        escena.add(luz);

        // Añadir AxesHelper
        const axesHelper = new THREE.AxesHelper(5);
        escena.add(axesHelper);

        // Renderizar la escena inicial
        renderizador.render(escena, camara);

        // Agregar listeners para la interacción del mouse
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("wheel", onMouseWheel);
    });
}

/**
 * @brief Función para detectar cuando se presiona el botón del mouse.
 *
 * Establece `isMouseDown` a `true` cuando se presiona el botón del mouse, lo que permite que 
 * la cámara se mueva al arrastrar el mouse.
 */
function onMouseDown(evento) {
    isMouseDown = true;
    lastMouseX = evento.pageX;
    lastMouseY = evento.pageY;
}

/**
 * @brief Función para detectar cuando se suelta el botón del mouse.
 *
 * Establece `isMouseDown` a `false` cuando se suelta el botón del mouse, deteniendo el 
 * movimiento de la cámara.
 */
function onMouseUp(evento) {
    isMouseDown = false;
}

/**
 * @brief Función para mover la cámara al arrastrar el mouse.
 *
 * Si `isMouseDown` es `true`, la cámara se rota alrededor del cubo en función del movimiento 
 * del mouse. El ángulo de rotación se calcula según la diferencia entre la posición actual y 
 * la última posición del mouse.
 */
function onMouseMove(evento) {
    if (!isMouseDown) return;

    let deltaX = evento.pageX - lastMouseX;
    let deltaY = evento.pageY - lastMouseY;

    camara.position.x -= deltaX * 0.01;
    camara.position.y += deltaY * 0.01;
    camara.lookAt(cubo.position);

    lastMouseX = evento.pageX;
    lastMouseY = evento.pageY;

    renderizador.render(escena, camara);
}

/**
 * @brief Función para hacer zoom in y zoom out con la rueda del mouse.
 *
 * Acerca o aleja la cámara en la dirección del cubo en función del movimiento de la rueda del mouse.
 * El zoom tiene un límite mínimo y máximo, y el movimiento se suaviza con un factor de escala.
 */
function onMouseWheel(evento) {
    // Factor de escala para suavizar el movimiento del zoom
    const zoomFactor = 0.01;

    // Calcula la dirección del cubo desde la cámara
    let direction = new THREE.Vector3();
    camara.getWorldDirection(direction);

    // Ajusta la posición de la cámara en la dirección del cubo
    camara.position.addScaledVector(direction, evento.deltaY * zoomFactor);

    // Limita la distancia de la cámara al cubo
    let distance = camara.position.length();
    if (distance < 2) {
        camara.position.setLength(2);
    } else if (distance > 10) {
        camara.position.setLength(10);
    }

    // Vuelve a apuntar la cámara hacia el cubo después del zoom
    camara.lookAt(cubo.position);

    renderizador.render(escena, camara);
}


// Iniciar escena al cargar la página
window.addEventListener('load', iniciar);
