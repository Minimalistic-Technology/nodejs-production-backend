require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";

export const app = express();
app.use(express.json({ limit: "50mb" }));
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error";
// import userRouter from "./routes/user.routes";
// import courseRouter from "./routes/course.routes";
// import orderRouter from "./routes/order.route";
// import notificationRouter from "./routes/notification.route";
// import analyticsRouter from "./routes/analytics.route";
// import layoutRouter from "./routes/layout.route";
import { rateLimit } from 'express-rate-limit'
// import authRoutes from './Auth/routes/authRoutes';
// import CouponCodeModel from "./models/coupon.models";
// import { couponRouter } from "./routes/coupon.router";
// import { maintenanceRouter } from "./routes/maintenance.route";
// import certificateRouter from "./routes/certificatePdf.router";
// import quizRouter from "./routes/quiz.route";
// import progressRouter from "./routes/progress.router";
import AWS from 'aws-sdk'
// import taskRouter from "./routes/task.route";
// import { TaskModel } from "./models/task.models";
import crypto from 'crypto'
import Razorpay from 'razorpay'
import mongoose from 'mongoose'
// import AgarbattiproductRoutes from './Agarbatti Products/routes/AgarbattiproductRoutes';
// import categoryRoutes from './Agarbatti Products/routes/categoryRoutes';
// import orderRoutes from './Agarbatti Products/routes/orderRoutes';
// import upcomingProductRoutes from './Agarbatti Products/routes/upcomingProductRoutes';
// import userRoutes from './Agarbatti Products/routes/userRoutes';
// import heroSlideRoutes from './Agarbatti Products/routes/heroSlideRoutes';
// import authAccessRoutes from './Authaccess/routes/authAccessRoutes';
// import blogRoutes from './Blog/routes/blogRoutes';
// import quoteBlogRoutes from './Blog/routes/quoteBlogRoutes';
// import bannerRoutes from './BookStore/routes/bannerRoutes';
// import bookOrderRoutes from './BookStore/routes/bookOrderRoutes';
// import bulkuserRoutes from './BookStore/routes/bulkuserRoutes';
// import BookStorecategoryRoutes from './BookStore/routes/BookStorecategoryRoutes';
// import contentRoutes from './BookStore/routes/contentRoutes';
// import homepageRoutes from './BookStore/routes/homepageRoutes';
// import newsubRoutes from './BookStore/routes/newsubRoutes';
// import BookStoreorderRoutes from './BookStore/routes/BookStoreorderRoutes';
// import productRoutes from './BookStore/routes/productroutes';
// import siteSettingsRoutes from './BookStore/routes/siteSettingsRoutes';
// import subscriberRoutes from './BookStore/routes/subscriberRoutes';
// import AccessControlRoutes from './CheckSession/routes/AccessControlRoutes';
// import historyRoutes from './CheckSession/routes/historyRoutes';
// import locationRoutes from './CheckSession/routes/locationRoutes';
// import sessionRoutes from './CheckSession/routes/sessionRoutes';
// import navigationcategoryRoutes from './Clothing/routes/navigationcategoryRoutes';
// import collectionRoutes from './Collection/routes/collectionRoutes';
// import contactFormRoutes from './Contact/routes/contactFormRoutes';
// import contactRoutes from './Contact/routes/contactRoutes';
// import courseRoutes from './Course/routes/courseRoutes';
// import accountRoutes from './CRM/routes/accountRoutes';
// import campaignRoutes from './CRM/routes/campaignRoutes';
// import crmcontactRoutes from './CRM/routes/crmcontactRoutes';
// import dashboardRoutes from './CRM/routes/dashboardRoutes';
// import dealRoutes from './CRM/routes/dealRoutes';
// import leadRoutes from './CRM/routes/leadRoutes';
// import meetingRoutes from './CRM/routes/meetingRoutes';
// import notificationRoutes from './CRM/routes/notificationRoutes';
// import searchRoutes from './CRM/routes/searchRoutes';
// import taskRoutes from './CRM/routes/taskRoutes';
// import userProfileRoutes from './CRM/routes/userProfileRoutes';
// import cartRoutes from './E-Commerce/routes/cartRoutes';
// import checkoutRoutes from './E-Commerce/routes/checkoutRoutes';
// import favoriteRoutes from './E-Commerce/routes/favoriteRoutes';
// import feedbackRoutes from './E-Commerce/routes/feedbackRoutes';
// import paymentRoutes from './E-Commerce/routes/paymentRoutes';
// import productPriceRoutes from './E-Commerce/routes/productPriceRoutes';
// import productsRoutes from './E-Commerce/routes/productsRoutes';
// import adminProfileRoutes from './Education/routes/adminProfileRoutes';
// import adminUserRoutes from './Education/routes/adminUserRoutes';
// import documentRoutes from './Education/routes/documentRoutes';
// import examRoutes from './Education/routes/examRoutes';
// import examSettingRoutes from './Education/routes/examSettingRoutes';
// import helpSupportRoutes from './Education/routes/helpSupportRoutes';
// import loginRoutes from './Education/routes/loginRoutes';
// import scheduleRoutes from './Education/routes/scheduleRoutes';
// import studentGradeRoutes from './Education/routes/studentGradeRoutes';
// import studentProfileRoutes from './Education/routes/studentProfileRoutes';
// import studyMaterialRoutes from './Education/routes/studyMaterialRoutes';
// import bmiRoutes from './Fitness/routes/bmiRoutes';
// import imageRoutes from './Fitness/routes/imageRoutes';
// import workoutProgressRoutes from './Fitness/routes/workoutProgressRoutes';
// import workoutRoutes from './Fitness/routes/workoutRoutes';
// import goldpriceRoutes from './GoldPrice/routes/goldpriceRoutes';
// import doctorreviewRoutes from './Hospital/routes/doctorreviewRoutes';
// import hospitalRoutes from './Hospital/routes/hospitalRoutes';
// import messageRoutes from './Message/routes/messageRoutes';
// import otpRoutes from './OTP/routes/otpRoutes';
// import profileRoutes from './Profile/routes/profileRoutes';
// import projectRoutes from './Project/routes/projectRoutes';
// import propertyRoutes from './Property/routes/propertyRoutes';
// import redevelopmentRoutes from "./Property/routes/redevelopmentRoutes";
// import commercialRoutes from "./Property/routes/commercialRoutes";
// import stockRoutes from './Stocks/routes/stockRoutes';
// import teamRoutes from './Team/routes/teamRoutes';
// import templateRoutes from './Template/routes/templateRoutes';
// import testimonialRoutes from './Testimonial/routes/testimonialRoutes';

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

// app.use('/api/products', AgarbattiproductRoutes);
// app.use('/api', categoryRoutes);
// app.use('/api', orderRoutes);
// app.use('/api', upcomingProductRoutes);
// app.use('/api', userRoutes);
// app.use('/api', heroSlideRoutes);
// app.use('/api', authAccessRoutes);
// app.use('/api/blog', blogRoutes);
// app.use('/api/quote', quoteBlogRoutes);
// app.use('/api/banner', bannerRoutes);
// app.use('/api', bookOrderRoutes);
// app.use('/api', BookStorecategoryRoutes);
// app.use('/api', BookStoreorderRoutes);
// app.use('/api', bulkuserRoutes);
// app.use('/api', homepageRoutes);
// app.use('/api', newsubRoutes);
// app.use('/api', productRoutes);
// app.use('/api', siteSettingsRoutes);
// app.use('/api/subscriber', subscriberRoutes);
// app.use('/api', AccessControlRoutes);
// app.use('/api', historyRoutes);
// app.use('/api', locationRoutes);
// app.use('/api', sessionRoutes);
// app.use('/api', collectionRoutes);
// app.use('/api', contactFormRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/course', courseRoutes);
// app.use('/api/accounts', accountRoutes);
// app.use('/api/campaigns', campaignRoutes);
// app.use('/api/register-contacts', crmcontactRoutes);
// app.use('/api/dashboard', dashboardRoutes);
// app.use('/api/deals', dealRoutes);
// app.use('/api/leads', leadRoutes);
// app.use('/api/meetings', meetingRoutes);
// app.use('/api', navigationcategoryRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/search', searchRoutes);
// app.use('/api/tasks', taskRoutes);
// app.use('/api/user-profiles', userProfileRoutes);
// app.use('/api', contentRoutes);
// app.use('/api', cartRoutes);
// app.use('/api', checkoutRoutes);
// app.use('/api', favoriteRoutes);
// app.use('/api', feedbackRoutes);
// app.use('/api', paymentRoutes);
// app.use('/api', productPriceRoutes);
// app.use('/api', productsRoutes);
// app.use('/api', adminProfileRoutes);
// app.use('/api', adminUserRoutes);
// app.use('/api', documentRoutes);
// app.use('/api', examRoutes);
// app.use('/api', examSettingRoutes);
// app.use('/api', helpSupportRoutes);
// app.use('/api', loginRoutes);
// app.use('/api', scheduleRoutes);
// app.use('/api', studentGradeRoutes);
// app.use('/api', studentProfileRoutes);
// app.use('/api', studyMaterialRoutes);
// app.use('/api', bmiRoutes);
// app.use('/api', imageRoutes);
// app.use('/api', workoutProgressRoutes);
// app.use('/api', workoutRoutes);
// app.use('/api', goldpriceRoutes);
// app.use('/api', doctorreviewRoutes);
// app.use('/api', hospitalRoutes);
// app.use('/api', messageRoutes);
// app.use('/api', otpRoutes);
// app.use('/api', profileRoutes);
// app.use('/api', projectRoutes);
// app.use('/api', propertyRoutes);
// app.use('/api', redevelopmentRoutes);
// app.use('/api', commercialRoutes);
// app.use('/api', stockRoutes);
// app.use('/api', teamRoutes);
// app.use('/api', templateRoutes);
// app.use('/api', testimonialRoutes);

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

// app.use(
//   "/api/v1/auth", authRoutes,
 // userRouter,
  // orderRouter,
  // courseRouter,
  // notificationRouter,
  // analyticsRouter,
  // layoutRouter,
  // couponRouter,
  // maintenanceRouter,
  // certificateRouter,
  // quizRouter,
  // progressRouter,
  // taskRouter,
// );

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
