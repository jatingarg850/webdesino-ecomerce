#!/usr/bin/env node

// Load environment variables FIRST
require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.local') });

// Now import everything else
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI not found in .env.local');
  console.error('Current env vars:', Object.keys(process.env).filter(k => k.includes('MONGO')));
  process.exit(1);
}

// Define Admin schema inline
const adminSchema = new mongoose.Schema({
  adminId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, sparse: true },
  role: { type: String, enum: ['ADMIN', 'SUPER_ADMIN'], default: 'ADMIN' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', adminSchema);

async function createAdminUser() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    console.log('URI:', MONGODB_URI.substring(0, 50) + '...');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const adminId = 'admin001';
    const adminPassword = 'Admin@123';
    const adminName = 'Admin User';
    const adminEmail = 'admin@pocketmouse.com';

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ adminId });

    if (existingAdmin) {
      console.log('❌ Admin with this ID already exists!');
      console.log('Admin ID:', adminId);
      await mongoose.disconnect();
      process.exit(1);
    }

    // Hash password
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    console.log('📝 Creating admin user...');
    const admin = await Admin.create({
      adminId,
      password: hashedPassword,
      name: adminName,
      email: adminEmail,
      role: 'ADMIN',
      isActive: true,
    });

    console.log('\n✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin ID:', adminId);
    console.log('Password:', adminPassword);
    console.log('Name:', adminName);
    console.log('Email:', adminEmail);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  Please change the password after first login!');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error creating admin:', error.message);
    console.error('Full error:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

createAdminUser();
