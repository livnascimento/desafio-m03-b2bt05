const jwt = require('jsonwebtoken');
require('dotenv/config');
const { verificarEmailExistente } = require("../servicos/usuarioServicos");
const pool = require('../conexao');

const validarCadastro = async (req, res, next) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });

    const emailExistente = await verificarEmailExistente(email);

    if (emailExistente) return res.status(400).json({ mensagem: "E-mail já cadastrado." });

    next();
}

const validarToken = async (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ mensagem: "Não autorizado." });

    const senhaJwt = process.env.SENHA_JWT;

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, senhaJwt);

        const usuario = await pool.query(`select * from usuarios where id = $1`, [id]);

        if (usuario.rowCount === 0) return res.status(401).json({ mensagem: "Não autorizado." });

        req.usuario = usuario.rows[0];

        next();

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }

}

const validarAtualizacao = async (req, res, next) => {
    const { nome, email, senha } = req.body;
    const { id } = req.usuario;

    if (!nome || !email || !senha) req.status(400).json({ mensagem: "Todos os campos são obrigatórios" });

    try {
        const query = "select * from usuarios where email = $1";
        const params = [email];

        const usuario = await pool.query(query, params);

        if (usuario.rowCount > 0) {
            if (id != usuario.rows[0].id) return res.status(400).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." });
        }

        next();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = {
    validarCadastro,
    validarToken,
    validarAtualizacao
};