const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const SECRET_KEY = '!@#$%^&*()_+';
const auth = require('../auth');
const petugas = require('../models/index').petugas;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', auth, async (req, res) => {
    await petugas.findAll()
    .then(result => {
        res.json({data: result});
    })
    .catch(error => {
        res.json({message: error.message});
    });
});

app.get('/:id', auth, async (req, res) => {
    let param = {id_petugas: req.params.id};
    
    await petugas.findOne({where: param})
    .then(result => {
        res.json({data: result});
    })
    .catch(error => {
        res.json({message: error.message});
    });
});

app.post('/', async (req, res) => {
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nama_petugas: req.body.nama_petugas,
        level: req.body.level
    };

    await petugas.create(data)
    .then(result => {
        res.json({
            message: "Data has been inserted",
            data: result
        });
    })
    .catch(error => {
        res.json({message: error.message});
    });
});

app.put('/', auth, async (req, res) => {
    let param = {id_petugas: req.body.id_petugas};
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nama_petugas: req.body.nama_petugas,
        level: req.body.level
    };

    await petugas.update(data, {where: param})
    .then(result => {
        res.json({
            message: "Data has been updated",
            data: result
        });
    })
    .catch(error => {
        res.json({message: error.message});
    });
});

app.delete('/:id', auth, async (req, res) => {
    let param = {id_petugas: req.params.id};

    await petugas.destroy({where: param})
    .then(result => {
        res.json({message: "Data has been deleted"});
    })
    .catch(error => {
        res.json({message: error.message});
    });
});

app.post('/admin', async (req, res) => {
    let param = {
        username: req.body.username,
        password: md5(req.body.password),
        level: 'admin'
    };

    await petugas.findOne({where: param})
    .then(result => {
        if (result) {
            let payload = JSON.stringify(result);
            let token = jwt.sign(payload, SECRET_KEY);
            res.json({
                logged: true,
                data: result,
                token: token
            });
        } else {
            res.json({logged: false, message: "Invalid Username or Password!"});
        }
    })
    .catch(error => {
        res.json({message: error.message});
    });
});

app.post('/petugas', async (req, res) => {
    let param = {
        username: req.body.username,
        password: md5(req.body.password),
        level: 'petugas'
    };

    await petugas.findOne({where: param})
    .then(result => {
        if (result) {
            let payload = JSON.stringify(result);
            let token = jwt.sign(payload, SECRET_KEY);
            res.json({
                logged: true,
                data: result,
                token: token
            });
        } else {
            res.json({logged: false, message: "Invalid Username or Password!"});
        }
    })
    .catch(error => {
        res.json({message: error.message});
    });
});

module.exports = app;