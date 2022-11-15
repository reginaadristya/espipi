const express = require('express');
const spp = require('../models/index').spp;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', async (req, res) => {
    await spp.findAll()
    .then(result => {
        res.json({data: result});
    })
    .catch(error => {
        res.json({message: error.message});
    });
});

app.get('/:id', async (req, res) => {
    let param = {id_spp: req.params.id};
    
    await spp.findOne({where: param})
    .then(result => {
        res.json({data: result});
    })
    .catch(error => {
        res.json({message: error.message});
    });
});

app.post('/', async (req, res) => {
    let data = {
        tahun: req.body.tahun,
        nominal: req.body.nominal
    };

    await spp.create(data)
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
    let param = {id_spp: req.body.id_spp};
    let data = {
        tahun: req.body.tahun,
        nominal: req.body.nominal
    };

    await spp.update(data, {where: param})
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
    let param = {id_spp: req.params.id};

    await spp.destroy({where: param})
    .then(result => {
        res.json({message: "Data has been deleted"});
    })
    .catch(error => {
        res.json({message: error.message});
    });
});

module.exports = app;