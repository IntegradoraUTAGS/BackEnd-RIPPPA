const express = require('express');
const app = express();

//importar rutas

app.use(require('./login'));
app.use(require('./administrador'))
app.use(require('./direccion'));
app.use(require('./statusConvocatoria'));

module.exports = app;