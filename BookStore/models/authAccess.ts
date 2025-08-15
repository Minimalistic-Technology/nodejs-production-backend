import mongoose from "mongoose";

const AuthAccessSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["User", "Admin"], required: true }
}, { timestamps: true });

export const AuthAccessModel = mongoose.model("AuthAccess", AuthAccessSchema);
