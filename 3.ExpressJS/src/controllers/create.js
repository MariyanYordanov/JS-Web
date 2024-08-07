const { createProduct, getProductById } = require('../services/products');
const { editProduct } = require('../services/products');

module.exports = {
    createController: {
        get: (req, res) => {
            res.render('create');
        },
        post: (req, res) => {
            const { name, description, price } = req.body;
            
            if(!name || !description || !price){
                res.render('create', { name, description, price, error: { name: !name, description: !description, price: !price} });
                return;
            }

            const result = createProduct(req.body);

            res.redirect(`/catalog/${result.id}`, 301);
        }
    },
    editController: {
        get: (req, res) => {

            const { id } = req.params;
            const product = getProductById(Number(id));

            if(!product){
                res.redirect('/404');
                return;
            }

            res.render('edit', product );
        },
        post: (req, res) => {
            const { name, description, price } = req.body;
            const { id } = req.params;
            
            if(!name || !description || !price){
                res.render('edit', {
                        name,
                        description, 
                        price, 
                        error: {
                            name: !name, 
                            description: !description, 
                            price: !price
                        } 
                    });
                return;
            }

            editProduct(id, req.body);

            res.redirect(`/catalog/${id}`, 301); 
        }
    },
    deleteController: {
        post: (req, res) => {

            const { id } = req.params;

            if(!id){
                res.redirect('/404');
                return;
            }

            deleteProduct(id);
            
            res.redirect('/catalog', 301);
        }
    }
};