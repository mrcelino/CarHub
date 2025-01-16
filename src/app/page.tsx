'use client'
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {FiX, FiMenu } from "react-icons/fi";
import { carBrands, carTypes, BrandProps } from './lib/data';



function Brand({ name, image }: BrandProps) {
  return(
    <>
      <div className="flex flex-col items-center justify-center bg-white border shadow-lg size-48 rounded-2xl hover:scale-110 transition duration-500">
        <Image
          src={image}// Pastikan gambar ada di folder public
          alt={name}
          width={200} // Sesuaikan ukuran lebar gambar
          height={200} // Sesuaikan ukuran tinggi gambar
          className="size-20" // Opsional: Menambahkan margin bawah
        />
        <h2 className="mt-6 font-semibold">{name}</h2>
      </div>
    </>
  )
}

function CarType({ name, image }: BrandProps) {
  return(
    <>
      <div className="flex flex-col items-center justify-center bg-white border shadow-lg size-52 rounded-2xl hover:scale-110 transition duration-500">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="size-32" 
        />
        <h2 className="font-semibold">{name}</h2>
      </div>
    </>
  )
}
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <nav className="sticky z-50 top-0 left-0 w-full bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">CarHub</div>
          {/* Hamburger Icon for Mobile */}
          <div className="sm:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <FiX className="text-white text-3xl" />
              ) : (
                <FiMenu className="text-white text-3xl" />
              )}
            </button>
          </div>
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="sm:hidden absolute top-14 left-0 w-full text-center bg-black text-white p-4">
              <Link href="/" className="block px-4 py-2">Home</Link>
              <Link href="/" className="block px-4 py-2">About</Link>
              <Link href="/" className="block px-4 py-2">Contact</Link>
              <Link href="/login" className="block px-4 py-2">Login</Link>
              <Link href="/register" className="block px-4 py-2">Register</Link>
            </div>
          )}
          <div className="hidden sm:block">
            <Link href="/" className="px-4">Home</Link>
            <Link href="/" className="px-4">About</Link>
            <Link href="/" className="px-4">Contact</Link>
            <Link href="/login" className="px-4">Login</Link>
            <Link href="/register" className="px-4">Register</Link>
          </div>
        </div>
      </nav>
      <section className="relative flex items-center sm:items-start sm:pt-32 -mt-16 justify-center min-h-screen sm:bg-hero-pattern bg-black bg-no-repeat bg-cover bg-center">
        <div className="z-10 text-center text-white max-w-64 sm:max-w-lg">
          <h1 className="text-2xl sm:text-5xl font-medium leading-snug sm:leading-snug">Behind Every Wheel, A new story begins</h1>
        </div>
      </section>
      <section className="w-full min-h-[1000px]">
        <div className="lg:m-20">
            <div className="mb-20">
              <h2 className="text-3xl mb-10 font-bold">Rent by Brands</h2>
              <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
              {carBrands.map((brand, index) => (
                <Brand key={index} name={brand.name} image={brand.image} />
              ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl mb-10 font-bold">Rent by Body Type</h2>
              <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
              {carTypes.map((carType, index) => (
                <CarType key={index} name={carType.name} image={carType.image} />
              ))}
              </div>
            </div>
        </div>


      </section>
      <section className="bg-fixed w-full min-h-[1000px] bg-sky-400">

      </section>
    </>
  );
}