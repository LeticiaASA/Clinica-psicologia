const db = require('../config/db');

exports.createConsulta = (req, res) => {
    const { id_paciente, data_hora, motivo } = req.body;
    const sql = 'INSERT INTO consultas (id_paciente, data_hora, motivo) VALUES (?, ?, ?)';
    db.query(sql, [id_paciente, data_hora, motivo], (err, result) => {
        if (err) throw err;
        res.send('Consulta agendada com sucesso!');
    });
};
