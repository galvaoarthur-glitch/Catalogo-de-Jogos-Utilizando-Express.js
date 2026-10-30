const express = require('express');
const app = express.Router();
app.use(express.json()); // Middleware para processar JSON

// Banco de dados em memória
let jogos = [];
let proximoId = 1;

// GET /jogos - Listar todos os jogos
app.get('/jogos', (req, res) => {
    res.status(200).json(jogos);
});

// GET /jogos/:id - Consultar um jogo pelo ID
app.get('/jogos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const jogo = jogos.find(j => j.id === id);

    if (!jogo) {
        return res.status(404).json({ mensagem: 'Jogo não encontrado.' });
    }

    res.status(200).json(jogo);
});

// POST /jogos - Cadastrar um novo jogo
app.post('/jogos', (req, res) => {
    const { titulo, plataforma, genero, anoLancamento } = req.body;

    // Validação dos campos obrigatórios (Requisito 3)
    if (!titulo || !plataforma || !genero || !anoLancamento) {
        return res.status(400).json({ 
            mensagem: 'Todos os campos (titulo, plataforma, genero e anoLancamento) são obrigatórios.' 
        });
    }

    const novoJogo = {
        id: proximoId++,
        titulo,
        plataforma,
        genero,
        anoLancamento
    };

    jogos.push(novoJogo);
    // Retornando 201 Created (Requisito 5)
    res.status(201).json(novoJogo);
});

// PUT /jogos/:id - Atualizar todos os dados de um jogo
app.put('/jogos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, plataforma, genero, anoLancamento } = req.body;
    
    const index = jogos.findIndex(j => j.id === id);

    // Verifica se o jogo existe (Requisito 4)
    if (index === -1) {
        return res.status(404).json({ mensagem: 'Jogo não encontrado.' });
    }

    // Atualiza os dados
    jogos[index] = {
        id,
        titulo: titulo || jogos[index].titulo,
        plataforma: plataforma || jogos[index].plataforma,
        genero: genero || jogos[index].genero,
        anoLancamento: anoLancamento || jogos[index].anoLancamento
    };

    res.status(200).json(jogos[index]);
});

// DELETE /jogos/:id - Remover um jogo do catálogo
app.delete('/jogos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = jogos.findIndex(j => j.id === id);

    // Verifica se o jogo existe (Requisito 4)
    if (index === -1) {
        return res.status(404).json({ mensagem: 'Jogo não encontrado para exclusão.' });
    }

    // Remove o jogo do array
    const jogoRemovido = jogos.splice(index, 1);

    res.status(200).json({
        mensagem: 'Jogo removido com sucesso.',
        jogo: jogoRemovido[0]
    });
});

module.exports = app;