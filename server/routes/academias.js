const express = require('express');
const _ = require('underscore');
const { verificaToken } = require('../middlewares/autenticacion');
const Academia = require('../models/academia');
const RequisitoIndispensable = require('../models/requisitoIndispensable');
const RequisitoDeseable = require('../models/requisitoDeseable');
const app = express();

app.get('/academias/obtener', (req, res) => {
    Academia.find({ blnEstado: true })
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
    Academia.find({ blnEstado: true, _id: id })

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


app.post('/academia/registrar', (req, res) => {

    let body = req.body;
    let academias = new Academia({
        idDireccion: body.idDireccion,
        strNombreAcademia: body.strNombreAcademia,
        strEstadoCivil: body.strEstadoCivil,
        numEdad: body.numEdad
    });

    new Academia(academias).save((err, acaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        const idAcademia = acaDB._id;

        const requisitoIndispensable = new RequisitoIndispensable({
            arrLicenciatura: req.body.arrLicenciatura,
            arrMaestria: req.body.arrMaestria,
            arrConocimento: req.body.arrConocimento,
            numExpProfesional: req.body.numExpProfesional,
            numExpDocentePrevia: req.body.numExpDocentePrevia
        });
        const requisitoDeseable = new RequisitoDeseable({
            arrMaestria: req.body.arrMaestriaExtra,
            arrOtrosConocimientos: req.body.arrOtrosConocimientos,
            arrHerramientas: req.body.arrHerramientas,
            strNivelIngles: req.body.strNivelIngles
        });

        let err1 = requisitoIndispensable.validateSync();
        let err2 = requisitoDeseable.validateSync();

        if (err1) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error al intentar registrar los requisitos indispensables.',
                cont: {
                    error: Object.keys(err1).length === 0 ? err1.message : err1
                }
            });
        }
        if (err2) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error al intentar registrar los requisitos deseables.',
                cont: {
                    error: Object.keys(err2).length === 0 ? err2.message : err2
                }
            });
        }

        Academia.findByIdAndUpdate(idAcademia, {
            $push: {
                aJsnRequisitosIndispensables: requisitoIndispensable,
                aJsnRequisitosDeseables: requisitoDeseable
            }
        })
            .then((academia) => {

                return res.status(200).json({
                    ok: true,
                    resp: 200,
                    msg: 'La respuesta se ha registrado exitosamente.',
                    cont: {
                        academia
                    }
                });

            }).catch((err) => {

                return res.status(500).json({
                    ok: false,
                    resp: 500,
                    msg: 'Error al intentar registrar la academia.',
                    cont: {
                        error: Object.keys(err).length === 0 ? err.message : err
                    }
                });

            });

    });

});

app.delete('/academia/eliminar/:id', (req, res) => {
    let id = req.params.id;

    Academia.findByIdAndUpdate(id, { blnEstado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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

app.put('/academia/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'idDireccion', 'blnEstado', 'strNombreAcademia',
        'strEstadoCivil', 'numEdad', 'aJsnRequisitosIndispensables.arrLicenciatura',
        'aJsnRequisitosIndispensables:arrMaestria',
        'aJsnRequisitosIndispensables.arrConocimientos',
        'aJsnRequisitosIndispensables.arrOtrosConocimientos',
        'numExpProfesional', 'numExpDocentePrevia', 'arrHerramientas',
        'arrMaestriaExtra', 'strNivelIngles'
    ]);

    Academia.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, acaDB) => {
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

module.exports = app;