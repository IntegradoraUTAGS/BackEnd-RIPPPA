const express = require('express');
const app = express();
const _ = require('underscore');
const Licenciatura = require('../../models/licenciatura');

app.get('/obtener', (req, res) => {
    Licenciatura.find({ blnDisponible: true })
        .exec((err, licenciaturas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: licenciaturas.length,
                licenciaturas
            })
        });
});
app.post('/registrar', (req, res) => {
    let body = req.body;

    let licenciatura = new Licenciatura({
        strLicenciatura: body.strLicenciatura
    });


    licenciatura.save((err, licDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            licDB
        });
    });
});
app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['strLicenciatura']);

    Licenciatura.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, acaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            return res.status(200).json({
                ok: true,
                licDB
            });
        }
    });
});
app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;

    Licenciatura.findByIdAndUpdate(id, { blnDisponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            licDB
        });
    });
});
module.exports = app;