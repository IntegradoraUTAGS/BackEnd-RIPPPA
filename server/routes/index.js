const express = require('express');
const app = express();

//importación de rutas 

app.use('/administrador', require('./administrador/administrador'));
app.use('/direccion', require('./direccion/direccion'));
app.use('/statusConvocatoria', require('./statusConvocatoria/statusConvocatoria'));
app.use('/menu', require('./menu/menu'));
app.use('/periodo', require('./periodo/periodo'));
app.use('/academias', require('./academias/academias'));
app.use('/rol', require('./rol/rol'));
app.use('/comentario', require('./comentario/comentario'));
app.use('/convocatoria', require('./convocatoria/convocatoria'));
app.use('/perfil', require('./perfiles/perfil'));


module.exports = app;