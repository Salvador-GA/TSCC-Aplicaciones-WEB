/**
 * @file scripts.js
 * @brief Ejemplo de manipulación de canvas con diversas técnicas de dibujo en JavaScript.
 */

/**
 * @brief Función principal que inicia la configuración de los elementos canvas.
 *
 * Esta función se ejecuta cuando la ventana se carga y llama a las funciones específicas
 * para dibujar en cada uno de los canvas presentes en el documento.
 */
function iniciar() {
    canvasCaja1();
    canvasCaja2();
    canvasCaja3();
    canvasCaja4();
    canvasCaja5();
    canvasCaja6();
    canvasCaja7();
    window.addEventListener("mousemove", animacion);
}

/**
 * @brief Dibuja rectángulos y aplica gradientes en el primer canvas.
 *
 * Esta función dibuja varios rectángulos en un canvas, algunos con bordes y otros con relleno.
 * También aplica un gradiente de color en tres rectángulos diferentes.
 */
function canvasCaja1() {
    let elemento = document.getElementById("canvas1");
    let canvas = elemento.getContext("2d");

    canvas.strokeStyle = "#ee82ee";    /**< Color del borde de los rectángulos. */
    canvas.fillStyle = "#6b056b";      /**< Color de relleno del primer rectángulo. */
    canvas.strokeRect(10, 100, 120, 120);  /**< Dibuja un rectángulo con borde. */
    canvas.fillRect(20, 110, 100, 100);    /**< Dibuja un rectángulo con relleno. */
    canvas.clearRect(30, 120, 80, 80);     /**< Borra una parte del rectángulo anterior. */

    // Crear un gradiente y se aplica al estilo de llenado del lienzo.
    let gradiente = canvas.createLinearGradient(0, 0, 700, 300);
    gradiente.addColorStop(0.33, "#ee82ee");
    gradiente.addColorStop(0.66, "#6b056b");
    gradiente.addColorStop(1, "#000000");
    canvas.fillStyle = gradiente;
    canvas.fillRect(150, 100, 100, 100);
    canvas.fillRect(300, 100, 200, 100);
    canvas.fillRect(550, 100, 100, 100);
}

/**
 * @brief Dibuja triángulos y aplica una región de recorte en el segundo canvas.
 *
 * Esta función dibuja triángulos de diferentes tipos, algunos de los cuales están rellenos,
 * y aplica una región de recorte para mostrar solo una parte del contenido dibujado.
 */
function canvasCaja2() {
    let elemento = document.getElementById("canvas2");
    let canvas = elemento.getContext("2d");

    // Dibujar un triángulo sin cerrar el camino.
    canvas.beginPath();
    canvas.moveTo(20, 100);
    canvas.lineTo(120, 200);
    canvas.lineTo(20, 200);
    canvas.stroke();

    // Dibujar un triángulo con el camino cerrado.
    canvas.beginPath();
    canvas.moveTo(140, 100);
    canvas.lineTo(240, 200);
    canvas.lineTo(140, 200);
    canvas.closePath();
    canvas.stroke();

    // Dibujar un triángulo relleno.
    canvas.beginPath();
    canvas.moveTo(260, 100);
    canvas.lineTo(360, 200);
    canvas.lineTo(260, 200);
    canvas.fill();
    canvas.stroke();

    // Aplicar una región de recorte y dibujar líneas dentro de esa región.
    canvas.beginPath();
    canvas.moveTo(380, 100);
    canvas.lineTo(480, 200);
    canvas.lineTo(380, 200);
    canvas.clip();
    canvas.beginPath();
    for (var i = 0; i < 300; i += 5) {
        canvas.moveTo(0, i);
        canvas.lineTo(500, i);
    }
    canvas.stroke();
}

/**
 * @brief Dibuja arcos, curvas y figuras compuestas en el tercer canvas.
 *
 * Esta función dibuja círculos, arcos, curvas cuadráticas y curvas de Bézier, 
 * así como una cara simple con ojos y boca utilizando los métodos de dibujo en el canvas.
 */
function canvasCaja3() {
    let elemento = document.getElementById("canvas3");
    let canvas = elemento.getContext("2d");

    // Dibujar un círculo completo.
    canvas.beginPath();
    canvas.arc(60, 150, 50, 0, Math.PI * 2, false);
    canvas.stroke();

    // Dibujar un arco de 45 grados.
    let radianes = Math.PI / 180 * 45;
    canvas.beginPath();
    canvas.arc(180, 150, 50, 0, radianes, false);
    canvas.stroke();

    // Dibujar un arco inverso de 45 grados.
    canvas.beginPath();
    canvas.arc(300, 150, 50, 0, radianes, true);
    canvas.stroke();

    // Dibujar curvas cuadráticas y de Bézier.
    canvas.beginPath();
    canvas.moveTo(370, 50);
    canvas.quadraticCurveTo(450, 150, 370, 250);
    canvas.moveTo(500, 50);
    canvas.bezierCurveTo(450, 150, 550, 150, 500, 250);
    canvas.stroke();

    // Dibujar una cara simple.
    canvas.beginPath();
    canvas.arc(600, 150, 60, 0, Math.PI * 2, false);
    canvas.stroke();
    canvas.lineWidth = 5;
    canvas.lineCap = "round";
    canvas.beginPath();
    canvas.arc(600, 160, 30, 0, Math.PI, false);  /**< Boca. */
    canvas.stroke();
    canvas.lineWidth = 4;
    canvas.beginPath();
    canvas.arc(575, 120, 5, 0, Math.PI * 2, false);  /**< Ojo izquierdo. */
    canvas.fill();
    canvas.beginPath();
    canvas.arc(625, 120, 5, 0, Math.PI * 2, false);  /**< Ojo derecho. */
    canvas.fill();
    canvas.lineWidth = 3;
    canvas.lineJoin = "miter";
    canvas.beginPath();
    canvas.moveTo(595, 135);
    canvas.lineTo(615, 155);
    canvas.lineTo(595, 155);  /**< Nariz. */
    canvas.stroke();
}

/**
 * @brief Aplica efectos de sombra, rotación y escalado en el texto del cuarto canvas.
 *
 * Esta función dibuja texto con sombra, rota texto y aplica un escalado a un texto 
 * en el canvas para demostrar diversas transformaciones.
 */
function canvasCaja4() {
    let elemento = document.getElementById("canvas4");
    let canvas = elemento.getContext("2d");

    // Aplicar sombra al texto.
    canvas.shadowColor = "rgba(153, 50, 204, 0.5)";
    canvas.shadowOffsetX = 6;
    canvas.shadowOffsetY = 6;
    canvas.shadowBlur = 5;
    canvas.font = "bold 60px verdana, sans-serif";
    canvas.textAlign = "start";
    canvas.textBaseline = "bottom";
    canvas.fillText("Hola mundo", 50, 70);

    // Dibujar texto rotado y escalado.
    canvas.font = "bold 20px verdana, sans-serif";
    canvas.fillText("ROTAR", 100, 120);
    //La traslación se hace sobre el lienzo, el lienzo es el que se mueve
    canvas.translate(150, 140);
    //La rotación se hace sobre el lienzo, el lienzo es el que gira
    canvas.rotate(Math.PI / 180 * 45);
    canvas.fillText("ROTAR", 0, 0);
    canvas.rotate(-Math.PI / 180 * 45);
    canvas.translate(0, 140);
    //La escala se hace sobre el lienzo, el lienzo es el que se incrementa
    canvas.scale(2, 2); /**< Escala ancho y alto (1=100%, 0.5=50%, 2=200%) */
    canvas.fillText("ESCALA", 0, 0);
}

/**
 * @brief Dibuja en varios elementos canvas utilizando diferentes modos de composición global.
 *
 * Esta función llama a varias funciones individuales que dibujan en distintos canvas,
 * aplicando diferentes modos de composición global (globalCompositeOperation) para
 * mostrar cómo cada modo afecta la superposición de formas.
 */
function canvasCaja5() {
    canvasCaja5_1();
    canvasCaja5_2();
    canvasCaja5_3();
    canvasCaja5_4();
    canvasCaja5_5();
    canvasCaja5_6();
    canvasCaja5_7();
    canvasCaja5_8();
    canvasCaja5_9();
    canvasCaja5_10();
    canvasCaja5_11();
}

/**
 * @brief Dibuja un cuadrado y un círculo en un canvas utilizando el modo 'source-in'.
 *
 * El cuadrado se dibuja primero, y luego se aplica el modo de composición global
 * `source-in` para dibujar el círculo, lo que mantiene solo la intersección de ambas formas.
 */
function canvasCaja5_1() {
    let elemento = document.getElementById("canvas5.1");
    let canvas = elemento.getContext("2d");

    canvas.fillStyle = '#ee82ee';
    canvas.fillRect(10, 10, 50, 50);
    canvas.globalCompositeOperation = 'source-in';
    canvas.beginPath();
    canvas.fillStyle = '#6b056b';
    canvas.arc(50, 50, 30, 0, 2 * Math.PI);
    canvas.fill();
}

/**
 * @brief Dibuja un cuadrado y un círculo en un canvas utilizando el modo 'source-out'.
 *
 * El cuadrado se dibuja primero, y luego se aplica el modo de composición global
 * `source-out` para dibujar el círculo, lo que mantiene solo las partes del círculo
 * que no se superponen con el cuadrado.
 */
function canvasCaja5_2() {
    let elemento = document.getElementById("canvas5.2");
    let canvas = elemento.getContext("2d");

    canvas.fillStyle = '#ee82ee';
    canvas.fillRect(10, 10, 50, 50);
    canvas.globalCompositeOperation = 'source-out';
    canvas.beginPath();
    canvas.fillStyle = '#6b056b';
    canvas.arc(50, 50, 30, 0, 2 * Math.PI);
    canvas.fill();
}

/**
 * @brief Dibuja un cuadrado y un círculo en un canvas utilizando el modo 'source-atop'.
 *
 * El cuadrado se dibuja primero, y luego se aplica el modo de composición global
 * `source-atop` para dibujar el círculo, lo que mantiene solo la parte del círculo
 * que se superpone con el cuadrado.
 */
function canvasCaja5_3() {
    let elemento = document.getElementById("canvas5.3");
    let canvas = elemento.getContext("2d");

    canvas.fillStyle = '#ee82ee';
    canvas.fillRect(10, 10, 50, 50);
    canvas.globalCompositeOperation = 'source-atop';
    canvas.beginPath();
    canvas.fillStyle = '#6b056b';
    canvas.arc(50, 50, 30, 0, 2 * Math.PI);
    canvas.fill();
}

/**
 * @brief Dibuja un cuadrado y un círculo en un canvas utilizando el modo 'lighter'.
 *
 * El cuadrado se dibuja primero, y luego se aplica el modo de composición global
 * `lighter` para dibujar el círculo, lo que suma los valores de color de ambas formas.
 */
function canvasCaja5_4() {
    let elemento = document.getElementById("canvas5.4");
    let canvas = elemento.getContext("2d");

    canvas.fillStyle = '#ee82ee';
    canvas.fillRect(10, 10, 50, 50);
    canvas.globalCompositeOperation = 'lighter';
    canvas.beginPath();
    canvas.fillStyle = '#6b556b';
    canvas.arc(50, 50, 30, 0, 2 * Math.PI);
    canvas.fill();
}

/**
 * @brief Dibuja un cuadrado y un círculo en un canvas utilizando el modo 'xor'.
 *
 * El cuadrado se dibuja primero, y luego se aplica el modo de composición global
 * `xor` para dibujar el círculo, lo que mantiene las partes no superpuestas de ambas formas.
 */
function canvasCaja5_5() {
    let elemento = document.getElementById("canvas5.5");
    let canvas = elemento.getContext("2d");

    canvas.fillStyle = '#ee82ee';
    canvas.fillRect(10, 10, 50, 50);
    canvas.globalCompositeOperation = 'xor';
    canvas.beginPath();
    canvas.fillStyle = '#6b056b';
    canvas.arc(50, 50, 30, 0, 2 * Math.PI);
    canvas.fill();
}

/**
 * @brief Dibuja un cuadrado y un círculo en un canvas utilizando el modo 'destination-over'.
 *
 * El círculo se dibuja primero con el modo de composición global `destination-over`,
 * lo que hace que el cuadrado se dibuje sobre el círculo, dejando el círculo visible
 * solo donde no se superpone con el cuadrado.
 */
function canvasCaja5_6() {
    let elemento = document.getElementById("canvas5.6");
    let canvas = elemento.getContext("2d");

    canvas.fillStyle = '#ee82ee';
    canvas.fillRect(10, 10, 50, 50);
    canvas.globalCompositeOperation = 'destination-over';
    canvas.beginPath();
    canvas.fillStyle = '#6b056b';
    canvas.arc(50, 50, 30, 0, 2 * Math.PI);
    canvas.fill();
}

/**
 * @brief Dibuja un cuadrado y un círculo en un canvas utilizando el modo 'destination-in'.
 *
 * El círculo se dibuja primero con el modo de composición global `destination-in`,
 * lo que hace que se mantenga visible solo la intersección entre el cuadrado y el círculo.
 */
function canvasCaja5_7() {
    let elemento = document.getElementById("canvas5.7");
    let canvas = elemento.getContext("2d");

    canvas.fillStyle = '#ee82ee';
    canvas.fillRect(10, 10, 50, 50);
    canvas.globalCompositeOperation = 'destination-in';
    canvas.beginPath();
    canvas.fillStyle = '#6b056b';
    canvas.arc(50, 50, 30, 0, 2 * Math.PI);
    canvas.fill();
}

/**
 * @brief Dibuja un cuadrado y un círculo en un canvas utilizando el modo 'destination-out'.
 *
 * El círculo se dibuja primero con el modo de composición global `destination-out`,
 * lo que hace que se eliminen las partes del cuadrado que se superponen con el círculo.
 */
function canvasCaja5_8() {
    let elemento = document.getElementById("canvas5.8");
    let canvas = elemento.getContext("2d");

    canvas.fillStyle = '#ee82ee';
    canvas.fillRect(10, 10, 50, 50);
    canvas.globalCompositeOperation = 'destination-out';
    canvas.beginPath();
    canvas.fillStyle = '#6b056b';
    canvas.arc(50, 50, 30, 0, 2 * Math.PI);
    canvas.fill();
}

/**
 * @brief Dibuja un cuadrado y un círculo en un canvas utilizando el modo 'destination-atop'.
 *
 * El círculo se dibuja primero con el modo de composición global `destination-atop`,
 * lo que hace que se mantenga visible solo la parte del cuadrado que se superpone con el círculo.
 */
function canvasCaja5_9() {
    let elemento = document.getElementById("canvas5.9");
    let canvas = elemento.getContext("2d");

    canvas.fillStyle = '#ee82ee';
    canvas.fillRect(10, 10, 50, 50);
    canvas.globalCompositeOperation = 'destination-atop';
    canvas.beginPath();
    canvas.fillStyle = '#6b056b';
    canvas.arc(50, 50, 30, 0, 2 * Math.PI);
    canvas.fill();
}

/**
 * @brief Dibuja un cuadrado y un círculo en un canvas utilizando el modo 'darker'.
 *
 * El cuadrado se dibuja primero, y luego se aplica el modo de composición global
 * `darker` para dibujar el círculo, lo que oscurece las partes superpuestas de ambas formas.
 */
function canvasCaja5_10() {
    let elemento = document.getElementById("canvas5.10");
    let canvas = elemento.getContext("2d");

    canvas.fillStyle = '#ee82ee';
    canvas.fillRect(10, 10, 50, 50);
    canvas.globalCompositeOperation = 'darker';
    canvas.beginPath();
    canvas.fillStyle = '#6b056b';
    canvas.arc(50, 50, 30, 0, 2 * Math.PI);
    canvas.fill();
}

/**
 * @brief Dibuja un cuadrado y un círculo en un canvas utilizando el modo 'copy'.
 *
 * El cuadrado se dibuja primero, y luego se aplica el modo de composición global
 * `copy` para dibujar el círculo, lo que reemplaza completamente el cuadrado con el círculo.
 */
function canvasCaja5_11() {
    let elemento = document.getElementById("canvas5.11");
    let canvas = elemento.getContext("2d");

    canvas.fillStyle = '#ee82ee';
    canvas.fillRect(10, 10, 50, 50);
    canvas.globalCompositeOperation = 'copy';
    canvas.beginPath();
    canvas.fillStyle = '#6b056b';
    canvas.arc(50, 50, 30, 0, 2 * Math.PI);
    canvas.fill();
}

/**
 * @brief Demuestra el uso de las funciones `save` y `restore` del canvas.
 *
 * Esta función dibuja un texto en un canvas utilizando una traducción del contexto
 * y la guarda con `save`. Luego, se restaura el contexto original y se dibuja un segundo
 * texto sin la traducción aplicada.
 */
function canvasCaja6() {
    let elemento = document.getElementById("canvas6");
    let canvas = elemento.getContext("2d");

    canvas.save();
    canvas.translate(50, 70);
    canvas.font = "bold 20px verdana, sans-serif";
    canvas.fillText("PRUEBA1", 10, 30);
    canvas.restore();
    canvas.fillText("PRUEBA2", 10, 30);
}

/**
 * @brief Dibuja dos imágenes en un canvas, ajustando su tamaño y posición.
 *
 * Esta función carga dos imágenes y las dibuja en un canvas. La primera imagen
 * se dibuja en una posición y tamaño especificados, mientras que la segunda imagen
 * se dibuja con un recorte específico y se ajusta al tamaño y posición del canvas.
 */
function canvasCaja7() {
    let elemento = document.getElementById("canvas7");
    let canvas = elemento.getContext("2d");

    let imagen = document.createElement("img");
    imagen.src = "imagenes/luna-llena.png";
    /** 
     * Dibuja la primera imagen una vez que se ha cargado.
     * El lienzo solo puede recibir imágenes que ya se han descargado,
     * necesitamos controlar esta situación con el evento `load`.
     */
    imagen.addEventListener("load", function() {
        canvas.drawImage(imagen, 20, 20, 200, 200);
    });

    let imagen2 = document.createElement("img");
    imagen2.src = "imagenes/desarrollador.png";
    /**
     * Dibuja la segunda imagen una vez que se ha cargado, aplicando un recorte y ajustando su tamaño.
     */
    imagen2.addEventListener("load", function() {
        // canvas.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
        canvas.drawImage(imagen2, 65, 35, 250, 250, 300, 20, 200, 200);
    });
}


/**
 * @brief Dibuja una animación en un canvas en respuesta al movimiento del ratón.
 *
 * Esta función se ejecuta cuando ocurre un evento de movimiento del ratón. Dibuja
 * dos círculos fijos en un canvas y otros dos círculos pequeños que siguen la posición
 * del ratón con un ligero desfase, creando un efecto de animación.
 *
 * @param {MouseEvent} evento - El evento del ratón que contiene la posición actual del cursor.
 */
function animacion(evento) {
    // Obtiene el elemento canvas y su contexto 2D
    let elemento = document.getElementById("canvas8");
    canvas = elemento.getContext("2d");

    // Limpia el área del canvas para redibujar
    canvas.clearRect(0, 0, 500, 300);

    // Obtiene la posición del canvas en relación con la ventana del navegador
    let rect = elemento.getBoundingClientRect();

    // Ajusta las coordenadas del ratón en relación con la posición del canvas
    let xraton = evento.clientX - rect.left;
    let yraton = evento.clientY - rect.top;

    // Define las coordenadas del centro de los círculos fijos
    let xcentro = 220;
    let ycentro = 150;

    // Calcula el ángulo en relación al centro del círculo fijo y la posición del ratón
    let ang = Math.atan2(xraton - xcentro, yraton - ycentro);

    // Calcula las coordenadas del punto de animación basadas en el ángulo
    let x = xcentro + Math.round(Math.sin(ang) * 10);
    let y = ycentro + Math.round(Math.cos(ang) * 10);

    /**
     * Ejemplo:
     * Si el ratón está en la posición (250, 180) y el centro del círculo está en (220, 150):
     * 
     * Diferencias:
     * dx = 250 - 220 = 30
     * dy = 180 - 150 = 30
     * 
     * Ángulo: ang = Math.atan2(30, 30) ≈ 0.785 radianes (45 grados).
     * 
     * Coordenadas del Círculo Interno:
     * 
     * x = 220 + Math.sin(0.785) * 10 ≈ 220 + 7 ≈ 227
     * y = 150 + Math.cos(0.785) * 10 ≈ 150 + 7 ≈ 157
     * 
     * El círculo interno se dibujará en (227, 157).
     */

    // Dibuja los círculos fijos en el canvas
    canvas.beginPath();
    canvas.arc(xcentro, ycentro, 20, 0, Math.PI * 2, false);  /**< Dibuja el primer círculo fijo. */
    canvas.moveTo(xcentro + 70, 150);
    canvas.arc(xcentro + 50, ycentro, 20, 0, Math.PI * 2, false);  /**< Dibuja el segundo círculo fijo. */
    canvas.stroke();

    // Dibuja los círculos pequeños que siguen la posición del ratón
    canvas.beginPath();
    canvas.arc(x, y, 10, 0, Math.PI * 2, false);  /**< Dibuja el primer círculo animado. */
    canvas.arc(x + 50, y, 10, 0, Math.PI * 2, false);  /**< Dibuja el segundo círculo animado. */
    canvas.fill();
}


/**
 * @brief Añade un listener al evento `load` de la ventana para iniciar el dibujo en los canvas.
 *
 * Esta función se ejecuta cuando la página se ha cargado completamente,
 * llamando a la función `iniciar` para comenzar a dibujar en los canvas.
 */
window.addEventListener("load", iniciar);
