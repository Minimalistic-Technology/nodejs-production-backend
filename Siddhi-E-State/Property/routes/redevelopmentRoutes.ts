 import express from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/redevelopmentProjectController";

const router = express.Router();

router.get("/redevelopment", getAllProjects);
router.get("/redevelopment/:id", getProjectById);
router.post("/redevelopment", createProject);
router.put("/redevelopment/:id", updateProject);
router.delete("/redevelopment/:id", deleteProject);

export default router;