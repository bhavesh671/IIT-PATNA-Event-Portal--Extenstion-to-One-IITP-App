import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Clear any server-side session data if needed
    // For now, we'll rely on client-side localStorage clearing
    
    return NextResponse.json({ 
      success: true, 
      message: 'Logged out successfully' 
    }, { status: 200 });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Logout failed' 
    }, { status: 500 });
  }
}
