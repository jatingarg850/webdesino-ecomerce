import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subcategory from '@/models/Subcategory';

export const dynamic = 'force-dynamic';

// GET all subcategories
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    
    let query: any = {};
    if (category) {
      query.category = category;
    }
    
    const subcategories = await Subcategory.find(query)
      .sort({ displayOrder: 1, name: 1 })
      .lean();
    
    return NextResponse.json({ 
      success: true,
      subcategories: subcategories.map((sub: any) => ({
        ...sub,
        _id: sub._id.toString()
      }))
    });
  } catch (error: any) {
    console.error('Error fetching subcategories:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch subcategories',
      message: error.message
    }, { status: 500 });
  }
}

// POST - Create new subcategory
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { name, category, displayOrder } = body;
    
    if (!name || !category) {
      return NextResponse.json({ 
        error: 'Name and category are required' 
      }, { status: 400 });
    }
    
    // Create slug from name
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    // Check if subcategory already exists
    const existing = await Subcategory.findOne({ slug, category });
    if (existing) {
      return NextResponse.json({ 
        error: 'Subcategory already exists for this category' 
      }, { status: 400 });
    }
    
    const subcategory = await Subcategory.create({
      name,
      slug,
      category,
      displayOrder: displayOrder || 0
    });
    
    return NextResponse.json({ 
      success: true,
      subcategory 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating subcategory:', error);
    return NextResponse.json({ 
      error: 'Failed to create subcategory',
      message: error.message
    }, { status: 500 });
  }
}

// PATCH - Update subcategory
export async function PATCH(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { subcategoryId, name, category, displayOrder, isActive } = body;
    
    if (!subcategoryId) {
      return NextResponse.json({ 
        error: 'Subcategory ID is required' 
      }, { status: 400 });
    }
    
    const updateData: any = { updatedAt: new Date() };
    
    if (name) {
      updateData.name = name;
      updateData.slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    if (category) updateData.category = category;
    if (displayOrder !== undefined) updateData.displayOrder = displayOrder;
    if (isActive !== undefined) updateData.isActive = isActive;
    
    const subcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      updateData,
      { new: true }
    );
    
    if (!subcategory) {
      return NextResponse.json({ 
        error: 'Subcategory not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true,
      subcategory 
    });
  } catch (error: any) {
    console.error('Error updating subcategory:', error);
    return NextResponse.json({ 
      error: 'Failed to update subcategory',
      message: error.message
    }, { status: 500 });
  }
}

// DELETE - Delete subcategory
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const subcategoryId = searchParams.get('subcategoryId');
    
    if (!subcategoryId) {
      return NextResponse.json({ 
        error: 'Subcategory ID is required' 
      }, { status: 400 });
    }
    
    const subcategory = await Subcategory.findByIdAndDelete(subcategoryId);
    
    if (!subcategory) {
      return NextResponse.json({ 
        error: 'Subcategory not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Subcategory deleted successfully' 
    });
  } catch (error: any) {
    console.error('Error deleting subcategory:', error);
    return NextResponse.json({ 
      error: 'Failed to delete subcategory',
      message: error.message
    }, { status: 500 });
  }
}
