"use client";

import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";
import Link from "next/link";
import axios from "axios";

const DataManager = () => {
  const [user, setUser] = useState(null);
  const [usersByRole, setUsersByRole] = useState([]);
  const role = "Manager"; // Sesuaikan dengan role yang ingin Anda ambil datanya

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
        setUsersByRole(response.data); // Simpan data pengguna berdasarkan role
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    if (user) {
      fetchUsersByRole(); // Panggil fungsi jika user sudah ada
    }
  }, [user, role]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-lg mx-4 p-4 text-xl">
      <div className="grid grid-cols-3 gap-4 flex">
        <p className="px-6 py-8 font-semibold">DATA MANAGER</p>
        <div className="flex justify-end col-span-2 bg-white p-2 rounded-lg mb-2 dark:bg-gray-600">
          <Link
            href="/tambahdata"
            className="bg-green-400 hover:bg-green-600 rounded-xl p-2"
          >
            Tambah Data
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto">
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
                Action
              </th>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataManager;
