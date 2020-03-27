const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let LicenciaturaSchema = new Schema({

    strLicenciatura: {
        type: String,
        required: [true, 'Se debe de ingresar almenos una licenciatura']
    },
    blnDisponible: {
        type: Boolean,
        default: true
    }

});

LicenciaturaSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Licenciatura', LicenciaturaSchema);