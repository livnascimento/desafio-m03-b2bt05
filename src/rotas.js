const express = require('express');
const rotas = express();
const {
    cadastrarUsuario,
    login,
    detalharUsuario,
    atualizarUsuario
} = require('./controladores/usuarioControlador');
const {
    validarCadastro,
    validarToken,
    validarAtualizacao
} = require('./intermediarios/usuarioIntermediario');
const { listarCategorias } = require('./controladores/categoriaControlador');
rotas.post('/usuario', validarCadastro, cadastrarUsuario);
rotas.post('/login', login);

rotas.use(validarToken);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', validarAtualizacao, atualizarUsuario);

rotas.get('/categoria', listarCategorias);

module.exports = rotas;