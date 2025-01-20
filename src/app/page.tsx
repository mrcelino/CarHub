'use client'
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {FiX, FiMenu } from "react-icons/fi";
import { AboutData, carBrands, carTypes, BrandProps, AboutProps } from './lib/data';

function Guide(){
  return(
    <>
      <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-3xl md:-mr-20 p-4 md:p-8 gap-4 md:gap-10 border-2">
        <div className="flex items-center justify-center bg-slate-100 rounded-full size-16">
          <Image
            src="/ic_search.svg"
            alt="BMW"
            width={500}
            height={500}
            className="size-6"
          />
        </div>
        <div className="flex flex-col text-black text-center md:text-left gap-2 md:gap-0">
          <h2 className="text-base md:text-lg font-semibold">Browse and Select</h2>
          <h2 className="text-xs md:text-base max-w-md leading-relaxed">Choose from our wide range of premium cars, select the pickup and return dates and locations that suit you best.</h2>
        </div>
      </div>
    </>
  )
}

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

function AboutItem({ name, image, desc }: AboutProps) {
  return (
    <div className="flex-col flex items-center justify-center mx-4 mb-10">
      <div className="flex items-center justify-center bg-white rounded-full size-16">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="size-7"
        />
      </div>
      <h2 className="text-white text-center mt-4 font-medium text-lg">{name}</h2>
      <h2 className="text-[#D6D6D6] text-center mt-2 max-w-md leading-relaxed text-xs md:text-base">
        {desc}
      </h2>
    </div>
  );
}

function About(){
  return(
    <>
      <section className="flex flex-col items-center justify-center bg-fixed w-full min-h-[600px] bg-black">
          <div className=" text-white text-center p-4 mt-10 md:mt-0">
            <h2 className="text-2xl md:text-5xl mb-4 md:mb-8 font-medium">Our Service & Benefits</h2>
            <h2 className="md:max-w-[50rem] leading-loose text-xs md:text-lg">To make renting easy and hassle-free, we provide a variety of services and advantages. We have you covered with a variety of vehicles and flexible rental terms.</h2>
          </div>
          <div className="flex flex-col gap-10 md:gap-0 md:flex-row justify-center mt-10 md:mt-20">
            {AboutData.map((about, index) => (
              <AboutItem key={index} {...about} />
            ))}
          </div>
      </section>
    </>
  )
}

function Navbar(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return(
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
    </>
  )
}

function Hero(){
  return(
    <>
      <section className="relative flex items-center sm:items-start sm:pt-32 -mt-16 justify-center min-h-screen sm:bg-hero-pattern bg-black bg-no-repeat bg-cover bg-center">
        <div className="z-10 text-center text-white max-w-64 sm:max-w-lg">
          <h1 className="text-2xl sm:text-5xl font-medium leading-snug sm:leading-snug">Behind Every Wheel, A new story begins</h1>
        </div>
      </section>
    </>
  )
}
export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <section className="w-full">
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
      <About/>
      

      <section className="flex flex-col items-center justify-center bg-fixed w-full min-h-[600px] bg-white">
        <div className=" text-black text-center p-4 mt-10">
          <h2 className="text-2xl md:text-5xl mb-4 md:mb-8 font-semibold">How it Works</h2>
          <h2 className="md:max-w-[50rem] leading-loose text-xs md:text-lg">Renting a luxury car has never been easier. Our streamlined process makes it simple for you to book and confirm your vehicle of choice online</h2>
        </div>
        <div className="flex w-full min-h-[500px] md:px-24 relative mt-10 md:mt-0">
          <div className="flex flex-col gap-10 md:gap-4 p-4 md:p-0 w-full lg:w-[45%] lg:my-10 relative">
            <Guide/>
            <Guide/>
            <Guide/>
          </div>
          <div className="hidden lg:flex w-[55%]  justify-center items-center bg-slate-100 rounded-[40px]">
            <Image
              src="/bmw.png"
              alt="BMW"
              width={500}
              height={500}
              className=""
            />
          </div>
        </div>
      </section>
    </>
  );
}