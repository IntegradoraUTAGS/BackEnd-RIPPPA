const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let statusSchema = new Schema({
    strStatus: {
        type: String,
        required: [true, 'Ingresa un status']
    },
    blnEstado: {
        type: Boolean,
        default: true
    }
});

statusSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Status', statusSchema);
