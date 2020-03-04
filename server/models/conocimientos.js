const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let ConocimientoSchema = new Schema({

    strConocimientos: {
        type: String,
        required: [true, 'Se debe de ingresar almenos un conocimiento']
    }

});

ConocimientoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Conocimiento', ConocimientoSchema);