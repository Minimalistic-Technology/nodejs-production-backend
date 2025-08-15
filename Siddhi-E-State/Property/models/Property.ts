import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: String,
  location: String,
  originalPrice: Number,
  discountedPrice: Number,
  area: Number,
  type: String,
  bedrooms: Number,
  availability: String,
  image: String,
});

export default mongoose.model('Property', propertySchema);
