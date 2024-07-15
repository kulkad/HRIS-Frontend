import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

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
      setLoading(false); // Set loading menjadi false setelah data diambil
    };

    fetchUserData(); // Panggil fungsi fetchUserData saat komponen dimuat
    AOS.init({
      duration: 800, // Durasi animasi 500ms
      easing: "ease-in-out", // Animasi hanya dimainkan sekali
    });
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Mengubah keadaan isOpen saat tombol avatar diklik
    AOS.refresh();
  };

  if (loading) {
    return <div>Loading...</div>; // Tampilkan pesan loading jika sedang dalam proses mengambil data
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>; // Tampilkan pesan jika pengguna belum login
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <Link href="/profile" passHref>
          <a
            data-aos="fade-left" // Atur animasi sesuai keinginan Anda
          ></a>
          <button
            onClick={toggleDropdown} // Menggunakan toggleDropdown sebagai handler onClick
            className="flex text-sm bg-gray-800 rounded-full focus:outline-none transition-transform duration-300 ease-in-out transform hover:scale-105"
            id="dropdownUserAvatarButton"
          >
            <div
              data-aos="slide-left" // Animasi slide ke kiri saat muncul
              className={`origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 transition-opacity duration-300 ease-in-out transform ${
                isOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-full pointer-events-none"
              }`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdownUserAvatarButton"
            >
              {/* Konten dropdown bisa ditambahkan di sini */}
            </div>
            <span className="sr-only">Open user menu</span>
            <Image
              className="w-8 h-8 rounded-full"
              src={user.url}
              alt="user photo"
              width={32}
              height={32}
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
