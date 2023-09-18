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
const { 
    listarTransacoes, 
    detalharTransacao, 
    cadastrarTransacao, 
    atualizarTransacao,
    deletarTransacao
} = require('./controladores/transacaoControlador');
const validarCamposTransacao = require('./intermediarios/transacaoIntermediario');

rotas.post('/usuario', validarCadastro, cadastrarUsuario);
rotas.post('/login', login);

rotas.use(validarToken);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', validarAtualizacao, atualizarUsuario);

rotas.get('/categoria', listarCategorias);

rotas.get('/transacao', listarTransacoes);
rotas.get('/transacao/:id', detalharTransacao);
rotas.post('/transacao', validarCamposTransacao, cadastrarTransacao);
rotas.put('/transacao/:id', validarCamposTransacao, atualizarTransacao);
rotas.delete('/transacao/:id', deletarTransacao);

module.exports = rotas;