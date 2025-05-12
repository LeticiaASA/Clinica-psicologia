const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.post('/', pacienteController.createPaciente);

router.get('/', pacienteController.getAllPacientes);

module.exports = router;
