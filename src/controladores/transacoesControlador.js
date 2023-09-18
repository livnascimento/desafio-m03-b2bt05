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

module.exports = {
    listarTransacoes,
    detalharTransacao
};