const express = require('express');
const app = express();
const port = 5000;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Serve arquivos estáticos na pasta 'public'
app.use(express.static('public'));

// Armazena os registros de humor temporariamente em um array
let humorDiario = [];

// Rota para exibir a página inicial com o humor_diario.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/humor_diario.html');
});

// Endpoint para receber o registro de humor
app.post('/api/humor', (req, res) => {
    const { humor } = req.body;

    if (humor) {
        const data = new Date();
        const registro = {
            data: data.toISOString().split('T')[0],
            humor: humor
        };

        humorDiario.push(registro);
        console.log("Humor registrado:", registro);
        res.status(201).json({ message: "Humor registrado com sucesso!", registro });
    } else {
        res.status(400).json({ message: "Humor não fornecido." });
    }
});

// Endpoint para obter todos os registros de humor
app.get('/api/humor', (req, res) => {
    res.json(humorDiario);
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});