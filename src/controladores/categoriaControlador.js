const pool = require("../conexao");

const listarCategorias = async (req, res) => {
    const query = `select * from categorias`;
    try {
        const categorias = await pool.query(query);
        return res.json(categorias);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

module.exports = { listarCategorias };