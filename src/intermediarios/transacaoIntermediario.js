const validarCamposTransacao = (req, res, next) => {
    const { descricao, valor, categoria_id, tipo, data } = req.body;

    if (!descricao || !valor || !data || !categoria_id || !tipo) return res.status(400).json({mensagem: 'Obrigatório informar descricao, valor, categoria_id e tipo.'});

    if (tipo !== 'entrada' && tipo !== 'saida') return res.status(400).json({mensagem: `O tipo da operaçao deve ser 'entrada' ou 'saida'`});

    next()
};

module.exports = validarCamposTransacao;