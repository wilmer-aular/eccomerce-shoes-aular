let router = require("express-promise-router")();
const cartRouter = require("./cart.router");
const productRouter = require("./product.router");


router.use("/carts", cartRouter);
router.use("/products", productRouter);

module.exports = router;
