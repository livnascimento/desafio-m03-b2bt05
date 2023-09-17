const express = require('express');
const rotas = express();
const { 
    cadastrarUsuario, 
    login, 
    detalharUsuario
} = require('./controladores/usuarioControlador');
const { 
    validarCadastro,
    validarToken
} = require('./intermediarios/usuarioIntermediario');

rotas.post('/usuario', validarCadastro, cadastrarUsuario);
rotas.post('/login', login);

rotas.use(validarToken);

rotas.get('/usuario', detalharUsuario);

module.exports = rotas;