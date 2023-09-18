const pool = require("../conexao");

const listarTransacoes = async (req, res) => {

    const { id } = req.usuario;

    try {
        const query = "select * from  transacoes where usuario_id = $1";
        const params = [id];
        const transacoes = await pool.query(query, params);

        return res.json(transacoes.rows)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

// acho que faltou validar se a transação pertence ao usuário logado
const detalharTransacao = async (req, res) => {
    const { id } = req.params;

    try {
        const query = "select * from  transacoes where id = $1";
        const params = [id];
        const transacao = await pool.query(query, params);
        if (transacao.rowCount < 1) return res.status(404).json({ mensagem: "Transação não encontrada" })

        return res.json(transacao.rows)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

const cadastrarTransacao = async (req, res) => {
    const { id } = req.usuario;
    const { descricao, valor, categoria_id, tipo, data } = req.body;

    if (!descricao || !valor || !data || !categoria_id || !tipo) return res.status(400).json({mensagem: 'Obrigatório informar descricao, valor, categoria_id e tipo.'});

    if (tipo !== 'entrada' && tipo !== 'saida') return res.status(400).json({mensagem: `O tipo da operaçao deve ser 'entrada' ou 'saida'`});

    try {
        const query = 'insert into transacoes (descricao, valor, data, categoria_id, usuario_id, tipo) values ($1, $2, $3, $4, $5, $6) returning *';
        const params = [descricao, valor, data, categoria_id, id, tipo];

        const transacao = await pool.query(query, params);

        return res.status(201).json(transacao.rows[0]);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

module.exports = {
    listarTransacoes,
    detalharTransacao,
    cadastrarTransacao
};