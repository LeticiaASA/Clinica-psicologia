const db = require('../config/knex');

exports.createPaciente = async (req, res) => {
  const { nome, data_nascimento, telefone, email, endereco } = req.body;
  try {
    console.log('Tentando conectar ao banco de dados...');
    await db.raw('SELECT 1+1 AS result');
    console.log('Conexão ao banco de dados bem-sucedida.');

    await db('pacientes').insert({ nome, data_nascimento, telefone, email, endereco });
    res.status(200).send('Paciente cadastrado com sucesso!');
  } catch (err) {
    console.error('Erro ao cadastrar paciente:', err);
    res.status(500).send('Erro ao cadastrar paciente.');
  }
};
