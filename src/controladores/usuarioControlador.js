const pool = require('../conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const query = `insert into usuarios (nome, email, senha) values($1, $2, $3) returning *`;
        const params = [nome, email, senhaCriptografada];

        const usuario = await pool.query(query, params);
        const { senha: _, ...usuarioCadastrado } = usuario.rows[0];

        return res.status(201).json(usuarioCadastrado);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: `erro interno do servidor` });
    }

};

module.exports = {
    cadastrarUsuario
};