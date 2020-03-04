const express = require('express');
const _ = require('underscore');
const { verificaToken } = require('../middlewares/autenticacion');
const academia = require('../models/academia');
const app = express();

app.get('/academias/obtener', (req, res) => {
    academia.find({ blnEstado: true })
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
app.get('/academias/obtener/:id', (req, res) => {
    let id = req.params.id;
    academia.find({ blnEstado: true, _id: id })

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

app.post('/academias/registrar', (req, res) => {
    let body = req.body;
    let Academias = new academia({
        idDireccion: body.idDireccion,
        strNombreAcademia: strNombreAcademia,
        strEstadoCivil: strEstadoCivil,
        numEdad: numEdad,
        idElabora: body.idElabora,
        idAutoriza: body.idAutoriza
    });

    Academias.save((err, acaDB) => {
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

app.post('/academia/:idAcademia', (req, res) => {

    const idAcademia = req.params.idAcademia;

    if (!idAcademia || idAcademia.length != 24) {
        return res.status(404).json({
            ok: false,
            resp: 404,
            msg: 'La academia no existe.',
            cont: {
                idAcademia
            }
        });
    }

    const academia = new Academia({
        idPregunta: req.body.idPregunta,
        idSatisfaccion: req.body.idSatisfaccion
    });

    let err = respuesta.validateSync();

    if (err) {
        return res.status(400).json({
            ok: false,
            resp: 400,
            msg: 'Error al intentar registrar la respuesta.',
            cont: {
                error: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }

    Persona.findByIdAndUpdate(idPersona, { $push: { aJsnRespuesta: respuesta } })
        .then((persona) => {

            if (!persona) {
                return res.status(404).json({
                    ok: false,
                    resp: 404,
                    msg: 'La persona no existe.',
                    cont: {
                        persona
                    }
                });
            }

            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: 'La respuesta se ha registrado exitosamente.',
                cont: {
                    persona
                }
            });

        }).catch((err) => {

            return res.status(500).json({
                ok: false,
                resp: 500,
                msg: 'Error al intentar registrar la respuesta.',
                cont: {
                    error: Object.keys(err).length === 0 ? err.message : err
                }
            });

        });

});

module.exports = app;