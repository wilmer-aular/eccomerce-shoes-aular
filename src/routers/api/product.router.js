let router = require("express-promise-router")();
const productController = require('../../controllers/product.controller')
const { verifyUser, verifyAuth } = require("../../midleware/authorization.midleware")

router.get("/:id?", [verifyAuth], productController.find);
router.post("/", [verifyAuth, verifyUser], productController.create);
router.post("/:id", [verifyAuth, verifyUser], productController.update);
router.delete("/:id", [verifyAuth, verifyUser], productController.deleteById);


module.exports = router;