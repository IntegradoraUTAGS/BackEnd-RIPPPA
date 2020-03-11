const express = require('express');
const app = express();

//importar rutas

app.use(require('./login'));
app.use('/administrador', require('./administrador'))
app.use('/direccion', require('./direccion'));
app.use('/statusConvocatoria', require('./statusConvocatoria'));
app.use('/menu', require('./menu'));
app.use('/periodo', require('./periodo'));
app.use('/academias', require('./academias'))
app.use('/licenciatura', require('./licenciatura'));
app.use('/rol', require('./rol'));

module.exports = app;