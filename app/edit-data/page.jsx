"use client";

import React from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { IoMdImage } from "react-icons/io";

const EditData = () => {
  // Pengecekan Route Apakah User Sudah Login Atau belum
  const [user, setUser] = useState(null);
  // const router = useRouter();

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
    <div className="bg-white rounded-lg mx-4 p-4 text-xl">
      <h1 className="mt-1 mb-4 font-semibold">Form Edit User</h1>

      <form className="max-w">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Nama
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <FaUser />
          </div>
          <input
            type="text"
            id="nama"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="your name"
          />
        </div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <MdEmail />
          </div>
          <input
            type="text"
            id="email-address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="your@gmail.com"
          />
        </div>

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <FaLock />
          </div>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="***********"
          />
        </div>

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Confirmasi Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <FaLock />
          </div>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="**********"
          />
        </div>

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Image
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <IoMdImage className="mr-5" size={24}/>
          </div>
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
          />
        </div>

        <input
          type="submit"
          className="inline-block border-rounded w-18 h-15 mt-4 bg-green-400 hover:bg-green-500 hover:text-white"
        />
      </form>
    </div>
  );
};

export default EditData;
