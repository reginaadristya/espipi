const express = require('express');
const kelas = require('../models/index').kelas;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', async (req, res) => {
    await kelas.findAll()
    .then(result => {
        res.json({data: result});
    })
    .catch(error => {
        res.json({message: error.message});
    });
});

app.get('/:id', async (req, res) => {
    let param = {id_kelas: req.params.id};
    
    await kelas.findOne({where: param})
    .then(result => {
        res.json({data: result});
    })
    .catch(error => {
        res.json({message: error.message});
    });
});

app.post('/', async (req, res) => {
    let data = {
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    };

    await kelas.create(data)
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

app.put('/', async (req, res) => {
    let param = {id_kelas: req.body.id_kelas};
    let data = {
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    };

    await kelas.update(data, {where: param})
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

app.delete('/:id', async (req, res) => {
    let param = {id_kelas: req.params.id};
    
    await kelas.destroy({where: param})
    .then(result => {
        res.json({message: "Data has been deleted"});
    })
    .catch(error => {
        res.json({message: error.message});
    });
});

module.exports = app;