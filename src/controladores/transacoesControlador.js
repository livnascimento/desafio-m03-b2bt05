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

module.exports = { listarTransacoes };