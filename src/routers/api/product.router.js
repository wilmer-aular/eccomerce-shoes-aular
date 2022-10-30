import { Router } from 'express';
import productController from '../../controllers/product.controller.js';
import { verifyAuth, verifyUser } from "../../midleware/authorization.midleware.js";

const router = Router();

router.get("/:id?", [verifyAuth], productController.find);
router.post("/", [verifyAuth, verifyUser], productController.create);
router.post("/:id", [verifyAuth, verifyUser], productController.update);
router.delete("/:id", [verifyAuth, verifyUser], productController.deleteById);

export default router;