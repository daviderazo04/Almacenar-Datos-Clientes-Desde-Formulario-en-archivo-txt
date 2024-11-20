// Programación js del lado del servidor

// Programación JS del lado del servidor

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde una carpeta específica
app.use(express.static(path.join(__dirname, 'public')));

// Manejo de la solicitud POST
app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    // Validación básica de los campos
    if (!name || !email) {
        return res.status(400).send({ message: 'Name and email are required' });
    }

    const data = `Name: ${name}, Email: ${email}\n`;

    // Escribir datos en el archivo
    fs.appendFile('submissions.txt', data, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: 'Failed to write to file' });
        }
        res.send({ message: 'Data written to file successfully' });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
