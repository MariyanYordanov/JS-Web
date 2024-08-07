const { getProducts, getProductById } = require('../services/products');

module.exports = {
    catalogController: (req, res) => {

        const products = getProducts();

        res.render('catalog', { products });
    },
    detailsController: (req, res) => {
        
        const { id } = req.params;
        const product = getProductById(id);

        if(!product){
            res.redirect('/404');
        }

        res.render('details',  product );
    }
};