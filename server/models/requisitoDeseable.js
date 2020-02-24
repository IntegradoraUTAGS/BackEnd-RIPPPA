const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Academia = require('./academia');
const RequisitoIndispensable = require('./requisitoIndispensable');

let Schema = mongoose.Schema;


let RequisitoDeseableSchema = new Schema({

    aJsonMaestria: [{
        idMaestrias: {
            type: Schema.Types.ObjectId,
            ref: 'RequisitoIndispensable'
        }
    }],
    aJsonOtrosConocimientos: [{
        strOtrosConocimientos: {
            type: String
        }
    }],
    aJsonHerramientas: [{
        strHerramientas: {
            type: String,
        }
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