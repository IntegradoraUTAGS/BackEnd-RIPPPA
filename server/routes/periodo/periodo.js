const express = require('express');
const _ = require('underscore');
const { verificaToken } = require('../../middlewares/autenticacion');
const periodo = require('../../models/periodo');
const app = express();

app.get('/obtener', (req, res) => {
    periodo.find({ blnEstado: true })
        .exec((err, periodos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: periodos.length,
                periodos
            });
        });
});
app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;
    periodo.find({ blnEstado: true, _id: id })
        .exec((err, periodos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                count: periodos.length,
                periodos
            });
        });
});

app.post('/registrar', (req, res) => {
    let body = req.body;
    let Periodo = new periodo({
        strPeriodo: body.strPeriodo
    });
    Periodo.save((err, perDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            perDB
        });
    });
});

app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['strPeriodo']);
    periodo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, perDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            perDB
        });

    });
});

app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;

    periodo.findByIdAndUpdate(id, { blnEstado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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