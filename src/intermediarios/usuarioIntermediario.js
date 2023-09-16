const { verificarEmailExistente } = require("../servicos/usuarioServicos");

const validarCadastro = async (req, res, next) => {
    const { nome, email, senha } = req.body;

    if (!nome|| !email || !senha) return res.status(400).json({mensagem:"Todos os campos são obrigatórios."});

    const emailExistente = await verificarEmailExistente(email);
    
    if (emailExistente) return res.status(400).json({mensagem: "E-mail já cadastrado."});

    next();
}

module.exports = { validarCadastro };