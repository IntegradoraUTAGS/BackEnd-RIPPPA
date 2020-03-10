const express = require('express');
const app = express();
const _ = require('underscore');
const Licenciatura= require('../models/licenciatura');

app.get('/licenciatura',  (req, res) => {
    Licenciatura.find()
        .exec((err, licenciaturas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: licenciatura.length,
                licenciaturas
            })
        });
});
app.post('/licenciatura',  (req, res) => {
    let body = req.body;

    let licenciatura = new Licenciatura({
        strLicenciatura: body.strLicenciatura
        
    
    });

    licenciatura.save((err, licDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            licDB
        });
    });
});
app.put('/licenciatura/:id',  (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['strLicenciatura']);

    Licenciatura.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, acaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            return res.status(200).json({
                ok: true,
                licDB
            });
        }
    });
});
app.delete('/licencatura/:id', (req, res) => {
    let id = req.params.id;

    Licenciatura.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            licDB
        });
    });
});
module.exports=app;