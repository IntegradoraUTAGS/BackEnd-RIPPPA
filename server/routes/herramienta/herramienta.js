const express = require('express');
const app = express();
const _ = require('underscore');
const Herramienta = require('../../models/herramienta');

app.get('/obtener', (req, res) => {
    Herramienta.find({ blnStatus: true })
        .exec((err, herramientas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                herramientas
            })
        });
});
app.post('/registrar', (req, res) => {
    let body = req.body;

    let herramienta = new Herramienta({
        strHerramientas: body.strHerramientas
    });


    herramienta.save((err, cosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            cosDB
        });
    });
});
app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['strHerramientas']);

    Herramienta.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, conDB) => {
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
app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;

    Herramienta.findByIdAndUpdate(id, { blnStatus: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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