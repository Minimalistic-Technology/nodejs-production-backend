require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";

export const app = express();
app.use(express.json({ limit: "50mb" }));
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error";

import { rateLimit } from 'express-rate-limit'
import AWS from 'aws-sdk'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import mongoose from 'mongoose'
import messageRoutes from './Message/routes/messageRoutes';
import teamRoutes from './Team/routes/teamRoutes';
import templateRoutes from './Minimalistic-Technology/Template/routes/templateRoutes';
import testimonialRoutes from './Minimalistic-Technology/Testimonial/routes/testimonialRoutes';
import authRoutes from './Minimalistic-Learning/Auth/routes/authRoutes';
import blogRoutes from './Minimalistic-Learning/Blog/routes/blogRoutes';
import quoteBlogRoutes from './Minimalistic-Learning/Blog/routes/quoteBlogRoutes';
import profileRoutes from './Minimalistic-Learning/Profile/routes/profileRoutes';


require('dotenv').config();
// const apiLogger = require('./controllers/apiLogger');
// cors => cross origin resource sharing
app.use(
  cors({
    // make sure you don't have / in last
    // Do "http://localhost:3000"
    // Don't "http://localhost:3000/"
    origin: ["http://minimalistictechnology.com"],
    credentials: true,
  })
);


// cookie parser
app.use(cookieParser());

app.use('/api', messageRoutes);
app.use('/api/team', teamRoutes);

app.use(
  "/api/ml",
  authRoutes,
  blogRoutes,
  quoteBlogRoutes,
  profileRoutes
);

app.use(
  "/api/mt/testimonials",
  testimonialRoutes
);

app.use(
  "/api/mt/templates",
  templateRoutes
);

// api requests limit
// const limiter = rateLimit({
//   windowMs: 5 * 60 * 1000,
// 	max: 100,
// 	standardHeaders: 'draft-7',
// 	legacyHeaders: false,
// })

const limiter = rateLimit({
  windowMs: 60000, // 1 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, 
  legacyHeaders: false,
  handler: function (req, res, next) {
      setTimeout(() => {
        next();
      }, 5000); 
  }
})

// middleware calls
app.use(limiter);
// app.use(apiLogger)
// routes



// testing api
app.get("/test", async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "GET API is working fine by Parth Doshi",
  });
});


// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});


app.use(errorMiddleware);

export default app;
