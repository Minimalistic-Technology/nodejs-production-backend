import { Request, Response } from "express";
import Cart, { ICart } from "../models/cart";

export const getCart = async (req: Request, res: Response): Promise<void> => {
  const cart = await Cart.findOne({ userId: (req as any).user.id });
  res.json(cart || { userId: (req as any).user.id, items: [] });
};

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  const { bookId, title, price, quantity, stock } = req.body;
  let cart = await Cart.findOne({ userId: (req as any).user.id });

  if (!cart) {
    cart = await Cart.create({
      userId: (req as any).user.id,
      items: [{ bookId, title, price, quantity, stock }],
    });
  } else {
    const existingItem = cart.items.find(
      item => item.bookId.toString() === bookId
    );
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({
        bookId,
        price,
        quantity: quantity || 1,
        condition: "New",
        stock,
      });
    }
    await cart.save();
  }

  res.json(cart);
};

export const updateQuantity = async (req: Request, res: Response): Promise<void> => {
  const { bookId, quantity } = req.body;
  const cart = await Cart.findOne({ userId: (req as any).user.id });
  if (!cart) {
    res.status(404).json({ error: "Cart not found" });
    return;
  }

  const item = cart.items.find(item => item.bookId.toString() === bookId);
  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }

  item.quantity = quantity;
  await cart.save();

  res.json(cart);
};

export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
  const { bookId } = req.params;
  const cart = await Cart.findOne({ userId: (req as any).user.id });
  if (!cart) {
    res.status(404).json({ error: "Cart not found" });
    return;
  }

  cart.items = cart.items.filter(item => item.bookId.toString() !== bookId);
  await cart.save();

  res.json(cart);
};

export const clearCart = async (req: Request, res: Response): Promise<void> => {
  await Cart.findOneAndUpdate(
    { userId: (req as any).user.id },
    { $set: { items: [] } }
  );
  res.json({ message: "Cart cleared" });
};
