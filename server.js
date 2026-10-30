const express = require('express');
const rotasJogos = require('./rotas/jogos');
const app = express();

const PORTA = 3000;

// Configura o recebimento de requisições com corpo JSON (Requisito 1)
app.use(express.json());

// Middleware de Log: registra no console o método e a URL (Requisito 6)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next(); // Passa o controle para o próximo middleware/rota
});

// Integração das rotas de jogos (Requisito 8)
app.use('/', rotasJogos);

// Tratamento para rotas inexistentes - Fallback (Requisito 7)
app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada. Verifique o endpoint e o método HTTP informados.'
    });
});

// Inicia o servidor na porta especificada (Requisito 1)
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}...`);
});