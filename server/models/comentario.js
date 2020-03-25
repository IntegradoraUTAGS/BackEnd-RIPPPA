const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Administrador = require('./administrador');
const Profesor = require('./profesor');

let Schema = mongoose.Schema;

let comentarioSchema = new Schema({
    strComentario: {
        type: String
    },
    idAdministrador: {
        type: Schema.Types.ObjectId,
        ref: 'Administrador'
    },
    idProfesor: {
        type: Schema.Types.ObjectId,
        ref: 'Profesor'
    },
    blnEstado: {
        type: Boolean,
        default: true
    }
});

comentarioSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Comentario', comentarioSchema);