const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let MaestriaSchema = new Schema({

    strMaestria: {
        type: String
    }

});

MaestriaSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Maestria', MaestriaSchema);