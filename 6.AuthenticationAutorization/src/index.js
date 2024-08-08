const express = require("express");
const handlebars = require("express-handlebars");
const session = require("express-session");
const { loginUser, registerUser } = require("./auth");

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
    const formData = req.session.formData;

    delete req.session.error;
    delete req.session.formData;

    res.render("login", { error, formData });
});

app.post("/login", async (req, res) => {
    console.log(req.body);

    const { username, password } = req.body;

    try {
        const user = await loginUser(username, password);
        req.session.user = user;
        res.redirect("/");
    } catch (err) {
        req.session.error = {
            type: "login",
            message: err.message,
            formData: { username },
        };
        res.redirect("/login");
        return;
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.get("/register", (req, res) => {
    const error = req.session.error;
    const formData = req.session.formData;
    delete req.session.error;
    delete req.session.formData;
    res.render("register", { error, formData });
});

app.post("/register",async (req, res) => {
    const { username, password, repass } = req.body;
    try {
        const user = await registerUser(username, password, repass);
        req.session.user = user;
        res.redirect("/login");
    } catch (err) {
        req.session.error = {
            type: "register",
            message: err.message,
            formData: { username },
        };
        req.session.formData = { username };
        res.redirect("/register");
        return;
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
