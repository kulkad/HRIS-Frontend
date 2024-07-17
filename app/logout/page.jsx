"use client";

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Logout() {
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
        <div className="flex justify-center items-center mb-6">
          <div className="w-16 h-16 border-t-4 border-b-4 border-green-700 rounded-full animate-spin"></div>
        </div>
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
