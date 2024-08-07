const express = require("express");
const handlebars = require("express-handlebars");
const session = require("express-session");
const { loginUser } = require("./auth");

const app = express();
const port = 3000;
const secret = "mysecret";

const hbs = handlebars.create({
    extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.get("/", (req, res) => {
    const user = req.session.user;
    console.log(user);
    res.render("home", { user });
});

app.get("/login", (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render("login", { error });
});

app.post("/login", (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    try{
        const user = loginUser(username, password);
        req.session.user = user;
        res.redirect("/");
    } catch (err) {
        req.session.error = {
            type: "login",
            message: err.message
        };
        res.redirect("/login");
        return;
    } 
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
