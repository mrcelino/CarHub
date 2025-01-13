import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

interface DecodedToken extends JwtPayload {
  userId: number;
  email: string;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  console.log('Token:', token);

  if (!token) {
    console.log('Token missing, redirecting to login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as DecodedToken;
    console.log('Token verified, proceeding to next', decoded);
    return NextResponse.next();
  } catch (error) {
    console.log('Invalid token, redirecting to login', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard'],
};