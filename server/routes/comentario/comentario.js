const express = require('express');
const Comentario = require('../../models/comentario');
const _ = require('underscore');
const app = express();

app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;
    Comentario.find({ _id: id }).populate('idAdministrador').populate('idProfesor')
        //solo aceptan valores numericos
        .exec((err, comentario) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.Rol);
            return res.status(200).json({
                ok: true,
                count: comentario.length,
                roles
            });
        });
});

app.post('/insertar', (req, res) => {
    let body = req.body;
    let comentario = new Comentario({
        strComentario: body.strComentario,
        idProfesor: body.idProfesor,
        idAdministrador: body.idAdministrador
    });
    comentario.save((err, comDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            comDB
        });
    });
});

module.exports = app;


