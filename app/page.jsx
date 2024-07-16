"use client";

import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      window.location.href = "http://localhost:3000/login";
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div
      className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
      data-aos="zoom-in"
    >
      <div className="bg-white dark:bg-slate-900 dark:text-white rounded-lg mx-4 p-4">
        <h1 className="text-2xl font-semibold">Selamat Datang, {user.name}</h1>
        <hr className="mt-5 mb-5" />
        <a href="geolocation">
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Geolocation
          </button>
        </a>
        <a href="halaman-absen">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Absen Hari Ini
          </button>
        </a>
      </div>
    </div>
  );
};

export default HomePage;
