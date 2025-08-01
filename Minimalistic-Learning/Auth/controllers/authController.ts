import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import sendMail from '../utils/sendMail';

interface JwtPayload {
  userID: string;
}

const generateAccessToken = (userID: string): string => {
  return jwt.sign({ userID }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

const generateRefreshToken = (userID: string): string => {
  return jwt.sign({ userID }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' });
};

export const updateAccessToken = async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    res.status(401).json({ error: 'Refresh token missing' });
    return;
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
    const accessToken = generateAccessToken(decoded.userID);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    res.status(200).json({ accessToken });
  } catch (err) {
    console.error("Update access token error:", err);
    res.status(403).json({ error: 'Invalid refresh token' });
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, phone, institute } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ error: "Username, email, and password are required" });
    return;
  }

  try {
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      res.status(400).json({ error: 'Username or email already registered' });
      return;
    }

    const newUser = new User({
      username,
      email,
      password, // Let schema hash it
      phone,
      institute
    });

    await newUser.save();

    if (email && typeof email === 'string' && email.trim() !== '') {
      try {
        await sendMail({
          email,
          subject: 'Welcome to Our App!',
          template: 'welcome.ejs',
          data: { username }
        });
      } catch (mailError) {
        console.error("Error sending welcome email:", mailError);
      }
    }

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: 'Signup failed' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Incorrect password' });
      return;
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: 'Login successful', accessToken , user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const refreshToken = (req: Request, res: Response): void => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    res.status(401).json({ error: 'Refresh token missing' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
    const accessToken = generateAccessToken(decoded.userID);
    res.json({ accessToken });
  } catch (err) {
    console.error("Refresh token error:", err);
    res.status(403).json({ error: 'Invalid refresh token' });
  }
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};

// Optional placeholder
export function getUser(arg0: string, getUser: any) {
  throw new Error('Function not implemented.');
}
