/*
const url = new URL(`http://localhost:3000/content/?name=John&age=30`);

console.log(url.searchParams.get('name')); // John
console.log(url.searchParams.get('age')); // 30

console.log(url);
 */

const http = require('http');   

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello World!');
    res.end();
    }).listen(3000);