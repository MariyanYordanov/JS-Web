const express = require('express');
const { router } = require('./controllers/home');
const { hbsConfig } = require('./config/hbs');

const app = express();
const port = 3000;

hbsConfig(app);
app.use(router);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});