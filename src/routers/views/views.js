let router = require("express-promise-router")();
const { verifyUser, verifyAuth } = require("../../midleware/authorization.midleware");
const routers = require("../../util/util");
const Product = require('../../services/product.service.js');
const product = new Product('products');



router.get("/new_product", [verifyAuth, verifyUser], async (req, res, next) => {
    //render es para que muestre el form de crear productos
    return res.render("createProduct.hbs");
});
router.get("/edit_product/:id", [verifyAuth, verifyUser], async (req, res, next) => {
    const data = await product.find(req.params.id);
    return res.render("createProduct.hbs", { product: data });
});
router.get("/products", [verifyAuth], async (req, res, next) => {
    const products = await product.find();
    return res.render("products", { products });
});

router.get("/", (req, res, next) => {
    return res.status(200).json(routers);
})
module.exports = router;