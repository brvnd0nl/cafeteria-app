const items = document.querySelectorAll('.item');
const modalOverlay = document.querySelector('.modal-overlay');
const modalImg = document.querySelector('.modal-img');
const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-description');
const modalPrecio = document.querySelector('.modal-precio');
const closeModal = document.querySelector('.close-modal');
const agregarCarritoBtn = document.querySelector('.agregar-carrito');
const cantidadInput = document.getElementById('cantidad');

// Carrito de compras
let carrito = [];
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const totalInput = document.getElementById('total-input');

// Variable para guardar el producto actual
let productoActual = null;

items.forEach(item => {
  item.addEventListener('click', () => {
    const title = item.dataset.title;
    const image = item.dataset.image;
    const description = item.dataset.description;
    const precio = item.querySelector('.precio-item').dataset.valor;
    modalImg.src = image;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalPrecio.textContent = `Precio: $${precio}`;
    modalOverlay.style.display = 'block';

    // Guardar el producto actual
    productoActual = item;
  });
});

closeModal.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
  cantidadInput.value = 1; // Reiniciar el valor de cantidad a 1
});

window.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    modalOverlay.style.display = 'none';
    cantidadInput.value = 1; // Reiniciar el valor de cantidad a 1
  }
});

function agregarAlCarrito(producto, cantidad) {
  const precioItem = parseInt(producto.querySelector('.precio-item').dataset.valor);
  const itemCarrito = {
    titulo: producto.dataset.title,
    imagen: producto.dataset.image,
    cantidad: cantidad,
    precio: precioItem
  };

  const productoExistente = carrito.find(item => item.titulo === itemCarrito.titulo);
  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    carrito.push(itemCarrito);
  }

  actualizarCarrito();
  modalOverlay.style.display = 'none'; // Cerrar la ventana emergente
  cantidadInput.value = 1; // Reiniciar el valor de cantidad a 1
}

function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;
  carrito.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.cantidad} x ${item.titulo} - $${item.precio * item.cantidad}`;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });
  totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
  totalInput.value = total.toFixed(2);
}

// Agregar evento de clic al botón "Agregar al Carrito"
agregarCarritoBtn.addEventListener('click', () => {
  const cantidad = parseInt(cantidadInput.value);
  agregarAlCarrito(productoActual, cantidad);
});


// Event listener for the "Ir a Pagar" button
document.getElementById('ir-a-pagar').addEventListener('click', function(event) {
  event.preventDefault();
  
  // Serialize the carrito array into a JSON string
  const productosCarrito = carrito.map(item => `${item.cantidad} x ${item.titulo} - $${item.precio * item.cantidad}`).join('\n');
  
  // Get the total value
  const totalCarritoValue = totalInput.value;
  
  // Create a URL with the serialized carrito and total value as query parameters
  const url = `formulario.html?productosCarrito=${encodeURIComponent(productosCarrito)}&totalCarrito=${encodeURIComponent(totalCarritoValue)}`;
  
  // Redirect to the formulario.html with query parameters
  window.location.href = url;
});

