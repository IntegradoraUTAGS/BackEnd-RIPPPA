const express = require('express');
const _ = require('underscore');
const { verificaToken } = require('../middlewares/autenticacion');
const statusConvocatoria = require('../models/statusConvocatoria');
const app = express();

app.get('/statusConvocatoria', (req, res) => {
    statusConvocatoria.find({ blnEstado: true })
        .exec((err, convocatorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                count: convocatorias.length,
                convocatorias
            });
        });
});
app.get('/statusConvocatoria/:id', (req, res) => {
    let id = req.params.id;
    statusConvocatoria.find({ blnEstado: true, _id: id }) //select * from usuario where estado=true
        //solo aceptan valores numericos
        .exec((err, convocatorias) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                count: convocatorias.length,
                convocatorias
            });
        });
});

app.post('/statusConvocatoria', (req, res) => {
    let body = req.body;
    let statusConvocatoria = new StatusConvocatoria({
        strStatus: body.nombre,
    });
    statusConvocatoria.save((err, sConvDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            sConvDB
        });
    });
});

app.put('/statusConvocatoria/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['strStatus']);
    statusConvocatoria.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, sConvDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            sConvDB
        });

    });
});

app.delete('/statusConvocatoria/:id', (req, res) => {
    let id = req.params.id;

    statusConvocatoria.findByIdAndUpdate(id, { blnEstado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});

module.exports = app;