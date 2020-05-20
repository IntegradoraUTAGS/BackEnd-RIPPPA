const express = require('express');
const _ = require('underscore');
const { verificaToken } = require('../../middlewares/autenticacion');
const menu = require('../../models/menu');
const app = express();
//Este get obtiene menus activos
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
//Obtener menu por id
app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;
    menu.find({ blnEstado: true, _id: id })
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
//este post registra menus
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
//este put actualiza menus
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
//Este delete elimina menus
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