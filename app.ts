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
    message: "GET API is working",
  });
});
app.get("/test-db", async (req: Request, res: Response): Promise<void> => {
  try {
    if (!mongoose.connection.db) {
       res.status(500).json({ error: "MongoDB connection is not established" });
    }
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ message: "MongoDB is connected" });
  } catch (err) {
    res.status(500).json({ error: "MongoDB connection failed", details: err });
  }
});
if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not defined in environment variables');
}
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
app.post("/order", async (req: Request, res: Response, next: NextFunction) => {
  try{

    const instance = new Razorpay({
      key_id : process.env.RAZORPAY_KEY+"" ,
      key_secret : process.env.RAZORPAY_KEY_SECRET
    })

    const options = {
       amount : req.body.amount * 100,
       currency : "INR",
       receipt  : crypto.randomBytes(10).toString("hex")
    }

    instance.orders.create(options, (error, order) => {
      if(error){
        return res.status(500).json({
          success:false,
          message : "Something Went Wrong!",
          error : error
        })
      }

      res.status(200).json({ data: order })

    })

  }
  catch(err){
    res.status(500).json({
      success: false,
      err
    });
  }
})

app.post("/verify", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const { razorPay_order_id, razorPay_payment_id, razorPay_signature } = req.body

    const sign = razorPay_order_id + "|" + razorPay_payment_id
    // @ts-ignore
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET ).update(sign.toString()).digest("hex")
    
    if( razorPay_signature === expectedSign ){
      res.status(200).json({ success :true, message:"Payment Verify Successfully!" })
    }else{
       res.status(400).json({ success :false, message:"Invalid Signature !" })
    }
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success : false,
      message : "Something Went Wrong!",
      error
    })
  }
})

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});


app.use(errorMiddleware);

export default app;
