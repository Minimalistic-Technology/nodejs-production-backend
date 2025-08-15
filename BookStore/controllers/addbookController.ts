import { Request, Response } from 'express';
import { BookRequestModel } from '../models/addbook';
import { BookCategoryModel } from '../models/homepage';

export default class BookRequestController {
  static async createBookRequest(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, mobile, bookTitle, publisher, author, classLevel, message } = req.body;

      if (!name || !email || !mobile || !bookTitle || !publisher || !author || !classLevel || !message) {
        res.status(400).json({ error: 'All fields (name, email, mobile, bookTitle, publisher, author, classLevel, message) are required' });
        return;
      }

      const category = await BookCategoryModel.findOne({ name: classLevel });
      if (!category) {
        res.status(404).json({ error: `Category '${classLevel}' not found` });
        return;
      }

      const newRequest = new BookRequestModel({
        name,
        email,
        mobile,
        bookTitle,
        publisher,
        author,
        classLevel,
        message,
      });

      const savedRequest = await newRequest.save();
      res.status(201).json({ message: 'Book request submitted successfully', request: savedRequest });
    } catch (err: any) {
      console.error('Error creating book request:', err);
      res.status(500).json({ error: 'An unexpected error occurred while submitting book request', details: err.message });
    }
  }

  static async getBookRequests(req: Request, res: Response): Promise<void> {
    try {
      const requests = await BookRequestModel.find().sort({ createdAt: -1 });
      if (!requests.length) {
        res.status(404).json({ error: 'No book requests found' });
        return;
      }
      res.status(200).json(requests);
    } catch (err: any) {
      console.error('Error fetching book requests:', err);
      res.status(500).json({ error: 'An unexpected error occurred while fetching book requests', details: err.message });
    }
  }
}