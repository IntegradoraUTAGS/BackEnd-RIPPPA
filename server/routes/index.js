const express = require('express');
const app = express();

//importar rutas
app.use(require('./login'));
app.use(require('./administrador'));

module.exports = app;