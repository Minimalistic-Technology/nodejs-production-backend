import mongoose, { Document, Schema } from "mongoose";

export interface ICartItem {
  bookId: mongoose.Types.ObjectId;
  name?: string;
  price?: number;
  discountedPrice?: number;
  quantity: number;
  condition: "New" | "Old";
  imageUrl?: string;
  categoryName?: string;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  name: String,
  price: Number,
  discountedPrice: Number,
  quantity: { type: Number, default: 1 },
  condition: { type: String, enum: ["New", "Old"], default: "New" },
  imageUrl: String,
  categoryName: String,
});

const CartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: { type: [CartItemSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<ICart>("Cart", CartSchema);
