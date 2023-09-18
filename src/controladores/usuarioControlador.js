const pool = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');

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

const login = async (req, res) => {
    const { email, senha } = req.body;
    const senhaJwt = process.env.SENHA_JWT;

    if (!email || !senha) return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });

    try {

        const query = `select * from usuarios where email = $1`;
        const params = [email];

        const usuario = await pool.query(query, params);

        if (usuario.rowCount === 0) return res.status(400).json({ mensagem: "Credenciais inválidas." });

        const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);

        if (!senhaValida) return res.status(400).json({ mensagem: "Credenciais inválidas." });

        const token = jwt.sign({ id: usuario.rows[0].id }, senhaJwt, { expiresIn: '8h' });

        const { senha: _, ...usuarioLogado } = usuario.rows[0];

        return res.status(201).json({ usuarioLogado, token });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: `erro interno do servidor` });
    }

};

const detalharUsuario = async (req, res) => {
    const { id } = req.usuario;

    try {
        const query = `select * from usuarios where id = $1`;
        const params = [id];

        const usuario = await pool.query(query, params);

        const { senha: _, ...usuarioLogado } = usuario.rows[0];

        return res.json(usuarioLogado);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

}

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const { id } = req.usuario;

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    try {
        const query = "update usuarios set nome = $1, email = $2, senha = $3 where id = $4";
        const params = [nome, email, senhaCriptografada, id];

        const usuario = await pool.query(query, params);

        res.status(204).send();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

}

module.exports = {
    cadastrarUsuario,
    login,
    detalharUsuario,
    atualizarUsuario
};