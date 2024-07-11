import Image from "next/image";
import React, { useState, useEffect } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol keadaan dropdown terbuka
  const [user, setUser] = useState(null); // State untuk menyimpan informasi pengguna
  const [loading, setLoading] = useState(true); // State untuk menangani loading data

  useEffect(() => {
    const fetchUserData = () => {
      const userData = localStorage.getItem("user"); // Ambil data pengguna dari localStorage
      if (userData) {
        setUser(JSON.parse(userData)); // Ubah string JSON menjadi objek JavaScript dan simpan ke state user
      }
      setLoading(false); // Set loading menjadi false setelah data diambill
    };

    fetchUserData(); // Panggil fungsi fetchUserData saat komponen dimuat
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Tampilkan pesan loading jika sedang dalam proses mengambil data
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>; // Tampilkan pesan jika pengguna belum login
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)} // Mengubah keadaan isOpen saat tombol avatar diklik
          className="flex text-sm bg-gray-800 rounded-full focus:outline-none"
          id="dropdownUserAvatarButton"
        >
          <span className="sr-only">Open user menu</span>
          <Image
            className="w-8 h-8 rounded-full"
            src={user.url}
            alt="user photo"
            width={32}
            height={32}
          />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdownUserAvatarButton"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{user.name}</div>
            <div className="font-medium truncate">{user.email}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
