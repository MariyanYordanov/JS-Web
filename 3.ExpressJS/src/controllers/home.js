module.exports = {
    homeController: (req, res) => {
        res.render('home', {user: 'John Doe'});
    },
    errorController: (req, res) => {
        res.render('404', {message: 'ERROR 404: Page not found'});
    }
}