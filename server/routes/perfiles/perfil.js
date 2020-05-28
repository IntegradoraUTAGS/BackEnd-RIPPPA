const express = require('express');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const _ = require('underscore');
const Perfil = require('../../models/perfil');
const app = express();

app.get('/obtener', (req, res) => {
    Perfil.find({ blnActivo: true }).populate('idAcademia')
        .exec((err, perfiles) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                perfiles
            });
        });
});

app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;
    Perfil.find({ blnActivo: true, _id: id }).populate('idAcademia')
        .exec((err, perfil) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                perfil
            });
        });
});

app.post('/registrar', (req, res) => {

    let perfil = new Perfil({
        idAcademia: req.body.idAcademia,
        strNombre: req.body.strNombre,
        strGenero: req.body.strGenero,
        strEstadoCivil: req.body.strEstadoCivil,
        strExpLaboral: req.body.strExpLaboral,
        strExpDocente: req.body.strExpDocente,
        strIdiomas: req.body.strIdiomas,
        strEscolaridadRequerida: req.body.strEscolaridadRequerida
    });

    new Perfil(perfil).save((err, perDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        const idPerfil = perDB._id;


        Perfil.findByIdAndUpdate(idPerfil, {
            $push: {
                arrFormacionProfesional: req.body.arrFormacionProfesional,
                arrConocimientos: req.body.arrConocimientos,
                arrHerramientas: req.body.arrHerramientas,
                arrHabilidadesDestrezas: req.body.arrHabilidadesDestrezas
            }

        })
            .then((perfil) => {
                return res.status(200).json({
                    ok: true,
                    resp: 200,
                    msg: 'La respuesta se ha registrado exitosamente.',
                    perfil
                });
            }).catch((err) => {
                return res.status(500).json({
                    ok: false,
                    resp: 500,
                    msg: 'Error al intentar registrar la academia.',
                    cont: {
                        error: Object.keys(err).length === 0 ? err.message : err
                    }
                });
            });
    });

});


app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['idAcademia', 'strNombre', 'strGenero', 'strEstadoCivil', 'strExpLaboral', 'strExpDocente', 'strIdiomas']);

    Perfil.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, acaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        const idPerfil = perDB._id;

        Perfil.findByIdAndUpdate(idPerfil, {
            $push: {
                arrFormacionProfesional: req.body.arrFormacionProfesional,
                arrConocimientos: req.body.arrConocimientos,
                arrHerramientas: req.body.arrHerramientas,
                arrHabilidadesDestrezas: req.body.arrHabilidadesDestrezas
            }
        })
            .then((perfil) => {
                return res.status(200).json({
                    ok: true,
                    resp: 200,
                    msg: 'La respuesta se ha actualizado exitosamente.',
                    perfil
                });
            }).catch((err) => {
                return res.status(500).json({
                    ok: false,
                    resp: 500,
                    msg: 'Error al intentar actualizar la academia.',
                    cont: {
                        error: Object.keys(err).length === 0 ? err.message : err
                    }
                });
            });
    });
});

app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;
    Perfil.findByIdAndUpdate(id, { blnActivo: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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