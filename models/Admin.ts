import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  adminId: string;
  password: string;
  name: string;
  email?: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>({
  adminId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, sparse: true },
  role: { type: String, enum: ['ADMIN', 'SUPER_ADMIN'], default: 'ADMIN' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
