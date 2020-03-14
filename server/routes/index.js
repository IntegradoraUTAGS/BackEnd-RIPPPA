const express = require('express');
const app = express();

//importar rutas

app.use('/administrador', require('./administrador/administrador'))
app.use('/direccion', require('./direccion/direccion'));
app.use('/statusConvocatoria', require('./statusConvocatoria/statusConvocatoria'));
app.use('/menu', require('./menu/menu'));
app.use('/periodo', require('./periodo/periodo'));
app.use('/academias', require('./academias/academias'));
app.use('/licenciatura', require('./licenciatura/licenciatura'));
app.use('/rol', require('./rol/rol'));
app.use('/comentario', require('./comentario/comentario'));

module.exports = app;