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

rotas.post('/usuario', validarCadastro, cadastrarUsuario);
rotas.post('/login', login);

rotas.use(validarToken);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', validarAtualizacao, atualizarUsuario);

module.exports = rotas;