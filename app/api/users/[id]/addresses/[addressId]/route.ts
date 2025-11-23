import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; addressId: string }> }
) {
  try {
    await connectDB();
    const { id, addressId } = await params;
    const body = await request.json();
    
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const addressIndex = user.addresses.findIndex(
      (addr: any) => addr._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    // If this is set as default, unset all other defaults
    if (body.isDefault) {
      user.addresses.forEach((addr: any) => {
        addr.isDefault = false;
      });
    }

    user.addresses[addressIndex] = { ...user.addresses[addressIndex], ...body };
    await user.save();

    return NextResponse.json({ addresses: user.addresses });
  } catch (error) {
    console.error('Error updating address:', error);
    return NextResponse.json({ error: 'Failed to update address' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; addressId: string }> }
) {
  try {
    await connectDB();
    const { id, addressId } = await params;
    
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.addresses = user.addresses.filter(
      (addr: any) => addr._id.toString() !== addressId
    );
    
    await user.save();

    return NextResponse.json({ addresses: user.addresses });
  } catch (error) {
    console.error('Error deleting address:', error);
    return NextResponse.json({ error: 'Failed to delete address' }, { status: 500 });
  }
}
