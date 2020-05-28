const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Academia = require('./academia');

let Schema = mongoose.Schema;

let PerfilSchema = new Schema({

    idAcademia: {
        type: Schema.Types.ObjectId,
        ref: 'Academia',
        required: [true, 'Favor de ingresar el id de la académia']
    },
    strNombre: {
        type: String,
        required: [true, 'Favor de ingresar un nombre']
    },
    strGenero: {
        type: String,
        default: "Indistinto"
    },
    strEstadoCivil: {
        type: String,
        default: "Indistinto"
    },
    strEscolaridadRequerida: {
        type: String,
        default: "TSU-Licenciatura,Ingenieria-Maestria"
    },
    arrFormacionProfesional: [{
        type: String
    }],
    strExpLaboral: {
        type: String,
        required: [true, 'Ingresar experiencia laboral previa']
    },
    strExpDocente: {
        type: String,
        required: [true, 'Ingresar experiencia docente previa']
    },
    arrConocimientos: [{
        type: String,
        required: [true, 'Favor de ingresar algun conocimientos especifico']
    }],
    arrHerramientas: [{
        type: String
    }],
    arrHabilidadesDestrezas: [{
        type: String,
        required: [true, 'Favor de ingresar almenos una habilidad o destreza']
    }],
    strIdiomas: {
        type: String
    },
    blnActivo: {
        type: Boolean,
        default: true
    }
});

PerfilSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Perfil', PerfilSchema);