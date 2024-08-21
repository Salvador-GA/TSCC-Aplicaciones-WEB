/*
    var alcance global, se puede modificar
    let alcance de bloque, se puede modificar
    const alcance de bloque, no se puede modificar
*/

// Definición de la clase Usuario
class Usuario {
    /* Constructor de la calse */
    constructor(nombre, fechaNacimiento, email) {
        this.nombre = nombre;
        /*this.fechaNacimiento = new Date(fechaNacimiento); posible error de fecha por zonas horarias*/
        const [year, month, day] = fechaNacimiento.split('-');
        this.fechaNacimiento = new Date(year, month - 1, day);
        this.email = email;
        this.edad = this.calcularEdad();
    }

    // Método para calcular la edad a partir de la fecha de nacimiento 
    calcularEdad() {
        const hoy = new Date();
        let edad = hoy.getFullYear() - this.fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - this.fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < this.fechaNacimiento.getDate())) {
            edad--;
        }
        return edad;
    }

    // Método para mostrar información del usuario, regresa una cadena con la información de la clase 
    mostrarInfo() {
        const dia = String(this.fechaNacimiento.getDate()).padStart(2, '0');
        const mes = String(this.fechaNacimiento.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexed
        const año = this.fechaNacimiento.getFullYear();
        /*return `Nombre: ${this.nombre}
                Fecha de nacimiento: ${this.fechaNacimiento.toUTCString()}
                Edad: ${this.edad}
                Email: ${this.email}`;*/
        return `( ${this.nombre}, 
                  ${dia}/${mes}/${año}, 
                  ${this.edad}, 
                  ${this.email} )`;
    }
}

// Array para almacenar los usuarios creados
let usuarios = [];

// Función para validar el formato del correo electrónico
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para crear un nuevo usuario
function crearUsuario() {
    // Obtener valores de los campos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const fechaNacimiento = document.getElementById('fechaNacimiento').value.trim();
    const email = document.getElementById('email').value.trim();

    // Validar que todos los campos tengan información
    if (nombre === '' || fechaNacimiento === '' || email === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    // Validar el formato del correo electrónico
    if (!validarEmail(email)) {
        alert('Por favor ingresa un correo electrónico válido.');
        return;
    }

    // Crear un nuevo objeto Usuario
    const nuevoUsuario = new Usuario(nombre, fechaNacimiento, email);

    // Agregar el usuario al array
    usuarios.push(nuevoUsuario);

    // Actualizar la lista de usuarios en la página
    actualizarListaUsuarios();

    // Limpiar el formulario
    document.getElementById('usuariosForm').reset();
}

// Función para actualizar la lista de usuarios en la página
function actualizarListaUsuarios() {
    const userList = document.getElementById('listaUsuarios');
    userList.innerHTML = ''; // Limpiar la lista actual

    // Recorrer el array de usuarios y agregar cada uno a la lista
    usuarios.forEach((usuario, index) => {
        const li = document.createElement('li');
        li.textContent = usuario.mostrarInfo();

        // Agregar un botón para eliminar el usuario
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.style.marginLeft = '10px';
        deleteButton.onclick = () => eliminarUsuario(index);
        
        /* La función appendChild() se utiliza para añadir un nodo (elemento) como el último hijo 
           de un elemento padre en el DOM (Document Object Model). */
        li.appendChild(deleteButton);
        userList.appendChild(li);
    });
}

// Función para eliminar un usuario
function eliminarUsuario(index) {
    // Eliminar el usuario del array
    usuarios.splice(index, 1);

    // Actualizar la lista de usuarios en la página
    actualizarListaUsuarios();
}