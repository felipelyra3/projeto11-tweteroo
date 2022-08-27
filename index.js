import express from 'express';

const server = express();
server.use(express.json());

const tweets = [];
const users = [];

server.post('/sign-up', (req, res) => {
    users.push(req.body);
    res.send("OK");
});

server.post('/tweets', (req, res) => {
    const avatar = users.find((value) => req.body.username === value.username).avatar;
    const tweet = {
        ...req.body,
        avatar
    };

    /* const tweet = {
        username: req.body.username,
        tweet: req.body.tweet,
        avatar: avatar
    }; */

    tweets.push(tweet);
    res.send("OK");
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