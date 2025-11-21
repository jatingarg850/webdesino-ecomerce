import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: 'men' | 'women' | 'kids';
  subcategory: string;
  brand?: string;
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  badge?: 'NEW' | 'SALE' | 'TRENDING';
  discount?: number;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: Number,
  category: { type: String, enum: ['men', 'women', 'kids'], required: true },
  subcategory: { type: String, required: true },
  brand: String,
  images: [String],
  sizes: [String],
  colors: [String],
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  badge: { type: String, enum: ['NEW', 'SALE', 'TRENDING'] },
  discount: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
