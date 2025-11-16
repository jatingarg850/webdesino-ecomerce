import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  brand: string;
  category: 'running' | 'casual' | 'sports' | 'formal' | 'sneakers' | 'boots';
  images: string[];
  variants: Array<{
    sku: string;
    size: string;
    color: string;
    price: number;
    salePrice?: number;
    stock: number;
    reserved: number;
  }>;
  features: string[];
  material: string;
  careInstructions: string;
  isFeatured: boolean;
  isNewArrival: boolean;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['running', 'casual', 'sports', 'formal', 'sneakers', 'boots'],
    required: true 
  },
  images: [String],
  variants: [{
    sku: { type: String, required: true, unique: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: Number,
    stock: { type: Number, default: 0 },
    reserved: { type: Number, default: 0 }
  }],
  features: [String],
  material: String,
  careInstructions: String,
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
