import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Generate order number
    const orderNumber = 'WD' + Date.now() + Math.floor(Math.random() * 1000);
    
    const order = await Order.create({
      ...body,
      orderNumber,
    });
    
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    
    let query: any = {};
    
    if (userId) {
      query.userId = userId;
    }
    
    const orders = await Order.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
