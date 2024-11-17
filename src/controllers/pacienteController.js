const db = require('../config/db');

exports.createPaciente = (req, res) => {
    const { nome, data_nascimento, telefone, email, endereco } = req.body;
    const sql = 'INSERT INTO pacientes (nome, data_nascimento, telefone, email, endereco) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nome, data_nascimento, telefone, email, endereco], (err, result) => {
        if (err) throw err;
        res.send('Paciente cadastrado com sucesso!');
    });
};
