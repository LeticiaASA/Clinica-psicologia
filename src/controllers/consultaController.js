const db = require('../config/knex');

exports.createConsulta = async (req, res) => {
  const { id_paciente, data_hora, motivo } = req.body;
  try {
    console.log('Tentando conectar ao banco de dados...');
    await db.raw('SELECT 1+1 AS result');
    console.log('Conexão ao banco de dados bem-sucedida.');

    await db('consultas').insert({ id_paciente, data_hora, motivo });
    res.status(200).send('Consulta agendada com sucesso!');
  } catch (err) {
    console.error('Erro ao agendar consulta:', err);
    res.status(500).send('Erro ao agendar consulta.');
  }
};
