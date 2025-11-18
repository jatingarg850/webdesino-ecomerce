import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    const { userId, cartItems } = await request.json();

    if (!userId || !cartItems) {
      return NextResponse.json(
        { error: 'User ID and cart items are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Find user and update their cart
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Merge guest cart with user's existing cart
    // For simplicity, we'll just replace the cart
    // In production, you might want to merge quantities for duplicate items
    user.cart = cartItems;
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Cart synced successfully',
    });
  } catch (error) {
    console.error('Cart sync error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      cart: user.cart || [],
    });
  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
