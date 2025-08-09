import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { user: null },
        { status: 200 }
      );
    }
    
    // Return only necessary user data
    const { id, name, email, image, username, role } = session.user;
    
    return NextResponse.json({
      user: {
        id,
        name,
        email,
        image,
        username,
        role,
      }
    });
    
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
