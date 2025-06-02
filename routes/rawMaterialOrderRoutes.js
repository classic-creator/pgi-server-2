

import express from "express";
import { getMaterialOrders, RawMaterialOrder,TrackOrder } from "../src/controller/rawMaterialOrderController.js"; // include .js

const router = express.Router();

router.post("/material/order", RawMaterialOrder);
router.put("/material/order/status/:id", TrackOrder);
router.get("/material/orders/:id", getMaterialOrders);

export default router;