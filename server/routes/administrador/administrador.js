const express = require('express');
const jwt = require('jsonwebtoken');
const Administrador = require('../../models/administrador');
const _ = require('underscore');
const app = express();
const bcrypt = require('bcrypt');

//obtener administradors activos
app.get('/obtener', (req, res) => {
    Administrador.find({ blnEstado: true }).populate('idRol').populate('idDireccion')
        .exec((err, administradores) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: administradores.length,
                administradores
            });
        });
});

//obtener administrador por id 
app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;
    Administrador.find({ _id: id }).populate('idRol').populate('idDireccion')
        .exec((err, administradores) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.Administrador);
            return res.status(200).json({
                ok: true,
                count: administradores.length,
                administradores
            });
        });
});

//registrar administradores
app.post('/registrar', (req, res) => {
    let body = req.body;
    let administrador = new Administrador({
        idRol: body.idRol,
        idDireccion: body.idDireccion,
        strNombre: body.strNombre,
        numCodigoEmpleado: body.numCodigoEmpleado,
        strContrasenia: bcrypt.hashSync(body.strContrasenia, 10)
    });
    administrador.save((err, admDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            admDB
        });
    });
});

//actualizar administradores
app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['idRol', 'idDireccion', 'strNombre', 'numCodigoEmpleado', 'strContrasenia', 'blnEstado']);

    Administrador.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, admDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            admDB
        });

    });
});

//eliminar administradores
app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;

    Administrador.findByIdAndUpdate(id, { blnEstado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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

//funcion para iniciar sesion
app.post('/login', (req, res) => {
    let body = req.body;

    Administrador.findOne({ numCodigoEmpleado: body.numCodigoEmpleado }, (err, admDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!admDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o contraseña incorrecta o el usuario no tiene permisos'
                }
            });
        }

        if (!bcrypt.compareSync(body.strContrasenia, admDB.strContrasenia)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o contraseña incorrecta o el usuario no tiene permisos'
                }
            });
        }

        let token = jwt.sign({
            administrador: admDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        return res.status(200).json({
            ok: true,
            administrador: admDB,
            token
        });
    });
});

module.exports = app;
