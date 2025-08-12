 import mongoose from "mongoose";

const CommercialProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  completion: { type: String, required: true }, 
});

export const CommercialProject = mongoose.model("CommercialProject", CommercialProjectSchema);