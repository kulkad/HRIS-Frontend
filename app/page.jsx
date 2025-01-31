"use client";

import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

  if (!user) {
    return (
      <div className="w-full bg-white dark:bg-slate-900 dark:text-white max-w-md mx-auto rounded-lg shadow-md overflow-hidden md:max-w-2xl p-4">
        <Skeleton height={40} count={1} className="mb-4" />
        <Skeleton height={20} count={1} className="mb-4" />
        <Skeleton height={20} count={1} className="mb-4" />
        <Skeleton height={50} width={150} className="mb-4" />
        <Skeleton height={50} width={150} className="mb-4" />
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-slate-900 dark:text-white max-w-md mx-auto rounded-lg shadow-md overflow-hidden md:max-w-2xl">
      <div className="mx-4 p-4">
        <h1 className="text-2xl font-semibold">Selamat Datang, {user.name}</h1>
        <hr className="mt-5 mb-5" />

        <div
          className="flex flex-col p-4 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            className="object-cover w-full rounded-lg md:h-auto md:w-48 md:rounded-lg md:ml-0 sm:w-32 h-64"
            src="/assets/images/windah.jpg"
            alt=""
          />
          <div className="flex flex-col justify-between p-5 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml">
             {user.name}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
             Jam Masuk :
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
             Jam Pulang :
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
             Estimasi Denda : 
            </p>
            <a href="geolocation">
          <button
            type="button"
            className="focus:outline-none mt-2 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Total Denda Keterlambatan
          </button>
        </a>
          </div>
        </div>

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
        <a href="absen-pulang">
          <button
            type="button"
            className="focus:outline-none text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Absen Pulang
          </button>
        </a>
      </div>
    </div>
  );
};

export default HomePage;
