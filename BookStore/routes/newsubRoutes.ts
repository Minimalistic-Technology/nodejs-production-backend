import express, { Router } from "express";
import { sendMessage, sendEmail, getEmailLogs } from "../../Message/controllers/messageController";
import { sendEmailHandler, getSubscribersHandler, deleteSubscriberHandler } from "../controllers/newsubController";

const router: Router = express.Router();

router.post("/send-message", sendMessage);
router.post("/send-email", sendEmail);
router.get("/email-logs", getEmailLogs);
router.post("/subscribers/send", sendEmailHandler);
router.get("/subscribers", getSubscribersHandler);
router.delete("/subscribers/:id", deleteSubscriberHandler);

export default router;