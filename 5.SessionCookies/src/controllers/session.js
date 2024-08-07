const { Router } = require('express');

const sessionRouter = Router();

const sesions = {};

sessionRouter.get('/set-session', (req, res) => {
    const id = getId();
    sesions[id] = {};
    res.setHeader('Set-Cookie', `sessionId=${id}; HttpOnly; Secure`);
    res.redirect('/get-session');
});

sessionRouter.get('/get-session', (req, res) => {
    res.render('session', { title: 'Session Page' });
});

function getId(){
    return 'xxxx-xxxx-xxxx-xxxx'.replace(/x/g, 
    () => Math.floor(Math.random() * 16).toString(16));
}

module.exports = { sessionRouter };