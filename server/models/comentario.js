const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Administrador = require('./administrador');
const Profesor = require('./profesor');

let Schema = mongoose.Schema;

let ComentarioSchema = new Schema({
    strComentario: {
        type: String
    }
});

ComentarioSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Comentario', ComentarioSchema);