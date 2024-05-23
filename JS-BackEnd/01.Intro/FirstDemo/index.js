const xlsx = require('xlsx');
const fs = require('fs');

const { print: myPrint, add , data } = require('./util');

myPrint('Hello world ' + add(1,2) + data[0]);
fs.writeFileSync('./output.txt','Hello World');
