import { Request, Response } from 'express';
import QuoteBlog from '../models/QuoteBlog';

// Create a new quote
export const createQuote = async (req: Request, res: Response): Promise<void> => {
  try {
    const quote = new QuoteBlog(req.body);
    await quote.save();
    res.status(201).json(quote);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Get latest quotes from the last 3 months
export const getLatestQuotes = async (_req: Request, res: Response): Promise<void> => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  try {
    const quotes = await QuoteBlog.find({
      createdAt: { $gte: threeMonthsAgo }
    }).sort({ createdAt: -1 });

    res.json(quotes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a quote by ID
export const deleteQuote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedQuote = await QuoteBlog.findByIdAndDelete(id);

    if (!deletedQuote) {
      res.status(404).json({ error: 'Quote not found' });
      return;
    }

    res.json({ message: 'Quote deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
