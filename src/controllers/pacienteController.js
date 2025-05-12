const db = require('../config/knex'); // Certifique-se que este caminho está correto

exports.createPaciente = async (req, res) => {
  const { nome, data_nascimento, telefone, email, endereco } = req.body;

  try {
    await db('pacientes').insert({ nome, data_nascimento, telefone, email, endereco });
    res.status(200).send('Paciente cadastrado com sucesso!');
  } catch (err) {
    console.error('Erro ao cadastrar paciente:', err);
    res.status(500).send('Erro ao cadastrar paciente.');
  }
};

// Buscar todos os pacientes
exports.getAllPacientes = async (req, res) => {
  try {
    const pacientes = await db('pacientes').select('*');
    res.json(pacientes);
  } catch (err) {
    console.error('Erro ao buscar pacientes:', err);
    res.status(500).send('Erro ao buscar pacientes.');
  }
};

// Buscar paciente por ID
exports.getPacienteById = async (req, res) => {
  const { id } = req.params;

  try {
    const paciente = await db('pacientes').where({ id }).first();

    if (!paciente) {
      return res.status(404).send('Paciente não encontrado.');
    }

    res.json(paciente);
  } catch (err) {
    console.error('Erro ao buscar paciente:', err);
    res.status(500).send('Erro ao buscar paciente.');
  }
};

// Atualizar paciente
exports.updatePaciente = async (req, res) => {
  const { id } = req.params;
  const { nome, data_nascimento, telefone, email, endereco } = req.body;

  try {
    const atualizado = await db('pacientes').where({ id }).update({
      nome, data_nascimento, telefone, email, endereco
    });

    if (!atualizado) {
      return res.status(404).send('Paciente não encontrado.');
    }

    res.send('Paciente atualizado com sucesso!');
  } catch (err) {
    console.error('Erro ao atualizar paciente:', err);
    res.status(500).send('Erro ao atualizar paciente.');
  }
};

// Deletar paciente
exports.deletePaciente = async (req, res) => {
  const { id } = req.params;

  try {
    const deletado = await db('pacientes').where({ id }).del();

    if (!deletado) {
      return res.status(404).send('Paciente não encontrado.');
    }

    res.send('Paciente deletado com sucesso!');
  } catch (err) {
    console.error('Erro ao deletar paciente:', err);
    res.status(500).send('Erro ao deletar paciente.');
  }
};

const knex = require('../config/knex');

exports.getAllPacientes = async (req, res) => {
  try {
    const pacientes = await knex('pacientes').select('id', 'nome');
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pacientes.' });
  }
};
