import express from 'express';
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors());

const tweets = [];
const users = [];

server.post('/sign-up', (req, res) => {
    if (!req.body.avatar || !req.body.username) {
        res.status(400).send('Todos os campos são obrigatórios!');
    } else {
        users.push(req.body);
        res.status(201).send("OK");
    }
});

/* server.post('/tweets', (req, res) => {
    if (!req.body.username || !req.body.tweet) {
        res.status(400).send('Todos os campos são obrigatórios!');
    } else {
        const avatar = users.find((value) => req.body.username === value.username).avatar;
        const tweet = {
            ...req.body,
            avatar
        };

        tweets.push(tweet);
        res.status(201).send("OK");
    }
}); */

server.get('/tweets', (req, res) => {
    /* let i = tweets.length - 1;
    let tenTweets = [];
    while (i > (tweets.length - 10) || tweets[i] !== null) {
        tenTweets.push(tweets[i]);
        i--;
    } */

    const tenTweets = [...tweets].splice(tweets.length - 10).reverse();
    //const tenTweets = [...tweets].splice(0, 10);

    res.send(tenTweets);
});

server.get('/tweets/:username', (req, res) => {
    const username = req.params.username;
    let flag = 0;
    let userTweets = [];
    for (let i = 0; i < tweets.length; i++) {
        if (username === tweets[i].username) {
            userTweets.push(tweets[i]);
            flag = 1
        }
    }

    if (flag === 0) {
        res.status(400).send('Usuário não encontrado');
    } else {
        res.send(userTweets);
    }
});

server.post('/tweets', (req, res) => {
    if (!req.headers.user || !req.body.tweet) {
        res.status(400).send('Todos os campos são obrigatórios!');
    } else {
        const avatar = users.find((value) => req.headers.user === value.username).avatar;
        const tweet = {
            username: req.headers.user,
            tweet: req.body.tweet,
            avatar: avatar
        };

        tweets.push(tweet);
        res.status(201).send("OK");
    }
});

server.listen(5000, () => console.log('Listening on port 5000')); 