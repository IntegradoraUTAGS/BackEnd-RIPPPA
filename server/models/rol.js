const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Menu = require('./menu');

let Schema = mongoose.Schema;

let RolSchema = new Schema({

    strRoles: {
        type: String,
        required: [true, 'Se debe de ingresar un rol']
    },

    idMenu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: [true, 'Favor de ingresar el id de un menu']
    },

    blnEstado: {
        type: Boolean,
        default: true
    }
});

RolSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Rol', RolSchema);