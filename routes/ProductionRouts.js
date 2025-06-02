
import express from "express";
import { createTarget,getAllFinishedGoodsWithVariant,getAllJobsWithBatchAndStatus,getAllTargets,getBatchesByJobId,TargetReview,workflowTracking } from "../src/controller/ProductionController.js"; // include .js
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create/production/target", createTarget);
router.get("/production/targets/:id", getAllTargets);
router.get("/production/job/:id", getAllJobsWithBatchAndStatus);
router.post("/production/job/batch", getBatchesByJobId);
router.post("/target/review/:id", TargetReview);
router.get("/finish_goods", getAllFinishedGoodsWithVariant);
router.post("/production/update/:id",verifyToken, workflowTracking);
//hiii
export default router;
