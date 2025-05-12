const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

// Agendar consulta
router.post('/', consultaController.createConsulta);

// Realizar consulta
router.put('/:id/realizar', consultaController.realizarConsulta);

// Rota para gerar relatório financeiro por mês
router.get('/relatorio/financeiro/mes', consultaController.relatorioFinanceiroPorMes);

router.get('/relatorio/paciente/:id', consultaController.relatorioPorPaciente);

router.get('/relatorio', consultaController.relatorioFinanceiro);

router.get('/relatorio/nome/:nome', consultaController.buscarPorNome);
router.get('/relatorio/data', consultaController.buscarPorData);


module.exports = router;
