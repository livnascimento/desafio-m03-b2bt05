const pool = require('../conexao');

const verificarEmailExistente = async (email) => {
    const query = `select * from usuarios where email = $1`;
    const params = [email];
    const usuario = await pool.query(query, params);

    if (usuario.rowCount === 0)  return false; 

    return true;
}

module.exports = { verificarEmailExistente }