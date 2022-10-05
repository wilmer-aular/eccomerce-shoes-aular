const Product = require('../services/product.service.js');
const product = new Product('products');

const getBody = ({ ...body }) => {
    delete body.page;
    return body;
}

const productController = {
    find: async (req, res) => {
        return res.send(await product.find(req.params.id))
    },
    create: async (req, res) => {
        const data = await product.create(getBody(req.body));
        if (req.body.page) return res.status(301).redirect("/products");
        return res.send(data)
    },
    update: async (req, res) => {
        const data = await product.update(req.params.id, getBody(req.body))
        if (req.body.page) return res.status(301).redirect("/products");
        return res.send(data)
    },
    deleteById: async (req, res) => {
        return res.send(await product.deleteById(req.params.id))
    },
}

module.exports = productController;