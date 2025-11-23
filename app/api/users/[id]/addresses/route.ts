import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // If this is set as default, unset all other defaults
    if (body.isDefault) {
      user.addresses.forEach((addr: any) => {
        addr.isDefault = false;
      });
    }

    user.addresses.push(body);
    await user.save();

    return NextResponse.json({ addresses: user.addresses });
  } catch (error) {
    console.error('Error adding address:', error);
    return NextResponse.json({ error: 'Failed to add address' }, { status: 500 });
  }
}
