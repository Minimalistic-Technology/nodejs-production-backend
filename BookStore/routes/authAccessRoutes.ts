import express from "express";
import { signup, login, getAllUsers, adminLogin } from "../controllers/authAccessController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.post("/auth/admin/login", adminLogin);
router.get("/users", protect, adminOnly, getAllUsers);

export default router;
