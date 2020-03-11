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
        strRoles: body.strRoles
    });

    new Rol(rol).save((err, rolDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        }

        const idRol = rolDB._id;

        const menus = new Menu({
            strMenus: req.body.aJsnMenus
        });

        let err1 = menus.validateSync();

        if (err1) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al registrar el menu'
            });
        }

        Rol.findByIdAndUpdate(idRol, {
            $push: {
                aJsnMenus: menus
            }
        })
            .then((roles) => {
                return res.status(200).json({
                    ok: true,
                    resp: 200,
                    msg: 'Registrar el rol exitoso',
                    roles
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    ok: false,
                    resp: 500,
                    msg: 'Error al intentar registrar la academia',
                    err
                });
            });
    });
});

app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['idRol', 'strRoles']); //FILTRAR del body, on el pick seleccionar los campos que interesan del body 
    //id 'su coleccion, new -> si no existe lo inserta, runVali-> sirve para validar todas las condiciones del modelo 
    Rol.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, rolDB) => {
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


