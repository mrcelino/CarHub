'use client';
import Map from '../../components/Map1';
import React, { useState, useEffect } from 'react';

export default function Tambah() {
  const [formData, setFormData] = useState({
    namaKendaraan: '',
    tipeKendaraan: '',
    harga: 0,
    jumlah: 0,
    lokasi: { lat: 0, lon: 0 },
    transmisi: '',
    image: null,
    userId: '', // Awalnya kosong
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log('UserId from localStorage:', userId); // Tambahkan ini
    if (userId) {
      setFormData((prevData) => ({
        ...prevData,
        userId,
      }));
    }
  }, []);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const files = (e.target as HTMLInputElement).files;

    if (type === 'file') {
      const file = files?.[0] || null; // Ambil file pertama atau null
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handlePinClick = (coords: [number, number]) => {
    setFormData((prevData) => ({
      ...prevData,
      lokasi: { lat: coords[1], lon: coords[0] }, // Simpan lat dan lon
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    console.log('Form Data Submitted:', formData);

    // Siapkan FormData
    const data = new FormData();
    data.append('namaKendaraan', formData.namaKendaraan);
    data.append('tipeKendaraan', formData.tipeKendaraan);
    data.append('harga', formData.harga.toString());
    data.append('jumlah', formData.jumlah.toString());
    data.append('lokasi', JSON.stringify(formData.lokasi));
    data.append('transmisi', formData.transmisi);
    data.append('userId', formData.userId);

    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await fetch('/api/mobil', {
        method: 'POST',
        body: data, // Kirim FormData sebagai body
      });

      if (response.ok) {
        console.log('Data berhasil dikirim!');
        // Aksi lain setelah berhasil
      } else {
        const errorData = await response.json().catch(() => null);
        if (errorData) {
          console.error('Terjadi kesalahan:', errorData.error);
        } else {
          console.error('Terjadi kesalahan: Respons tidak valid');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Tambah Kendaraan</h1>
      <p>Masukkan informasi lokasi dan kendaraan yang ingin ditambah.</p>

      <div className="flex gap-10">
        <form onSubmit={handleSubmit} className="space-y-4 w-1/2 mt-6">
          <div>
            <label htmlFor="namaKendaraan" className="block text-sm mb-2">Nama Kendaraan</label>
            <input
              type="text"
              id="namaKendaraan"
              name="namaKendaraan"
              value={formData.namaKendaraan}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan nama kendaraan"
              required
            />
          </div>

          <div>
            <label htmlFor="tipeKendaraan" className="block text-sm mb-2">Tipe Kendaraan</label>
            <select
              id="tipeKendaraan"
              name="tipeKendaraan"
              value={formData.tipeKendaraan}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Pilih tipe kendaraan</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="coupe">Coupe</option>
              <option value="sport coupe">Sport Coupe</option>
              <option value="wagon">Wagon</option>
              <option value="compact">Compact</option>
            </select>
          </div>

          <div>
            <label htmlFor="transmisi" className="block text-sm mb-2">Tipe Kendaraan</label>
            <select
              id="transmisi"
              name="transmisi"
              value={formData.transmisi}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Pilih tipe transmisi</option>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>
          </div>

          <div>
            <label htmlFor="harga" className="block text-sm mb-2">Harga per-hari</label>
            <input
              type="number"
              id="harga"
              name="harga"
              value={formData.harga}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Harga per jam"
              required
            />
          </div>

          <div>
            <label htmlFor="jumlah" className="block text-sm mb-2">Jumlah Seat</label>
            <input
              type="number"
              id="jumlah"
              name="jumlah"
              value={formData.jumlah}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Jumlah kendaraan tersedia"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm mb-2">
              Upload Gambar
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg text-xs file:rounded file:border file:border-gray-200 file:cursor-pointer file:hover:bg-gray-200 file:px-2 file:py-1"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
            >
              Simpan
            </button>
          </div>
        </form>

        <div className="mt-4">
          <h2 className="mb-2 text-sm">Pilih Lokasi</h2>
          <div className="border-2 rounded-2xl p-2">
            <Map onPinClick={handlePinClick} />
          </div>
        </div>
      </div>
    </div>
  );
}