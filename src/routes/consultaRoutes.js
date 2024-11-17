const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

// Rota para agendar consulta
router.post('/', consultaController.createConsulta);

module.exports = router;
