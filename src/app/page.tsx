import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-indigo-50">
          <div className="flex justify-between bg-white p-4 w-2/5">
              <Link href="/register" className="bg-sky-500 p-3 text-sm font-bold rounded-2xl  text-white">Register</Link>
              <Link href="/login" className="bg-sky-500 p-3 text-sm font-bold rounded-2xl text-white">Login</Link>
          </div>
      </div>
    </>
  
  );
}
