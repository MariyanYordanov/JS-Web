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
    body("email")
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("Invalid email"),
    body("password")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long"),
    body('repass')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),
    (req, res) => {
        const result = validationResult(req);
        const errors = Object.fromEntries(result.errors.map((e) => [e.path, e.msg]));

        console .log(errors);

        if (result.errors.length) {
            res.render('home', { data: req.body, errors });
            return;
        }
        res.redirect('/');
    }
);

module.exports = {
    router,
};
