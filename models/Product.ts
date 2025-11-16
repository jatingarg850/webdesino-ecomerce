import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  brand: string;
  gender: 'men' | 'women' | 'kids' | 'unisex';
  category: 'tshirts' | 'shirts' | 'hoodies' | 'joggers' | 'shorts' | 'dresses' | 'oversized-tshirts' | 'polos' | 'sweatshirts';
  fandom?: string; // Marvel, DC, Harry Potter, Friends, etc.
  images: string[];
  variants: Array<{
    sku: string;
    size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL';
    color: string;
    price: number;
    salePrice?: number;
    membershipPrice?: number;
    stock: number;
    reserved: number;
  }>;
  features: string[];
  material: string;
  careInstructions: string;
  isFeatured: boolean;
  isNewArrival: boolean;
  isLimitedEdition: boolean;
  tags: string[];
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  gender: { 
    type: String, 
    enum: ['men', 'women', 'kids', 'unisex'],
    required: true 
  },
  category: { 
    type: String, 
    enum: ['tshirts', 'shirts', 'hoodies', 'joggers', 'shorts', 'dresses', 'oversized-tshirts', 'polos', 'sweatshirts'],
    required: true 
  },
  fandom: String,
  images: [String],
  variants: [{
    sku: { type: String, required: true, unique: true },
    size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'], required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: Number,
    membershipPrice: Number,
    stock: { type: Number, default: 0 },
    reserved: { type: Number, default: 0 }
  }],
  features: [String],
  material: String,
  careInstructions: String,
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isLimitedEdition: { type: Boolean, default: false },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
