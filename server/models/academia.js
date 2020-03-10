const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Direccion = require('./direccion');
const RequisitoIndispensable = require('./requisitoIndispensable');
const RequisitoDeseable = require('./requisitoDeseable');
const Administrador = require('./administrador');

let Schema = mongoose.Schema;

let academiaSchema = new Schema({

    idDireccion: {
        type: Schema.Types.ObjectId,
        ref: 'Direccion',

    },
    strNombreAcademia: {
        type: String,
        required: [true, 'Porfavor ingresar el nombre de la academia']
    },
    strEstadoCivil: {
        type: String,
        required: [true, 'Es necesario ingresar el estado civil']
    },
    numEdad: {
        type: Number,
        required: [true, 'Es necesario que ingrese su edad']
    },

    aJsnRequisitosIndispensables: RequisitoIndispensable.schema,

    aJsnRequisitosDeseables: RequisitoDeseable.schema,

    blnEstado: {
        type: Boolean,
        default: true
    }
});

academiaSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Academia', academiaSchema);