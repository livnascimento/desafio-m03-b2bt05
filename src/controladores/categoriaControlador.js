const pool = require("../conexao");

const listarCategorias = async (req, res) => {
    const query = `select * from categorias`;
    try {
        const categorias = await pool.query(query);
        return res.json(categorias.rows);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

module.exports = { listarCategorias };