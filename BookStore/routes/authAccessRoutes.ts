import express from "express";
import { signup, login, getAllUsers, adminLogin,  forgotPassword, getUserProfile  } from "../controllers/authAccessController";
import { isAuthenticated, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.post("/auth/admin/login", adminLogin);
router.post("/auth/forgot-password", forgotPassword); 
router.get("/users", isAuthenticated, adminOnly, getAllUsers);
router.get('/profile', isAuthenticated, getUserProfile);

export default router;
