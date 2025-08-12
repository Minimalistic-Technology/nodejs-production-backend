import mongoose, { Schema, Document, Types } from 'mongoose';

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentType = 'Credit Card' | 'Debit Card' | 'UPI' | 'Cash on Delivery';
export type Condition = 'New' | 'Old';

export interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
}

export interface IOrder extends Document {
  customerName: string;
  email: string;
  mobileNumber: string;
  address: IAddress;
  paymentType: PaymentType;
  quantity: number;
  price: number;
  status: OrderStatus;
  condition: Condition;
  date?: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  bookId: Types.ObjectId;
  cancelReason?: string;
}

const OrderSchema: Schema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] },
    mobileNumber: { type: String, required: true, trim: true, match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid mobile number'] },
    address: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
      pinCode: { type: String, required: true, trim: true },
    },
    paymentType: { type: String, enum: ['Credit Card', 'Debit Card', 'UPI', 'Cash on Delivery'], required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], required: true },
    condition: { type: String, enum: ['New', 'Old'], required: true },
    date: { type: Date, default: Date.now },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    cancelReason: { type: String, required: false }, 
  },
  { timestamps: { createdAt: true, updatedAt: true }, versionKey: '__v' }
);

export const Order = mongoose.model<IOrder>('Order', OrderSchema);