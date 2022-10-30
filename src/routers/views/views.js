import { Router } from 'express';
import { verifyAuth, verifyUser } from "../../midleware/authorization.midleware.js";
import { routers } from "../../util/util.js";
import Product from '../../services/product.service.js';
const product = new Product('products');

const router = Router();

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

export default router;