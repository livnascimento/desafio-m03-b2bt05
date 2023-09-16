const express = require('express');
const rotas = express();

rotas.get('/', (req, res) => {
    console.log('Rodando');
    res.send('Rolou');
});

module.exports = rotas;