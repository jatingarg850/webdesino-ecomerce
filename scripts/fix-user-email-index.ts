import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function fixEmailIndex() {
  try {
    console.log('🔧 Starting email index fix...');
    
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in environment variables');
      process.exit(1);
    }

    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    const db = mongoose.connection.db;
    if (!db) {
      console.error('❌ Database connection failed');
      process.exit(1);
    }

    const collection = db.collection('users');
    
    // Get all indexes
    const indexes = await collection.listIndexes().toArray();
    console.log('📋 Current indexes:', indexes.map(idx => idx.name));

    // Drop the email index if it exists (it's causing the duplicate key error)
    const emailIndex = indexes.find(idx => idx.name === 'email_1');
    if (emailIndex) {
      console.log('🗑️ Dropping email_1 index...');
      try {
        await collection.dropIndex('email_1');
        console.log('✅ Dropped email_1 index');
      } catch (dropError) {
        console.warn('⚠️ Could not drop email_1 index:', dropError);
      }
    } else {
      console.log('ℹ️ email_1 index not found');
    }

    // Verify indexes after dropping
    const newIndexes = await collection.listIndexes().toArray();
    console.log('📋 Indexes after fix:', newIndexes.map(idx => idx.name));

    console.log('✅ Email index fixed successfully');
    console.log('📝 Note: The email field is now optional and non-unique');
    
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing email index:', error);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

fixEmailIndex();
