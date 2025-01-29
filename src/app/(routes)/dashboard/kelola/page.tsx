'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Popup from "./popup"; // Import Popup component

interface Car {
  id: number;
  image: string;
  namaKendaraan: string;
  harga: string;
  jumlah: number;
  transmisi: string;
  userId: number;
}

function Card({ car, onDelete }: { car: Car; onDelete: (id: number) => void }) {
  return (
    <div className="border-2 hover:border-black transition duration-500 max-h-[400px] rounded-3xl p-2 flex flex-col max-w-72">
      <Image
        src={`/${car.image}`}
        alt={car.namaKendaraan}
        width={500}
        height={500}
        className="size-96 rounded-3xl object-cover p-2"
      />
      <div className="px-4">
        <h2 className="text-lg font-bold">{car.namaKendaraan}</h2>
        <div className="flex flex-row">
          <h2 className="text-base font-semibold">{car.harga}</h2>
          <h2 className="text-base font-medium">/day</h2>
        </div>
        <div className="flex justify-around bg-gray-200 min-h-10 rounded-2xl mt-2 p-2">
          <div className="flex flex-col items-center justify-center gap-1">
            <Image
              src="/ic_door.svg"
              alt="Doors"
              width={500}
              height={500}
              className="size-4"
            />
            <h2 className="text-xs">{car.jumlah} Doors</h2>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Image
              src="/ic_gear.svg"
              alt="Transmisi"
              width={500}
              height={500}
              className="size-4"
            />
            <h2 className="text-xs">{car.transmisi}</h2>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Image
              src="/ic_person.svg"
              alt="Capacity"
              width={500}
              height={500}
              className="size-4"
            />
            <h2 className="text-xs">4 Person</h2>
          </div>
        </div>
        <div className="flex mt-2">
          <Link href={`/dashboard/kelola/edit/${car.id}`} className="w-1/2">
            <button className="w-full border-black border p-2 rounded-2xl text-sm font-semibold mt-2 hover:bg-black hover:text-white transition duration-500">
              Edit
            </button>
          </Link>
          <button
            className="w-1/2 bg-red-500 text-white p-2 rounded-2xl text-sm font-semibold mt-2 ml-2"
            onClick={() => onDelete(car.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [carToDelete, setCarToDelete] = useState<number | null>(null);

  useEffect(() => {
    const userId = parseInt(localStorage.getItem("userId") || "0", 10);

    fetch("/api/mobil")
      .then((response) => response.json())
      .then((data) => {
        const filteredCars = data.filter((car: Car) => car.userId === userId);
        setCars(filteredCars);
      })
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  const handleDelete = (id: number) => {
    setCarToDelete(id); // Set the car ID to delete
    setShowPopup(true); // Show the popup
  };

  const confirmDelete = () => {
    if (carToDelete !== null) {
      const updatedCars = cars.filter((car) => car.id !== carToDelete);
      setCars(updatedCars);

      fetch(`/api/mobil/${carToDelete}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete car");
          }
          console.log(`Car with id ${carToDelete} deleted successfully`);
        })
        .catch((error) => console.error("Error deleting car:", error));
    }

    setShowPopup(false); // Close the popup after deletion
  };

  const cancelDelete = () => {
    setShowPopup(false); // Close the popup without deleting
  };

  return (
    <>
      <div className="mt-4 p-4 pt-0">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Kelola Kendaraan</h2>
          <Link
            href="/dashboard/kelola/tambah"
            className="border-2 border-black p-3 rounded-2xl text-sm font-semibold"
          >
            Tambah Data
          </Link>
        </div>
        <div className="flex justify-around min-h-screen mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {cars.length > 0 ? (
              cars.map((car) => (
                <Card key={car.id} car={car} onDelete={handleDelete} />
              ))
            ) : (
              <p>No cars available for this user.</p>
            )}
          </div>
        </div>
      </div>

      <Popup
        isVisible={showPopup}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}
