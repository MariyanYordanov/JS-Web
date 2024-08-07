const data = require('../../data/catalog.json');

function getProducts() {
    return data;
}   

function getProductById(id) {
    return data.find(p => p.id == id);
}

function createProduct(productData) {
    const newProduct = {
        id: data.length + 1,
        name: productData.name,
        description: productData.description,
        price: Number(productData.price)
    };

    data.push(newProduct);

    return newProduct;
}

function editProduct(id, productData) {
    const product = getProductById(id);

    product.name = productData.name;
    product.description = productData.description;
    product.price = Number(productData.price);
}

function deleteProduct(id) {
    const index = data.findIndex(p => p.id == id);

    data.splice(index, 1);
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct
};
