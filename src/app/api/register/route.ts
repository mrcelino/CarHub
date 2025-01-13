import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';

export const POST = async (req: NextRequest) => {
  const { email, password, username } = await req.json();

  // Validate input
  if (!email || !password || !username) {
    return NextResponse.json({ error: 'Email, password, and username are required' }, { status: 400 });
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save new user
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
    },
  });

  return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
};
