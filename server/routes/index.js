const express = require('express');
const app = express();

//importar rutas

app.use(require('./login'));
app.use(require('./administrador'))
app.use(require('./direccion'));
app.use(require('./statusConvocatoria'));
app.use(require('./menu'));
app.use(require('./periodo'));
app.use(require('./academias'))
app.use(require('./licenciatura'));
app.use(require('./rol'));

module.exports = app;