const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let PeriodoSchema = new Schema({

    strPeriodo: {
        type: String,
        required: [true, 'Se debe de ingresar un periodo']
    }

});

PeriodoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Periodo', PeriodoSchema);