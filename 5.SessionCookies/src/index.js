const express = require("express");
const handlebars = require("express-handlebars");
const { router } = require("./controllers/home");
const { sessionRouter } = require("./controllers/session");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const app = express();
const port = 3000;
const secret =  'keyboard supersecret';

app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));

const hbs = handlebars.create({
    extname: ".hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.use(router);
app.use(sessionRouter);
app.use(cookieParser(secret));
app.use(expressSession({
    secret,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
