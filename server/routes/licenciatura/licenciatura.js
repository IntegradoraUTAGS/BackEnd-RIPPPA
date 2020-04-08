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
                cont: licenciaturas
            })
        });
});

app.get('/obtener/:id', (req, res) => {

    Licenciatura.findById({ blnDisponible: true, _id: req.params.id }).then((licenciatura) => {

        return res.status(200).json({
            msg: 'Licenciatura consultada',
            cont: licenciatura
        });

    }).catch((err) => {
        return res.status(500).json({
            msg: 'Erro al obtener la licenciatura de la DB.',
            cont: err
        });
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
            msg: "La licenciatura se ha agregado correctamente",
            licDB
        });
    });
});
app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['strLicenciatura']);

    Licenciatura.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, licDB) => {
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
            msg: "Se ha eliminado correctamente la licenciatura",
            resp
        });
    });
});
module.exports = app;