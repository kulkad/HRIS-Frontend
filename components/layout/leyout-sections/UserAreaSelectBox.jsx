"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State untuk mengontrol keadaan profil terbuka
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Mengambil user yg sedang login brok
  useEffect(() => {
    const fetchUserData = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData)); // Ubah string JSON menjadi objek JavaScript dan simpan ke state userr
      }
      setLoading(false);
    };

    fetchUserData();
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
    });
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    AOS.refresh();
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    AOS.refresh();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <Link href="/profile" passHref>
          <button
            onClick={toggleProfile} // Menggunakan toggleProfile sebagai handler onClick
            className="flex text-sm bg-gray-800 rounded-full focus:outline-none transition-transform duration-300 ease-in-out transform hover:scale-105"
            id="dropdownUserAvatarButton"
          >
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
