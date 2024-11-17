const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pacienteRoutes = require('../routes/pacienteRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/pacientes', pacienteRoutes);

jest.setTimeout(10000);  // Aumentar o timeout para 10 segundos

describe('API de Pacientes', () => {
    it('Deve cadastrar um novo paciente', async () => {
        const res = await request(app)
            .post('/pacientes')
            .send({
                nome: 'João Silva',
                data_nascimento: '1980-05-20',
                telefone: '123456789',
                email: 'joao.silva@example.com',
                endereco: 'Rua das Flores, 123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('Paciente cadastrado com sucesso!');
    });
});
