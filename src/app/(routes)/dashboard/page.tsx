'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
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

  return (
    <div className="h-screen bg-indigo-100 flex justify-center items-center">
      <div className="lg:w-2/5 md:w-1/2 w-2/3">
        <div className="bg-white p-10 rounded-lg shadow-lg min-w-full">
          <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">Dashboard</h1>
          {error && <p className="text-red-500">{error}</p>}
          {user ? (
            <div>
              <p className="text-gray-800 font-semibold my-3 text-md">Username: {user.username}</p>
              <p className="text-gray-800 font-semibold my-3 text-md">Email: {user.email}</p>
              <button
                className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}