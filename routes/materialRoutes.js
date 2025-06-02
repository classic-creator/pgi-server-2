

import express from "express";
import { createMaterial,getAllfactory,finishMaterialRequestsForBatch, getAllMaterialRequestsController, getAllMaterials, getAllvendor, getAllMaterialsbyStock } from "../src/controller/materialController.js"; // include .js
// import { finishMaterialRequestsForBatch } from "../src/controller/ProductController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create/material",verifyToken, createMaterial);
router.get("/materials/:factory_id",verifyToken, getAllMaterialsbyStock);
router.get("/materials",verifyToken, getAllMaterials);
router.post("/materials/approve/:id", verifyToken,finishMaterialRequestsForBatch);
router.get("/vendors", getAllvendor);
router.get("/Factorys",verifyToken, getAllfactory);
router.get("/material/request/:id",verifyToken, getAllMaterialRequestsController);
router.get("/material/request/:id",verifyToken, getAllMaterialRequestsController);

export default router;