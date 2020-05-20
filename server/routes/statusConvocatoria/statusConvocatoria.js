const express = require('express');
const _ = require('underscore');
const { verificaToken } = require('../../middlewares/autenticacion');
const statusConvocatoria = require('../../models/statusConvocatoria');
const app = express();

//obtener status de convocatoria
app.get('/obtener', (req, res) => {
    statusConvocatoria.find({ blnEstado: true })
        .exec((err, convocatorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                count: convocatorias.length,
                convocatorias
            });
        });
});
//obtener status de convocatoria por id 
app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;
    statusConvocatoria.find({ blnEstado: true, _id: id }) //select * from usuario where estado=true
        //solo aceptan valores numericos
        .exec((err, convocatorias) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                count: convocatorias.length,
                convocatorias
            });
        });
});
//registrar status de convocatoria
app.post('/registrar', (req, res) => {
    let body = req.body;
    let sConvocatoria = new statusConvocatoria({
        strStatus: body.strStatus
    });
    sConvocatoria.save((err, sConvDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            sConvDB
        });
    });
});
//actualizar status de convocatoria
app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['strStatus']);
    statusConvocatoria.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, sConvDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            sConvDB
        });

    });
});
//eliminar status de convocatorias
app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;

    statusConvocatoria.findByIdAndUpdate(id, { blnEstado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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