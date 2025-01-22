// app/dashboard/kelola/page.tsx
import Map from '../components/Map1'; // Impor komponen Map
export default function Kelola() {
  return (
    <div className='flex flex-col justify-center items-center mt-10'>
      <h1>Kelola</h1>
      <p>Ini adalah halaman kelola.</p>
      <Map /> {/* Menampilkan peta */}
    </div>
  )
}
