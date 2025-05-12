const express = require('express');
const cors = require('cors');
const path = require('path');
const pacienteRoutes = require('./routes/pacienteRoutes');
const consultaRoutes = require('./routes/consultaRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rotas
app.use('/pacientes', pacienteRoutes);
app.use('/consultas', consultaRoutes);

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'pacienteView.html'));
});

// Rota para a página de agendamento de consultas
app.get('/consultas', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'consultaView.html'));
});

// Rota para painel administrativo
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
  });
  

// Inicializar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
