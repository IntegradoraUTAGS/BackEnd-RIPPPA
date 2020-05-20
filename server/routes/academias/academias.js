const express = require('express');
const _ = require('underscore');
const { verificaToken } = require('../../middlewares/autenticacion');
const Academias = require('../../models/academia');
const app = express();

//obtener academias disponibles
app.get('/obtener', (req, res) => {
    Academias.find({ blnDisponible: true }).populate('idDireccion')
        .exec((err, academias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: academias.length,
                academias
            });
        });
});
//obtener academia por id
app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;
    Academias.findById({ blnDisponible: true, _id: id }).populate('idDireccion')
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
//registrar academias
app.post('/registrar', (req, res) => {
    let body = req.body;
    let academias = new Academias({
        idDireccion: body.idDireccion,
        strNombre: body.strNombre,
    });
    academias.save((err, acaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            acaDB
        });
    });
});
//actualizar academia
app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['strNombre']);
    Academias.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, acaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            acaDB
        });
    });
});

//eliminar academia
app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;

    Academias.findByIdAndUpdate(id, { blnDisponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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