import { NextResponse } from 'next/server';

export async function POST() {
  // For client-side logout, we just return success
  // The actual logout happens on the client by clearing localStorage
  return NextResponse.json({ success: true });
}
