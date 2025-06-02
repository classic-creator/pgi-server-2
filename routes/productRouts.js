
import express from "express";
import { createProduct,createProductVarient } from "../src/controller/ProductController.js"; // include .js

const router = express.Router();

router.post("/create/product", createProduct);
router.post("/create/product/varient/:id", createProductVarient);

export default router;