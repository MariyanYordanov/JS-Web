const { Router } = require("express");
const { parserCookies } = require("../util");

const router = Router();

router.get("/", (req, res) => {

    const cookieData = req.headers['cookie'];
    const cookies = parserCookies(cookieData);
    const useTheme = cookies.theme == 'dark';

    res.render('home', { useTheme, title: 'Home'});
});

router.get("/set", (req, res) => {
    res.setHeader("Set-Cookie", "cookieDemo=Hello; HttpOnly; Secure");
    res.redirect("/");
});

router.get("/get", (req, res) => {
    const cookie = req.headers["cookie"];
    console.log(cookie);
    res.render("get", { title: "Get" });
});

router.get("/use-light", (req, res) => {
    res.setHeader("Set-Cookie", "theme=light;");
    res.redirect("/");
});

router.get("/use-dark", (req, res) => {
    res.setHeader("Set-Cookie", "theme=dark; HttpOnly");
    res.redirect("/");
});

module.exports = { router };
