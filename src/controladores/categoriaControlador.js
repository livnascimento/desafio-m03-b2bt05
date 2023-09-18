const pool = require("../conexao");

const listarCategorias = async (req, res) => {
    const query = `select * from categorias`;

    const categorias = await pool.query(query);
};