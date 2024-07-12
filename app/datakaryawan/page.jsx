"use client";

import React from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SlOptionsVertical } from "react-icons/sl";

const DataKaryawan = () => {
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

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdownHandler = () => {
    setIsOpen(false);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-lg mx-4 p-4 text-xl">
      <div className="grid grid-cols-3 gap-4 flex">
        <p className="px-6 py-8 font-semibold">DATA KARYAWAN</p>
        <div className="flex justify-end col-span-2 bg-white p-2 rounded-lg mb-2 dark:bg-gray-600">
          <div className="self-end">
            <div className="self-end items-center bg-green-400 hover:bg-green-600 hover:text-gray-800 rounded-xl p-2">
              <Link href="/tambahdata">Tambah Data</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tampilan untuk laptop */}
      <div className="relative overflow-x-auto w-full hidden sm:block">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Jenis Kelamin
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Udin LinkedIn
              </th>
              <td className="px-6 py-4">Udin@gmail.com</td>
              <td className="px-6 py-4">Laki-Laki</td>
              <td className="px-6 py-4">
                <ul>
                  <li className="flex justify-start items-center hover:bg-green-200 hover:text-gray-800 rounded-xl p-2">
                    <MdEdit className="mr-1" />
                    <a href="/edit-data">Edit</a>
                  </li>
                  <li className="flex justify-start items-center hover:bg-red-300 hover:text-gray-800 rounded-xl p-2">
                    <MdDelete className="mr-1" />
                    <a href="/">Delete</a>
                  </li>
                  <li className="flex justify-start items-center hover:bg-blue-200 hover:text-gray-800 rounded-xl p-2">
                    <BiSolidUserDetail className="mr-1" />
                    <a href="/detailuser">Detail</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tampilan untuk layar kecil */}
      <div class="relative overflow-x-auto w-full flex sm:hidden">
        <div class=" p-4 leading-normal">
          <div className="flex">
            <div>
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Ang Badarudin
              </h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                angbadarudin@gmail.com
              </p>
            </div>

            <div>
              <button
                onClick={toggleDropdown}
                className="flex justify-end items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2"
              >
                <SlOptionsVertical className="mr-2" />
              </button>

              {isOpen && (
                <div className="flex right-0 mt-2 w-48 bg-white shadow-lg rounded-xl z-10 dark:bg-gray-800">
                  <ul className="py-1">
                    <li className="flex justify-start items-center hover:bg-teal-100 hover:text-black rounded-xl  p-2">
                      <MdEdit className="mr-2" />
                      <Link href="/edit-data" onClick={closeDropdownHandler}>
                        Edit
                      </Link>
                    </li>
                    <li className="flex justify-start items-center hover:bg-teal-100 hover:text-black rounded-xl p-2">
                      <MdDelete className="mr-2" />
                      <Link href="/" onClick={closeDropdownHandler}>
                        Delete
                      </Link>
                    </li>
                    <li className="flex justify-start items-center hover:bg-teal-100 hover:text-black rounded-xl p-2">
                      <BiSolidUserDetail className="mr-2" />
                      <Link href="/detailuser" onClick={closeDropdownHandler}>
                        Detail
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataKaryawan;
