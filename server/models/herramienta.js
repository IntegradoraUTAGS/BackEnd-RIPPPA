const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let HerramientaSchema = new Schema({
    strHerramientas: {
        type: String,
    }
});

HerramientaSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Herramienta', HerramientaSchema);