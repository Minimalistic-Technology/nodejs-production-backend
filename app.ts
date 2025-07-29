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

require('dotenv').config();
// const apiLogger = require('./controllers/apiLogger');
// cors => cross origin resource sharing
app.use(
  cors({
    // make sure you don't have / in last
    // Do "http://localhost:3000"
    // Don't "http://localhost:3000/"
    
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);


// body parser
const bodyParser = require('body-parser');

// cookie parser
app.use(cookieParser());

app.use('/api', messageRoutes);

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

app.get("/test2", async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "GET API 2 is working fine by Haresh R",
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
