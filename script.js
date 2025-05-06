// Hacer una solicitud GET a la API
fetch('http://localhost:3000/api/productos')
    .then(response => response.json())
    .then(data => {
        // Seleccionar la tabla donde se mostrarán los productos
        const tableBody = document.querySelector('#productos tbody');
        // Vaciar el contenido anterior (si lo hubiera)
        tableBody.innerHTML = '';

        // Recorrer los productos recibidos y agregarlos a la tabla
        data.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.cantidad}</td>
                <td><button onclick="deleteProduct(${producto.id})">Eliminar</button></td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error:', error));

// Función para agregar un nuevo producto
function addProduct() {
    const nombre = document.querySelector('#nombre').value;
    const precio = document.querySelector('#precio').value;
    const cantidad = document.querySelector('#cantidad').value;

    fetch('http://localhost:3000/api/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, precio, cantidad }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto agregado:', data);
        loadProducts(); // Recargar los productos después de agregar uno nuevo
    })
    .catch(error => console.error('Error:', error));
}

// Función para eliminar un producto
function deleteProduct(id) {
    fetch(`http://localhost:3000/api/productos/${id}`, {
        method: 'DELETE',
    })
    .then(() => {
        console.log('Producto eliminado');
        loadProducts(); // Recargar los productos después de eliminar uno
    })
    .catch(error => console.error('Error:', error));
}

// Cargar los productos al inicio
function loadProducts() {
    fetch('http://localhost:3000/api/productos')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#productos tbody');
            tableBody.innerHTML = '';
            data.forEach(producto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.cantidad}</td>
                    <td><button onclick="deleteProduct(${producto.id})">Eliminar</button></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Agregar un listener al formulario para agregar productos
document.querySelector('#addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addProduct();
});
