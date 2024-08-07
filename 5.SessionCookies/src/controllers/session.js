const { Router } = require('express');
const { parserCookies } = require('../util');
const e = require('express');

const sessionRouter = Router();

const sesions = {};

sessionRouter.get('/set-session', (req, res) => {
    const id = getId();
    sesions[id] = { visits: 0};
    res.setHeader('Set-Cookie', `sessionId=${id}; HttpOnly; Secure`);
    res.redirect('/get-session');
});

sessionRouter.get('/get-session', (req, res) => {
    const cookieData = req.headers['cookie'];
    const cookies = parserCookies(cookieData);
    const sessionId = cookies.sessionId;
    const session = sesions[sessionId];

    if(session){
        session.visits++;
        console.log(session);
    } else{
        console.log('Anonimous user');
    }

    res.render('session', { visits: session?.visits || 0, title: 'Session Page'});
});

function getId(){
    return 'xxxx-xxxx-xxxx-xxxx'.replace(/x/g, 
    () => Math.floor(Math.random() * 16).toString(16));
}

module.exports = { sessionRouter };