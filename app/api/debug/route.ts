import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    memory: process.memoryUsage(),
    env_check: {
      MONGODB_URI: !!process.env.MONGODB_URI,
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'not set',
    }
  };

  // Test database connection
  try {
    await connectDB();
    diagnostics.database = 'connected';
  } catch (error: any) {
    diagnostics.database = 'failed';
    diagnostics.database_error = error.message;
  }

  return NextResponse.json(diagnostics);
}
