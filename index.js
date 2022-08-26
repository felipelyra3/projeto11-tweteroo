import express from 'express';

const server = express();
server.use(express.json());

const receitas = [
    {
        nome: 'aaa',
        id: 1
    },
    {
        nome: 'bbb',
        id: 2
    }
]

server.get('/aloha', (req, res) => {
    res.send(receitas);
});

server.get('/', (req, res) => {
    res.send('Tá acessando o index');
});

server.post('/aloha', (req, res) => {
    /* const receita = {
        nome: 'ccc',
        id: 3
    }
    receitas.push(receita); */
    const novaReceita = req.body;
    novaReceita.id = receitas.length + 1;
    receitas.push(req.body);
    res.send(receitas);
})

server.listen(5000, () => console.log('Listening on port 5000'));