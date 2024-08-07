const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds.json');
const cats = require('../data/cats.json');

const placeholderImage = 'little-cute-cat.jpg';

function serveFile(filePath, res, catId = null) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.end('Internal Server Error');
            return;
        }

        let modifiedData = data;
        
        if (catId) {
            const currentCat = cats.find(cat => cat.id === catId);
            if (!currentCat) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('Cat not found');
                res.end();
                return;
            }
            modifiedData = modifiedData.replace('{{id}}', catId);
            modifiedData = modifiedData.replace('{{name}}', currentCat.name);
            modifiedData = modifiedData.replace('{{description}}', currentCat.description);
            modifiedData = modifiedData.replace('{{breed}}', currentCat.breed);
        }

        let catBreedPlaceholder = breeds.map(breed => `<option value="${breed}">${breed}</option>`).join('\n');
        modifiedData = modifiedData.replace('{{catBreeds}}', catBreedPlaceholder);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(modifiedData);
        res.end();
    });
}

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        const filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));
        serveFile(filePath, res);

    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        const filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));
        serveFile(filePath, res);

    } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
        let formData = '';

        req.on('data', (data) => {
            formData += data;
        });

        req.on('end', () => {
            let body = qs.parse(formData);

            fs.readFile('./data/breeds.json', (err, data) => {
                if (err) {
                    throw err;
                }

                let breeds = JSON.parse(data);
                breeds.push(body.breed);
                let json = JSON.stringify(breeds);

                fs.writeFile('./data/breeds.json', json, 'utf-8',
                    () => console.log(`The ${body.breed} was uploaded successfully.`));
            });

            res.writeHead(302, {
                'Location': '/'
            });
            res.end();
        });
    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
        let form = new formidable.IncomingForm({
            allowEmptyFiles: true,
            minFileSize: 0 
        });

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error('Error during form parsing:', err);
                res.statusCode = 400;
                res.end('Error processing form');
                return;
            }

            if (!files.upload || !files.upload.name) {
                fields.image = placeholderImage; 
            } else {
                let oldPath = files.upload.path;
                let newPath = path.join(__dirname, '../content/images', files.upload.name);

                fs.rename(oldPath, newPath, (err) => {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.end('Internal Server Error');
                        return;
                    }

                    console.log(`${files.upload.name} was uploaded successfully.`);
                });

                fields.image = files.upload.name;
            }

            const catsPath = path.join(__dirname, '../data/cats.json');

            fs.readFile(catsPath, (err, data) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                    return;
                }

                let allCats = JSON.parse(data);
                allCats.push({
                    id: allCats.length + 1,
                    ...fields,
                    image: fields.image
                });
                let json = JSON.stringify(allCats);

                fs.writeFile(catsPath, json, 'utf-8', () => {
                    console.log(`The cat was uploaded successfully.`);
                    res.writeHead(302, {
                        'Location': '/'
                    });
                    res.end();
                });
            });
        });
    } else if (pathname.includes('/cats/edit') && req.method === 'GET') {
        const catId = pathname.split('/')[3]; 
        const filePath = path.normalize(path.join(__dirname, '../views/editCat.html'));
        serveFile(filePath, res, catId);

    } else if (pathname.includes('/cats/find-new-home') && req.method === 'GET') {
        const filePath = path.normalize(path.join(__dirname, '../views/catShelter.html'));
        serveFile(filePath, res);

    } else if (pathname.includes('/cats/edit') && req.method === 'POST') {
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error('Error during form parsing:', err);
                res.statusCode = 400;
                res.end('Error processing form');
                return;
            }

            const catId = fields.id;

            let currentCat = cats.find(cat => cat.id == catId);
            if (!currentCat) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('Cat not found');
                res.end();
                return;
            }

            currentCat.name = fields.name;
            currentCat.description = fields.description;
            currentCat.breed = fields.breed;

            if (files.upload && files.upload.name) {
                let oldPath = files.upload.path;
                let newPath = path.join(__dirname, '../content/images', files.upload.name);

                fs.rename(oldPath, newPath, (err) => {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.end('Internal Server Error');
                        return;
                    }

                    currentCat.image = files.upload.name;
                    console.log(`${files.upload.name} was uploaded successfully.`);
                });
            }

            const catsPath = path.join(__dirname, '../data/cats.json');
            fs.writeFile(catsPath, JSON.stringify(cats), 'utf-8', () => {
                console.log(`The cat was updated successfully.`);
                res.writeHead(302, {
                    'Location': '/'
                });
                res.end();
            });
        });
    } else if (pathname.includes('/cats/find-new-home') && req.method === 'POST') {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields) => {
            if (err) {
                console.error('Error during form parsing:', err);
                res.statusCode = 400;
                res.end('Error processing form');
                return;
            }

            let currentCat = cats.find(cat => cat.id === fields.id);
            if (!currentCat) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('Cat not found');
                res.end();
                return;
            }

            cats.splice(cats.indexOf(currentCat), 1);

            const catsPath = path.join(__dirname, '../data/cats.json');
            fs.writeFile(catsPath, JSON.stringify(cats), 'utf-8', () => {
                console.log(`The cat was removed successfully.`);
                res.writeHead(302, {
                    'Location': '/'
                });
                res.end();
            });
        });
    } else {
        return true;
    }
};
