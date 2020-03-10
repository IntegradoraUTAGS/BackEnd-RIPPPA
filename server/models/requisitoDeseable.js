const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Maestria = require('./maestria');
const oConocimiento = require('./otroConocimiento');
const Herramienta = require('./herramienta');

let Schema = mongoose.Schema;

let RequisitoDeseableSchema = new Schema({

    arrMaestria: [{
        type: Schema.Types.ObjectId,
        ref: 'Maestria',
        required: [true, 'Por favor ingresar el codigo de la maestria']
    }],

    arrOtrosConocimientos: [{
        type: Schema.Types.ObjectId,
        ref: 'oConocimiento',
        required: [true, 'Por favor ingresar el codigo del conocimiento']
    }],

    arrHerramientas: [{
        type: Schema.Types.ObjectId,
        ref: 'Herramienta',
        required: [true, 'Por favor ingresar el codigo de la herramienta']
    }],

    strNivelIngles: {
        type: String,
        required: [true, 'Favor de agregar nivel de ingles']
    }

});

RequisitoDeseableSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('RequisitoDeseable', RequisitoDeseableSchema);