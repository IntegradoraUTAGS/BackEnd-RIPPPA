const express = require('express');
const app = express();

//importar rutas
app.use(require('./login'));

module.exports = app;