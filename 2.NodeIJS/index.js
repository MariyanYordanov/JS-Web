
const xisx = require("xlsx");
const fs = require("fs");
const { print, add, data } = require("./util");


print("Hello from util.js" + " " + add(10, 20));
print(data[1]);

fs.writeFileSync("./output.txt", "Hello from Node.js");
