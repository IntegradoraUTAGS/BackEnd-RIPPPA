const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Conocimiento = require('./conocimientos');
const Maestria = require('./maestria');
const Licenciatura = require('./licenciatura');

let Schema = mongoose.Schema;

let RequisitoIndispensableSchema = new Schema({

    arrLicenciatura: [{
        type: Schema.Types.ObjectId,
        ref: 'Licenciatura',
        required: [true, 'Ingresar el id de la licenciatura']
    }],

    arrMaestria: [{
        type: Schema.Types.ObjectId,
        ref: 'Maestria',
        required: [true, 'Ingresar el id de la licenciatura']
    }],

    arrConocimientos: [{
        type: Schema.Types.ObjectId,
        ref: 'Conocimiento',
        required: [true, 'Ingresar el id del Conocimiento']
    }],

    numExpProfesional: {
        type: Number,
        required: [true, 'Favor de ingresar experiencia profesional']
    },

    numExpDocentePrevia: {
        type: Number,
        required: [true, 'Favor de ingresar la experiencia profesional']
    }
});

RequisitoIndispensableSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('RequisitoIndispensable', RequisitoIndispensableSchema);