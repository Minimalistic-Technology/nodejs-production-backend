import mongoose, { Document, Schema, model } from 'mongoose';

// Interface for QuoteBlog document
export interface IQuoteBlog extends Document {
  quote: string;
  name: string;
  title: string;
  createdAt: Date;
}

// Define schema
const quoteBlogSchema = new Schema<IQuoteBlog>({
  quote: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Export model
const QuoteBlog = model<IQuoteBlog>('QuoteBlog', quoteBlogSchema);
export default QuoteBlog;
