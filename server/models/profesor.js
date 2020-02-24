const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Convocatoria = require('./convocatoria');
const Documentacion = require('./documentacion');

let Schema = mongoose.Schema;

let profesorSchema = new Schema({

    idConvocatoria: {
        type: Schema.Types.ObjectId,
        ref: 'Convocatoria',
        required: [true, 'Por favor ingresar el codigo de la convocatoria']
    },
    idDocumentacion: {
        type: Schema.Types.ObjectId,
        ref: 'Documentacion',
        required: [true, 'Por favor ingresar el codigo de documentacion']
    },
    strNombres: {
        type: String,
        required: [true, 'Por favor ingrese su nombre o nombres']
    },
    strAppPaterno: {
        type: String,
        required: [true, 'Por favor ingrese su apellido paterno']
    },
    strAppMaterno: {
        type: String,
        required: [true, 'Por favor ingrese su apellido materno']
    },
    strCURP: {
        type: String,
        required: [true, 'Por favor ingrese su curp'],
        unique: true
    },
    strEmail: {
        type: String,
        required: [true, 'Por favor ingrese su correo electronico'],
        unique: true
    },
    fechaNacimiento: {
        type: Date,
        required: [true, 'Por favor ingrese su fecha de nacimiento']
    },
    strEstadoCivil: {
        type: String,
        required: [true, 'Por favor ingresar su estado civil']
    },
    blnNacionalidad: {
        type: Boolean,
        required: [true, 'Por favor confirme si es de nacionalidad mexicana']
    },
    strCalle: {
        type: String,
        required: [true, 'Por favor ingrese su calle ']
    },
    numNumeroDeCasa: {
        type: Number,
        required: [true, 'Por favor ingrese su numero de casa']
    },
    strMunicipio: {
        type: String,
        required: [true, 'Por favor ingrese su municipio']
    },
    strEstado: {
        type: String,
        required: [true, 'Por favor ingrese su estado']
    },
    numCodigoPostal: {
        type: Number,
        required: [true, 'Por favor ingrese su codigo postal']
    },
    numTelefono: {
        type: Number,
        required: [true, 'Por favor ingrese su numero de telefono']
    },
    blnAceptado: {
        type: Boolean,
        default: false
    },
    blnCumpleReqIndispensables: {
        type: Boolean,
        default: false
    },
    blnCumpleReqDeseables: {
        type: Boolean,
        default: false
    },
    strComentario: {
        type: String
    }
});

profesorSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Profesor', profesorSchema);