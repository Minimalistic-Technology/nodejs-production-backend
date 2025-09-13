import express from "express";
import {
  addItemToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  mergeCart,
} from "../controllers/cartController";
import { isAuthenticated, adminOnly } from '../middleware/authMiddleware';

const router = express.Router();
router.post("/", isAuthenticated, addItemToCart);
router.post("/merge", isAuthenticated, mergeCart);
router.get("/:userId?", isAuthenticated, getCart);
router.patch("/:userId?/item/:bookId", isAuthenticated, updateCartItem);
router.delete("/:userId?/item/:bookId", isAuthenticated, removeCartItem);
router.delete("/:userId?", isAuthenticated, clearCart);

export default router;
