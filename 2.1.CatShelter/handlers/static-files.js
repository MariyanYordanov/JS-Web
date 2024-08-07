const fs = require('fs');
const path = require('path');
const url = require('url');

function getContentType(url) {
    if (url.endsWith('.css')) {
        return 'text/css';
    } else if (url.endsWith('.html')) {
        return 'text/html';
    } else if (url.endsWith('.png')) {
        return 'image/png';
    } else if (url.endsWith('.jpg')) {
        return 'image/jpg';
    } else if (url.endsWith('.jpeg')) {
        return 'image/jpeg';
    } else if (url.endsWith('.ico')) {
        return 'image/svg+xml';
    } else if (url.endsWith('.js')) {
        return 'text/javascript';
    } else if (url.endsWith('.json')) {
        return 'application/json';
    }
    return 'application/octet-stream';
}

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname.startsWith('/content') && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, `..${pathname}`)
        );
        

        if((pathname.endsWith('png') || pathname.endsWith('jpg') || pathname.endsWith('jpeg') || pathname.endsWith('ico')) && req.method === 'GET') {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.log(err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.write('Internal Server Error');
                    res.end();
                    return;
                }
    
                res.writeHead(200, { 'Content-Type': getContentType(filePath) });
                res.write(data);
                res.end();
            });
        } else {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.write('Internal Server Error');
                    res.end();
                    return;
                }
    
                res.writeHead(200, { 'Content-Type': getContentType(filePath) });
                res.write(data);
                res.end();
            });
        }
        
    } else {
        return true;
    }
};
