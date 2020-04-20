const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let direccionSchema = new Schema({

    strNombre: {
        type: String,
        required: [true, 'Porfavor ingresar el nombre de la dirección']
    },
    blnDisponible: {
        type: Boolean,
        default: true
    }

});

direccionSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Direccion', direccionSchema);