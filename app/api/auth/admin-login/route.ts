import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { adminId, password } = await request.json();

    if (!adminId || !password) {
      return NextResponse.json(
        { error: 'Admin ID and password are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Find admin by adminId
    const admin = await Admin.findOne({ adminId });

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid admin ID or password' },
        { status: 401 }
      );
    }

    // Check if admin is active
    if (!admin.isActive) {
      return NextResponse.json(
        { error: 'Admin account is inactive' },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid admin ID or password' },
        { status: 401 }
      );
    }

    // Return admin data
    const adminData = {
      id: admin._id,
      adminId: admin.adminId,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: adminData,
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
