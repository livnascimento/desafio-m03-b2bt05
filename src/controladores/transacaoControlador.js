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

const atualizarTransacao = async (req, res) => {
    const { id: id_usuario } = req.usuario;
    const { id: id_transacao } = req.params;
    const { descricao, valor, categoria_id, tipo, data } = req.body;

    try {
    const query = 'update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where usuario_id = $6 and id = $7';
    const params = [descricao, valor, data, categoria_id, tipo, id_usuario, id_transacao];

    const transacao = await pool.query(query, params);

    if (transacao.rowCount < 1) return res.status(404).json({ mensagem: 'Transação não encontrada.' });

    return res.status(204).json();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

};

const deletarTransacao = async (req, res) => {
    const {id: id_usuario} = req.usuario;
    const {id: id_transacao} = req.params;

    try {
        const query = 'delete from transacoes where id = $1 and usuario_id = $2';
        const params = [id_transacao, id_usuario];
    
        const transacao = await pool.query(query, params);
    
        if (transacao.rowCount < 1) return res.status(404).json({mensagem: "Transação não encontrada."});
    
        return res.status(204).json();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = {
    listarTransacoes,
    detalharTransacao,
    cadastrarTransacao,
    atualizarTransacao,
    deletarTransacao
};