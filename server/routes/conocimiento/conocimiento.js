const express = require('express');
const app = express();
const _ = require('underscore');
const Conocimiento = require('../../models/conocimientos');

app.get('/obtener', (req, res) => {
    Conocimiento.find({ blnDisponible: true })
        .exec((err, conocimientos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: conocimientos.length,
                conocimientos
            })
        });
});

app.get('/obtener/:id', (req, res) => {

    Conocimiento.findById({ blnDisponible: true, _id: req.params.id }).then((conocimiento) => {

        return res.status(200).json({
            msg: 'Conocimiento consultado',
            conocimiento
        });

    }).catch((err) => {
        return res.status(500).json({
            msg: 'Error al obtener el conocimiento de la DB.',
            cont: err
        });
    });

});

app.post('/registrar', (req, res) => {
    let body = req.body;

    let conocimiento = new Conocimiento({
        strConocimientos: body.strConocimientos
    });


    conocimiento.save((err, cosDB) => {
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
    let body = _.pick(req.body, ['strConocimientos']);

    Conocimiento.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, conDB) => {
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

    Conocimiento.findByIdAndUpdate(id, { blnDisponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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