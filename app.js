
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

const API_URL = 'https://ron-swanson-quotes.herokuapp.com/v2';

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/message', async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/quotes`);
        const msg = response.data[0];

        res.render('message', { msg: msg });
    } catch (err) {
        console.error('Erro ao consultar a API:', err.message);

        res.status(500).send(
            'Não foi possível obter a mensagem. Tente novamente.'
        );
    }
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});