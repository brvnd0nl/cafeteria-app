// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const productosRecibidos = urlParams.get('productosCarrito');
const totalRecibido = urlParams.get('totalCarrito');

// Mostrar los productos y el total recibidos en el formulario
if (productosRecibidos && totalRecibido) {
  document.getElementById('productos-recibidos').value = productosRecibidos;
  document.getElementById('total-recibido').value = totalRecibido;
}

function validarFormulario() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var telefono = document.getElementById('telefono').value;
    var direccion = document.getElementById('direccion').value;
    var fechaEnvio = document.getElementById('fecha-envio').value;

    var telefonoValido = /^[0-9]{10}$/.test(telefono);
    var direccionValida = /^[a-zA-Z0-9\s,.'-]{3,}$/.test(direccion);

    if (!telefonoValido) {
        alert('El número de teléfono debe tener 10 dígitos.');
    }

    if (!direccionValida) {
        alert('La dirección no es válida.');
    }

    return nombre !== '' && apellido !== '' && telefonoValido && direccionValida && fechaEnvio !== '';
}

function redirigir(destino) {
    if (validarFormulario()) {
      window.location.href = destino;
    } else {
      alert('Por favor, llene todos los campos correctamente antes de proceder.');
    }
}
