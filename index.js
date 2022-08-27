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
    //tweets.unshift(tweet);
    res.send("OK");
});

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

server.listen(5000, () => console.log('Listening on port 5000'));