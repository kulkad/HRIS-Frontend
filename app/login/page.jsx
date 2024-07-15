"use client";

import { redirect } from "next/dist/server/api-utils";
import Head from "next/head";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoMdImage } from "react-icons/io";

import React, { useState, useEffect } from "react";
//import { useRouter } from "next/router";

// import 'flowbite';
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [error, setError] = useState("");
  //const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Pengecekan jika password dan confirmasi passwrod tidak sama
    if (password !== confPassword)
      return setError("Password dan Confirmasi Password Tidak Cocok");

    //jika password dan confirmasi password nya sama maka langsung di kirim ke backend
    try {
      const response = await axios.post("http://localhost:5001/login", {
        email,
        password,
      });
      // Simpan info pengguna dan tangani sesi sesuai kebutuhan
      // Di sini, untuk mempermudah, kami hanya menyimpan informasi pengguna di Penyimpanan lokal
      localStorage.setItem("user", JSON.stringify(response.data));
      // router.push("/about-us");
      // redirect("/about-us");
      window.location.href = "http://localhost:3000/";
    } catch (err) {
      // setError(err.response.data.msg);
      console.error(err);
      setError(err.response?.data?.msg || "Terjadi kesalahan");
    }
  };

  return (
    <div className="flex h-screen bg-green-500">
      <Head>
        <title>Login - HRIS CORPS</title>
      </Head>
      <div className="m-auto bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-left text-l font-bold mb-6">
          Welcome to
          <p className="text-green-500 font-bold text-xl mb-4">HRIS CORPS </p>
        </h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block mb-2 text-lg font-medium text-gray-700 dark:text-white"
              htmlFor="email"
            >
              Email
            </label>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <MdEmail />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="contoh@gmail.com"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-lg font-medium text-gray-700 dark:text-white"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <FaLock />
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan password..."
            />
          </div>
          <div className="mb-4">
            <label className="block mb-4 text-lg font-medium text-gray-700 dark:text-white">
              Konfirmasi Password
            </label>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <FaLock />
            </div>
            <input
              type="password"
              id="confPassword"
              value={confPassword}
              onChange={(e) => setconfPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Konfirmasi password"
            />
          </div>
          <br />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            <a>Login</a>
          </button>
        </form>
      </div>
    </div>
  );
}
