import mongoose, { Schema, Document } from 'mongoose';

export interface ITrendingCategory extends Document {
  name: string;
  slug: string;
  coverImage: string;
  linkUrl: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TrendingCategorySchema = new Schema<ITrendingCategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  coverImage: { type: String, required: true },
  linkUrl: { type: String, required: true },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.TrendingCategory || mongoose.model<ITrendingCategory>('TrendingCategory', TrendingCategorySchema);
