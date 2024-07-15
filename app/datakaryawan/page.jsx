"use client";

import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import { MdInsertEmoticon } from "react-icons/md";
import Link from "next/link";
import axios from "axios";

const DataKaryawan = () => {
  const [user, setUser] = useState(null);
  const [usersByRole, setUsersByRole] = useState([]);
  const role = "Karyawan"; // Sesuaikan dengan role yang ingin Anda ambil datanya

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      window.location.href = "http://localhost:3000/login";
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchUsersByRole = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/userbyrole/${role}`,
          {
            withCredentials: true, // Mengirim sesi
          }
        );
        console.log("coba", response.data);
        setUsersByRole(response.data); // Simpan data pengguna berdasarkan role
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsersByRole(); // Panggil fungsi jika user sudah ada
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdownHandler = () => {
    setIsOpen(false);
  };

  const deleteProduk = async (uuid) => {
    console.log("Deleting user with uuid:", uuid); // Debug log
    try {
      await axios.delete(`http://localhost:5001/users/${uuid}`);
      // Refresh data pengguna setelah penghapusan
      const response = await axios.get(
        `http://localhost:5001/userbyrole/${role}`,
        {
          withCredentials: true, // Mengirim sesi
        }
      );
      setUsersByRole(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-lg mx-4 p-4 text-xl">
      <div className="grid grid-cols-3 gap-4 flex">
        <p className="px-6 py-8 font-semibold">DATA KARYAWAN</p>
        <div className="flex justify-end col-span-2 bg-white p-5 rounded-lg mb-2 dark:bg-gray-600">
          <Link
            href="/tambahdata"
            className="bg-green-400 hover:bg-green-600 rounded-xl p-2 mr-4"
          >
            Tambah Data
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto hidden sm:block">
        {usersByRole.length === 0 ? (
          <p className="text-center py-4">Tidak ada data</p>
        ) : (
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
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/edit-data/${user.uuid}`}
                    className="flex items-center hover:bg-green-200 hover:text-gray-800 rounded-xl p-2"
                  >
                    <MdEdit className="mr-1" /> Edit
                  </Link>
                  <Link
                    href={`/delete-data/${user.uuid}`}
                    className="flex items-center hover:bg-red-300 hover:text-gray-800 rounded-xl p-2"
                  >
                    <MdDelete className="mr-1" /> Delete
                  </Link>
                  <Link
                    href={`/detailuser/${user.uuid}`}
                    className="flex items-center hover:bg-blue-200 hover:text-gray-800 rounded-xl p-2"
                  >
                    <BiSolidUserDetail className="mr-1" /> Detail
                  </Link>
                  <Link
                    href={`/daftarabsen/${user.uuid}`}
                    className="flex items-center hover:bg-blue-200 hover:text-gray-800 rounded-xl p-2"
                  >
                    <MdInsertEmoticon className="mr-1" /> Daftar Muka
                  </Link>
                </td>
              </tr>
            </thead>
            <tbody>
              {usersByRole.map((user) => (
                <tr key={user.uuid} className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/edit-data/${user.uuid}`}
                      className="flex items-center hover:bg-green-200 hover:text-gray-800 rounded-xl p-2"
                    >
                      <MdEdit className="mr-1" /> Edit
                    </Link>
                    <button
                      onClick={() => deleteProduk(user.uuid)} // Pastikan `uuid` digunakan di sini
                      className="flex items-center hover:bg-red-300 hover:text-gray-800 rounded-xl p-2"
                    >
                      <MdDelete className="mr-1" /> Delete
                    </button>
                    <Link
                      href={`/detailuser/${user.uuid}`}
                      className="flex items-center hover:bg-blue-200 hover:text-gray-800 rounded-xl p-2"
                    >
                      <BiSolidUserDetail className="mr-1" /> Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Tampilan untuk layar kecil */}
      {usersByRole.map((user) => (
        <div class="relative overflow-x-auto w-full flex sm:hidden">
          <div class=" p-4 leading-normal">
            <div className="flex">
              <div>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {user.name}
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {user.email}
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
                      <li className="flex justify-start items-center hover:bg-teal-100 hover:text-black rounded-xl p-2">
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
      ))}
    </div>
  );
};

export default DataKaryawan;
