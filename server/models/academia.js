const mongoose = require('mongoose');
const Direccion = require('../models/direccion')
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let academiaSchema = new Schema({

    idDireccion: {
        type: Schema.Types.ObjectId,
        ref: 'Direccion',
        required: [true, 'Favor de ingresar el id de direccion']
    },
    strNombre: {
        type: String,
        required: [true, 'Porfavor ingresar el nombre de la academia']
    },
    blnDisponible: {
        type: Boolean,
        default: true
    }

});

academiaSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Academia', academiaSchema);