const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Menu = require('./menu');

let Schema = mongoose.Schema;

let RolSchema = new Schema({

    strRoles: {
        type: String,
        required: [true, 'Se debe de ingresar un rol']
    },

    strMenu: [{
        type: String,
        required: [true, 'Favor de ingresar los menus']
    }],

    blnEstado: {
        type: Boolean,
        default: true
    }
});

RolSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Rol', RolSchema);