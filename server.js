const express = require('express');
const mysql = require('mysql2');
const path = require('path'); // Necesario para manejar rutas

const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json()); // Middleware para parsear JSON

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'probador'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname))); // Sirve los archivos en el mismo directorio

// Ruta para obtener productos
app.get('/api/productos', (req, res) => {
    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result); // Responder con los datos en formato JSON
    });
});

// Ruta para agregar un nuevo producto (POST)
app.post('/api/productos', (req, res) => {
    const { nombre, precio, cantidad } = req.body; // Obtener datos del cuerpo de la solicitud
    const sql = 'INSERT INTO productos (nombre, precio, cantidad) VALUES (?, ?, ?)';
    db.query(sql, [nombre, precio, cantidad], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, nombre, precio, cantidad }); // Responder con el nuevo producto
    });
});

// Ruta para eliminar un producto (DELETE)
app.delete('/api/productos/:id', (req, res) => {
    const sql = 'DELETE FROM productos WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.status(204).send(); // Responder sin contenido
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
