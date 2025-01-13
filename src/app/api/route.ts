import { NextRequest, NextResponse } from 'next/server';
import prisma from '../lib/prisma';

export const GET = async (req: NextRequest) => {
  try {
    // Ambil semua pengguna dari database
    const users = await prisma.user.findMany();

    // Kembalikan daftar pengguna
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};