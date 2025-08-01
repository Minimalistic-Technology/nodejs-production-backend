import mongoose, { Document, Schema, model } from 'mongoose';

export interface IProfile extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

const profileSchema = new Schema<IProfile>({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String }
});

export default model<IProfile>('Profile', profileSchema);
