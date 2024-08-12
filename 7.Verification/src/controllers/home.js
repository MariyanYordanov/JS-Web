const { Router } = require("express");
const { body, validationResult } = require("express-validator");

const router = Router();

router.get("/", (req, res) => {
    res.render("home", {
        title: "Home Page",
        message: "Validation Demo",
    });
});

router.post(
    "/",
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long"),
    (req, res) => {
        const result = validationResult(req);
        const errors = result.errors.map((error) => error.msg); 

        console .log(errors);

        if (errors.length) {
            res.render('home', { errors});
            return;
        }
        res.redirect('/');
    }
);

module.exports = {
    router,
};
