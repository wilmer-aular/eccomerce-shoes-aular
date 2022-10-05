let router = require("express-promise-router")();
const { verifyAuth } = require("../../midleware/authorization.midleware")
const cartController = require('../../controllers/cart.controller')

router.get("/:id?", [verifyAuth], cartController.find);
router.get("/:id/products", [verifyAuth], cartController.getProductsByCartId);
router.post("/", [verifyAuth], cartController.create);
router.post("/:id/products", [verifyAuth], cartController.createProductForCart);
router.delete("/:id", [verifyAuth], cartController.deleteById);
router.delete("/:id/products/:id_prod", [verifyAuth], cartController.deleteProductOfCart);


module.exports = router;