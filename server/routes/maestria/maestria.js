const express = require('express');
const app = express();
const _ = require('underscore');
const Maestria = require('../../models/maestria');

//Este get obtiene todas las mestrias que esten activas

app.get('/obtener', (req, res) => {
    Maestria.find({ blnDisponible: true })
        .exec((err, maestrias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                maestrias
            })
        });
});

//este get obtiene maestrias filtradas por un id
app.get('/obtener/:id', (req, res) => {

    Maestria.findById({ blnDisponible: true, _id: req.params.id }).then((maestria) => {

        return res.status(200).json({
            msg: 'Licenciatura consultada',
            maestria
        });

    }).catch((err) => {
        return res.status(500).json({
            msg: 'Error al obtener la licenciatura de la DB.',
            err
        });
    });

});
app.post('/registrar', (req, res) => {
    let body = req.body;

    let maestria = new Maestria({
        strMaestria: body.strMaestria
    });


    maestria.save((err, maesDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            maesDB
        });
    });
});
app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['strMaestria']);

    Maestria.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, maeDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            return res.status(200).json({
                ok: true,
                maeDB
            });
        }
    });
});
app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;

    Maestria.findByIdAndUpdate(id, { blnDisponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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