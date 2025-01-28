import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Sesuaikan dengan path prisma Anda
// routes.ts
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    const deletedMobil = await prisma.mobil.delete({
      where: { id },
    });

    console.log('Data berhasil dihapus:', deletedMobil);

    return NextResponse.json({ message: 'Data berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}