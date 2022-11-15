const express = require('express');
const cors = require('cors');
const app = express();

const kelas = require('./router/kelas');
const spp = require('./router/spp');
const petugas = require('./router/petugas');
const siswa = require('./router/siswa');
const pembayaran = require('./router/pembayaran');

app.use(cors());
app.use('/spp/kelas', kelas);
app.use('/spp/spp', spp);
app.use('/spp/petugas', petugas);
app.use('/spp/siswa', siswa);
app.use('/spp/pembayaran', pembayaran);

app.listen(8000, () => {console.log('Server run on port 8000')});