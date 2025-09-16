import { Request, Response } from "express";
import mongoose from "mongoose";
import Cart from "../models/cart";

// Ensure user cart exists
async function ensureCart(userId: string | mongoose.Types.ObjectId) {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }
  return cart;
}

// Add item
export const addItemToCart = async (req: Request, res: Response): Promise<void> => { 
  try {
    const userId = (req as any).user?.id || req.body.userId;
    if (!userId) res.status(400).json({ success: false, message: "Missing userId" });

    const { bookId, quantity = 1, condition = "New" } = req.body;
    if (!bookId)  res.status(400).json({ success: false, message: "Missing bookId" });

    const cart = await ensureCart(userId);

    const existing = cart.items.find(
      (i) => i.bookId.toString() === bookId.toString() && i.condition === condition
    );
    if (existing) {
      existing.quantity += Number(quantity);
    } else {
      cart.items.push({ bookId, quantity: Number(quantity), condition } as any);
    }

    await cart.save();
    res.json({ success: true, message: "Item added to cart", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get cart
export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId || (req as any).user?.id;
    if (!userId) {
      res.status(400).json({ success: false, message: "Missing userId" });
      return;
    }

    const cart = await Cart.findOne({ userId }).populate("items.bookId");
    res.json({ success: true, cart: cart || { items: [] } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update item
export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId || (req as any).user?.id;
    const { bookId } = req.params;
    const { quantity, condition } = req.body;

    if (!userId || !bookId) {
      res.status(400).json({ success: false, message: "Missing parameters" });
      return;
    }

    const cart = await ensureCart(userId);
    const item = cart.items.find((i) => i.bookId.toString() === bookId.toString());

    if (!item) {
      res.status(404).json({ success: false, message: "Item not found" });
      return;
    }

    if (quantity !== undefined) item.quantity = Number(quantity);
    if (condition !== undefined) item.condition = condition;

    if (item.quantity <= 0) {
      cart.items = cart.items.filter((i) => i.bookId.toString() !== bookId.toString());
    }

    await cart.save();
     res.json({ success: true, message: "Cart item updated", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Remove item
export const removeCartItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId || (req as any).user?.id;
    const { bookId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json({ success: false, message: "Cart not found" });
      return;
    }

    cart.items = cart.items.filter((i) => i.bookId.toString() !== bookId.toString());
    await cart.save();

    res.json({ success: true, message: "Item removed from cart", cart });
  } catch (err) {
    console.error(err);
     res.status(500).json({ success: false, message: "Server error" });
  }
};

// Clear cart
export const clearCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId || (req as any).user?.id;
    await Cart.findOneAndUpdate({ userId }, { items: [] }, { upsert: true });
    res.json({ success: true, message: "Cart cleared" });
  } catch (err) {
    console.error(err);
     res.status(500).json({ success: false, message: "Server error" });
  }
};

// Merge localStorage cart on login
export const mergeCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id || req.body.userId;
    const localCart = req.body.localCart || [];

    const cart = await ensureCart(userId);
    for (const item of localCart) {
      const existing = cart.items.find(
        (i) => i.bookId.toString() === item.bookId.toString() && i.condition === item.condition
      );
      if (existing) {
        existing.quantity = Math.max(existing.quantity, item.quantity);
      } else {
        cart.items.push(item);
      }
    }
    await cart.save();

    res.json({ success: true, message: "Cart merged", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
