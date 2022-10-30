import { Router } from 'express';
import { verifyAuth } from "../../midleware/authorization.midleware.js";
import cartController from '../../controllers/cart.controller.js';

const router = Router();

router.get("/:id?", [verifyAuth], cartController.find);
router.get("/:id/products", [verifyAuth], cartController.getProductsByCartId);
router.post("/", [verifyAuth], cartController.create);
router.post("/:id/products", [verifyAuth], cartController.createProductForCart);
router.delete("/:id", [verifyAuth], cartController.deleteById);
router.delete("/:id/products/:id_prod", [verifyAuth], cartController.deleteProductOfCart);


export default router;