'use client';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname
import { LogOut, House, TableOfContents, Settings2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const pathname = usePathname(); // Get current pathname

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setError("Authentication token is missing");
          router.push("/login");
          return;
        }

        const response = await fetch("/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Jika token expired atau invalid, redirect ke login
        if (response.status === 401 || response.status === 403) {
          Cookies.remove("token");
          router.push("/login");
          return;
        }
        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("An unexpected error occurred");
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path ? "bg-slate-200 rounded-xl" : ""; // Function to check active route

  return (
    <div className="sticky top-0 w-1/5 h-screen border-r-2 border-black border-opacity-5 flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">CarHub</h2>
          <LogOut
            className="text-lg hover:scale-110 cursor-pointer"
            onClick={handleLogout}
          />
        </div>

        <ul className="mt-4 space-y-4">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 hover:bg-slate-300 p-2 rounded-xl ${isActive('/dashboard')}`}
          >
            <House className="text-lg" />
            <span>Home</span>
          </Link>
          <Link
            href="/dashboard/kelola"
            className={`flex items-center gap-2 hover:bg-slate-300 p-2 rounded-xl ${isActive('/dashboard/kelola')}`}
          >
            <TableOfContents className="text-lg" />
            <span>Kelola</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-2 hover:bg-slate-300 p-2 rounded-xl ${isActive('/dashboard/settings')}`}
          >
            <Settings2 className="text-lg" />
            <span>Settings</span>
          </Link>
        </ul>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="w-full rounded-xl min-h-10 border-2">
          {error && <p className="text-red-500">{error}</p>}
          {user ? (
            <div className="p-2 flex gap-2 items-center">
              <div className="flex items-center justify-center bg-white rounded-full size-10">
                <Image
                  src="/ic_user.png"
                  alt="Icon"
                  width={200}
                  height={200}
                  className="size-6"
                />
              </div>
              <div>
                <p className="text-sm font-semibold">{user.username}</p>
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
