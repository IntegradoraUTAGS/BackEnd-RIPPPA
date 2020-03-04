const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Conocimiento = require('./conocimientos');
const Maestria = require('./maestria');
const Licenciatura = require('./licenciatura');


let Schema = mongoose.Schema;


let RequisitoIndispensableSchema = new Schema({

    aJsonLicenciatura: [Licenciatura.Schema],

    aJsonMaestria: [Maestria.Schema],

    aJsonConocimientos: [Conocimiento.Schema],

    numExpProfesional: {
        type: Number,
        required: [true, 'Favor de ingresar experiencia profesional']
    },

    numExpDocentePrevia: {
        type: Number,
        required: [true, 'Favor de ingresar la experiencia profesional']
    },
});

RequisitoIndispensableSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('RequisitoIndispensable', RequisitoIndispensableSchema);