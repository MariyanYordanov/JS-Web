const express = require('express');
const hb = require('express-handlebars');
const { homeController, errorController } = require('./controllers/home');
const { catalogController, detailsController } = require('./controllers/catalog');
const { createController, editController, deleteController } = require('./controllers/create');
const { searchController } = require('./controllers/search'); 

const app = express();
const port = 3000;

const hbs = hb.create( {
    extname: '.hbs'
});

app.use(express.json());

app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
