const express = require("express");
const handlebars = require("express-handlebars");

const app = express();
const port = 3000;

app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));

const hbs = handlebars.create({
    extname: ".hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    const cookieData = req.headers["cookie"];
    const cookies = Object.fromEntries(
        cookieData
            .split(";")
            .map(kvp => kvp.trim())
            .filter(kvp => kvp)
            .map(kvp => kvp.split("="))
    );
    const theme = cookies.theme == "dark";
    res.render('home', { theme, title: "Home" });
});

app.get("/set", (req, res) => {
    res.setHeader("Set-Cookie", "cookieDemo=Hello; HttpOnly; Secure");
    res.redirect("/");
});

app.get("/get", (req, res) => {
    const cookie = req.headers["cookie"];
    console.log(cookie);
    res.render('get', { title: "Get" });
});

app.get("/use-light", (req, res) => {
    res.setHeader("Set-Cookie", "theme=light;");
    res.redirect("/");
});

app.get("/use-dark", (req, res) => {
    res.setHeader("Set-Cookie", "theme=dark; HttpOnly");
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
