const express = require('express');
const app = express();
const _ = require('underscore');
const Convocatoria = require('../../models/convocatoria');

//obtener convocatorias
app.get('/convocatoria', (req, res) => {
    Convocatoria.find()
        .exec((err, ) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: convocatoria.length,
                convocatorias
            })
        });
});
//agregar convocatoria
app.post('/convocatoria', (req, res) => {
    let body = req.body;

    let convocatoria = new Convocatoria({
        idDireccion: body.idDireccion,
        idProfesor: body.idProfesor,
        idAcademia: body.idAcademia,
        idPeriodo: body.idPeriodo,
        strTurno: body.strTurno,
        numHoras: body.numHoras
    });
    convocatoria.save((err, conDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            conDB
        });
    });
});
//actualizar convocatoria
app.put('/convocatoria/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['idDireccion', ' idProfesor', ' idAcademia', ' idPeriodo', 'strTurno', ' numHoras']);

    Licenciatura.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, conDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            return res.status(200).json({
                ok: true,
                conDB
            });
        }
    });
});
//Eliminar convocatoria
app.delete('/convocatoria/:id', (req, res) => {
    let id = req.params.id;

    Licenciatura.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            conDB
        });
    });
});
module.exports = app;