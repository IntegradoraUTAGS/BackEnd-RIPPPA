const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Profesor = require('./profesor');

let Schema = mongoose.Schema;

let documentacionSchema = new Schema({

    idProfesor: {
        type: Schema.Types.ObjectId,
        ref: 'Profesor',
        required: [true, 'Por favor ingresar el codigo del profesor']
    },
    strCV: {
        type: String,
        default: "cv.pdf"
    },
    strLicenciatura: {
        type: String,
        default: "licenciatura.pdf",
        required: [true, 'Por favor adjunte su titulo de licenciatura']
    },
    strMaestriaEspecialidad: {
        type: String,
        default: "maestriaEspecialiad.pdf"
    },
    strOtrosEstudios: {
        type: String,
        default: "otrosEstudios.pdf"
    },
    strCedulaProfesional: {
        type: String,
        default: "cedulaProfesional.pdf"
    },
    strExperienciaProf: {
        type: String,
        default: "pruebasExperienciaProfesional.pdf"
    }
});

documentacionSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente '
});

module.exports = mongoose.model('Documentacion', documentacionSchema);

