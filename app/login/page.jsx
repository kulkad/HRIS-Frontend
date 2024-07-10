"use client";

import { redirect } from "next/dist/server/api-utils";
import Head from "next/head";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
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
      window.location.href = "http://localhost:3000/home"
    } catch (err) {
      // setError(err.response.data.msg);
      console.error(err);
      setError(err.response?.data?.msg || "Terjadi kesalahan");
    }
  };

  return (
    <div className="flex h-screen bg-green-500">
      <Image
        src="/assets/image/login.png"
        alt="Deskripsi gambar"
        width={200} // lebar gambar dalam piksel
        height={2} // tinggi gambar dalam piksel
      />
      <Head>
        <title>Login - HRIS CORPS</title>
      </Head>
      <div className="m-auto bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-left text-2xl font-bold mb-6">
          Welcome to
          <p className="text-green-500 font-bold mb-4">HRIS CORPS </p>
        </h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="example@gmail.com"
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">
              Nama
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Name"
            />
          </div> */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="********"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Confirmasi Password
            </label>
            <input
              type="password"
              id="confPassword"
              value={confPassword}
              onChange={(e) => setconfPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            <a href="/home">Login</a>
          </button>
        </form>
      </div>
    </div>
  );
}
