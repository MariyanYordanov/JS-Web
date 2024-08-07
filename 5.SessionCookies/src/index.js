const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const port = 3000;

app.use('static',express.static('static'));
app.use(express.urlencoded({ extended: true }));

const hbs = handlebars.create({
    extname: '.hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
    });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});