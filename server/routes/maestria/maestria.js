const express = require('express');
const app = express();
const _ = require('underscore');
const Maestria = require('../../models/maestria');

app.get('/obtener', (req, res) => {
    Maestria.find({ blnStatus: true })
        .exec((err, maestrias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: maestrias.length,
                maestrias
            })
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

    Maestria.findByIdAndUpdate(id, { blnStatus: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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