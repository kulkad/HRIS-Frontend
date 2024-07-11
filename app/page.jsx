"use client";

import React from "react";
import { useEffect, useState } from "react";
//import { useRouter } from "next/router";

const HomePage = () => {
  // Pe
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
    <div className='bg-white dark:bg-slate-900 dark:text-white rounded-lg mx-4 p-4'>
      <h1 className='text-2xl font-semibold'>Selamat Datang, users</h1>
      <hr className='mt-5 mb-5'/>
      <a href="halaman-absen">
<button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Absen Hari Ini</button>
      </a>
    </div>
  );
};


export default HomePage;
