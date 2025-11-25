import mongoose, { Schema, Document } from 'mongoose';

export interface ISubcategory extends Document {
  name: string;
  slug: string;
  category: 'men' | 'women';
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubcategorySchema = new Schema<ISubcategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  category: { type: String, enum: ['men', 'women'], required: true },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Compound index to ensure unique subcategory per category
SubcategorySchema.index({ slug: 1, category: 1 }, { unique: true });

export default mongoose.models.Subcategory || mongoose.model<ISubcategory>('Subcategory', SubcategorySchema);
