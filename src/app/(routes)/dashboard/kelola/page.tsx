import Link from "next/link";
import Image from "next/image";

function Card(){
  return(
    <>
      <div className="border-2 hover:border-black transition duration-500 min-h-80 rounded-3xl p-2 flex flex-col max-w-72">
        <Image
          src="/car1.png"
          alt="BMW"
          width={500}
          height={500}
          className="mb-4"
        />
        <div className="px-4">
          <h2 className="text-lg font-medium">Audi A8 L 2022</h2>
          <div className="flex flex-row">
              <h2 className="text-base font-semibold">78.90</h2>
              <h2 className="text-base font-medium">/day</h2>
          </div>
          <div className="flex justify-around bg-gray-200 min-h-10 rounded-2xl mt-2 p-2">
              <div className="flex flex-col items-center justify-center gap-1">
                <Image
                  src="/ic_smile.svg"
                  alt="BMW"
                  width={500}
                  height={500}
                  className="size-4"
                />
                <h2 className="text-xs">4,000</h2>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <Image
                  src="/ic_smile.svg"
                  alt="BMW"
                  width={500}
                  height={500}
                  className="size-4 "
                />
                <h2 className="text-xs">4,000</h2>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <Image
                  src="/ic_smile.svg"
                  alt="BMW"
                  width={500}
                  height={500}
                  className="size-4 "
                />
                <h2 className="text-xs">4,000</h2>
              </div>
          </div>
          <div className="flex mt-2">
            <button className="w-1/2 border-black border p-2 rounded-2xl text-sm font-semibold mt-2 hover:bg-black hover:text-white transition duration-500">Edit</button>
            <button className="w-1/2 bg-red-500 text-white p-2 rounded-2xl text-sm font-semibold mt-2 ml-2">Delete</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default function Kelola(){
  return(
    <div className="mt-4 p-4 pt-0">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Kelola Kendaraan</h2>
        <Link href="/dashboard/kelola/tambah"
        className="border-2 border-black p-3 rounded-2xl text-sm font-semibold">Tambah Data</Link>
      </div>
      <div className="flex justify-around items-center min-h-screen mt-6">
        <div className="grid grid-cols-4 gap-4">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>


    </div>
  )
}