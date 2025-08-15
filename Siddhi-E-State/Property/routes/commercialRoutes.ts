  import express from "express";
import {
  getAllCommercial,
  getCommercialById,
  createCommercial,
  updateCommercial,
  deleteCommercial,
} from "../controllers/commercialProjectController";

const router = express.Router();

router.get("/commercial", getAllCommercial);
router.get("/commercial/:id", getCommercialById);
router.post("/commercial", createCommercial);
router.put("/commercial/:id", updateCommercial);
router.delete("/commercial/:id", deleteCommercial);

export default router;