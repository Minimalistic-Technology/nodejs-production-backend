import { Request, Response } from "express";
import { AuthAccessModel } from "../models/authAccess";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET as string;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string;

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, role } = req.body;
    const existing = await AuthAccessModel.findOne({ email });
    if (existing) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new AuthAccessModel({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role } = req.body;
    const user = await AuthAccessModel.findOne({ email, role });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const adminLogin = (req: Request, res: Response): void => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "Admin" }, SECRET_KEY, { expiresIn: "1d" });
    res.json({ message: "Admin login successful", token });
  } else {
    res.status(401).json({ message: "Invalid admin credentials" });
  }
};

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await AuthAccessModel.find({}, { password: 0 }); // exclude password
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

