const express = require('express');
const Rol = require('../../models/rol');
const Menu = require('../../models/menu');
const _ = require('underscore');
const { verificaToken } = require('../../middlewares/autenticacion');
const app = express();

app.get('/obtener', (req, res) => {
    Rol.find({ blnEstado: true }) //select * from usuario where estado=true
        //solo aceptan valores numericos
        .exec((err, roles) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: roles.length,
                roles
            });
        });
});

app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;
    Rol.find({ _id: id }) //select * from usuario where estado=true
        //solo aceptan valores numericos
        .exec((err, roles) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.Rol);
            return res.status(200).json({
                ok: true,
                count: roles.length,
                roles
            });
        });
});

app.post('/insertar', (req, res) => {

    let body = req.body;

    let rol = new Rol({
        idMenu: body.idMenu,
        strRoles: body.strRoles
    });

    rol.save((err, rolDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            rolDB
        });
    });
});

app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['idMenu', 'strRoles']); Rol.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, rolDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            rolDB
        });

    });
});
app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;

    Rol.findByIdAndUpdate(id, { blnEstado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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


