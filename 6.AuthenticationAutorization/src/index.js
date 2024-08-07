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
    const user = req.session.user;
   console.log(user); 
    res.render('home', { user });
});

app.get('/login', (req, res) => {
    const error = req.session.error;
    delete req.session.error;

    res.render('login', { error });
});

app.post('/login', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    if(username != 'pepi' || password != '1234'){
        req.session.error = 'Invalid username or password';
        res.redirect('/login');
        return;
    } 

    req.session.user = 'pepi';
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
