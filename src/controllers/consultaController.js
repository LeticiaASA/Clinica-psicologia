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

exports.realizarConsulta = async (req, res) => {
  const { id } = req.params;

  try {
    const consulta = await db('consultas').where({ id }).first();

    if (!consulta) {
      return res.status(404).json({ erro: 'Consulta não encontrada.' });
    }

    await db('consultas')
      .where({ id })
      .update({
        status: 'realizada',
        valor: 150.00,
      });

    return res.status(200).json({ mensagem: 'Consulta realizada com sucesso.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao atualizar a consulta.' });
  }
};
// Função para gerar relatório financeiro por mês
exports.relatorioFinanceiroPorMes = async (req, res) => {
  try {
    // Consulta no banco de dados
    const result = await db('consultas')
      .where('status', 'realizada')  // Considera apenas consultas realizadas
      .select(db.raw('MONTH(data_hora) as mes'), db.raw('YEAR(data_hora) as ano'), db.raw('SUM(valor) as total'))
      .groupByRaw('YEAR(data_hora), MONTH(data_hora)')  // Agrupamento por ano e mês
      .orderBy('ano', 'desc')  // Ordenar por ano de forma decrescente
      .orderBy('mes', 'desc'); // Ordenar por mês de forma decrescente

    // Retorna o resultado
    if (result.length === 0) {
      return res.status(404).json({ erro: 'Nenhum dado encontrado para o relatório.' });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error('Erro ao gerar relatório financeiro:', err);
    return res.status(500).json({ erro: 'Erro ao gerar relatório financeiro.' });
  }
};
exports.relatorioPorPaciente = async (req, res) => {
  const { id } = req.params;

  try {
    const relatorio = await db('consultas')
      .join('pacientes', 'consultas.id_paciente', '=', 'pacientes.id')
      .where('consultas.id_paciente', id)
      .andWhere('consultas.status', 'realizada')
      .select(
        'pacientes.nome',
        db.raw('COUNT(consultas.id) as total_consultas'),
        db.raw('SUM(consultas.valor) as total_pago')
      )
      .groupBy('pacientes.nome');

    if (relatorio.length === 0) {
      return res.status(404).json({ mensagem: 'Nenhuma consulta realizada para este paciente.' });
    }

    res.json(relatorio[0]);
  } catch (erro) {
    console.error('Erro ao gerar relatório por paciente:', erro);
    res.status(500).json({ erro: 'Erro ao gerar relatório financeiro por paciente.' });
  }
};

exports.relatorioFinanceiro = async (req, res) => {
  const { mes, paciente } = req.query;

  try {
    const query = db('consultas')
      .join('pacientes', 'consultas.id_paciente', '=', 'pacientes.id')
      .select(
        'consultas.data_hora',
        'consultas.motivo',
        'consultas.status',
        'consultas.valor',
        'pacientes.nome as nome_paciente',
        'consultas.id_paciente'
      );

    if (mes) {
      query.whereRaw('DATE_FORMAT(consultas.data_hora, "%Y-%m") = ?', [mes]);
    }

    if (paciente) {
      query.where('consultas.id_paciente', paciente);
    }

    const resultado = await query;

    res.json(resultado);
  } catch (err) {
    console.error('Erro ao gerar relatório:', err);
    res.status(500).json({ erro: 'Erro ao gerar relatório' });
  }
};

exports.buscarPorNome = async (req, res) => {
  const { nome } = req.params;

  try {
    const resultado = await db('consultas')
      .join('pacientes', 'consultas.id_paciente', '=', 'pacientes.id')
      .where('pacientes.nome', 'like', `%${nome}%`)
      .select(
        'pacientes.nome',
        'consultas.data_hora',
        'consultas.motivo',
        'consultas.valor',
        'consultas.status'
      );

    res.json(resultado);
  } catch (erro) {
    console.error('Erro ao buscar por nome:', erro);
    res.status(500).json({ erro: 'Erro ao buscar por nome' });
  }
};

exports.buscarPorData = async (req, res) => {
  const { inicio, fim } = req.query;

  try {
    const resultado = await db('consultas')
      .join('pacientes', 'consultas.id_paciente', '=', 'pacientes.id')
      .whereBetween('consultas.data_hora', [`${inicio} 00:00:00`, `${fim} 23:59:59`])
      .select(
        'pacientes.nome',
        'consultas.data_hora',
        'consultas.motivo',
        'consultas.valor',
        'consultas.status'
      );

    res.json(resultado);
  } catch (erro) {
    console.error('Erro ao buscar por data:', erro);
    res.status(500).json({ erro: 'Erro ao buscar por data' });
  }
};
