  import mongoose, { Schema, Document } from "mongoose";

export interface IRedevelopmentProject extends Document {
  name: string;
  beforeImage: string;
  afterImage: string;
  timeline: string;
  amenities: string[];
  status: string;
  units: number;
}

const RedevelopmentProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  beforeImage: { type: String, required: true },
  afterImage: { type: String, required: true },
  timeline: { type: String, required: true },
  amenities: { type: [String], required: true },
  status: { type: String, required: true },
  units: { type: Number, required: true },
});

export const RedevelopmentProjectModel = mongoose.model<IRedevelopmentProject>("RedevelopmentProject", RedevelopmentProjectSchema);