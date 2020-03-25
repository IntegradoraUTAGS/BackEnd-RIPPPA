const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Direccion = require('./direccion');
const Academia = require('./academia');
const Profesor = require('./profesor');
const Administrador = require('./administrador');
const Status = require('./statusConvocatoria');
const Periodo = require('./periodo');
const Comentario = require('./comentario');

let Schema = mongoose.Schema;

let convocatoriaSchema = new Schema({

    idDireccion: {
        type: Schema.Types.ObjectId,
        ref: 'Direccion',
        required: [true, 'Ingresar el id de la dirección']
    },
    idAcademia: {
        type: Schema.Types.ObjectId,
        ref: 'Academia',
        required: [true, 'Ingresar el id de la academia']
    },
    dateFecha: {
        type: Date,
        default: Date.now()
    },
    idPeriodo: {
        type: Schema.Types.ObjectId,
        ref: 'Periodo',
        required: [true, 'Ingresar el id del periodo']
    },
    dateFechaDebeCubrirse: {
        type: Date,
        required: [true, 'Favor de ingresar la fecha en la que debe de crubirse la vacante']
    },
    strTurno: {
        type: String,
        required: [true, 'Favor de ingresar el turno']
    },
    numHoras: {
        type: Number,
        required: [true, 'Favor de ingresar las horas a realizar']
    },
    idComentario: [{
        type: Schema.Types.ObjectId,
        ref: 'Comentario'
    }]

});

convocatoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Convocatoria', convocatoriaSchema);

