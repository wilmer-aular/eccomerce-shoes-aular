import { Router } from 'express';
import cartRouter from "./cart.router.js";
import productRouter from "./product.router.js";

const router = Router();

router.use("/carts", cartRouter);
router.use("/products", productRouter);

export default router;
