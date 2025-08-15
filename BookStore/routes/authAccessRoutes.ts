import express from "express";
import { signup, login, getAllUsers } from "../controllers/authAccessController";

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.get("/users", getAllUsers);

export default router;
