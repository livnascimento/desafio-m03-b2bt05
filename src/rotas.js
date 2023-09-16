const express = require('express');
const rotas = express();
const { cadastrarUsuario } = require('./controladores/usuarioControlador');

rotas.get('/usuario', cadastrarUsuario);

module.exports = rotas;