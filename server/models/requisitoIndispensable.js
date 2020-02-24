const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Academia = require('./academia');


let Schema = mongoose.Schema;


let RequisitoIndispensableSchema = new Schema({

    aJsonLicenciatura: [{
        strLicenciatura: {
            type: String,
            required: [true, 'Se debe de ingresar almenos una licenciatura']
        }
    }],
    aJsonMaestria: [{
        strMaestria: {
            type: String
        }
    }],
    strConocimientos: [{
        strConocimientos: {
            type: String,
            required: [true, 'Se debe de ingresar almenos un conocimiento']
        }
    }],
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