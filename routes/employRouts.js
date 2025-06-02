

import express from "express";
import { login,createEmployeeController,getLoggedInUserController } from "../src/controller/employeeController.js"; // include .js
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register",verifyToken,isAdmin, createEmployeeController);
router.post("/login", login);
router.get("/me",verifyToken, getLoggedInUserController);

export default router;