"use client";

import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import { MdInsertEmoticon } from "react-icons/md";
import Link from "next/link";
import axios from "axios";

const DataMagang = () => {
  const [user, setUser] = useState(null);
  const [usersByRole, setUsersByRole] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // State untuk pesan berhasil
  const role = "Magang";

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
            withCredentials: true,
          }
        );
        setUsersByRole(response.data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsersByRole();
  }, []);

  const deleteProduk = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5001/users/${uuid}`);
      const response = await axios.get(
        `http://localhost:5001/userbyrole/${role}`,
        {
          withCredentials: true,
        }
      );
      setUsersByRole(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-lg mx-4 p-4 text-xl sm:block">
      <div className="grid grid-cols-3 gap-4 flex">
        <p className="px-4 py-6 font-semibold">DATA MAGANG</p>
        <div className="flex justify-end col-span-2 bg-white p-5 rounded-lg mb-2 dark:bg-gray-600">
          <Link
            href="/tambahdata"
            className="bg-green-400 hover:bg-green-600 rounded-xl p-2 mr-4"
          >
            Tambah Data
          </Link>
        </div>
      </div>
      {successMessage && <p className="text-green-600">{successMessage}</p>}{" "}
      {/* Tampilkan pesan jika ada */}
      <div className="relative overflow-x-auto hidden sm:block">
        {usersByRole.length === 0 ? (
          <p className="text-center py-4">Tidak ada data</p>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {usersByRole.map((user) => (
                <tr key={user.uuid} className="bg-white dark:bg-gray-800">
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                      onClick={() => deleteProduk(user.uuid)}
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
                    <Link
                      href={`/daftarabsen/${user.uuid}`}
                      className="flex items-center hover:bg-blue-200 hover:text-gray-800 rounded-xl p-2"
                    >
                      {user.url_foto_absen == null ? (
                        <>
                          <MdInsertEmoticon className="mr-1" /> Daftar Muka
                        </>
                      ) : (
                        <span>Muka Sudah Terdaftar</span>
                      )}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Tampilan untuk layar kecil */}
      {usersByRole.length === 0 ? (
        <p className="text-center py-4 sm:hidden">Tidak ada data</p>
      ) : (
        usersByRole.map((user) => (
          <div key={user.uuid} className="bg-white min-h-screen flex flex-col rounded-lg mx-2 p-3 text-xl sm:hidden">
            <div className="flex justify-between items-center">
              <div>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {user.name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
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
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl z-10 dark:bg-gray-800">
                    <ul className="py-1">
                      <li className="flex justify-start items-center hover:bg-teal-100 hover:text-black rounded-xl p-2">
                        <MdEdit className="mr-2" />
                        <Link href={`/edit-data/${user.uuid}`} onClick={closeDropdownHandler}>
                          Edit
                        </Link>
                      </li>
                      <li className="flex justify-start items-center hover:bg-teal-100 hover:text-black rounded-xl p-2">
                        <MdDelete className="mr-2" />
                        <button onClick={() => deleteProduk(user.uuid)} className="text-red-500">
                          Delete
                        </button>
                      </li>
                      <li className="flex justify-start items-center hover:bg-teal-100 hover:text-black rounded-xl p-2">
                        <BiSolidUserDetail className="mr-2" />
                        <Link href={`/detailuser/${user.uuid}`} onClick={closeDropdownHandler}>
                          Detail
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DataMagang;
