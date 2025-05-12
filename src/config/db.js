const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Univesp@compass',
    database: process.env.DB_NAME || 'clinica_psicologia'
  },
  pool: { min: 0, max: 10 } // Opcional, mas recomendado para controle de conexões
});

module.exports = db;
