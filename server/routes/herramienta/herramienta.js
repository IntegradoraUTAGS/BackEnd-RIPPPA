const express = require('express');
const app = express();
const _ = require('underscore');
const Herramienta = require('../../models/herramienta');

app.get('/obtener', (req, res) => {
    Herramienta.find({ blnDisponible: true })
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

app.get('/obtener/:id', (req, res) => {

    Herramienta.findById({ blnDisponible: true, _id: req.params.id }).then((herramientas) => {

        return res.status(200).json({
            msg: 'Herramienta consultada',
            herramientas
        });

    }).catch((err) => {
        return res.status(500).json({
            msg: 'Error al obtener la herramienta de la DB.',
            cont: err
        });
    });

});

app.post('/registrar', (req, res) => {
    let body = req.body;

    let herramienta = new Herramienta({
        strHerramienta: body.strHerramienta
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
            msg: "La herramienta se ha agregado correctamente",
            cosDB
        });
    });
});
app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['strHerramienta']);

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

    Herramienta.findByIdAndUpdate(id, { blnDisponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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