const express = require('express');
const Administrador = require('../models/administrador');
const _ = require('underscore');
const app = express();

app.get('/administrador/obtener', (req, res) => {
    Administrador.find({ estado: true }) //select * from usuario where estado=true
        //solo aceptan valores numericos
        .exec((err, administradores) => { //ejecuta la funcion
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

app.post('/administrador/registrar', (req, res) => {
    let body = req.body;
    let administrador = new Administrador({
        //para poder mandar los datos a la coleccion
        idRol: body.idRol,
        idDireccion: body.idDireccion,
        strNnombre: body.strNombre,
        strCodigoEmpleado: body.strCodigoEmpleado,
        contraseña: body.contraseña,
        estado: body.estado
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
app.put('/administrador/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['idRol', 'idDireccion', 'strNombre', 'strCodigoEmpleado', 'contraseña', 'estado']); //FILTRAR del body, on el pick seleccionar los campos que interesan del body 
    //id 'su coleccion, new -> si no existe lo inserta, runVali-> sirve para validar todas las condiciones del modelo 
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
app.delete('/administrador/eliminar/:id', (req, res) => {
    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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
