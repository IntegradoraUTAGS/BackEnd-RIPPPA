const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let MenuSchema = new Schema({

    strMenus: {
        type: String,
        required: [true, 'Se debe de ingresar almenos un menu']
    },
    blnEstado: {
        type: String,
        default: true
    }

});

MenuSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Menu', MenuSchema);