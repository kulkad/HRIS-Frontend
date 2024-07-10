// pages/logout.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Logika untuk melakukan logout, seperti menghapus token atau menghapus sesi pengguna
    // Misalnya: localStorage.removeItem('token');
    // Setelah logout, arahkan pengguna ke halaman login
    router.push('/login');
  }, [router]);

  return (
    <div className="flex h-screen bg-green-500">
      <div className="m-auto bg-white p-10 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Logging out...</h2>
        <p className="text-gray-700">Anda sedang keluar dari akun Anda. Harap tunggu...</p>
      </div>
    </div>
  );
}
