
'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { BookOpen, Command, LifeBuoy, LogOut, TableOfContents, House, Settings2 } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

export default function Sidebar(){
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('token');
        console.log('Token:', token);
        if (!token) {
          setError('Authentication token is missing');
          router.push('/login');
          return;
        }

        const response = await fetch('/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('Response data:', data);

        if (response.ok) {
          setUser(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('An unexpected error occurred');
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };
  return(
    <>
      <div className="w-1/5 bg-slate-200 flex flex-col">
        <div className="p-4 flex-grow">
          <div className='flex justify-between'>
              <h2 className="text-xl font-semibold">Dashboard</h2>
              <LogOut className="text-lg" onClick={handleLogout} />
          </div>

          <ul className="mt-4 space-y-4">
            <Link href="/dashboard" className="flex items-center gap-2 hover:bg-slate-300 p-2 rounded">
              <House className="text-lg" />
              <span>Home</span>
            </Link>
            <Link href="/dashboard/kelola" className="flex items-center gap-2 hover:bg-slate-300 p-2 rounded">
              <TableOfContents className="text-lg" />
              <span>Kelola</span>
            </Link>
            <Link href="/dashboard/settings" className="flex items-center gap-2 hover:bg-slate-300 p-2 rounded">
              <Settings2 className="text-lg" />
              <span>Settings</span>
            </Link>
          </ul>
        </div>
        <div className='flex flex-col gap-4 p-4'>
          <div className='w-full rounded-xl min-h-10'>
            {error && <p className="text-red-500">{error}</p>}
            {user ? (
              <div className='p-2 flex gap-2 items-center'>
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
    </>
  )
}