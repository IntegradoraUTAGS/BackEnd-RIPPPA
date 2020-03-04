const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let oConocimientoSchema = new Schema({

    strOtrosConocimientos: {
        type: String
    }

});

oConocimientoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('oConocimiento', oConocimientoSchema);