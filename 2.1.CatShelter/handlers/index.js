const staticFilesHandler = require('./static-files');
const homeHandler = require('./home');
const catHandler = require('./cat'); 

module.exports = [
    homeHandler,
    staticFilesHandler,
    catHandler,
];
