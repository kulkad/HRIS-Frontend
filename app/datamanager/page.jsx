"use client";

import React from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";
import { useState, useEffect } from "react";
import Link from "next/link";

const DataManager = () => {
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
      <div className="grid grid-cols-3 gap-4 flex">
        <p className="px-6 py-8 font-semibold">DATA MANAGER</p>
        <div className="flex justify-end col-span-2 bg-white p-2 rounded-lg mb-2 dark:bg-gray-600">
            <div className="self-end">
            <div className="self-end items-center bg-green-400 hover:bg-green-6000 hover:text-gray-800 rounded-xl p-2">
            <Link href="/tambahdata">
            Tambah Data
            </Link>
            </div>
            </div>
        </div>
      </div>

      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Nama
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Jenis Kelamin
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white dark:bg-gray-800">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Udin LinkedIn
              </th>
              <td class="px-6 py-4">Udin@gmail.com</td>
              <td class="px-6 py-4">Laki-Laki</td>
              <td class="px-6 py-4">
                <li className="flex justify-start items-center hover:bg-green-200 hover:text-gray-800 rounded-xl p-2">
                  <MdEdit className="mr-1" />
                  <a href="/edit-data">Edit</a>
                </li>
                <li className="flex justify-start items-center hover:bg-red-300 hover:text-gray-800 rounded-xl p-2">
                  <MdDelete className="mr-1" />
                  <a href="/">Delete</a>
                </li>
                <li className="flex justify-start items-center hover:bg-blue-200 hover:text-gray-800 rounded-xl p-2">
                  <BiSolidUserDetail te className="mr-1" />
                  <a href="/detailabsen">Detail</a>
                </li>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataManager;
