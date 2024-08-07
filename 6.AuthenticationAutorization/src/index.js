const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session'); 

const app = express();
const port = 3000;
const secret = 'mysecret';

const hbs = handlebars.create({
    extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    if(username != 'pepi' || password != '1234'){
        res.status(401).send('Invalid username or password');
        return;
    } 

    req.session.user = 'pepi';
    res.redirect('/');
});

app.get('profile', (req, res) => {
    res.render('profile');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });
