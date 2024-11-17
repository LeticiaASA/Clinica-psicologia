const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pacienteRoutes = require('./routes/pacienteRoutes');
const consultaRoutes = require('./routes/consultaRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/pacientes', pacienteRoutes);
app.use('/consultas', consultaRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000.');
});
