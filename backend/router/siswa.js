const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const SECRET_KEY = '!@#$%^&*()_+';
const auth = require('../auth');
const siswa = require('../models/index').siswa;
const pembayaran = require('../models/index').pembayaran;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', auth, async (req, res) => {
    await siswa.findAll({include: ["kelas", "spp"]})
    .then(result => {
        res.json({data: result});
    })
    .catch(error => {
        res.json({message: error.message});
    });
});

app.get('/:id', auth, async (req, res) => {
    let param = {nisn: req.params.id};
    
    await siswa.findOne({where: param, include: ["kelas", "spp"]})
    .then(result => {
        res.json({data: result});
    })
    .catch(error => {
        res.json({message: error.message});
    });
});

app.post('/', async (req, res) => {
    let data = {
        nisn: req.body.nisn,
        nis: req.body.nis,
        nama: req.body.nama,
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
        id_spp: req.body.id_spp,
        password: md5(req.body.password)
    };

    await siswa.create(data)
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
    let param = {nisn: req.body.nisn};
    let data = {
        nis: req.body.nis,
        nama: req.body.nama,
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
        id_spp: req.body.id_spp,
        password: md5(req.body.password)
    };

    await siswa.update(data, {where: param})
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
    let param = {nisn: req.params.id};

    await siswa.destroy({where: param})
    .then(result => {
        res.json({message: "Data has been deleted"});
    })
    .catch(error => {
        res.json({message: error.message});
    });
});

app.post('/siswa', async (req, res) => {
    let param = {
        nisn: req.body.nisn,
        password: md5(req.body.password)
    };

    await siswa.findOne({where: param})
    .then(result => {
        if(result) {
            let payload = JSON.stringify(result);
            let token = jwt.sign(payload, SECRET_KEY);
            res.json({
                logged: true,
                data: result,
                token: token
            });
        } else {
            res.json({logged: false, message: "Invalid NISN or Password!"});
        }
    })
    .catch(error => {
        res.json({message: error.message});
    });
});

module.exports = app;