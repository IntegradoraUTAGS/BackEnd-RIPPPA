const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const Rol = require('./rol');
const Direccion = require('./direccion');

let Schema = mongoose.Schema;

let administradorSchema = new Schema({
    idDireccion: {
        type: Schema.Types.ObjectId,
        ref: 'Direccion',
        required: [true, 'Favor de ingresar el id de direccion a la que pertenece']
    },
    strNombre: {
        type: String,
        required: [true, 'Por favor ingresar el nombre del usuario']
    },
    numCodigoEmpleado: {
        type: Number,
        required: [true, 'Por favor ingresar el codigo de empleado'],
        unique: true
    },
    strCorreo: {
        type: String,
        required: [true, 'Por favor ingresar el correo electronico'],
        unique: true
    },
    numTelefono: {
        type: Number,
        required: [true, 'Favor de ingresar el numero de telefono']
    },
    strContrasenia: {
        type: String,
        required: [true, 'Por favor ingresar la contraseña']
    },
    blnEstado: {
        type: Boolean,
        default: true
    }
});

administradorSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Administrador', administradorSchema);

