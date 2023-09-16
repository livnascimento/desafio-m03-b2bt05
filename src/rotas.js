const express = require('express');
const rotas = express();
const { cadastrarUsuario } = require('./controladores/usuarioControlador');

rotas.post('/usuario', cadastrarUsuario);

module.exports = rotas;