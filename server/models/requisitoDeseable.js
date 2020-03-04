const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Maestria = require('./maestria');
const oConociminto = require('./otroConocimiento');
const Herramienta = require('./herramienta');

let Schema = mongoose.Schema;

let RequisitoDeseableSchema = new Schema({

    aJsonMaestria: [Maestria.Schema],

    aJsonOtrosConocimientos: [oConociminto.Schema],

    aJsonHerramientas: [Herramienta.Schema],

    strNivelIngles: {
        type: String,
        required: [true, 'Favor de agregar nivel de ingles']
    }

});

RequisitoDeseableSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('RequisitoDeseable', RequisitoDeseableSchema);