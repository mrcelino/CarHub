import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

interface DecodedToken extends JwtPayload {
  userId: number;
  email: string;
}

export const GET = async (req: NextRequest) => {
  try {
    const token = req.cookies.get('token')?.value;
    console.log('Token:', token); // Tambahkan logging untuk debugging
    if (!token) {
      return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET_KEY) as DecodedToken;
    console.log('Decoded:', decoded); // Tambahkan logging untuk debugging
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ username: user.username, email: user.email }, { status: 200 });
  } catch (error) {
    console.error('Error in user API:', (error as Error).message);
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
};