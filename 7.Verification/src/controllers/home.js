const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        message: 'Hello, World!'
    });
});

module.exports = {
    router
}