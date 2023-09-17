const express = require('express');
const rotas = express();
const { 
    cadastrarUsuario, 
    login 
} = require('./controladores/usuarioControlador');
const { validarCadastro } = require('./intermediarios/usuarioIntermediario');

rotas.post('/usuario', validarCadastro, cadastrarUsuario);
rotas.post('/login', login);

module.exports = rotas;