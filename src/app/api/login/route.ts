import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const POST = async (req: NextRequest) => {
  try {
    console.log('Received login request');
    const { email, password } = await req.json();
    console.log('Request data:', { email, password });

    // Validasi input
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Cek password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Buat JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    // Set token di cookie
    const response = NextResponse.json({ message: 'Login successful', token }, { status: 200 });
    response.cookies.set('token', token, { maxAge: 3600, path: '/' });


    return response;
  } catch (error) {
    console.error('Error in login API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};