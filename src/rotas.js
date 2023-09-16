const express = require('express');
const rotas = express();
const { cadastrarUsuario } = require('./controladores/usuarioControlador');
const { validarCadastro } = require('./intermediarios/usuarioIntermediario');

rotas.post('/usuario', validarCadastro, cadastrarUsuario);

module.exports = rotas;