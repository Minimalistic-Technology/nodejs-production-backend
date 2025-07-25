import { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface MessageEntry {
  number: string;
  message: string;
  timestamp: number;
}

let messageLog: MessageEntry[] = [];

// Simulated message sending (WhatsApp logic removed)
export const sendMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { number, message } = req.body;

  if (!number || !message) {
    res.status(400).json({ error: "Number and message are required" });
    return;
  }

  try {
    // Simulate the message send
    console.log(`Simulated sending message to ${number}: ${message}`);

    messageLog.push({ number, message, timestamp: Date.now() });

    res
      .status(200)
      .json({ success: true, message: "Message 'sent' successfully (simulation)." });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Failed to send message", details: error.message });
  }
};

interface EmailRequestBody {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  businessDesc: string;
  websiteType: string;
  service: string;
  existingWebsite: string;
  existingDesc: string;
  projectDesc: string;
}

export const sendEmail = async (req: Request, res: Response): Promise<void> => {
  const {
    fullName,
    email,
    phone,
    businessName,
    businessDesc,
    websiteType,
    service,
    existingWebsite,
    existingDesc,
    projectDesc,
  }: EmailRequestBody = req.body;

  console.log(req.body);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Minimalistic Technology" <${process.env.EMAIL_USER}>`,
      to: "manan18doshi@gmail.com",
      subject: "New Project Inquiry",
      html: `
        <h2>📩 New Inquiry from ${fullName}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p><strong>Business Description:</strong> ${businessDesc}</p>
        <p><strong>Website Type:</strong> ${websiteType}</p>
        <p><strong>Selected Service:</strong> ${service}</p>
        <p><strong>Existing Website:</strong> ${existingWebsite}</p>
        <p><strong>Existing Description:</strong> ${existingDesc}</p>
        <p><strong>Project Description:</strong><br/> ${projectDesc}</p>
      `,
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error: any) {
    console.error("❌ Email sending failed:", {
      error: error.message,
      stack: error.stack,
      body: req.body,
      envUser: process.env.EMAIL_USER,
      envPassExists: !!process.env.EMAIL_PASS,
    });

    res
      .status(500)
      .json({ error: "Failed to send email.", details: error.message });
  }
};
