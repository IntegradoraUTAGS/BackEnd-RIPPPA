const express = require('express');
const _ = require('underscore');
const { verificaToken } = require('../../middlewares/autenticacion');
const menu = require('../../models/menu');
const app = express();

app.get('/obtener', (req, res) => {
    menu.find({ blnEstado: true })
        .exec((err, menus) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                count: menus.length,
                menus
            });
        });
});
app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;
    menu.find({ blnEstado: true, _id: id }) //select * from usuario where estado=true
        //solo aceptan valores numericos
        .exec((err, menus) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                count: menus.length,
                menus
            });
        });
});

app.post('/registrar', (req, res) => {
    let body = req.body;
    let Menu = new menu({
        strMenus: body.strMenus
    });
    Menu.save((err, men) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            men
        });
    });
});

app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['strMenus']);
    menu.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, menDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            menDB
        });

    });
});

app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;

    menu.findByIdAndUpdate(id, { blnEstado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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