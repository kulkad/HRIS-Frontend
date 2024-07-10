"use client";

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
//import { useRouter } from "next/router";

export default function Logout() {
  // Pengecekan Route Apakah User Sudah Login Atau belum
  // const [user, setUser] = useState(null);
  // // const router = useRouter();

  // useEffect(() => {
  //   const userData = localStorage.getItem("user");
  //   if (!userData) {
  //     window.location.href = "http://localhost:3000/login";
  //   } else {
  //     setUser(JSON.parse(userData));
  //   }
  // }, []);

  // if (!user) return <p>Loading...</p>;

  //const router = useRouter();
  let router;
  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.delete("http://localhost:5001/logout"); // Menggunakan metode DELETE
        localStorage.removeItem("user"); // Hapus data pengguna dari localStorage
        //router.push("/login"); // Redirect ke halaman login
        router = window.location.href = "http://localhost:3000/login";
      } catch (err) {
        console.error("Logout failed", err);
      }
    };

    logoutUser();
  }, []);

  return (
    <div className="flex h-screen bg-green-500">
      <div className="m-auto bg-white p-10 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Logging out...
        </h2>
        <p className="text-gray-700">
          Anda sedang keluar dari akun Anda. Harap tunggu...
        </p>
      </div>
    </div>
  );
}
