const express = require("express");
const handlebars = require("express-handlebars");
const { router } = require("./controllers/home");
const { sessionRouter } = require("./controllers/session");

const app = express();
const port = 3000;

app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));

const hbs = handlebars.create({
    extname: ".hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.use(router);
app.use(sessionRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
