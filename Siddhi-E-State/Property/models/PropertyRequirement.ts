import mongoose from 'mongoose';

const propertyRequirementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['residential', 'commercial'], required: true }
}, { timestamps: true });

export default mongoose.model('PropertyRequirement', propertyRequirementSchema);
