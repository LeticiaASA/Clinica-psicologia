const db = require('../config/knex');

exports.createConsulta = async (req, res) => {
  const { id_paciente, data_hora, motivo } = req.body;
  try {
    await db('consultas').insert({ id_paciente, data_hora, motivo });
    res.send('Consulta agendada com sucesso!');
  } catch (err) {
    res.status(500).send('Erro ao agendar consulta.');
  }
};
