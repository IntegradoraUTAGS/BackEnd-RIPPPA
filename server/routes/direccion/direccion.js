const express = require('express');
const _ = require('underscore');
const { verificaToken } = require('../../middlewares/autenticacion');
const Direcciones = require('../../models/direccion');
const app = express();

app.get('/obtener', (req, res) => {
    Direcciones.find({ blnDisponible: true }).exec((err, direcciones) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            count: direcciones.length,
            direcciones
        });
    });
});
app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;
    Direcciones.findById({ blnDisponible: true, _id: id })
        .exec((err, dir) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                dir
            });


        });

});

app.post('/registrar', (req, res) => {
    let body = req.body;
    let direcciones = new Direcciones({
        strNombre: body.strNombre,
    });
    direcciones.save((err, dirDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            dirDB
        });
    });
});

app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['strNombre']);
    Direcciones.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, dirDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            dirDB
        });

    });
});

app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;

    Direcciones.findByIdAndUpdate(id, { blnDisponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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