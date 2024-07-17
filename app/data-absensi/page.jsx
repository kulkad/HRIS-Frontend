"use client";

import React, { useState, useEffect } from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Link from "next/link";

const DataKaryawan = () => {
  // Pengecekan Route Apakah User Sudah Login Atau belum
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [data, setData] = useState([
    { id: 1, name: "Jahdan Paku Bumi", role: "PKL", time: "123" },
    { id: 2, name: "Piqih Palu Bumi", role: "Manager", time: "123" },
    // Add more data as needed
  ]);

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

  if (!user) {
    return (
      <div className="w-full bg-white dark:bg-slate-900 dark:text-white max-w-md mx-auto rounded-lg shadow-md overflow-hidden md:max-w-2xl p-4">
        <Skeleton height={40} count={1} className="mb-4"/>
        <Skeleton height={20} count={1} className="mb-4"/>
        <Skeleton height={20} count={1} className="mb-4"/>
        <Skeleton height={50} width={150} className="mb-4"/>
        <Skeleton height={50} width={150} className="mb-4"/>
      </div>
    );
  }

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle Role Change
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  // Filter Data Based on Search Query and Selected Role
  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedRole === "" || item.role === selectedRole)
    );
  });

  return (
    <div className="bg-white rounded-lg mx-4 p-2 text-xl dark:bg-gray-800">
      <div className="grid grid-cols-3 gap-4">
        <p className="px-6 py-10 font-semibold dark:text-white">DATA ABSENSI</p>

        <div className="flex justify-end col-span-2 bg-white p-2 rounded-lg mb-2 dark:bg-gray-800">
          <form className="flex flex-wrap items-center space-x-4">
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={selectedRole}
                onChange={handleRoleChange}
                className="dark:text-gray-800 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" className="dark:text-gray-800">All</option>
                <option value="Manager" className="dark:text-gray-800">
                  Manager
                </option>
                <option value="Karyawan" className="dark:text-gray-800">
                  Karyawan
                </option>
                <option value="Magang" className="dark:text-gray-800">
                  Magang
                </option>
                <option value="PKL" className="dark:text-gray-800">PKL</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Nama
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Cari Nama..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="dark:text-gray-800 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block mt-1 text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="dark:text-gray-800 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></input>
            </div>

            <div className="self-end">
              <button
                type="submit"
                className="mb-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Tampilan untuk layar laptop */}

      <div className="relative overflow-x-auto mt-5 hidden sm:block">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id} className="bg-white dark:bg-gray-800">
                <th className="px-6 py-4">{index + 1}</th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-400"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.role}</td>
                <td className="px-6 py-4">{item.time}</td>
                <td className="px-6 py-4">
                  <li className="flex justify-start items-center hover:bg-blue-200 hover:text-gray-800 rounded-xl p-2">
                    <BiSolidUserDetail className="mr-1" />
                    <Link href="/detailabsen">Detail</Link>
                  </li>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tampilan untuk layar kecil */}
      <div className="relative overflow-x-auto w-full flex sm:hidden">
        <div className="p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Ang Badarudin
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            angbadarudin@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataKaryawan;
