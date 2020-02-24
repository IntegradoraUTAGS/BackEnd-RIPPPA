const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Administrador = require('../models/administrador');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;

    Administrador.findOne({ strCodigoEmpleado: body.strCodigoEmpleado }, (err, admDB) => {
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

        if (!bcrypt.compareSync(body.strContraseña, admDB.strContraseña)) {
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
    });

    return res.status(200).json({
        ok: true,
        administrador: admDB,
        token
    });

});