import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TrendingCategory from '@/models/TrendingCategory';

export const dynamic = 'force-dynamic';

// GET all trending categories
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const activeOnly = searchParams.get('activeOnly');
    
    let query: any = {};
    if (activeOnly === 'true') {
      query.isActive = true;
    }
    
    const categories = await TrendingCategory.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();
    
    return NextResponse.json({ 
      success: true,
      categories: categories.map(cat => ({
        ...cat,
        _id: cat._id.toString()
      }))
    });
  } catch (error: any) {
    console.error('Error fetching trending categories:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch trending categories',
      message: error.message
    }, { status: 500 });
  }
}

// POST - Create new trending category
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { name, coverImage, linkUrl, displayOrder, isActive } = body;
    
    if (!name || !coverImage || !linkUrl) {
      return NextResponse.json({ 
        error: 'Name, cover image, and link URL are required' 
      }, { status: 400 });
    }
    
    // Create slug from name
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    // Check if slug already exists
    const existing = await TrendingCategory.findOne({ slug });
    if (existing) {
      return NextResponse.json({ 
        error: 'A trending category with this name already exists' 
      }, { status: 400 });
    }
    
    const category = await TrendingCategory.create({
      name,
      slug,
      coverImage,
      linkUrl,
      displayOrder: displayOrder || 0,
      isActive: isActive !== undefined ? isActive : true
    });
    
    return NextResponse.json({ 
      success: true,
      category 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating trending category:', error);
    return NextResponse.json({ 
      error: 'Failed to create trending category',
      message: error.message
    }, { status: 500 });
  }
}

// PATCH - Update trending category
export async function PATCH(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { categoryId, name, coverImage, linkUrl, displayOrder, isActive } = body;
    
    if (!categoryId) {
      return NextResponse.json({ 
        error: 'Category ID is required' 
      }, { status: 400 });
    }
    
    const updateData: any = { updatedAt: new Date() };
    
    if (name) {
      updateData.name = name;
      updateData.slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    if (coverImage) updateData.coverImage = coverImage;
    if (linkUrl) updateData.linkUrl = linkUrl;
    if (displayOrder !== undefined) updateData.displayOrder = displayOrder;
    if (isActive !== undefined) updateData.isActive = isActive;
    
    const category = await TrendingCategory.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true }
    );
    
    if (!category) {
      return NextResponse.json({ 
        error: 'Trending category not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true,
      category 
    });
  } catch (error: any) {
    console.error('Error updating trending category:', error);
    return NextResponse.json({ 
      error: 'Failed to update trending category',
      message: error.message
    }, { status: 500 });
  }
}

// DELETE - Delete trending category
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');
    
    if (!categoryId) {
      return NextResponse.json({ 
        error: 'Category ID is required' 
      }, { status: 400 });
    }
    
    const category = await TrendingCategory.findByIdAndDelete(categoryId);
    
    if (!category) {
      return NextResponse.json({ 
        error: 'Trending category not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Trending category deleted successfully' 
    });
  } catch (error: any) {
    console.error('Error deleting trending category:', error);
    return NextResponse.json({ 
      error: 'Failed to delete trending category',
      message: error.message
    }, { status: 500 });
  }
}
