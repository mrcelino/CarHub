import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma'; // Sesuaikan dengan path prisma Anda

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const namaKendaraan = formData.get('namaKendaraan') as string;
    const tipeKendaraan = formData.get('tipeKendaraan') as string;
    const harga = parseFloat(formData.get('harga') as string);
    const jumlah = parseInt(formData.get('jumlah') as string);
    const lokasi = JSON.parse(formData.get('lokasi') as string);
    const transmisi = formData.get('transmisi') as string;
    const image = formData.get('image') as File;
    const userId = parseInt(formData.get('userId') as string);


    const newMobil = await prisma.mobil.create({
      data: {
        namaKendaraan,
        tipeKendaraan,
        harga,
        jumlah,
        lokasi,
        transmisi,
        image: image ? image.name : null, // Simpan nama file gambar jika ada
        rating: 0,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    console.log('Data berhasil disimpan:', newMobil);

    return NextResponse.json(newMobil, { status: 200 });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}